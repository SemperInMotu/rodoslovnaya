# -*- coding: utf-8 -*-
"""Assemble be-tarask blog-pokhozyaystvennye-knigi.html from head stub + article body."""
from pathlib import Path

DIR = Path(__file__).resolve().parent
HEAD_END = """          <p>
            Калі вы шукаеце сваякоў, якія жылі ў беларускай вёсцы ў савецкі перыяд, не абмяжоўвайцеся
            мэтрычнымі кнігамі і ЗАГС.
          </p>
"""

# Article continuation (Taraškievica), faithful RU translation
BODY = r"""
          <p>
            Ёсьць яшчэ адна крыніца, якая можа расказаць пра сям’ю досыць шмат —
            <strong>пагасpадarachыe knigi</strong>.
          </p>
"""

# Fix BODY - use real Cyrillic word
PK = "\u043f\u0430\u0433\u0430\u0441\u043f\u0430\u0434\u0430\u0440\u0447\u044b\u044f \u043a\u043d\u0456\u0433\u0456"

BODY = f"""
          <p>
            Ёсьць яшчэ адна крыніца, якая можа расказаць пра сям’ю досыць шмат —
            <strong>{PK}</strong>.
          </p>
          <p>
            Для генэalogа яны асабліва ціkavyja tamu, што dazvoliajuć ubačyć nie asobnaga čalavieka, a
            <strong>цэлаe гасpadarstva</strong>: хто жыў у двары, хто быŭ čalцam siam’і, kali mianaŭsia je skład
            i kudy mahli zniknuć svaiaкоў.
          </p>
"""

print("PK", PK)
print(len(BODY))
