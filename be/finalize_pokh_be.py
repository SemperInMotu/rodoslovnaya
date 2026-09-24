# -*- coding: utf-8 -*-
from pathlib import Path

RU = Path(r"D:\Obsidian\MySecondBrain\01_Projects\Heritavia\site\blog-pokhozyaystvennye-knigi.html").read_text(
    encoding="utf-8"
)
OUT = Path(r"D:\Obsidian\MySecondBrain\01_Projects\Heritavia\site\be\blog-pokhozyaystvennye-knigi.html")

PAIRS = [
    ('<html lang="ru">', '<html lang="be-tarask">'),
    (
        '<link rel="canonical" href="https://heritavia.vitalykhoruzhko.com/blog-pokhozyaystvennye-knigi.html" />',
        '<link rel="canonical" href="https://heritavia.vitalykhoruzhko.com/be/blog-pokhozyaystvennye-knigi.html" />',
    ),
    (
        '<meta property="og:url" content="https://heritavia.vitalykhoruzhko.com/blog-pokhozyaystvennye-knigi.html" />',
        '<meta property="og:url" content="https://heritavia.vitalykhoruzhko.com/be/blog-pokhozyaystvennye-knigi.html" />',
    ),
    ("Heritavia · Заметки", "Heritavia · Нататкі"),
    ("Виталий Хоружко", "Віталь Харужка"),
    ("16 сентября 2026", "16 верасьня 2026"),
    ('href="/start.html"', 'href="/be/start.html"'),
    ('href="/blog.html"', 'href="/be/blog.html"'),
    ('href="/blog-metrics-missing.html"', 'href="/be/blog-metrics-missing.html"'),
    ('href="/forma-1-pasport-sssr-genealogy.html"', 'href="/be/forma-1-pasport-sssr-genealogy.html"'),
    ('href="/research.html"', 'href="/be/research.html"'),
    ("Читайте также", "Чытайце таксама"),
    ("Все заметки", "Усе запісы"),
    ("Заказать стратегию", "Замовіць стратэгію"),
    ("Обсудить мою семейную историю", "Абмеркаваць маю сямейную гісторыю"),
    (
        "Что делать, если метрические книги не сохранились",
        "Што рабіць, калі мэтрыкі па прыходзе не захаваліся",
    ),
    (
        "Форма №1: что можно узнать из советского паспорта",
        "Форма №1: што можна даведацца з савецкага пашпарта",
    ),
    (
        "Как искать предков в Беларуси — форматы исследования",
        "Як шукаць продкаў у Беларусі — фарматы дасьледаваньня",
    ),
]

TITLE_RU = "Похозяйственные книги: где искать советских предков в Беларуси — Heritavia"
TITLE_BE = (
    "\u041f\u0430\u0433\u0430\u0441\u043f\u0430\u0434\u0430\u0440\u0447\u044b\u044f \u043a\u043d\u0456\u0433\u0456: "
    "\u0434\u0437\u0435 \u0448\u0443\u043a\u0430\u0446\u044c \u0441\u0430\u0432\u0435\u0446\u043a\u0456\u0445 \u043f\u0440\u043e\u0434\u043a\u0430\u045e "
    "\u0443 \u0411\u0435\u043b\u0430\u0440\u0443\u0441\u0456 \u2014 Heritavia"
)

DESC_RU = (
    "Похозяйственные книги БССР: что в них есть, с какого года искать, "
    "почему ответ «в сельсовете нет» ещё ничего не значит и куда реально обращаться."
)
DESC_BE = (
    "\u041f\u0430\u0433\u0430\u0441\u043f\u0430\u0434\u0430\u0440\u0447\u044b\u044f \u043a\u043d\u0456\u0433\u0456 \u0411\u0421\u0421\u0420: \u0448\u0442\u043e \u045e \u0456\u0445 \u0451\u0441\u044c\u0446, "
    "\u0437 \u044f\u043a\u043e\u0433\u0430 \u0433\u043e\u0434\u0430 \u0448\u0443\u043a\u0430\u0446\u044c, \u0447\u0430\u043c\u0443 \u0430\u0434\u043a\u0430\u0437 \u00ab\u0443 \u0441\u0435\u043b\u044c\u0441\u0430\u0432\u0435\u0446\u0435 \u043d\u044f\u043c\u0430\u00bb "
    "\u044f\u0448\u0447\u044d \u043d\u0456\u0447\u043e\u0433\u0430 \u043d\u0435 \u0437\u043d\u0430\u0447\u044b\u0446\u044c \u0456 \u043a\u0443\u0434\u044b \u0441\u0430\u043f\u0440\u0430\u045e\u0434\u044b \u0437\u0432\u044f\u0440\u0442\u0430\u0446\u0446\u0430."
)

DESC_SHORT_RU = (
    "Похозяйственные книги БССР: что в них есть, с какого года искать, "
    "почему ответ «в сельсовете нет» ещё ничего не значит."
)
DESC_SHORT_BE = (
    "\u041f\u0430\u0433\u0430\u0441\u043f\u0430\u0434\u0430\u0440\u0447\u044b\u044f \u043a\u043d\u0456\u0433\u0456 \u0411\u0421\u0421\u0420: \u0448\u0442\u043e \u045e \u0456\u0445 \u0451\u0441\u044c\u0446, "
    "\u0437 \u044f\u043a\u043e\u0433\u0430 \u0433\u043e\u0434\u0430 \u0448\u0443\u043a\u0430\u0446\u044c, \u0447\u0430\u043c\u0443 \u0430\u0434\u043a\u0430\u0437 \u00ab\u0443 \u0441\u0435\u043b\u044c\u0441\u0430\u0432\u0435\u0446\u0435 \u043d\u044f\u043c\u0430\u00bb "
    "\u044f\u0448\u0447\u044d \u043d\u0456\u0447\u043e\u0433\u0430 \u043d\u0435 \u0437\u043d\u0430\u0447\u044b\u0446\u044c."
)

H1_RU = "Похозяйственные книги: где искать советских предков в Беларуси"
H1_BE = (
    "\u041f\u0430\u0433\u0430\u0441\u043f\u0430\u0434\u0430\u0440\u0447\u044b\u044f \u043a\u043d\u0456\u0433\u0456: "
    "\u0434\u0437\u0435 \u0448\u0443\u043a\u0430\u0446\u044c \u0441\u0430\u0432\u0435\u0446\u043a\u0456\u0445 \u043f\u0440\u043e\u0434\u043a\u0430\u045e \u0443 \u0411\u0435\u043b\u0430\u0440\u0443\u0441\u0456"
)

text = RU
for old, new in PAIRS:
    text = text.replace(old, new)
text = text.replace(TITLE_RU, TITLE_BE)
text = text.replace(DESC_RU, DESC_BE)
text = text.replace(DESC_SHORT_RU, DESC_SHORT_BE)
text = text.replace(f"<h1>{H1_RU}</h1>", f"<h1>{H1_BE}</h1>")

trans_path = Path(__file__).with_name("pokh_be_body_translations.txt")
if trans_path.exists():
    for line in trans_path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "|||" not in line:
            continue
        old, new = line.split("|||", 1)
        text = text.replace(old, new)

OUT.write_text(text, encoding="utf-8")
print("Wrote", OUT)
