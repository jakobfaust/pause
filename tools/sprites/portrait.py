import math, json, sys

N = 64
OUT = '#2B211C'
SK = ['#FAD9BC', '#F0BE98', '#D99A74', '#B87858']      # lys, base, skygge, dyb
HR = ['#9A6B47', '#7E5638', '#5A3A28', '#3E2619']
SW = ['#E39A78', '#C4704F', '#A85A3E', '#8A4630']
CREAM = '#F4EEE4'
CREAM_S = '#D9CFC0'
WHITE = '#FBF8F2'
IRIS = '#6B4A35'
BLUSH = '#E58E7C'
LIP = '#B5564A'
TONGUE = '#D9746B'
DROP = '#8FB4D6'
BAG = '#C98F70'

BAYER = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]]


def shade(x, y, cx, cy, rx, ry):
    nx, ny = (x - cx) / rx, (y - cy) / ry
    s = nx * 0.55 + ny * 0.75 + (BAYER[y % 4][x % 4] - 7.5) / 15 * 0.07
    if s < -0.50: return 0
    if s < 0.28: return 1
    if s < 0.72: return 2
    return 3


def ell(x, y, cx, cy, rx, ry):
    return ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1.0


def build_layers(mood):
    G = {'body': {}, 'head': {}}
    g = G['body']

    def put(x, y, c):
        if 0 <= x < N and 0 <= y < N:
            g[(x, y)] = c

    dy = {'neutral': 0, 'happy': -1, 'tense': 2, 'tired': 3}[mood]       # hoved
    sy = {'neutral': 0, 'happy': -1, 'tense': -4, 'tired': 3}[mood]      # skuldre
    hx = 1 if mood == 'tired' else 0

    # ---------- krop (trøje) ----------
    for y in range(44 + sy, N):
        t = (y - (44 + sy)) / 20.0
        half = 13 + 21 * min(1, t * 1.15) ** 0.7
        for x in range(int(32 - half), int(32 + half) + 1):
            if mood == 'tense' and y < 50 + sy:
                pass
            i = shade(x, y, 32 - 6, 50 + sy, 28, 22)
            c = SW[min(i, 3)]
            # strik: lodrette ribber i skygge-felter
            if i >= 1 and x % 4 == 0 and y % 3 == 0:
                c = SW[min(i + 1, 3)]
            if False:
                c = SW[1]
            put(x, y, c)
    # ærmekant / skulderlinje
    for y in range(52 + sy, N):
        put(int(32 - (13 + 21 * min(1, ((y - (44 + sy)) / 20.0) * 1.15) ** 0.7)) + 4, y, SW[2])
    # hals
    for y in range(38 + dy, 48 + sy):
        for x in range(26 + hx, 39 + hx):
            put(x, y, SK[2] if x > 34 + hx or y < 42 + dy else SK[1])
    # krave (cremet rundhals)
    for y in range(44 + sy, 52 + sy):
        for x in range(23, 42):
            e = ((x - 32.0) / 10.0) ** 2 + ((y - (44 + sy)) / 7.0) ** 2
            if 0.55 <= e <= 1.0 and y >= 44 + sy:
                put(x, y, CREAM if (x < 33) else CREAM_S)
            elif e < 0.55 and y >= 44 + sy:
                put(x, y, SK[2] if y < 47 + sy else SK[1])

    # ---------- hoved ----------
    g = G['head']
    cx, cy, rx, ry = 32 + hx, 25 + dy, 15.5, 17.5
    for y in range(int(cy - ry) - 1, int(cy + ry) + 2):
        for x in range(int(cx - rx) - 1, int(cx + rx) + 2):
            if ell(x, y, cx, cy, rx, ry) or ell(x, y, cx, cy + 1.5, rx - 2.5, ry - 1):
                put(x, y, SK[shade(x, y, cx, cy, rx, ry)])
    # ører
    for ex in (cx - rx + 0.5, cx + rx - 0.5):
        for y in range(int(cy + 0), int(cy + 8)):
            for x in range(int(ex) - 2, int(ex) + 3):
                if ell(x, y, ex, cy + 4, 2.4, 4.0) and (x, y) not in g:
                    put(x, y, SK[2])
                elif ell(x, y, ex, cy + 4, 2.4, 4.0):
                    pass
    for ex in (cx - rx - 1, cx + rx + 1):
        for y in range(int(cy), int(cy + 9)):
            for x in range(int(ex) - 2, int(ex) + 3):
                if ell(x, y, ex, cy + 4.5, 2.6, 4.0):
                    put(x, y, SK[1] if x < cx else SK[2])
                    if abs(x - ex) < 1 and abs(y - (cy + 4.5)) < 1.3:
                        put(x, y, SK[3])

    # ---------- hår ----------
    for y in range(int(cy - ry) - 4, int(cy + 12)):
        for x in range(int(cx - rx) - 3, int(cx + rx) + 4):
            outer = ell(x, y, cx, cy - 1.5, rx + 1.8, ry + 2.2)
            if not outer:
                continue
            # pandehårslinje: svajende, med sidelokke
            line = cy - 8.5 + 2.6 * math.sin((x - cx) * 0.30 + 0.5) + (0.0 if x > cx - 5 else 2.0)
            sideburn = (abs(x - cx) > rx - 2.6 and y < cy + 2)
            if y < line or sideburn:
                i = shade(x, y, cx - 3, cy - 12, rx + 3, 15)
                c = HR[min(i, 3)] if i > 0 else HR[0]
                # hårstrå
                if (x + y // 2) % 5 == 0 and i < 3:
                    c = HR[max(i - 1, 0)] if i > 0 else HR[0]
                put(x, y, c)
    # glansstrå
    for k in range(7):
        put(int(cx - 8 + k * 1.6), int(cy - 13 + k * 0.9), HR[0])
        put(int(cx - 7 + k * 1.6), int(cy - 12 + k * 0.9), HR[0])
    # sving
    for x in range(int(cx - 2), int(cx + 6)):
        put(x, int(cy - 10 + (x - cx) * 0.25), HR[3])

    # ---------- ansigt ----------
    ey = int(cy + 2)
    exl, exr = int(cx - 6.5), int(cx + 5.5)

    def eye_open(x0, big=False, lid=0, look=0):
        w, h = 7, (6 if big else 5) - lid
        for yy in range(h):
            for xx in range(w):
                if ell(xx, yy, (w - 1) / 2, (h - 1) / 2 + 0.2, w / 2, h / 2 + 0.2):
                    put(x0 + xx, ey + lid + yy, WHITE)
        for yy in range(h):
            for xx in range(w):
                if (x0 + xx, ey + lid + yy) in g and g[(x0 + xx, ey + lid + yy)] == WHITE:
                    pass
        # iris
        ix = x0 + 2 + look
        for yy in range(min(4, h)):
            for xx in range(3):
                put(ix + xx, ey + lid + (h - 4 if h >= 4 else 0) + yy - (1 if h == 6 else 0), IRIS)
        put(ix + 1, ey + lid + (h - 3 if h >= 4 else 0) - (1 if h == 6 else 0), OUT)
        put(ix + 1, ey + lid + (h - 2 if h >= 4 else 0) - (1 if h == 6 else 0), OUT)
        put(ix, ey + lid + (h - 4 if h >= 4 else 0) - (1 if h == 6 else 0), WHITE)
        # overlægslinje
        for xx in range(w):
            put(x0 + xx, ey + lid - 1, OUT)
        put(x0 - 1, ey + lid, OUT)
        put(x0 + w, ey + lid, OUT)

    def eye_joy(x0):
        # glad, lukket bue
        pts = [(0, 2), (1, 1), (2, 0), (3, 0), (4, 0), (5, 1), (6, 2)]
        for xx, yy in pts:
            put(x0 + xx, ey + 1 + yy, OUT)
            put(x0 + xx, ey + 2 + yy, OUT if xx in (0, 6) else SK[2])
        # smilerynke
        put(x0 + 7, ey + 2, SK[3]); put(x0 - 1, ey + 2, SK[3])

    def eye_tired(x0):
        for xx in range(7):
            put(x0 + xx, ey + 1, OUT)
        for xx in range(1, 6):
            put(x0 + xx, ey + 2, WHITE)
            put(x0 + xx, ey + 3, WHITE if xx in (1, 5) else IRIS)
        put(x0 + 3, ey + 2, IRIS); put(x0 + 2, ey + 2, IRIS); put(x0 + 4, ey + 2, IRIS)
        for xx in range(1, 6):
            put(x0 + xx, ey + 5, BAG)
        put(x0 + 6, ey + 1, OUT)

    def brow(x0, rise, tilt):
        # tilt: -1 indad-ned, 0 flad, 1 indad-op
        for xx in range(8):
            t = xx - 3.5
            yy = int(round(ey - 4 - rise + tilt * (t if x0 < cx else -t) * -0.25))
            put(x0 - 1 + xx, yy, HR[2])
            put(x0 - 1 + xx, yy + 1, HR[3])

    if mood == 'happy':
        eye_joy(exl); eye_joy(exr)
        brow(exl, 2, 0); brow(exr, 2, 0)
    elif mood == 'tired':
        eye_tired(exl); eye_tired(exr)
        brow(exl, -1, 1); brow(exr, -1, 1)
    elif mood == 'tense':
        eye_open(exl, big=True, look=1); eye_open(exr, big=True, look=1)
        brow(exl, 0, -1); brow(exr, 0, -1)
        # sveddråbe
        for k, c in enumerate([DROP, DROP, '#6F98BE']):
            put(int(cx + 13), int(cy - 6 + k), c)
        put(int(cx + 12), int(cy - 5), DROP); put(int(cx + 14), int(cy - 5), DROP)
    else:
        eye_open(exl, big=True); eye_open(exr, big=True)
        brow(exl, 1, 0); brow(exr, 1, 0)

    # næse
    nx = int(cx)
    for yy in range(4):
        put(nx - 1, ey + 5 + yy, SK[2])
    put(nx - 2, ey + 9, SK[3]); put(nx - 1, ey + 9, SK[3]); put(nx, ey + 9, SK[3])
    put(nx + 1, ey + 8, SK[0]); put(nx + 1, ey + 7, SK[0])

    # kinder
    for bx in (exl - 1, exr + 5):
        for yy in range(2):
            for xx in range(3):
                put(bx + xx, ey + 8 + yy, BLUSH)

    my = int(cy + 12)
    if mood == 'happy':
        # åben mund med tænder og tunge
        for yy in range(7):
            half = 7 - abs(yy - 1) * 0.6 if yy > 0 else 7
            wd = [7, 7, 6, 6, 5, 4, 2][yy]
            for xx in range(-wd, wd + 1):
                if yy <= 1:
                    c = WHITE if abs(xx) < wd else OUT
                elif yy < 5:
                    c = '#6A2F2B' if abs(xx) < wd else OUT
                    if yy >= 3 and abs(xx) < wd - 1 and abs(xx) < 4:
                        c = TONGUE
                else:
                    c = OUT
                put(int(cx) + xx, my + yy, c)
        for xx in range(-7, 8):
            put(int(cx) + xx, my - 1, OUT)
        put(int(cx) - 8, my - 2, SK[3]); put(int(cx) + 8, my - 2, SK[3])
    elif mood == 'tense':
        for xx in range(-5, 6):
            put(int(cx) + xx, my + 1 + (0 if (xx // 2) % 2 == 0 else 1), OUT)
    elif mood == 'tired':
        for xx in range(-3, 4):
            put(int(cx) + xx, my + 1, OUT)
        for xx in range(-1, 2):
            put(int(cx) + xx, my + 2, '#6A2F2B')
            put(int(cx) + xx, my + 3, OUT)
    else:
        for xx in range(-5, 6):
            put(int(cx) + xx, my + (0 if abs(xx) < 4 else -1), OUT)
        for xx in range(-3, 4):
            put(int(cx) + xx, my + 1, LIP)
        put(int(cx) - 6, my - 2, SK[3]); put(int(cx) + 6, my - 2, SK[3])

    # ---------- kontur (pr. lag) ----------
    for key in ('body', 'head'):
        lay = G[key]
        filled = set(lay.keys())
        edge = []
        for (x, y) in filled:
            for ddx, ddy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                if (x + ddx, y + ddy) not in filled:
                    edge.append((x + ddx, y + ddy))
        for p in edge:
            if 0 <= p[0] < N and 0 <= p[1] < N:
                lay[p] = OUT
    # blink-overlay for moods med åbne øjne
    blink = {}
    if mood in ('neutral', 'tense'):
        ey = int(25 + dy + 2)
        for x0 in (int(32 - 6.5), int(32 + 5.5)):
            for yy in range(ey - 1, ey + 6):
                for xx in range(x0, x0 + 7):
                    blink[(xx, yy)] = SK[1]
            for xx in range(x0, x0 + 7):
                blink[(xx, ey + 3)] = OUT
            blink[(x0 - 1, ey + 3)] = OUT; blink[(x0 + 7, ey + 3)] = OUT
    return G['body'], G['head'], blink


def build(mood):
    b, h, _ = build_layers(mood)
    g = dict(b); g.update(h)
    return g


def paths(g):
    by = {}
    for (x, y), c in g.items():
        by.setdefault(c, []).append((x, y))
    out = []
    for c, pts in by.items():
        rows = {}
        for x, y in pts:
            rows.setdefault(y, []).append(x)
        d = []
        for y in sorted(rows):
            xs = sorted(rows[y]); s = xs[0]; p = xs[0]
            for x in xs[1:] + [None]:
                if x is None or x != p + 1:
                    d.append('M%d %dh%dv1h-%dz' % (s, y, p - s + 1, p - s + 1))
                    if x is not None: s = x
                if x is not None: p = x
        out.append('<path fill="%s" d="%s"></path>' % (c, ''.join(d)))
    return '\n'.join(out)


