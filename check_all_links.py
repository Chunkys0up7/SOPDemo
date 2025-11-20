#!/usr/bin/env python3
"""
Comprehensive Link Checker for SOP Demo Application
Scans all HTML files and checks for broken internal links
"""

import os
import re
from pathlib import Path
from collections import defaultdict

# Base directory
BASE_DIR = Path('/home/user/SOPDemo')
PUBLIC_DIR = BASE_DIR / 'public'

# Colors for output
class Colors:
    RED = '\033[91m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    BOLD = '\033[1m'
    END = '\033[0m'

def find_all_links(file_path):
    """Extract all href and src links from an HTML file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find href links
        href_pattern = r'href=["\']([^"\']+)["\']'
        src_pattern = r'src=["\']([^"\']+)["\']'

        hrefs = re.findall(href_pattern, content)
        srcs = re.findall(src_pattern, content)

        return hrefs + srcs
    except Exception as e:
        print(f"{Colors.RED}Error reading {file_path}: {e}{Colors.END}")
        return []

def resolve_link(link, source_file):
    """Resolve a link to an absolute path"""
    # Skip external links, anchors, javascript, mailto, etc.
    if link.startswith(('http://', 'https://', '#', 'javascript:', 'mailto:', 'tel:')):
        return None, 'external'

    # Skip template variables (e.g., ${sop.file_path})
    if link.startswith('${') or '${' in link:
        return None, 'template'

    # Remove query strings and anchors
    link_clean = link.split('?')[0].split('#')[0]

    if not link_clean or link_clean == '/':
        return None, 'root'

    # Handle absolute paths from root
    if link_clean.startswith('/'):
        target = BASE_DIR / link_clean.lstrip('/')
    else:
        # Handle relative paths
        source_dir = source_file.parent
        target = (source_dir / link_clean).resolve()

    return target, 'internal'

def check_file_exists(file_path):
    """Check if a file exists"""
    if file_path.is_file():
        return True
    # Check if it's a directory with index.html
    if file_path.is_dir():
        index_path = file_path / 'index.html'
        return index_path.is_file()
    return False

def main():
    print(f"\n{Colors.BOLD}{'='*80}{Colors.END}")
    print(f"{Colors.BOLD}SOP Demo - Comprehensive Link Checker{Colors.END}")
    print(f"{Colors.BOLD}{'='*80}{Colors.END}\n")

    # Find all HTML files
    html_files = list(PUBLIC_DIR.rglob('*.html'))
    print(f"{Colors.BLUE}Found {len(html_files)} HTML files to check{Colors.END}\n")

    broken_links = defaultdict(list)
    total_links = 0
    total_broken = 0

    # Check each HTML file
    for html_file in sorted(html_files):
        rel_path = html_file.relative_to(BASE_DIR)
        links = find_all_links(html_file)

        if not links:
            continue

        print(f"{Colors.BOLD}Checking: {rel_path}{Colors.END}")

        file_broken = []
        for link in links:
            total_links += 1
            target, link_type = resolve_link(link, html_file)

            if link_type == 'external' or link_type == 'root':
                continue

            if target and not check_file_exists(target):
                file_broken.append((link, target))
                total_broken += 1

        if file_broken:
            broken_links[str(rel_path)] = file_broken
            print(f"  {Colors.RED}✗ {len(file_broken)} broken link(s){Colors.END}")
            for link, target in file_broken:
                try:
                    rel_target = target.relative_to(BASE_DIR)
                except:
                    rel_target = target
                print(f"    • {link} → {Colors.RED}{rel_target}{Colors.END}")
        else:
            print(f"  {Colors.GREEN}✓ All links valid{Colors.END}")
        print()

    # Summary
    print(f"{Colors.BOLD}{'='*80}{Colors.END}")
    print(f"{Colors.BOLD}SUMMARY{Colors.END}")
    print(f"{Colors.BOLD}{'='*80}{Colors.END}\n")

    print(f"Total links checked: {total_links}")
    print(f"Files with broken links: {len(broken_links)}")
    print(f"Total broken links: {total_broken}\n")

    if broken_links:
        print(f"{Colors.RED}{Colors.BOLD}BROKEN LINKS BY FILE:{Colors.END}\n")
        for file_path, links in sorted(broken_links.items()):
            print(f"{Colors.YELLOW}{file_path}{Colors.END}")
            for link, target in links:
                print(f"  → {link}")
            print()

        # Generate report
        report_path = BASE_DIR / 'broken-links-report.txt'
        with open(report_path, 'w') as f:
            f.write("SOP Demo - Broken Links Report\n")
            f.write("="*80 + "\n\n")
            for file_path, links in sorted(broken_links.items()):
                f.write(f"\n{file_path}\n")
                for link, target in links:
                    f.write(f"  → {link} (target: {target})\n")

        print(f"{Colors.BLUE}Report saved to: {report_path}{Colors.END}\n")
        return 1
    else:
        print(f"{Colors.GREEN}{Colors.BOLD}✓ NO BROKEN LINKS FOUND!{Colors.END}\n")
        return 0

if __name__ == '__main__':
    exit(main())
