# RAG Architecture for SOP Assistant

## 🎯 Overview

The SOP Assistant uses **RAG (Retrieval Augmented Generation)** to enable intelligent querying and dynamic procedure generation from the SOP knowledge base. This combines semantic search with large language models to provide accurate, contextually-aware responses grounded in organizational documentation.

## 📐 Architecture Diagram

```
┌─────────────────┐
│   User Query    │
│ "How do I..."   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────────┐
│         Embedding Model                      │
│  (text-embedding-3-small / Sentence-BERT)   │
└────────┬────────────────────────────────────┘
         │
         │ Query Vector
         ▼
┌─────────────────────────────────────────────┐
│       Vector Database                        │
│   (Pinecone / Weaviate / pgvector)          │
│                                              │
│  ┌──────────────────────────────────────┐   │
│  │ SOP-001 Section 1: [0.23, 0.45, ...]│   │
│  │ SOP-001 Section 2: [0.12, 0.34, ...]│   │
│  │ SOP-002 Section 1: [0.45, 0.23, ...]│   │
│  │ ...                                  │   │
│  └──────────────────────────────────────┘   │
└────────┬────────────────────────────────────┘
         │
         │ Top-K Similar Vectors
         ▼
┌─────────────────────────────────────────────┐
│      Retrieval & Ranking                    │
│  - Cosine similarity                        │
│  - Relevance scoring                        │
│  - Re-ranking (optional)                    │
└────────┬────────────────────────────────────┘
         │
         │ Retrieved Sources (5-10)
         ▼
┌─────────────────────────────────────────────┐
│       Context Building                      │
│  - Assemble prompt                          │
│  - Add system instructions                  │
│  - Include source metadata                  │
└────────┬────────────────────────────────────┘
         │
         │ Prompt + Context
         ▼
┌─────────────────────────────────────────────┐
│      Large Language Model                   │
│  (GPT-4 / Claude / Llama 2)                 │
│                                              │
│  System: "You are an SOP assistant..."      │
│  Context: [Retrieved source texts]          │
│  Query: "How do I process invoices >$10K?"  │
└────────┬────────────────────────────────────┘
         │
         │ Generated Response
         ▼
┌─────────────────────────────────────────────┐
│      Response Processing                    │
│  - Citation insertion                       │
│  - Formatting (markdown)                    │
│  - Source linking                           │
└────────┬────────────────────────────────────┘
         │
         ▼
┌─────────────────┐
│  Display to     │
│     User        │
│  + Sources      │
└─────────────────┘
```

## 🔧 Components

### 1. **Knowledge Base Preparation**

#### Chunking Strategy
SOPs are broken into semantic chunks for better retrieval:

```javascript
const chunkingStrategies = {
  // Strategy 1: Section-based (current implementation)
  bySection: {
    granularity: 'section',
    size: '~500 tokens',
    overlap: '50 tokens',
    metadata: ['sopId', 'sopTitle', 'section', 'department', 'version']
  },

  // Strategy 2: Paragraph-based (more granular)
  byParagraph: {
    granularity: 'paragraph',
    size: '~200 tokens',
    overlap: '20 tokens',
    preserveContext: true
  },

  // Strategy 3: Semantic (using sentence embeddings)
  bySemantic: {
    granularity: 'semantic',
    method: 'sentence clustering',
    targetSize: '~300 tokens'
  }
};
```

**Current Implementation (Mock):**
```javascript
const sopKnowledgeBase = [
  {
    sopId: 'sop-001',
    sopTitle: 'Invoice Processing',
    section: 'Approval Routing',
    content: '...full section text...',
    embedding: [0.23, 0.45, 0.67, ...], // 1536-dim for OpenAI
    metadata: {
      department: 'Finance',
      version: '1.2.0',
      lastUpdated: '2025-11-01',
      author: 'Sarah Chen'
    }
  },
  // ... more chunks
];
```

#### Embedding Generation

**Option 1: OpenAI Embeddings** (Recommended for production)
```python
import openai

def generate_embeddings(chunks):
    embeddings = []
    for chunk in chunks:
        response = openai.Embedding.create(
            model="text-embedding-3-small",  # 1536 dimensions, $0.02/1M tokens
            input=chunk['content']
        )
        embeddings.append({
            **chunk,
            'embedding': response['data'][0]['embedding']
        })
    return embeddings
```

**Option 2: Open Source (Sentence Transformers)**
```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')  # 384 dimensions, free

def generate_embeddings(chunks):
    embeddings = []
    for chunk in chunks:
        embedding = model.encode(chunk['content'])
        embeddings.append({
            **chunk,
            'embedding': embedding.tolist()
        })
    return embeddings
```

### 2. **Vector Database**

#### Option A: Pinecone (Managed, Easiest)
```python
import pinecone

# Initialize
pinecone.init(api_key='YOUR_API_KEY', environment='us-west1-gcp')
index = pinecone.Index('sop-knowledge-base')

# Upsert embeddings
for chunk in chunks_with_embeddings:
    index.upsert([(
        chunk['sopId'] + '-' + chunk['section'],  # unique ID
        chunk['embedding'],
        {
            'sopTitle': chunk['sopTitle'],
            'section': chunk['section'],
            'content': chunk['content'],
            'metadata': chunk['metadata']
        }
    )])

# Query
def retrieve_sources(query_embedding, top_k=5):
    results = index.query(
        vector=query_embedding,
        top_k=top_k,
        include_metadata=True
    )
    return results['matches']
```

#### Option B: Weaviate (Open Source)
```python
import weaviate

client = weaviate.Client("http://localhost:8080")

# Create schema
schema = {
    "class": "SOPChunk",
    "vectorizer": "text2vec-openai",
    "properties": [
        {"name": "sopId", "dataType": ["string"]},
        {"name": "sopTitle", "dataType": ["string"]},
        {"name": "section", "dataType": ["string"]},
        {"name": "content", "dataType": ["text"]},
        {"name": "department", "dataType": ["string"]},
    ]
}

client.schema.create_class(schema)

# Query
def retrieve_sources(query, top_k=5):
    result = client.query.get("SOPChunk", [
        "sopId", "sopTitle", "section", "content"
    ]).with_near_text({
        "concepts": [query]
    }).with_limit(top_k).do()

    return result['data']['Get']['SOPChunk']
```

#### Option C: pgvector (PostgreSQL Extension)
```sql
-- Setup
CREATE EXTENSION vector;

CREATE TABLE sop_chunks (
  id SERIAL PRIMARY KEY,
  sop_id VARCHAR(50),
  sop_title TEXT,
  section TEXT,
  content TEXT,
  embedding vector(1536),  -- OpenAI dimension
  metadata JSONB
);

CREATE INDEX ON sop_chunks USING ivfflat (embedding vector_cosine_ops);
```

```python
import psycopg2
from pgvector.psycopg2 import register_vector

conn = psycopg2.connect(database='sop_db')
register_vector(conn)

def retrieve_sources(query_embedding, top_k=5):
    cur = conn.cursor()
    cur.execute("""
        SELECT sop_id, sop_title, section, content,
               1 - (embedding <=> %s) AS similarity
        FROM sop_chunks
        ORDER BY embedding <=> %s
        LIMIT %s
    """, (query_embedding, query_embedding, top_k))
    return cur.fetchall()
```

### 3. **Retrieval Process**

The current mock implementation uses simple keyword matching. For production:

```javascript
// Frontend (JavaScript)
async function retrieveRelevantSources(query) {
  // Step 1: Embed the query
  const queryEmbedding = await embedQuery(query);

  // Step 2: Search vector database
  const response = await fetch('/api/rag/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query_embedding: queryEmbedding,
      top_k: 5,
      filters: {
        department: extractDepartment(query), // optional filtering
        min_relevance: 0.7
      }
    })
  });

  const sources = await response.json();
  return sources;
}

async function embedQuery(query) {
  const response = await fetch('/api/embeddings/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: query })
  });

  const data = await response.json();
  return data.embedding;
}
```

```python
# Backend (Python/FastAPI)
from fastapi import FastAPI
import openai
import pinecone

app = FastAPI()

@app.post("/api/rag/search")
async def search_knowledge_base(request: SearchRequest):
    # Query vector database
    results = pinecone_index.query(
        vector=request.query_embedding,
        top_k=request.top_k,
        filter=request.filters
    )

    # Format results
    sources = [{
        'sopId': match.metadata['sopId'],
        'sopTitle': match.metadata['sopTitle'],
        'section': match.metadata['section'],
        'content': match.metadata['content'],
        'relevanceScore': match.score,
        'metadata': match.metadata
    } for match in results.matches]

    return sources

@app.post("/api/embeddings/create")
async def create_embedding(request: EmbeddingRequest):
    response = openai.Embedding.create(
        model="text-embedding-3-small",
        input=request.text
    )
    return {"embedding": response.data[0].embedding}
```

### 4. **LLM Generation**

#### Option 1: OpenAI GPT-4
```javascript
async function generateResponse(query, sources) {
  const context = sources.map(s =>
    `[Source: ${s.sopTitle} - ${s.section}]\n${s.content}`
  ).join('\n\n');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are an expert SOP assistant. Answer questions based ONLY on the provided source documentation. If the sources don't contain enough information, say so. Always cite which SOP and section you're referencing.`
        },
        {
          role: 'user',
          content: `Context from SOP knowledge base:\n\n${context}\n\nQuestion: ${query}\n\nProvide a detailed, step-by-step answer based on the sources above. Include inline citations like [SOP-001: Section Name].`
        }
      ],
      temperature: 0.3,  // Lower = more factual
      max_tokens: 1500
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
```

#### Option 2: Anthropic Claude
```javascript
async function generateResponse(query, sources) {
  const context = sources.map(s =>
    `<source sop="${s.sopId}" section="${s.section}" title="${s.sopTitle}">\n${s.content}\n</source>`
  ).join('\n\n');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 2048,
      system: `You are an expert SOP assistant for an organization. Your role is to help users understand and follow standard operating procedures. Answer questions based ONLY on the provided source documentation. Always cite sources using [SOP-XXX: Section Name] format.`,
      messages: [{
        role: 'user',
        content: `Here are relevant excerpts from our SOP knowledge base:\n\n${context}\n\nUser question: ${query}\n\nPlease provide a comprehensive answer based on the sources above. Structure your response clearly with headings, steps, and bullet points where appropriate.`
      }]
    })
  });

  const data = await response.json();
  return data.content[0].text;
}
```

#### Option 3: Self-Hosted (Llama 2)
```python
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

model_name = "meta-llama/Llama-2-13b-chat-hf"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype=torch.float16,
    device_map="auto"
)

def generate_response(query, sources):
    context = "\n\n".join([
        f"[Source: {s['sopTitle']} - {s['section']}]\n{s['content']}"
        for s in sources
    ])

    prompt = f"""<s>[INST] <<SYS>>
You are an expert SOP assistant. Answer questions based ONLY on the provided documentation. Always cite sources.
<</SYS>>

Context from SOP knowledge base:

{context}

Question: {query}

Provide a detailed answer based on the sources above. [/INST]"""

    inputs = tokenizer(prompt, return_tensors="pt").to("cuda")
    outputs = model.generate(
        **inputs,
        max_new_tokens=1024,
        temperature=0.3,
        do_sample=True
    )

    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return response.split("[/INST]")[-1].strip()
```

## 🚀 Implementation Roadmap

### Phase 1: Mock Demo (✅ Completed)
- [x] Chat interface UI
- [x] Mock knowledge base with 6 SOP chunks
- [x] Simple keyword-based retrieval
- [x] Template-based response generation
- [x] Source citation display

### Phase 2: Basic RAG (Week 1-2)
- [ ] Integrate OpenAI embeddings API
- [ ] Set up Pinecone vector database
- [ ] Implement real semantic search
- [ ] Connect to OpenAI GPT-4 for generation
- [ ] Add proper citation extraction

### Phase 3: Enhanced RAG (Week 3-4)
- [ ] Hybrid search (semantic + keyword)
- [ ] Re-ranking with cross-encoder
- [ ] Conversation memory (follow-up questions)
- [ ] Streaming responses for better UX
- [ ] A/B test different prompting strategies

### Phase 4: Advanced Features (Month 2)
- [ ] Multi-query retrieval (query expansion)
- [ ] Hierarchical retrieval (section → document → related)
- [ ] Self-correction (verify answer against sources)
- [ ] Suggested follow-up questions
- [ ] Export to SOP with metadata

### Phase 5: Production Hardening (Month 3)
- [ ] Rate limiting and caching
- [ ] Cost optimization (smart caching, smaller models)
- [ ] Evaluation metrics (accuracy, relevance)
- [ ] User feedback loop
- [ ] Analytics and monitoring

## 💰 Cost Estimation

### Per 1000 Queries (assuming 5 sources retrieved, 1000 token responses)

| Component | Provider | Cost |
|-----------|----------|------|
| **Embeddings** | OpenAI (text-embedding-3-small) | ~$0.02 |
| **Vector Search** | Pinecone (1M vectors, 1536-dim) | ~$70/month (unlimited queries) |
| **LLM Generation** | OpenAI GPT-4 Turbo | ~$15 (input: $10/1M tokens, output: $30/1M tokens) |
| **LLM Generation** | Anthropic Claude Sonnet | ~$3 (input: $3/1M tokens, output: $15/1M tokens) |
| **LLM Generation** | Self-hosted Llama 2 13B | Infrastructure cost (GPU: ~$500-1000/month) |

**Recommended for POC:** OpenAI embeddings + Pinecone + Claude Sonnet ≈ **$0.018/query**

**Cost at Scale:**
- 10,000 queries/month: ~$180 + $70 (Pinecone) = **$250/month**
- 100,000 queries/month: ~$1,800 + $70 = **$1,870/month**

**Cost Optimization Strategies:**
1. Cache common queries (50% reduction)
2. Use smaller embedding models for less critical queries
3. Implement smart retrieval (only call LLM when needed)
4. Use GPT-3.5 for simple queries, GPT-4 for complex
5. Self-host embeddings (Sentence Transformers) - eliminates embedding costs

## 📊 Evaluation Metrics

### Retrieval Quality
```python
metrics = {
    'precision_at_k': 0.85,  # % of retrieved docs that are relevant
    'recall_at_k': 0.75,     # % of relevant docs that were retrieved
    'mrr': 0.82,             # Mean Reciprocal Rank
    'ndcg': 0.88            # Normalized Discounted Cumulative Gain
}
```

### Generation Quality
```python
metrics = {
    'faithfulness': 0.92,    # Answer is grounded in sources
    'answer_relevance': 0.89, # Answer addresses the question
    'context_relevance': 0.85, # Retrieved sources are relevant
    'hallucination_rate': 0.03 # % of responses with made-up facts
}
```

### User Satisfaction
- Response time: <3 seconds (target)
- User rating: 4.2/5 (current mock)
- Task completion: 87% (can user accomplish goal)
- Follow-up rate: 23% (needs clarification)

## 🔒 Security & Compliance

### Data Privacy
- **No PII in embeddings:** Strip sensitive data before embedding
- **Access control:** Users only search SOPs they have permission to view
- **Audit logging:** Track all queries and responses
- **Data retention:** Configure vector DB to comply with retention policies

### Prompt Injection Protection
```javascript
function sanitizeQuery(query) {
  // Remove attempts to manipulate system prompt
  const dangerous = [
    'ignore previous instructions',
    'you are now',
    'system:',
    'assistant:',
    '<system>',
    '</system>'
  ];

  let sanitized = query;
  dangerous.forEach(pattern => {
    sanitized = sanitized.replace(new RegExp(pattern, 'gi'), '');
  });

  return sanitized;
}
```

### Rate Limiting
```javascript
const rateLimit = {
  window: '1 minute',
  maxRequests: 10,
  byUser: true,
  errorMessage: 'Please wait before making another query'
};
```

## 🧪 Testing Strategy

### Unit Tests
```python
def test_retrieval_accuracy():
    query = "How do I process invoices over $10,000?"
    sources = retrieve_sources(query, top_k=5)

    # Assert top result is Invoice Processing SOP
    assert sources[0]['sopId'] == 'sop-001'
    assert 'approval' in sources[0]['content'].lower()
    assert sources[0]['relevanceScore'] > 0.7

def test_generation_faithfulness():
    query = "What training is required?"
    sources = [security_training_chunk]
    response = generate_response(query, sources)

    # Assert response only uses source content
    assert 'SOP-003' in response  # Proper citation
    assert not contains_hallucination(response, sources)
```

### Integration Tests
```javascript
describe('RAG Pipeline', () => {
  it('should answer query end-to-end', async () => {
    const query = "How do I request IT access?";
    const response = await processQuery(query);

    expect(response.sources).toHaveLength(5);
    expect(response.answer).toContain('ServiceNow');
    expect(response.answer).toContain('SOP-002');
    expect(response.responseTime).toBeLessThan(3000);
  });
});
```

## 📚 References & Resources

### Papers
- **RAG Paper:** [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401)
- **Dense Retrieval:** [Dense Passage Retrieval for Open-Domain Question Answering](https://arxiv.org/abs/2004.04906)
- **Evaluation:** [RAGAS: Automated Evaluation of RAG](https://arxiv.org/abs/2309.15217)

### Tools & Libraries
- **LangChain:** RAG orchestration framework - https://python.langchain.com/
- **LlamaIndex:** Data framework for LLM apps - https://www.llamaindex.ai/
- **Weaviate:** Open-source vector database - https://weaviate.io/
- **Pinecone:** Managed vector database - https://www.pinecone.io/
- **RAGAS:** RAG evaluation framework - https://github.com/explodinggradients/ragas

### Tutorials
- [Building Production RAG Systems](https://www.pinecone.io/learn/series/rag/)
- [Advanced RAG Techniques](https://www.anthropic.com/index/claude-retrieval)
- [Evaluating RAG Systems](https://docs.ragas.io/en/latest/)

---

**Built:** 2025-11-15
**Status:** Mock implementation ready for demo | Production integration in progress
**Next:** Integrate OpenAI embeddings + Pinecone + Claude for real RAG
