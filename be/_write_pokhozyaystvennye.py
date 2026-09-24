# -*- coding: utf-8 -*-
from pathlib import Path

path = Path(__file__).with_name("blog-pokhozyaystvennye-knigi.html")

body = r"""<!doctype html>
<html lang="be-tarask">
  <head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-Z12LCY13ES"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-Z12LCY13ES');
    </script>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Пагаспадarachыя кнігі: дзе шукаць savieckіх prodkaŭ у Беларусі — Heritavia</title>
"""

# Fix - use proper unicode in Python source directly
path.write_text("", encoding="utf-8")
