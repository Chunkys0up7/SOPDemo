#!/usr/bin/env python3
"""
UI Overhaul Script - Unified Navigation and Styling
Applies consistent header, navigation, and color scheme to all public HTML files
"""

import os
import re
from pathlib import Path

PUBLIC_DIR = Path('public')
HTML_FILES = [
    'index.html',
    'workspace.html',
    'sops.html',
    'graph.html',
    'search.html',
    'contribute.html',
    'help.html',
    'docs.html',
    'components-library.html',
    'interactive-graph.html',
    'impact-viewer.html'
]

def remove_duplicate_header_css(content):
    """Remove duplicate header/nav CSS that should be in common.css"""
    # Pattern to match header styles block
    pattern = r'<style>\s*\*\s*\{[\s\S]*?/\*\s*Header\s*\*/[\s\S]*?/\*\s*Page\s*(?:Title|Header)\s*\*/'
    
    # More targeted: remove just the header section
    header_css_patterns = [
        r'/\*\s*Header\s*\*/[\s\S]*?\.help-link:hover\s*\{[\s\S]*?\}',
        r'/\*\s*Tooltip\s*\*/[\s\S]*?\.tooltip:hover \.tooltip-content\s*\{[\s\S]*?\}',
    ]
    
    for pattern in header_css_patterns:
        content = re.sub(pattern, '', content)
    
    return content

def add_nav_script(content):
    """Add navigation.js script before </head>"""
    if '<script src="/public/assets/js/navigation.js"></script>' not in content:
        # Add script just before </head>
        content = content.replace(
            '</head>',
            '    <script src="/public/assets/js/navigation.js"></script>\n</head>'
        )
    return content

def remove_static_header_html(content):
    """Remove static <header> HTML element that's duplicated"""
    # Pattern to match header element
    pattern = r'<header class="header">[\s\S]*?</header>\s*'
    content = re.sub(pattern, '', content)
    return content

def fix_logo_src(content):
    """Fix logo image sources to use correct paths"""
    # Fix relative paths in headers to absolute /public paths
    content = re.sub(
        r'src=["\']assets/branding/',
        'src="/public/assets/branding/',
        content
    )
    return content

def fix_navigation_links(content):
    """Ensure all navigation links point to correct pages"""
    # Map common misspellings and missing pages
    link_replacements = {
        'interactive-graph.html': '/public/graph.html',  # Use unified graph.html
        'impact-viewer.html': '/public/impact-viewer.html',
        'components-library.html': '/public/components-library.html',
        'home': '/public/index.html',
    }
    
    for old, new in link_replacements.items():
        content = re.sub(f'href=["\']({old}|{new})["\']', f'href="{new}"', content)
    
    return content

def process_html_file(filepath):
    """Process a single HTML file"""
    print(f"Processing {filepath.name}...")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Apply transformations
    content = add_nav_script(content)
    content = remove_duplicate_header_css(content)
    content = remove_static_header_html(content)
    content = fix_logo_src(content)
    content = fix_navigation_links(content)
    
    # Write back if changed
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ Updated {filepath.name}")
    else:
        print(f"  - No changes needed for {filepath.name}")

def main():
    print("=" * 60)
    print(" UI Overhaul - Unified Navigation and Styling")
    print("=" * 60)
    
    for html_file in HTML_FILES:
        filepath = PUBLIC_DIR / html_file
        if filepath.exists():
            process_html_file(filepath)
        else:
            print(f"  ⚠ Skipped {html_file} (not found)")
    
    print("\n" + "=" * 60)
    print("✓ UI update complete")
    print("=" * 60)

if __name__ == '__main__':
    main()
