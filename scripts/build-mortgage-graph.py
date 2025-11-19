#!/usr/bin/env python3
"""
Build SOP Graph from Markdown Files
Extracts metadata from frontmatter to create a queryable knowledge graph
"""

import json
import re
from pathlib import Path
import yaml

def extract_frontmatter(md_content):
    """Extract YAML frontmatter from markdown file"""
    match = re.match(r'^---\s*\n(.*?)\n---\s*\n', md_content, re.DOTALL)
    if match:
        try:
            return yaml.safe_load(match.group(1))
        except yaml.YAMLError:
            return {}
    return {}

def build_graph_from_sops(sop_dir):
    """Build graph structure from SOP markdown files"""
    nodes = {}
    edges = []
    edge_id = 1

    # Parse all SOP files
    sop_path = Path(sop_dir).resolve()
    sop_files = list(sop_path.glob('**/*.md'))
    print(f"Found {len(sop_files)} SOP files")

    for sop_file in sop_files:
        content = sop_file.read_text()
        metadata = extract_frontmatter(content)

        if not metadata or 'id' not in metadata:
            continue

        sop_id = metadata['id']

        # Create node (convert dates to strings)
        nodes[sop_id] = {
            'id': sop_id,
            'type': 'sop',
            'title': metadata.get('title', sop_file.stem),
            'version': str(metadata.get('version', '1.0.0')),
            'status': metadata.get('status', 'draft'),
            'owner': metadata.get('owner', 'Unknown'),
            'department': metadata.get('department', 'Unknown'),
            'category': metadata.get('category', 'General'),
            'criticality': metadata.get('criticality', 'medium'),
            'complianceFrameworks': metadata.get('compliance_frameworks', []),
            'lastReviewed': str(metadata.get('last_reviewed', '')),
            'reviewFrequency': metadata.get('review_frequency', ''),
            'approver': metadata.get('approver', ''),
            'effectiveDate': str(metadata.get('effective_date', '')),
            'tags': metadata.get('tags', []),
            'dependencies': metadata.get('dependencies', []),
            'file_path': str(sop_file.relative_to(sop_path.parent.parent))
        }

        # Create dependency edges
        dependencies = metadata.get('dependencies', [])
        if dependencies:
            for dep in dependencies:
                # Extract SOP ID from dependency (may have comments)
                dep_id = dep.split('#')[0].strip() if isinstance(dep, str) else dep
                edges.append({
                    'id': f'edge-{edge_id:03d}',
                    'source': sop_id,
                    'target': dep_id,
                    'type': 'depends-on',
                    'description': f'{sop_id} depends on {dep_id}',
                    'strength': 'strong'
                })
                edge_id += 1

    # Build compliance requirement nodes
    compliance_reqs = {}
    for node_id, node in nodes.items():
        frameworks = node.get('complianceFrameworks', [])
        for framework in frameworks:
            if framework not in compliance_reqs:
                req_id = f'req-{len(compliance_reqs) + 1:03d}'
                compliance_reqs[framework] = {
                    'id': req_id,
                    'type': 'requirement',
                    'title': framework,
                    'framework': framework,
                    'implementing_sops': []
                }

            # Add edge: SOP implements requirement
            req_id = compliance_reqs[framework]['id']
            compliance_reqs[framework]['implementing_sops'].append(node_id)
            edges.append({
                'id': f'edge-{edge_id:03d}',
                'source': node_id,
                'target': req_id,
                'type': 'implements',
                'description': f'{node_id} implements {framework}',
                'strength': 'normal'
            })
            edge_id += 1

    # Add requirement nodes to graph
    nodes.update({req['id']: req for req in compliance_reqs.values()})

    return {
        'metadata': {
            'version': '3.0.0',
            'lastUpdated': '2025-11-18',
            'description': 'Mortgage SOP knowledge graph built from markdown frontmatter',
            'nodeCount': len(nodes),
            'edgeCount': len(edges)
        },
        'nodes': nodes,
        'edges': edges
    }

if __name__ == '__main__':
    # Build graph from mortgage SOPs
    graph = build_graph_from_sops('sops/mortgage')

    # Write to graph directory
    output_path = Path('graph/mortgage-sop-graph.json')
    output_path.parent.mkdir(exist_ok=True)
    output_path.write_text(json.dumps(graph, indent=2))

    print(f"\n✓ Graph built successfully!")
    print(f"  Nodes: {graph['metadata']['nodeCount']}")
    print(f"  Edges: {graph['metadata']['edgeCount']}")
    print(f"  Output: {output_path}")
