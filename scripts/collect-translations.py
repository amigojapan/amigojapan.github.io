#!/usr/bin/env python3
"""Collect prose (including generated homepage articles), never executable examples.
Requires BeautifulSoup 4. Run from the repository root after updating the homepage
fragments with scripts/home-fragments.cjs.
"""
import json, re, warnings
from pathlib import Path
from bs4 import BeautifulSoup, Comment, Doctype, MarkupResemblesLocatorWarning
warnings.filterwarnings('ignore', category=MarkupResemblesLocatorWarning)
ROOT = Path(__file__).resolve().parent.parent
SKIP = {'script', 'style', 'code', 'noscript'}
def normalize(s):
    return re.sub(r'\s+', ' ', s).strip()
def extract(html):
    soup = BeautifulSoup(html, 'html.parser')
    result = set()
    for node in soup.find_all(string=True):
        if isinstance(node, (Comment, Doctype)): continue
        if any(p.name in SKIP or 'demo-highlight' in p.get('class', []) or p.has_attr('data-i18n-years') or p.get('translate') == 'no' for p in node.parents): continue
        s = normalize(str(node))
        if re.search(r'[a-zA-Z\u3040-\u9fff]', s) and not re.fullmatch(r'https?://\S+', s): result.add(s)
    for tag in soup.find_all(True):
        for attr in ['alt','title','aria-label','placeholder']:
            if tag.get(attr): result.add(normalize(tag[attr]))
    return result
pages = {}
for path in sorted(ROOT.rglob('*.html')):
    if any(part in path.relative_to(ROOT).parts for part in ['.git','scripts','assets']) or path.name in ['AIalbum.html','google23aced461d7884c3.html']: continue
    html = path.read_text(encoding='utf-8-sig')
    strings = extract(html)
    if path.name == 'index.html' and path.parent == ROOT:
        for fragment in json.loads(Path('/tmp/home-fragments.json').read_text()).values(): strings |= extract(fragment)
    if path.name in ['blood_pressure_analyzer.html','ketsuatsu_shindan.html']:
        for literal in re.findall(r'"([^"\n]*)"', BeautifulSoup(path.read_text(), 'html.parser').find('script', src=False).string):
            strings |= extract(literal)
    pages[path.relative_to(ROOT).as_posix()] = sorted(strings)
Path('/tmp/translation-manifest.json').write_text(json.dumps(pages,ensure_ascii=False,indent=2))
print({p:len(s) for p,s in pages.items()})
print('Unique strings:', len(set(s for ss in pages.values() for s in ss)))
