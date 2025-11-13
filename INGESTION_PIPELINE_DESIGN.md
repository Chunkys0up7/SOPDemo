# Document Ingestion Pipeline - Technical Design

**Version:** 1.0.0
**Last Updated:** 2025-11-13
**Status:** DRAFT - Technical Specification

---

## Overview

This document specifies the technical architecture for ingesting documents from diverse sources into the SOP ecosystem. The pipeline transforms raw documents (PDFs, DOCX, Confluence, etc.) into enriched, graph-ready SOPs with quality validation at each stage.

### Design Principles

1. **Format Agnostic** - Accept any reasonable document format
2. **Quality First** - Fail fast with clear error messages
3. **Async/Scalable** - Handle bulk ingestion without blocking
4. **Idempotent** - Re-running ingestion produces same result
5. **Traceable** - Complete audit trail of transformations

---

## Architecture Layers

### 1. Ingestion Sources Layer

```
┌─────────────────────────────────────────────────────────────┐
│                    INGESTION SOURCES                        │
├─────────────────────────────────────────────────────────────┤
│  Manual Upload    │  File share monitoring (network drives) │
│  Email ingestion  │  Confluence/SharePoint connectors       │
│  API submissions  │  Git repository sync                    │
│  Web scraping     │  Database exports                       │
└─────────────────────────────────────────────────────────────┘
```

**Implementation:**
- **Manual Upload:** Web form (drag-drop) → uploads to S3/local storage → triggers pipeline
- **File Share:** Watchdog daemon monitors directories → detects new files → queues for processing
- **Email:** Dedicated email address → mail server hook → extracts attachments → queue
- **Confluence:** REST API polling (scheduled) → detects new/updated pages → fetch → queue
- **SharePoint:** Microsoft Graph API → webhook on document library → fetch → queue
- **Git:** Post-receive hook → triggers pipeline on new commits to docs/ directory
- **API:** REST endpoint `/api/v1/ingest` → authentication → validation → queue

**Queue Design:**
- Use **message queue** (RabbitMQ, AWS SQS, or Redis Queue)
- Message format:
```json
{
  "ingestion_id": "uuid",
  "source": "confluence|sharepoint|upload|...",
  "source_id": "original document ID in source system",
  "file_url": "s3://bucket/path or local path",
  "metadata": {
    "uploader": "user@example.com",
    "source_url": "https://confluence.../page/123",
    "ingestion_timestamp": "2025-11-13T10:30:00Z"
  },
  "priority": "normal|high|urgent"
}
```

---

### 2. Format Detection & Parsing Layer

```
┌─────────────────────────────────────────────────────────────┐
│                 FORMAT DETECTION & PARSING                  │
├─────────────────────────────────────────────────────────────┤
│  MIME type detection  │  Apache Tika parser                 │
│  OCR (Tesseract)      │  Pandoc converter                   │
│  Custom parsers       │  Metadata extraction                │
└─────────────────────────────────────────────────────────────┘
```

**Pipeline Steps:**

1. **MIME Type Detection**
   - Use `python-magic` or `file` command
   - Validate against whitelist (PDF, DOCX, MD, HTML, TXT, etc.)
   - Reject unexpected formats with clear error

2. **Content Extraction**
   - **PDFs:**
     - Use Apache Tika for text extraction
     - If scanned (no text layer), run Tesseract OCR
     - Extract embedded metadata (author, created date, etc.)
   - **DOCX/DOC:**
     - Tika extracts text + structure
     - Preserve headings, lists, tables
     - Extract comments as metadata (review notes)
   - **Markdown/HTML:**
     - Parse with markdown-it or CommonMark
     - Extract frontmatter (YAML)
     - Normalize heading levels
   - **Confluence/Wiki:**
     - Use Pandoc to convert to Markdown
     - Preserve page hierarchy as TOC
     - Extract macros as metadata

3. **Quality Gate 1: Format Validation**
   - File not corrupt (readable)
   - Text extractable (not empty)
   - Character encoding valid (UTF-8 or convertible)
   - File size within limits (< 50MB for SOPs)

**Implementation Example (Python):**

```python
import magic
import tika
from PIL import Image
import pytesseract

class DocumentParser:
    def __init__(self, file_path):
        self.file_path = file_path
        self.mime_type = None
        self.text = None
        self.metadata = {}

    def detect_format(self):
        """Detect MIME type"""
        self.mime_type = magic.from_file(self.file_path, mime=True)

        ALLOWED_TYPES = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/markdown',
            'text/html'
        ]

        if self.mime_type not in ALLOWED_TYPES:
            raise ValidationError(f"Unsupported format: {self.mime_type}")

    def extract_content(self):
        """Extract text and metadata based on format"""
        if self.mime_type == 'application/pdf':
            return self._parse_pdf()
        elif self.mime_type.startswith('application/vnd'):
            return self._parse_docx()
        elif self.mime_type == 'text/markdown':
            return self._parse_markdown()
        else:
            raise NotImplementedError(f"Parser for {self.mime_type} not yet implemented")

    def _parse_pdf(self):
        """Parse PDF with OCR fallback"""
        # Try text extraction first
        parsed = tika.parser.from_file(self.file_path)
        self.text = parsed['content']
        self.metadata = parsed['metadata']

        # If no text, try OCR
        if not self.text or len(self.text.strip()) < 100:
            self.text = self._ocr_pdf()
            self.metadata['ocr_applied'] = True

        return self.text, self.metadata

    def _ocr_pdf(self):
        """OCR fallback for scanned PDFs"""
        # Convert PDF to images
        images = convert_from_path(self.file_path)

        # OCR each page
        text_pages = []
        for i, image in enumerate(images):
            text = pytesseract.image_to_string(image, lang='eng')
            text_pages.append(text)

        return '\n\n---\n\n'.join(text_pages)
```

---

### 3. Normalization & Transformation Layer

```
┌─────────────────────────────────────────────────────────────┐
│            NORMALIZATION & TRANSFORMATION                   │
├─────────────────────────────────────────────────────────────┤
│  Structure extraction  │  Frontmatter generation            │
│  Section identification│  Metadata normalization            │
│  Cross-reference       │  Terminology standardization       │
│  detection             │                                    │
└─────────────────────────────────────────────────────────────┘
```

**Transformation Steps:**

1. **Structure Extraction**
   - Identify headings (H1, H2, H3...) → build TOC
   - Detect sections (Overview, Procedure, References, etc.)
   - Extract numbered steps from procedures
   - Identify tables, code blocks, diagrams

2. **Frontmatter Generation**
   - Extract or infer metadata:
     - `id`: Generate from title or source ID
     - `title`: Extract from H1 or filename
     - `version`: Extract from document or default to 1.0.0
     - `owner`: From metadata or uploader
     - `created_date`: From file metadata
     - `tags`: Extract from keywords or infer from content
   - Create YAML frontmatter block

3. **Cross-Reference Detection**
   - Regex patterns for SOP references: `SOP-001`, `SOP 001`, `see [procedure X]`
   - Extract URLs (internal links to other SOPs)
   - Identify component includes: `{{include: atom-X}}`
   - Store as structured metadata for graph building

4. **Terminology Standardization**
   - Apply term mapping dictionary:
     - "log in" → "login"
     - "sign-off" → "approval"
   - Flag unknown terms for review
   - Suggest ontology additions

5. **Quality Gate 2: Structure Recognition**
   - Required sections present (configurable per SOP type)
   - Heading hierarchy valid (no jumps from H1 → H3)
   - Frontmatter valid YAML
   - Minimum content length met

**Implementation Example:**

```python
import yaml
import re
from collections import defaultdict

class DocumentNormalizer:
    def __init__(self, raw_text, metadata):
        self.raw_text = raw_text
        self.metadata = metadata
        self.sections = defaultdict(str)
        self.frontmatter = {}
        self.cross_refs = []

    def extract_structure(self):
        """Parse markdown structure"""
        lines = self.raw_text.split('\n')
        current_section = 'preamble'

        for line in lines:
            # Detect headings
            heading_match = re.match(r'^(#{1,6})\s+(.+)$', line)
            if heading_match:
                level = len(heading_match.group(1))
                title = heading_match.group(2).strip()

                if level == 1:
                    # H1 is typically the title
                    self.frontmatter['title'] = title
                elif level == 2:
                    # H2 marks new section
                    current_section = self._normalize_section_name(title)
            else:
                self.sections[current_section] += line + '\n'

        return self.sections

    def generate_frontmatter(self):
        """Create YAML frontmatter"""
        # Start with extracted metadata
        fm = {
            'id': self._generate_id(),
            'title': self.frontmatter.get('title', 'Untitled'),
            'version': self.metadata.get('version', '1.0.0'),
            'created_date': self.metadata.get('created', 'unknown'),
            'source': self.metadata.get('source', 'ingestion'),
            'ingested_at': datetime.utcnow().isoformat()
        }

        # Validate required fields
        required = ['id', 'title', 'version']
        missing = [f for f in required if not fm.get(f)]
        if missing:
            raise ValidationError(f"Missing required frontmatter: {missing}")

        return fm

    def detect_cross_references(self):
        """Find references to other SOPs"""
        patterns = [
            r'SOP[-\s]?(\d{3})',  # SOP-001, SOP 001
            r'\bsop[-_](\w+)\b',  # sop-001, sop_hr_onboarding
            r'\{\{include:\s*([\w-]+)\}\}'  # {{include: atom-welcome}}
        ]

        refs = []
        for pattern in patterns:
            matches = re.finditer(pattern, self.raw_text, re.IGNORECASE)
            for match in matches:
                refs.append({
                    'type': 'cross-reference',
                    'target': match.group(1),
                    'context': match.group(0)
                })

        return refs

    def validate_structure(self):
        """Quality Gate 2: Structure validation"""
        errors = []
        warnings = []

        # Check required sections (configurable)
        required_sections = ['overview', 'procedure']
        missing = [s for s in required_sections if s not in self.sections]
        if missing:
            errors.append(f"Missing required sections: {missing}")

        # Check minimum content length
        total_length = sum(len(s) for s in self.sections.values())
        if total_length < 500:
            warnings.append(f"Document very short ({total_length} chars)")

        # Validate frontmatter
        try:
            yaml.dump(self.frontmatter)
        except Exception as e:
            errors.append(f"Invalid frontmatter YAML: {e}")

        return {
            'passed': len(errors) == 0,
            'errors': errors,
            'warnings': warnings
        }
```

---

### 4. Semantic Enrichment Layer

```
┌─────────────────────────────────────────────────────────────┐
│                SEMANTIC ENRICHMENT                          │
├─────────────────────────────────────────────────────────────┤
│  Entity extraction     │  Relationship discovery            │
│  (NER: roles, systems, │  (depends-on, component-of, etc.)  │
│   processes, tools)    │                                    │
│  Compliance mapping    │  Quality scoring                   │
│  Ontology alignment    │  Confidence scoring                │
└─────────────────────────────────────────────────────────────┘
```

**Enrichment Steps:**

1. **Named Entity Recognition (NER)**
   - Use spaCy or transformer models (BERT, etc.)
   - Custom entity types:
     - `ROLE`: "IT Administrator", "Finance Approver"
     - `SYSTEM`: "SAP", "Active Directory", "Jira"
     - `PROCESS`: "Account Provisioning", "Expense Approval"
     - `TOOL`: "Excel", "Confluence", "ServiceNow"
     - `COMPLIANCE`: "SOX", "GDPR", "HIPAA", "ISO 27001"
   - Confidence threshold: > 0.7 to accept, flag < 0.7 for review

2. **Relationship Extraction**
   - Dependency patterns:
     - "This SOP depends on [SOP-X]" → `depends-on` edge
     - "See also [SOP-Y]" → `related-to` edge
     - "{{include: atom-Z}}" → `component-of` edge
   - Strength classification:
     - "must", "requires", "cannot proceed without" → `strong`
     - "should", "recommended", "see also" → `medium`
     - "may", "optionally" → `weak`

3. **Compliance Mapping**
   - Regex/NLP to detect compliance statements:
     - "In compliance with SOX section 404..."
     - "GDPR Article 32 requires..."
   - Build compliance → SOP traceability matrix
   - Flag SOPs with no compliance mapping (if required)

4. **Quality Scoring**
   - Multi-factor quality score (0-100):
     - **Completeness** (30%): All required sections, minimum length
     - **Clarity** (20%): Readability score (Flesch-Kincaid), simple language
     - **Structure** (20%): Valid headings, proper formatting
     - **Metadata** (15%): Complete frontmatter, tags
     - **References** (15%): No broken links, cross-refs valid
   - Generate recommendations for improvement

5. **Quality Gate 4: Semantic Enrichment**
   - At least 5 entities extracted (or flag for review)
   - Relationships identifiable
   - Confidence scores acceptable (avg > 0.7)
   - No critical ambiguities

**Implementation Example:**

```python
import spacy
from sklearn.metrics import f1_score

class SemanticEnricher:
    def __init__(self, document):
        self.doc = document
        self.nlp = spacy.load('en_core_web_trf')  # Transformer model
        self.entities = []
        self.relationships = []
        self.quality_score = 0

    def extract_entities(self):
        """NER extraction"""
        doc = self.nlp(self.doc.text)

        # Standard entities
        for ent in doc.ents:
            self.entities.append({
                'text': ent.text,
                'type': ent.label_,
                'confidence': self._calculate_confidence(ent),
                'start': ent.start_char,
                'end': ent.end_char
            })

        # Custom entity extraction (trained model or rules)
        self._extract_custom_entities(doc)

        return self.entities

    def _extract_custom_entities(self, doc):
        """Extract domain-specific entities"""
        # Compliance frameworks (rule-based for now)
        compliance_patterns = [
            r'\b(SOX|Sarbanes-Oxley)\b',
            r'\b(GDPR|General Data Protection Regulation)\b',
            r'\b(HIPAA|Health Insurance Portability)\b',
            r'\b(ISO\s?27001|ISO\s?9001)\b',
            r'\b(PCI\s?DSS|Payment Card Industry)\b'
        ]

        for pattern in compliance_patterns:
            matches = re.finditer(pattern, doc.text, re.IGNORECASE)
            for match in matches:
                self.entities.append({
                    'text': match.group(0),
                    'type': 'COMPLIANCE',
                    'confidence': 1.0,  # Rule-based, high confidence
                    'start': match.start(),
                    'end': match.end()
                })

    def extract_relationships(self):
        """Find relationships between entities and SOPs"""
        # Dependency relationships
        dependency_patterns = [
            (r'depends on\s+(\w+)', 'depends-on', 'strong'),
            (r'requires\s+(\w+)', 'depends-on', 'strong'),
            (r'see also\s+(\w+)', 'related-to', 'medium'),
            (r'optionally\s+(\w+)', 'related-to', 'weak')
        ]

        for pattern, rel_type, strength in dependency_patterns:
            matches = re.finditer(pattern, self.doc.text, re.IGNORECASE)
            for match in matches:
                self.relationships.append({
                    'type': rel_type,
                    'target': match.group(1),
                    'strength': strength,
                    'context': match.group(0)
                })

        return self.relationships

    def calculate_quality_score(self):
        """Compute multi-factor quality score"""
        scores = {}

        # Completeness (30 points)
        required_sections = ['overview', 'procedure', 'references']
        present = sum(1 for s in required_sections if s in self.doc.sections)
        scores['completeness'] = (present / len(required_sections)) * 30

        # Clarity (20 points) - Flesch Reading Ease
        from textstat import flesch_reading_ease
        readability = flesch_reading_ease(self.doc.text)
        # Score 60-70 is ideal (plain English)
        if 60 <= readability <= 70:
            scores['clarity'] = 20
        elif 50 <= readability < 60 or 70 < readability <= 80:
            scores['clarity'] = 15
        else:
            scores['clarity'] = 10

        # Structure (20 points)
        structure_checks = [
            self.doc.has_valid_frontmatter(),
            self.doc.has_valid_heading_hierarchy(),
            self.doc.has_table_of_contents(),
            len(self.doc.sections) >= 3
        ]
        scores['structure'] = (sum(structure_checks) / len(structure_checks)) * 20

        # Metadata (15 points)
        metadata_fields = ['id', 'title', 'version', 'owner', 'tags']
        present_meta = sum(1 for f in metadata_fields if self.doc.frontmatter.get(f))
        scores['metadata'] = (present_meta / len(metadata_fields)) * 15

        # References (15 points)
        total_refs = len(self.doc.cross_refs)
        broken_refs = sum(1 for r in self.doc.cross_refs if not r.get('valid'))
        if total_refs > 0:
            scores['references'] = ((total_refs - broken_refs) / total_refs) * 15
        else:
            scores['references'] = 10  # Neutral if no refs

        # Total
        self.quality_score = sum(scores.values())

        return {
            'total': self.quality_score,
            'breakdown': scores,
            'grade': self._score_to_grade(self.quality_score)
        }

    def _score_to_grade(self, score):
        """Convert numeric score to letter grade"""
        if score >= 90: return 'A'
        elif score >= 80: return 'B'
        elif score >= 70: return 'C'
        elif score >= 60: return 'D'
        else: return 'F'
```

---

### 5. Knowledge Graph Integration Layer

```
┌─────────────────────────────────────────────────────────────┐
│            KNOWLEDGE GRAPH INTEGRATION                      │
├─────────────────────────────────────────────────────────────┤
│  Node creation        │  Edge creation                      │
│  Property mapping     │  Index updates                      │
│  Versioning           │  Audit trail                        │
└─────────────────────────────────────────────────────────────┘
```

**Graph Storage Steps:**

1. **Node Creation (SOP)**
   ```cypher
   CREATE (s:SOP {
     id: 'sop-001',
     title: 'User Onboarding Process',
     version: '1.2.0',
     status: 'active',
     owner: 'HR Department',
     quality_score: 87,
     created_at: datetime('2025-11-13T10:00:00Z'),
     updated_at: datetime('2025-11-13T10:00:00Z'),
     ingestion_id: 'uuid-1234'
   })
   ```

2. **Entity Nodes**
   ```cypher
   CREATE (r:Role {name: 'IT Administrator'})
   CREATE (sys:System {name: 'Active Directory'})
   CREATE (comp:Compliance {framework: 'SOX', section: '404'})
   ```

3. **Relationship Edges**
   ```cypher
   MATCH (s1:SOP {id: 'sop-001'}), (s2:SOP {id: 'sop-002'})
   CREATE (s1)-[:DEPENDS_ON {strength: 'strong', description: 'Requires IT system access'}]->(s2)

   MATCH (s:SOP {id: 'sop-001'}), (r:Role {name: 'IT Administrator'})
   CREATE (s)-[:REQUIRES_ROLE]->(r)

   MATCH (s:SOP {id: 'sop-001'}), (c:Compliance {framework: 'SOX'})
   CREATE (s)-[:COMPLIES_WITH]->(c)
   ```

4. **Versioning Strategy**
   - Keep all versions as separate nodes
   - Link versions: `(v1)-[:NEXT_VERSION]->(v2)`
   - Latest version: `(:SOP {id: 'sop-001', is_latest: true})`

5. **Quality Gate 7: Dependency Analysis**
   - Validate all referenced SOPs exist
   - Detect circular dependencies (Cypher query)
   - Calculate impact radius (graph traversal)
   - Flag high-impact changes

**Implementation Example (Neo4j):**

```python
from neo4j import GraphDatabase

class KnowledgeGraphIntegrator:
    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def create_sop_node(self, sop_data):
        """Create or update SOP node in graph"""
        with self.driver.session() as session:
            result = session.write_transaction(self._create_sop, sop_data)
            return result

    @staticmethod
    def _create_sop(tx, data):
        query = """
        MERGE (s:SOP {id: $id})
        ON CREATE SET
            s.title = $title,
            s.version = $version,
            s.created_at = datetime(),
            s.is_latest = true
        ON MATCH SET
            s.title = $title,
            s.version = $version,
            s.updated_at = datetime()
        SET
            s.status = $status,
            s.owner = $owner,
            s.quality_score = $quality_score
        RETURN s
        """
        result = tx.run(query, **data)
        return result.single()[0]

    def create_relationships(self, sop_id, relationships):
        """Create dependency edges"""
        with self.driver.session() as session:
            for rel in relationships:
                session.write_transaction(
                    self._create_relationship,
                    sop_id,
                    rel['target'],
                    rel['type'],
                    rel.get('strength', 'medium'),
                    rel.get('description', '')
                )

    @staticmethod
    def _create_relationship(tx, source_id, target_id, rel_type, strength, description):
        query = """
        MATCH (s1:SOP {id: $source_id})
        MATCH (s2:SOP {id: $target_id})
        MERGE (s1)-[r:DEPENDS_ON {type: $rel_type}]->(s2)
        SET r.strength = $strength,
            r.description = $description
        RETURN r
        """
        result = tx.run(
            query,
            source_id=source_id,
            target_id=target_id,
            rel_type=rel_type,
            strength=strength,
            description=description
        )
        return result.single()

    def detect_circular_dependencies(self, sop_id):
        """Check for circular dependency chains"""
        with self.driver.session() as session:
            result = session.read_transaction(self._find_cycles, sop_id)
            return result

    @staticmethod
    def _find_cycles(tx, sop_id):
        query = """
        MATCH path = (s:SOP {id: $sop_id})-[:DEPENDS_ON*]->(s)
        RETURN path
        LIMIT 1
        """
        result = tx.run(query, sop_id=sop_id)
        record = result.single()
        return record is not None  # True if cycle found

    def calculate_impact_radius(self, sop_id):
        """Find all SOPs affected by changes to this SOP"""
        with self.driver.session() as session:
            result = session.read_transaction(self._find_dependents, sop_id)
            return result

    @staticmethod
    def _find_dependents(tx, sop_id):
        query = """
        MATCH path = (dependent:SOP)-[:DEPENDS_ON*]->(s:SOP {id: $sop_id})
        RETURN DISTINCT dependent.id AS sop_id,
               dependent.title AS title,
               length(path) AS distance
        ORDER BY distance ASC
        """
        result = tx.run(query, sop_id=sop_id)
        return [dict(record) for record in result]
```

---

### 6. Quality \& Validation Layer

*Embedded throughout pipeline - see "Quality Gates" section in STRATEGIC_ROADMAP.md*

---

## Pipeline Orchestration

### Workflow State Machine

```
[Uploaded] → [Format Detected] → [Content Extracted] → [Normalized]
    → [Enriched] → [Graph Stored] → [Indexed] → [Published]

At each transition:
- Quality gate check
- Audit log entry
- Notification (if gate fails)
- Rollback capability
```

### Implementation: Temporal.io Workflow

```python
from temporalio import workflow, activity
from datetime import timedelta

@workflow.defn
class IngestionWorkflow:
    @workflow.run
    async def run(self, ingestion_request):
        # Activity 1: Format detection
        file_info = await workflow.execute_activity(
            detect_format_activity,
            ingestion_request,
            start_to_close_timeout=timedelta(seconds=30)
        )

        # Activity 2: Content extraction
        extracted = await workflow.execute_activity(
            extract_content_activity,
            file_info,
            start_to_close_timeout=timedelta(minutes=5)
        )

        # Activity 3: Normalization
        normalized = await workflow.execute_activity(
            normalize_activity,
            extracted,
            start_to_close_timeout=timedelta(minutes=2)
        )

        # Activity 4: Semantic enrichment
        enriched = await workflow.execute_activity(
            enrich_activity,
            normalized,
            start_to_close_timeout=timedelta(minutes=10)
        )

        # Activity 5: Graph integration
        graph_result = await workflow.execute_activity(
            integrate_graph_activity,
            enriched,
            start_to_close_timeout=timedelta(minutes=3)
        )

        # Activity 6: Publish
        published = await workflow.execute_activity(
            publish_activity,
            graph_result,
            start_to_close_timeout=timedelta(minutes=2)
        )

        return {
            'status': 'success',
            'sop_id': published['sop_id'],
            'quality_score': enriched['quality_score'],
            'duration_seconds': workflow.now().total_seconds()
        }

@activity.defn
async def detect_format_activity(request):
    parser = DocumentParser(request['file_path'])
    parser.detect_format()
    return {
        'mime_type': parser.mime_type,
        'file_size': os.path.getsize(request['file_path']),
        'ingestion_id': request['ingestion_id']
    }

@activity.defn
async def extract_content_activity(file_info):
    parser = DocumentParser(file_info['file_path'])
    text, metadata = parser.extract_content()

    # Quality Gate 1: Format validation
    if not text or len(text) < 100:
        raise ValidationError("Document too short or empty")

    return {
        'text': text,
        'metadata': metadata,
        'ingestion_id': file_info['ingestion_id']
    }

# ... other activities
```

---

## Performance Targets

| Metric | Target | Notes |
|--------|--------|-------|
| Ingestion throughput | 50 SOPs/hour | For bulk imports |
| Average processing time | < 2 minutes | For typical SOP (10 pages) |
| PDF with OCR | < 10 minutes | Per 50-page document |
| Quality gate latency | < 10 seconds | Per gate |
| Graph query time | < 200ms | Impact analysis |
| End-to-end latency | < 5 minutes | Upload to published |

---

## Error Handling \& Retry Logic

### Retry Strategy

| Stage | Retries | Backoff | Timeout |
|-------|---------|---------|---------|
| Format detection | 3 | Exponential (2s, 4s, 8s) | 30s |
| Content extraction | 2 | Linear (30s, 60s) | 5min |
| OCR (if needed) | 1 | None | 15min |
| Normalization | 2 | Linear (10s, 20s) | 2min |
| Enrichment | 3 | Exponential (1m, 2m, 4m) | 10min |
| Graph integration | 5 | Exponential (5s, 10s, 20s, 40s, 80s) | 3min |

### Dead Letter Queue (DLQ)

- Failed ingestions after max retries → DLQ
- Manual review dashboard
- Ability to reprocess from any stage
- Detailed error logs with context

---

## Monitoring \& Observability

### Metrics to Track

```python
# Prometheus metrics
ingestion_requests_total = Counter('ingestion_requests_total', 'Total ingestion requests', ['source'])
ingestion_duration_seconds = Histogram('ingestion_duration_seconds', 'Ingestion duration', ['stage'])
ingestion_failures_total = Counter('ingestion_failures_total', 'Ingestion failures', ['stage', 'error_type'])
quality_gate_failures = Counter('quality_gate_failures', 'Quality gate failures', ['gate'])
quality_scores = Histogram('quality_scores', 'SOP quality scores')
```

### Alerting

- **Critical:** > 10% ingestion failure rate
- **Warning:** Average processing time > 5 minutes
- **Warning:** Quality gate 1 failure rate > 5%
- **Info:** New source type detected (manual review)

---

## Security \& Compliance

### Data Handling

1. **Encryption:** All uploads encrypted in transit (HTTPS) and at rest (S3 SSE)
2. **Access Control:** RBAC on ingestion endpoints (uploader role required)
3. **Audit Trail:** Every ingestion logged with user, timestamp, source
4. **Data Retention:** Raw uploads kept for 90 days, then archived/deleted
5. **PII Detection:** Scan for SSN, credit cards, etc. and flag for review

### Compliance Considerations

- **SOX:** Audit trail immutable, tamper-evident logs
- **GDPR:** Right to erasure - ability to purge SOPs and all derivatives
- **HIPAA:** No PHI in SOPs (validation gate to detect/reject)

---

## Testing Strategy

### Unit Tests
- Each parser (PDF, DOCX, Markdown)
- Each quality gate in isolation
- Entity extraction accuracy (F1 score > 0.85)
- Relationship extraction precision/recall

### Integration Tests
- End-to-end ingestion flow (happy path)
- Error scenarios (corrupted PDF, empty document)
- Retry logic (simulated transient failures)
- Quality gate composition (all gates in sequence)

### Performance Tests
- Load testing: 100 concurrent uploads
- Bulk ingestion: 1000 SOPs in batch
- Large documents: 200-page PDF with OCR
- Graph query performance: impact analysis on 10,000 node graph

---

## Deployment \& Rollout

### Phase 1: Pilot (Month 2)
- Deploy to dev environment
- Ingest 10-15 pilot SOPs
- Validate accuracy manually
- Tune quality thresholds

### Phase 2: Staging (Month 3-4)
- Deploy to staging environment
- Bulk ingest historical SOPs (100+)
- User acceptance testing
- Performance benchmarking

### Phase 3: Production (Month 5+)
- Phased rollout to production
- Monitor error rates closely
- Collect user feedback
- Iterate on quality gates

---

## Appendices

### A. Supported File Formats

| Format | Extension | Parser | OCR Support | Priority |
|--------|-----------|--------|-------------|----------|
| PDF | .pdf | Apache Tika | Yes (Tesseract) | High |
| Word | .docx, .doc | Tika / python-docx | No | High |
| Markdown | .md | markdown-it | No | High |
| HTML | .html | BeautifulSoup | No | Medium |
| Plain Text | .txt | Native | No | High |
| Confluence | API | Pandoc | No | Medium |
| SharePoint | API | Microsoft Graph | No | Low |

### B. Quality Gate Threshold Configuration

```yaml
quality_gates:
  gate_1_format_validation:
    blocking: true
    checks:
      - mime_type_allowed: true
      - file_size_max_mb: 50
      - text_extractable: true

  gate_2_structure_recognition:
    blocking: true
    checks:
      - valid_frontmatter: true
      - required_sections: ['overview', 'procedure']
      - min_content_length: 500
      - heading_hierarchy_valid: true

  gate_4_semantic_enrichment:
    blocking: false  # Non-blocking, flags for review
    checks:
      - min_entities_extracted: 5
      - avg_entity_confidence: 0.7
      - relationships_identified: true
```

### C. Ontology / Term Dictionary

```yaml
terminology:
  normalization:
    "log in": "login"
    "sign-off": "approval"
    "end user": "user"

  entity_types:
    roles:
      - "IT Administrator"
      - "Finance Approver"
      - "HR Manager"

    systems:
      - "Active Directory"
      - "SAP"
      - "Salesforce"

    compliance_frameworks:
      - "SOX"
      - "GDPR"
      - "HIPAA"
      - "ISO 27001"
```

---

**END OF DOCUMENT**
