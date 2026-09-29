"""Build the Turkish Greece lead guide from reviewed Nika Estate source notes."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets/guides/greece-property-guide-tr.pdf"
PHOTO = ROOT / "assets/images/greece/webinar-acropolis-evening.jpg"
FONT_DIR = Path("/System/Library/Fonts/Supplemental")
pdfmetrics.registerFont(TTFont("ArialNika", str(FONT_DIR / "Arial.ttf")))
pdfmetrics.registerFont(TTFont("ArialNika-Bold", str(FONT_DIR / "Arial Bold.ttf")))
pdfmetrics.registerFontFamily("ArialNika", normal="ArialNika", bold="ArialNika-Bold")

W, H = A4
NAVY = colors.HexColor("#142A43")
GOLD = colors.HexColor("#B58D51")
INK = colors.HexColor("#26313F")
MUTED = colors.HexColor("#657282")
PAPER = colors.HexColor("#F8F6F1")
LINE = colors.HexColor("#DDE1E4")
WHITE = colors.white


def para(c, text, x, top, width, size=10.5, leading=None, color=INK, bold=False):
    style = ParagraphStyle(
        "p", fontName="ArialNika-Bold" if bold else "ArialNika",
        fontSize=size, leading=leading or size * 1.42, textColor=color,
        alignment=TA_LEFT, spaceAfter=0, allowWidows=0, allowOrphans=0,
    )
    p = Paragraph(text, style)
    _, height = p.wrap(width, H)
    p.drawOn(c, x, top - height)
    return top - height


def label(c, text, x, y, color=GOLD, size=8.2):
    c.setFont("ArialNika-Bold", size)
    c.setFillColor(color)
    c.drawString(x, y, text.upper())


def base(c, number, section):
    c.setFillColor(PAPER)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    label(c, "NIKA ESTATE", 42, H - 42, NAVY, 10)
    c.setStrokeColor(LINE)
    c.line(42, H - 55, W - 42, H - 55)
    c.line(42, 42, W - 42, 42)
    c.setFont("ArialNika", 8)
    c.setFillColor(MUTED)
    c.drawString(42, 27, "Yunanistan gayrimenkul ve oturum rehberi · Eylül 2026")
    c.drawRightString(W - 42, 27, f"{section}  /  {number}")


def heading(c, overline, title, subtitle=""):
    label(c, overline, 42, H - 83)
    y = para(c, title, 42, H - 98, W - 84, 24, 30, NAVY, True)
    if subtitle:
        y = para(c, subtitle, 42, y - 8, W - 84, 10.2, 15, MUTED)
    return y - 20


def card(c, x, top, width, height, title, body, accent=False):
    c.setFillColor(WHITE if not accent else NAVY)
    c.roundRect(x, top - height, width, height, 10, fill=1, stroke=0)
    color = WHITE if accent else NAVY
    y = para(c, title, x + 15, top - 16, width - 30, 12, 16, color, True)
    return para(c, body, x + 15, y - 8, width - 30, 9.2, 13.5, WHITE if accent else INK)


def bullet(c, text, x, top, width, size=9.6):
    c.setFillColor(GOLD)
    c.circle(x + 3, top - 7, 2.3, fill=1, stroke=0)
    return para(c, text, x + 13, top, width - 13, size, 14) - 9


def build():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
    c.setTitle("Yunanistan Gayrimenkul ve Golden Visa Rehberi | Nika Estate")
    c.setAuthor("Nika Estate")
    c.setSubject("Türkçe Yunanistan gayrimenkul yatırımı ve Golden Visa başlangıç rehberi")

    # 1 / cover
    c.setFillColor(NAVY)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.saveState()
    cover_clip = c.beginPath()
    cover_clip.rect(0, 0, 279, H)
    c.clipPath(cover_clip, stroke=0)
    c.drawImage(str(PHOTO), -142, 0, width=H * 1066 / 1600, height=H, mask="auto")
    c.restoreState()
    c.setFillColor(colors.Color(.08, .16, .25, alpha=.18))
    c.rect(0, 0, 279, H, fill=1, stroke=0)
    x = 309
    label(c, "NIKA ESTATE", x, 798, WHITE, 12)
    c.setStrokeColor(GOLD)
    c.setLineWidth(2)
    c.line(x, 772, 379, 772)
    y = para(c, "Yunanistan’da<br/>gayrimenkul ve<br/>oturum rehberi", x, 733, 245, 29, 36, WHITE, True)
    y = para(c, "Golden Visa koşulları, yatırım bütçesi ve örnek projeler", x, y - 22, 240, 12.8, 19, colors.HexColor("#E6E9ED"))
    c.setFillColor(GOLD)
    c.roundRect(x, y - 79, 222, 52, 8, fill=1, stroke=0)
    para(c, "Karar vermeden önce<br/>bilmeniz gerekenler", x + 15, y - 38, 194, 12, 16, WHITE, True)
    para(c, "Atina · Pire · Egina", x, 138, 235, 11.5, 16, WHITE)
    para(c, "Eylül 2026 · Türkçe", x, 102, 235, 9, 13, colors.HexColor("#BFCBD5"))
    c.showPage()

    # 2 / residence rules
    base(c, "02", "OTURUM")
    y = heading(c, "01 / OTURUM YOLU", "Golden Visa: hangi bütçe hangi yola uygun?", "Yunanistan yatırımcı oturma izni, AB vatandaşlığı değildir. Şartlar yatırımın türüne ve konumuna bağlıdır.")
    gap = 9
    cw = (W - 84 - 2 * gap) / 3
    card(c, 42, y, cw, 165, "€800.000", "Atina ve genel olarak Attika, Selanik, Mikonos, Santorini ile nüfusu 3.100’ü aşan adalarda standart gayrimenkul alımı.")
    card(c, 42 + cw + gap, y, cw, 165, "€400.000", "Yukarıdaki bölgeler dışında kalan yerlerde standart gayrimenkul alımı.")
    card(c, 42 + 2 * (cw + gap), y, cw, 165, "€250.000", "Yalnızca uygun ticari kullanımın konuta dönüştürülmesi veya koruma altındaki yapının restorasyonu gibi özel yollar.", True)
    y -= 185
    y = para(c, "Standart yolda genellikle tek bir gayrimenkul ve en az 120 m² koşulu vardır. <b>€250.000’luk her daire Golden Visa için uygun değildir.</b> Özellikle küçük servisli dairelerde dönüşümün hukuki ve teknik belgelerini bağımsız avukata kontrol ettirin.", 42, y, W - 84, 10, 15)
    y -= 21
    label(c, "Oturum izni ne sağlar?", 42, y)
    y -= 18
    for item in [
        "Şartlar sağlanırsa beş yıllık yatırımcı oturma izni; yatırım korunduğu sürece yenileme imkânı.",
        "Yunanistan’da oturma hakkı. Diğer Schengen ülkelerindeki kısa ziyaretlerde ayrı kurallar geçerlidir.",
        "Uygun aile üyeleri için başvuru olanağı; kapsam ve belgeler kişisel duruma göre teyit edilir.",
        "İzin, Yunanistan’da ücretli çalışma veya başka AB ülkelerinde yerleşme hakkı vermez.",
    ]:
        y = bullet(c, item, 42, y, W - 84)
    y -= 9
    card(c, 42, y, W - 84, 79, "Önemli kiralama kuralı", "Golden Visa kapsamında alınan gayrimenkullerde kısa süreli turistik kiralama yasaktır. Uzun dönem kiralama olasılığını ve net getiriyi proje bazında hesaplayın.", True)
    c.showPage()

    # 3 / project examples
    base(c, "03", "PROJELER")
    y = heading(c, "02 / PROJE ÖRNEKLERİ", "Hangi gayrimenkullere bakılabilir?", "Bunlar müşteri materyallerindeki örneklerdir; fiyat, stok ve vize uygunluğu için güncel yazılı teyit gerekir.")
    cw = (W - 94) / 2
    project_cards = [
        ("Lan Ting 18 · Atina", "Dafni’de metro yakınında planlanan, yaklaşık 30–47 m² servisli daireler. Müşteri materyalinde başlangıç fiyatı €250.000 olarak geçiyor. Golden Visa yolunun ayrıca doğrulanması gerekir."),
        ("Piraeus Serenity · Pire", "Yaklaşık 20–59 m² servisli daireler; çatı havuzu ve ortak alanlar sunuluyor. Kaynaklarda fiyatlar farklı. Güncel teklif, işletme sözleşmesi ve vize şartları teyit edilmelidir."),
        ("Afea Residence · Egina", "Ada yaşamına dönük yaklaşık 28–66 m² daireler. Müşteri materyalinde €250.000’dan başlayan fiyatlar yer alıyor. Ulaşım, sezonluk talep ve vize şartlarını ayrı ayrı inceleyin."),
        ("Etolikou Seafront · Pire", "Liman bölgesinde yaklaşık 25–72 m² daireler ve ortak kullanım alanları. Farklı kaynaklarda fiyatlar uyuşmuyor; canlı stok ve hukuki kullanım türü doğrulanmalıdır."),
    ]
    for i, (title, body) in enumerate(project_cards):
        col, row = i % 2, i // 2
        card(c, 42 + col * (cw + 10), y - row * 178, cw, 166, title, body)
    y -= 382
    label(c, "Konuma göre neyi karşılaştırmalı?", 42, y)
    y -= 18
    for item in [
        "Atina: metro, istihdam, üniversite ve yıl boyu kiracı talebi.",
        "Pire: ulaşım, liman ve sokak bazında kira emsalleri.",
        "Adalar: feribot erişimi, mevsimsellik ve yıllık boş kalma süresi.",
    ]:
        y = bullet(c, item, 42, y, W - 84)
    y -= 7
    para(c, "Bir projenin broşüründe “Golden Visa” yazması yeterli değildir. İlan edilen fiyat ile hukuki yatırım eşiği aynı şey olmayabilir.", 42, y, W - 84, 9.5, 14, MUTED)
    c.showPage()

    # 4 / actions, costs, sources
    base(c, "04", "SONRAKİ ADIM")
    y = heading(c, "03 / KARAR PLANI", "Başvurmadan önce 7 kontrol", "Konut, oturum ve kira getirisi tek dosyada değerlendirilmelidir.")
    checks = [
        "Hedefinizi belirleyin: oturum, kişisel kullanım, kira geliri veya bunların birleşimi.",
        "Gayrimenkulün bulunduğu bölgeye ve kullanım türüne göre doğru yasal eşiği teyit edin.",
        "Bağımsız avukata tapu, takyidat, ruhsat, dönüşüm ve vize uygunluğunu yazılı kontrol ettirin.",
        "Mühendise teknik durumu; yönetim firmasına hizmet sözleşmesini inceletin.",
        "Satın alma bedeline vergi, noter, hukuk, kayıt, tadilat ve mobilya giderlerini ekleyin.",
        "Kira hesabında boş dönem, bakım, yönetim, sigorta ve vergileri düşerek net gelir bulun.",
        "Depozito göndermeden önce güncel stok, ödeme takvimi ve iade şartlarını belgeleyin.",
    ]
    for index, item in enumerate(checks, 1):
        c.setFillColor(GOLD)
        c.circle(53, y - 9, 10, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("ArialNika-Bold", 8)
        c.drawCentredString(53, y - 12, str(index))
        y = para(c, item, 71, y, W - 113, 9.3, 13.2) - 11
    y -= 4
    card(c, 42, y, W - 84, 76, "Nika Estate ile sonraki adım", "Bütçenize göre güncel projeleri karşılaştırır, avukatla vize uygunluğunu kontrol eder, satın alma ve uzun dönem kiralama planını birlikte kurarız.", True)
    y -= 95
    label(c, "Kaynaklar ve kapsam", 42, y)
    y -= 13
    sources = [
        "Yunanistan Ulusal İdari İşlemler Sicili: dönüşüm ve koruma altındaki yapı için €250.000 koşulları (en.mitos.gov.gr).",
        "Enterprise Greece: bölgesel €800.000/€400.000 eşikleri, 120 m² ve kısa dönem kiralama yasağı (newsletters.enterprisegreece.gov.gr).",
        "Nika Estate müşteri materyalleri: ‘Тексты для Nika.docx’, dört proje tanıtımı ve İngilizce Greece Property Investment Guide (Eylül 2026).",
    ]
    for item in sources:
        y = bullet(c, item, 42, y, W - 84, 7.6)
    para(c, "Bu rehber genel bilgilendirmedir; hukuki, vergi veya garantili getiri teklifi değildir. Şartlar değişebilir. Her gayrimenkul için güncel hukuki görüş ve yazılı finansal hesap isteyin.", 42, y - 4, W - 84, 8.1, 11.5, MUTED)
    c.showPage()
    c.save()
    print(OUT)


if __name__ == "__main__":
    build()
