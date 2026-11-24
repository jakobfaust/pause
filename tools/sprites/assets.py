import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import portrait as bp

def paths(g):
    return bp.paths(g) if g else ''

spr = {}
for m in ['neutral', 'happy', 'tense', 'tired']:
    b, h, bl = bp.build_layers(m)
    spr[m] = {'body': paths(b), 'head': paths(h), 'blink': paths(bl)}

# ---------- rum (112 x 74 pixels) ----------
R = []
def rect(x, y, w, h, c, extra=''):
    R.append('<rect x="%d" y="%d" width="%d" height="%d" fill="%s"%s/>' % (x, y, w, h, c, extra))
OUT = '#2B211C'
# væg og gulv
rect(0, 0, 112, 52, '#E9DCC6')
for y in range(0, 52, 2):
    rect(0, y, 112, 1, '#E4D5BC')       # svag tapetstribe
rect(0, 50, 112, 3, '#C9B592')          # fodliste
rect(0, 53, 112, 21, '#C79F73')
for i, y in enumerate(range(53, 74, 5)):
    rect(0, y, 112, 1, '#B98F63')
    for x in range(0 if i % 2 == 0 else 9, 112, 18):
        rect(x, y, 1, 5, '#B98F63')
# vindue
rect(69, 7, 32, 31, OUT)
rect(70, 8, 30, 29, '#8B6A4A')
rect(72, 10, 26, 25, 'var(--sky-a)')
rect(72, 22, 26, 13, 'var(--sky-b)')
rect(84, 10, 2, 25, '#8B6A4A')
rect(72, 21, 26, 2, '#8B6A4A')
rect(67, 36, 36, 3, OUT)
rect(68, 36, 34, 2, '#B08A62')
# sol/måne
rect(74, 13, 5, 5, 'var(--sun)')
# gardin
rect(64, 6, 6, 34, OUT); rect(65, 7, 4, 32, '#7B8C6C')
for y in range(9, 38, 4): rect(66, y, 1, 3, '#68785B')
rect(100, 6, 6, 34, OUT); rect(101, 7, 4, 32, '#7B8C6C')
for y in range(9, 38, 4): rect(102, y, 1, 3, '#68785B')
# sofa
rect(3, 33, 62, 26, OUT)
rect(4, 34, 60, 24, '#68785B')
rect(4, 34, 60, 3, '#7B8C6C')
rect(2, 40, 11, 20, OUT); rect(3, 41, 9, 18, '#7B8C6C'); rect(3, 41, 9, 2, '#8FA07F')
rect(55, 40, 11, 20, OUT); rect(56, 41, 9, 18, '#7B8C6C'); rect(56, 41, 9, 2, '#8FA07F')
rect(13, 49, 42, 10, OUT); rect(14, 50, 40, 8, '#8FA07F'); rect(14, 50, 40, 2, '#A3B392')
rect(33, 50, 1, 8, '#7B8C6C')
rect(4, 59, 4, 3, OUT); rect(58, 59, 4, 3, OUT)
# bord og kop
rect(83, 52, 24, 3, OUT)
rect(84, 52, 22, 2, '#A67C52')
rect(86, 55, 2, 13, OUT); rect(102, 55, 2, 13, OUT)
rect(87, 55, 1, 12, '#8B6A4A'); rect(103, 55, 1, 12, '#8B6A4A')
rect(92, 43, 9, 9, OUT)
rect(93, 44, 7, 7, '#FBF8F2')
rect(93, 44, 2, 7, '#F0E8DA')
rect(93, 46, 7, 2, '#C4704F')
rect(100, 45, 3, 4, OUT); rect(101, 46, 1, 2, '#E9DCC6')
rect(94, 43, 5, 2, 'var(--tea)')
# damp
R.append('<g class="steam"><rect x="94" y="39" width="1" height="3" fill="#FBF8F2" opacity=".75"/><rect x="97" y="37" width="1" height="4" fill="#FBF8F2" opacity=".6"/></g>')
# lille plante på bordet
rect(86, 46, 4, 6, OUT); rect(87, 47, 2, 4, '#B9643F')
rect(85, 42, 6, 4, OUT); rect(86, 43, 4, 2, '#7B8C6C'); rect(88, 41, 2, 2, '#7B8C6C')
# tæppe på gulv
rect(18, 63, 40, 9, OUT); rect(19, 64, 38, 7, '#D98A68')
for x in range(21, 57, 6): rect(x, 64, 2, 7, '#C4704F')
room = ''.join(R)

# menubar-ikon (monokromt skabelon-ikon, 12 x 12)
ICON = [
 "..XXXXXXXX..",
 ".XXXXXXXXXX.",
 "XXXXXXXXXXXX",
 "XXXXXXXXXXXX",
 "XXX..XX..XXX",
 "XXX..XX..XXX",
 "XXXXXXXXXXXX",
 "XXXX.XX.XXXX",
 ".XXXX..XXXX.",
 "..XXXXXXXX..",
 "...XXXXXX...",
 ".XXXXXXXXXX.",
]
icon = ''.join('<rect x="%d" y="%d" width="1" height="1"/>' % (x, y) for y, r in enumerate(ICON) for x, c in enumerate(r) if c == 'X')

out = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'src', 'generated', 'assets.js')
js = '// Genereret af tools/sprites/assets.py. Ret ikke i hånden.\nexport const SPR = %s;\nexport const ROOM = %s;\nexport const ICON = %s;\n' % (json.dumps(spr), json.dumps(room), json.dumps(icon))
open(out, 'w').write(js)
print('assets.js', len(js))
