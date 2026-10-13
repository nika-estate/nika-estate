"""Build the English Saudi investment selection. All money is USD-first.
Requires reportlab and Pillow. Run from any folder with --output /path/file.pdf.
Commercial facts checked 13 October 2026. Scenario inputs are not market forecasts.
"""
from pathlib import Path
import argparse
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, Color, white
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from PIL import Image, ImageOps
from io import BytesIO

ROOT=Path(__file__).resolve().parents[1]
ASSETS=ROOT/'assets/guides/saudi'
W,H=595.276,841.89
M=43
CW=W-2*M
NAVY=HexColor('#182c43');GOLD=HexColor('#a37e48');CREAM=HexColor('#f4f0e9')
INK=HexColor('#232c35');MUTED=HexColor('#65707a');LINE=HexColor('#dcd7ce')
for name,file in [('Body','inter-regular.ttf'),('Bold','inter-semibold.ttf'),('Display','cormorant-semibold.ttf')]:
    pdfmetrics.registerFont(TTFont(name,str(ROOT/'assets/fonts'/file)))
pdfmetrics.registerFontFamily('Body',normal='Body',bold='Bold')

parser=argparse.ArgumentParser();parser.add_argument('--output',required=True);args=parser.parse_args()
out=Path(args.output);out.parent.mkdir(parents=True,exist_ok=True)
c=canvas.Canvas(str(out),pagesize=(W,H),pageCompression=1)
c.setTitle('Selected Saudi Property Investments | Nika Estate | October 2026')
c.setAuthor('Nika Estate');c.setSubject('Riyadh investment selection, USD pricing, payment options and transparent return scenarios')
page=0

def rect(x,t,w,h,color):
    c.setFillColor(color);c.rect(x,H-t-h,w,h,fill=1,stroke=0)

def para(text,x,t,width=CW,size=11.3,color=INK,font='Body',leading=None):
    style=ParagraphStyle('p',fontName=font,fontSize=size,leading=leading or size*1.43,textColor=color)
    p=Paragraph(text,style);_,h=p.wrap(width,H)
    assert t>=0 and t+h<790,(page,text[:70],t,h)
    p.drawOn(c,x,H-t-h);return t+h

def label(text,x,t,color=GOLD,size=9):
    c.setFillColor(color);c.setFont('Bold',size);c.drawString(x,H-t-size,text)

def title(text,t=118,size=34,width=CW,color=NAVY,x=M):
    return para(text,x,t,width,size,color,'Display',size*1.06)

def photo(name,x,t,w,h):
    im=Image.open(ASSETS/name).convert('RGB')
    im=ImageOps.fit(im,(int(w*3),int(h*3)),centering=(.5,.5))
    b=BytesIO();im.save(b,format='JPEG',quality=90);b.seek(0)
    c.drawImage(ImageReader(b),x,H-t-h,w,h)

def header(section,dark=False):
    global page
    page+=1
    c.setFillColor(white);c.rect(0,0,W,H,fill=1,stroke=0)
    c.drawImage(str(ROOT/'assets/logo-nika-estate.png'),M,H-64,width=137,height=36.4,mask='auto')
    label('SAUDI ARABIA / OCTOBER 2026',W-M-187,42,MUTED,8)
    c.setStrokeColor(LINE);c.line(M,H-82,W-M,H-82)
    label(section.upper(),M,98)

def footer():
    c.setStrokeColor(LINE);c.line(M,40,W-M,40)
    label('NIKA ESTATE / INVESTMENT SELECTION',M,H-28,MUTED,7.3)
    label(f'{page:02d} / 10',W-M-40,H-28,MUTED,7.3)
    c.showPage()

def card(x,t,w,h,heading,body,number=None):
    rect(x,t,w,h,CREAM)
    if number:label(number,x+17,t+14)
    y=t+34 if number else t+17
    y=para(heading,x+17,y,w-34,17,NAVY,'Display',19)
    para(body,x+17,y+10,w-34,10.8)

def note(text,t,heading=None):
    rect(M,t,CW,4,GOLD)
    y=t+15
    if heading:y=para(heading,M,y,CW,17,NAVY,'Display',20)+8
    return para(text,M,y,CW,10.4,MUTED)

def table(rows, widths, t, font=10.1, heights=None):
    y=t
    for ri,row in enumerate(rows):
        cellps=[];height=0
        for j,txt in enumerate(row):
            p=Paragraph(str(txt),ParagraphStyle('cell',fontName='Bold' if ri==0 else 'Body',fontSize=font,leading=font*1.34,textColor=white if ri==0 else INK))
            _,hh=p.wrap(widths[j]-20,H);height=max(height,hh+22);cellps.append((p,hh))
        if heights:height=max(height,heights[ri])
        assert y+height<775,(page,'table overflow',y,height)
        rect(M,y,CW,height,NAVY if ri==0 else (CREAM if ri%2 else HexColor('#faf9f6')))
        x=M
        for j,(p,hh) in enumerate(cellps):
            p.drawOn(c,x+10,H-y-11-hh);x+=widths[j]
        y+=height
    return y

CTA='https://nika-estate.github.io/nika-estate/saudi-quiz/'
REGA='https://rega.gov.sa/en/media-center/news-announcements/rega-non-saudi-property-ownership-system-enters-into-force-as-of-today/'
ZOOD='https://www.zood.sa/en/projects/elevee'
UNIT='https://www.zood.sa/en/projects/elevee/elevee-1-bedroom-units'
OSUS='https://osus.com.sa/en/projects/osus-eye/'
KF='https://www.knightfrank.com.sa/en/newsroom/article/2026/9/ksa-residential-and-office-sector-q2-2026'
EJAR='https://www.ejar.sa/ar/node/431965'
PR='https://pr.gov.sa/product-details-real-estate-residency'
SAMA='https://sama.gov.sa/en-US/MediaCenter/News/Pages/news-557.aspx'
ZATCA='https://zatca.gov.sa/en/HelpCenter/guidelines/Documents/Detailed-Guideline-for-RETT-In-accordance-with-provision-of-RETT-Law-and-its-Implementing-Regulations.pdf'

# 1: an actual project render; the reader sees the investment offer first.
header('Selected projects / International buyers')
photo('elevee-green.jpg',0,122,W,290)
rect(0,412,W,354,NAVY)
label('RIYADH / THREE PROJECTS TO COMPARE',M,439,HexColor('#d8b982'))
y=title('Selected Saudi<br/>Property Investments',t=464,size=43,color=white)
y=para('Explore an early opportunity.<br/>Choose an entry strategy that fits your capital.',M,y+15,CW,15,HexColor('#e7e4dc'))
label('PRICES IN USD  /  PAYMENT OPTIONS  /  RETURN SCENARIOS',M,666,HexColor('#d8b982'),8.5)
para('A focused Riyadh selection, with the purchase figures that matter and a clear route to a personalised shortlist.',M,690,CW,11.5,white)
para('Cover: Élevée developer render. Images show proposed design, not proof of completion.',M,777,CW,7.5,MUTED)
footer()

# 2: early access, with a selective rather than universal market thesis.
header('01 / The investment opportunity')
y=title('A new access point.<br/>A selective investment approach.')
y=para('Saudi Arabia has broadened access for international property buyers. The opportunity is to compare suitable projects while this access is developing - and choose the right unit, payment schedule and holding period.',M,y+14,CW,13.1,MUTED)
t=y+25;gap=14;w=(CW-gap)/2
card(M,t,w,155,'Earlier international access','The updated non-Saudi ownership framework took effect on 22 January 2026. Confirm the permitted location and ownership route for the exact property.','01')
card(M+w+gap,t,w,155,'USD-referenced capital','The riyal is pegged at SAR 3.75 per USD. Dollar comparisons make entry prices clearer; bank conversion charges and EUR/USD movements still matter.','02')
card(M,t+169,w,155,'Different entry strategies','Compare a staged off-plan purchase with a ready-home strategy. The timing of payments and the start of rental income can be very different.','03')
card(M+w+gap,t+169,w,155,'Demand at unit level','Look for practical access, a usable layout and a credible tenant profile. Shared amenities can help the letting proposition, but their costs must be counted.','04')
note('In Q2 2026, Riyadh apartment values rose 3.1% year on year while national residential transaction volumes fell 12%. Location, product and affordability matter more than a blanket growth story. [1, 2, 3]',t+347,'Why the selection matters')
footer()

# 3: comparison before the individual cards.
header('02 / Compare the selection')
y=title('Three projects.<br/>Three buying conversations.')
y=para('Our editorial shortlist compares different residential formats in Riyadh. Suitability for a foreign buyer, current unit availability and the purchase contract are checked individually.',M,y+14,CW,12.2,MUTED)
rows=[['Project / location','USD entry price','Payment / timing','Investment fit'],
['Élevée / ZOOD<br/>Al Nakheel','From about<br/><b>$279,000</b><br/>SAR 1,046,000','Published starting down payment: 20%.<br/>Handover: Nov 2029.','A longer holding period; apartment living in an integrated destination.'],
['OSUS Eye<br/>Al Nada','From about<br/><b>$373,000</b><br/>SAR 1,400,000','Current unit schedule and handover to be quoted.','Compare ordinary residences with the separate branded-residence product.'],
['Tower Project<br/>Al Majdiah','Current quote<br/><b>on request</b>','Current unit schedule and handover to be quoted.','A tower format to compare for layout, access and long-term rental use.']]
y=table(rows,[120,115,141,CW-376],y+23,font=10)
y=note('Élevée and OSUS prices are published developer entry figures checked on 13 October 2026, not a reservation or guaranteed inventory. Tower pricing is quoted individually. [4, 5]',y+23)
rect(M,y+22,CW,76,CREAM)
para('How to use this comparison',M+17,y+34,CW-34,18,NAVY,'Display')
para('First choose the timing of your return. Then compare the full cost of a specific unit - not only its starting price.',M+17,y+60,CW-34,10.8)
footer()

# 4: Élevée, with primary-source price and starting down payment.
header('03 / Selected project')
y=title('Élevée / ZOOD',size=38)
para('Al Nakheel, Riyadh / integrated residential destination',M,y+8,CW,11.5,MUTED)
photo('elevee.jpg',M,203,CW,223)
label('DEVELOPER RENDER / PROPOSED DESIGN',M,433,MUTED,7.5)
rect(M,457,CW,91,NAVY)
label('PUBLISHED ENTRY PRICE',M+18,471,HexColor('#d8b982'),8)
para('About $279,000',M+18,489,260,28,white,'Display',30)
para('SAR 1,046,000 / 1 bedroom / GF-16 / 69.69 sqm',M+18,524,CW-36,9.5,white)
label('STARTING DOWN PAYMENT',M+292,471,HexColor('#d8b982'),8)
para('20%',M+292,489,170,28,white,'Display',30)
para('About $55,787 / SAR 209,200',M+292,524,180,9.1,white)
y=para('<b>Best suited to:</b> buyers comfortable waiting for handover and assessing the apartment for future rental use or their own home.',M,567,CW,11.4)
y=para('<b>The buying advantage:</b> published entry pricing and a stated starting down payment make the first commitment easier to model. Flexible plans depend on the remaining period before handover; obtain the dated schedule for your unit.',M,y+12,CW,11.1)
y=para('<b>The rental thesis:</b> compare layouts, access to nearby destinations and the amenity package with competing apartments. The brochure presents 25,000 sqm of green space, pools and fitness facilities.',M,y+12,CW,11.1)
para('<b>Timing:</b> the developer states November 2029. Rental income begins only after delivery, preparation and letting. Reconfirm the unit, service charges and payment milestones before reservation. [4]',M,y+12,CW,10.2,MUTED)
footer()

# 5: OSUS, without confusing residential prices with Curio product prices.
header('04 / Selected project')
y=title('OSUS Eye',size=38)
para('Al Nada, northern Riyadh / a mixed-use destination',M,y+8,CW,11.5,MUTED)
photo('osus.jpg',M,203,CW,223)
label('DEVELOPER RENDER / PROPOSED DESIGN',M,433,MUTED,7.5)
rect(M,457,CW,85,NAVY)
label('PUBLISHED PROJECT ENTRY PRICE',M+18,471,HexColor('#d8b982'),8)
para('From about $373,000',M+18,489,CW-36,28,white,'Display',30)
para('SAR 1,400,000 / the developer page advertises 1-4 bedroom apartments',M+18,522,CW-36,9.4,white)
y=para('<b>Best suited to:</b> buyers comparing an apartment within a destination that combines housing, offices, retail and hospitality.',M,560,CW,11.4)
y=para('<b>The buying advantage:</b> several property formats in one location allow a comparison of ordinary residences and the separate Curio Collection by Hilton branded-residence proposition.',M,y+12,CW,11.1)
y=para('<b>The rental thesis:</b> test the unit against local tenant needs and the price of comparable apartments. Access to services is useful only when the letting rules and operating costs support the model.',M,y+12,CW,11.1)
para('<b>Compare products carefully:</b> the project starting price is not a confirmed Curio unit quote. Service packages, management rules, fees, payment plans and delivery dates must be established for the chosen unit. [5]',M,y+12,CW,10.2,MUTED)
footer()

# 6: Tower card contains reliable design facts, not an unverified live offer.
header('05 / Selected project')
y=title('Tower Project / Al Majdiah',size=34)
para('Riyadh / residential tower near King Fahd Road and Northern Ring Road',M,y+8,CW,10.6,MUTED)
photo('tower.jpg',M,204,204,383)
label('DEVELOPER RENDER',M,596,MUTED,7.5)
x=M+227;w=CW-227
label('THE PROJECT FORMAT',x,208)
y=para('33 residential floors<br/>135 apartments<br/>5 penthouses',x,232,w,25,NAVY,'Display',29)
y=para('Contemporary interiors with a Salmani architectural approach. The brochure presents a residents’ lounge, fitness club and secure parking.',x,y+24,w,11)
y=para('<b>Best suited to:</b> buyers who prefer a tower apartment and want to compare the exact layout, access and ongoing ownership costs.',x,y+18,w,11)
rect(x,y+22,w,92,CREAM)
label('PRICE / PAYMENT / DELIVERY',x+14,y+35,size=8)
para('Get a current unit quote',x+14,y+55,w-28,20,NAVY,'Display',22)
para('The specific offer is quoted individually.',x+14,y+87,w-28,9.5,MUTED)
y=para('<b>The rental thesis:</b> test demand for the selected apartment size and specification. Building scale or proximity to a landmark alone cannot establish rental income.',M,627,CW,11.2)
para('<b>For your shortlist:</b> request the exact address and commercial project name, a dated price, the unit plan, handover date, payment milestones and annual service charges. Brochure renders do not confirm furnishing or current availability. [6]',M,y+15,CW,10.5,MUTED)
footer()

# 7: a fully reconciled rental model, clearly separated from a market forecast.
header('06 / Rental income scenarios')
y=title('What could the income<br/>look like after handover?')
y=para('Illustrative planning scenarios for a $300,000 apartment. These are model inputs, not measured rents or project-specific forecasts. A unit-level projection needs comparable leases and a written cost schedule.',M,y+14,CW,11.8,MUTED)
rows=[['Annual calculation','Lower-rent case','Middle case','Higher-rent case'],
['Contract rent before vacancy','$15,000','$18,000','$21,000'],
['Gross yield / purchase price','5.0%','6.0%','7.0%'],
['Collected rent / 11 months','$13,750','$16,500','$19,250'],
['Management / 8% collected rent','-$1,100','-$1,320','-$1,540'],
['Service charges + repair reserve','-$2,400','-$2,400','-$2,400'],
['Net income / year','<b>$10,250</b>','<b>$12,780</b>','<b>$15,310</b>'],
['Monthly average','<b>$854</b>','<b>$1,065</b>','<b>$1,276</b>'],
['Net yield / $330,000 total capital','<b>3.11%</b>','<b>3.87%</b>','<b>4.64%</b>']]
y=table(rows,[200,103,103,CW-406],y+20,font=9.5)
y=para('Model assumptions: $300,000 purchase price plus $30,000 combined entry/setup costs and reserve; one month vacant; annual service charges of $1,800 plus $600 repairs reserve. Before financing and taxes. The cost allowances must be replaced with actual figures.',M,y+15,CW,9.5,MUTED)
note('Riyadh’s five-year rent-increase restriction began on 25 September 2025. This model does not assume an annual rise in the contracted rent. A future first lease still needs a lawful, achievable starting rent. [7]',y+21,'Timing changes the return')
footer()

# 8: capital growth and exit economics, without implying a future annual rate.
header('07 / Capital growth and exit')
y=title('Buy with an exit<br/>you can explain.')
y=para('An early entry can be useful when the selected unit has a competitive price, practical payment terms and a credible future buyer or tenant. A new market-access framework alone does not make a property liquid.',M,y+14,CW,12.1,MUTED)
t=y+23;w=(CW-14)/2
card(M,t,w,147,'Entry price','Compare the actual price per sqm and the full specification with alternatives. Ask whether any claimed launch discount is documented.','01')
card(M+w+14,t,w,147,'Holding period','Budget for delivery, preparation and letting. For off-plan, compare the dated schedule with the period when no rent is received.','02')
card(M,t+161,w,147,'Resale conditions','Review assignment rights, any consent required, minimum payments before resale and the fees to exit.','03')
card(M+w+14,t+161,w,147,'Competing supply','Compare current listings, completed homes and future supply. A distinctive brochure does not establish resale demand.','04')
t+=330
rect(M,t,CW,106,NAVY)
label('ILLUSTRATIVE EXIT / NOT A PRICE FORECAST',M+17,t+14,HexColor('#d8b982'),8)
para('$300,000 purchase → $360,000 resale',M+17,t+36,CW-34,23,white,'Display',25)
para('A 20% price rise means $60,000 gross appreciation. With $30,000 entry/setup costs and 3% selling costs, the modelled resale profit is $19,200, before rent, taxes and financing.',M+17,t+69,CW-34,10.1,white)
para('Market context: apartment and villa performance differs, and announced supply may not arrive on its original timetable. Compare the unit and exit terms rather than extrapolating a past growth rate. [3]',M,t+124,CW,10.5,MUTED)
footer()

# 9: purchase advantages, usable payment breakdown, separate residency threshold.
header('08 / Purchase structure and benefits')
y=title('Make the first payment<br/>part of a complete plan.')
y=para('For Élevée’s published $278,933 equivalent entry example, a 20% starting down payment is approximately $55,787. The remaining price is $223,147; its dates and milestones depend on the unit’s written plan. [4]',M,y+15,CW,12.1,MUTED)
rect(M,y+23,CW,86,NAVY)
label('FIRST 20%',M+18,y+37,HexColor('#d8b982'),8)
para('$55,787',M+18,y+55,160,28,white,'Display',30)
label('REMAINING 80%',M+238,y+37,HexColor('#d8b982'),8)
para('$223,147',M+238,y+55,200,28,white,'Display',30)
t=y+133
y=para('<b>Staged payments can help plan capital.</b> Compare the schedule with your income and liquidity. A smaller first payment does not reduce the total price or create rental income before completion.',M,t,CW,11.3)
y=para('<b>Build the total acquisition budget.</b> Include the price, applicable transaction charges, advice and registration costs, furnishing, service charges and a reserve. RETT is generally 5%; confirm applicability and which party bears each cost. [8]',M,y+17,CW,11.3)
y=para('<b>Plan the operating model.</b> Compare long-term letting with any permitted managed product. Check management scope, owner-use rules and the net amount retained after fees.',M,y+17,CW,11.3)
y=para('<b>Assess remote steps individually.</b> Ask what can be completed remotely, including identity checks, signing, payment and registration, and where a representative or visit may be needed.',M,y+17,CW,11.3)
note('Property ownership and residency are separate. The Real Estate Owner Residency route has a property-value threshold of SAR 4 million (about $1.067 million) and additional property and applicant conditions. A lower-priced apartment does not by itself meet that threshold. [9]',y+25,'Residency, if it is part of your objective')
footer()

# 10: one actionable request and human-readable clickable sources.
header('09 / Your personal investment selection')
y=title('Turn the guide<br/>into a shortlist for you.')
y=para('Tell us your goal, full property budget, purchase timing and whether you prefer a ready home or an off-plan plan. We will use those answers to narrow the options and prepare a useful conversation.',M,y+14,CW,12.4,MUTED)
y=para('<b>Your next comparison should include:</b><br/>A current unit quote and plan; the first payment and remaining milestones; delivery and preparation timing; operating costs; rental assumptions and resale conditions; the ownership route for the exact property.',M,y+19,CW,11.6)
t=y+22
rect(M,t,CW,54,NAVY)
para('Get your personalised investment selection',M+18,t+16,CW-36,16,white,'Bold',19)
c.linkURL(CTA,(M,H-t-54,W-M,H-t),relative=0,thickness=0)
y=para('nika-estate.github.io/nika-estate/saudi-quiz/',M,t+63,CW,9.7,NAVY)
y=para('Sources and figures / checked 13 October 2026',M,y+20,CW,17,NAVY,'Display',20)
sources=[
('1','REGA / non-Saudi ownership framework and access conditions',REGA),
('2','SAMA / SAR 3.75 per USD exchange-rate peg',SAMA),
('3','Knight Frank / KSA residential and office market, Q2 2026',KF),
('4','ZOOD / Élevée project, starting down payment and unit listings',ZOOD),
('5','OSUS / OSUS Eye published project entry price',OSUS),
('6','Al Majdiah / Tower Project brochure supplied to Nika Estate',None),
('7','REGA / Ejar / Riyadh rent-increase provisions',EJAR),
('8','ZATCA / Real Estate Transaction Tax detailed guidance',ZATCA),
('9','Premium Residency Center / Real Estate Owner Residency',PR)]
for n,txt,url in sources:
    y+=8;h=para(f'[{n}] {txt}',M,y,CW,9.4,MUTED)
    if url:c.linkURL(url,(M,H-h,W-M,H-y),relative=0,thickness=0)
    y=h
para('USD equivalents use SAR 3.75 per USD and are rounded. Final contracts and charges are quoted in SAR. Prices and inventory can change. Renders are illustrative. Income and exit examples are planning calculations, not guaranteed returns or project-specific forecasts.',M,y+20,CW,9.3,MUTED)
footer()
c.save()
print(f'Created {page} pages: {out} ({out.stat().st_size:,} bytes)')
