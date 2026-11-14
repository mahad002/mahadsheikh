#!/usr/bin/env python3
"""Stamp every local CSS/JS link in site/*.html with ?v=<hash of that file's content>.

CSS and JS are cached by browsers for a year (see vercel.json), so a changed file must get a new URL.
Run this before every push:  python3 design/stamp.py
"""
import hashlib, pathlib, re

site = pathlib.Path(__file__).resolve().parent.parent / "site"
changed = 0
for page in site.glob("*.html"):
    html = page.read_text()

    def stamp(m):
        f = site / m.group(2)
        if not f.exists():
            return m.group(0)
        h = hashlib.md5(f.read_bytes()).hexdigest()[:10]
        return f'{m.group(1)}="{m.group(2)}?v={h}"'

    new = re.sub(r'(href|src)="([\w./-]+\.(?:css|js))(?:\?v=[\w]+)?"', stamp, html)
    if new != html:
        page.write_text(new)
        changed += 1
print(f"stamped {changed} page(s)")
