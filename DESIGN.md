# Design

## Retning
Varmt, nordisk, håndlavet. Et lille pixelrum (hjørne med tre ting: vindue, sofa/bord, tæppe) og et portræt med stort ansigt og overdrevne, varme udtryk. Resten er rolig, typografisk UI.

## Farver (tokens, se `src/styles.css`)
Sand #F1EADF, Fløde #FBF8F2, Ler #B9643F, Salvie #7B8C6C, Støvet blå #55697C, Messing #B8913C, Kul #2A2623.
Tekstfarver for tilstande: --ok #4F6142, --soon #85661C, --now #9A4F2E (lysere varianter i mørk tilstand), --muted #6B6259.
Mørk tilstand via `[data-theme="dark"]`. Himmel og sol i rummet følger tid på dagen (`[data-tod]`).

## Typografi
Instrument Serif til overskrifter og figurens stemme, DM Sans til alt andet. Selvhostet WOFF2. Tabelcifre på tider.

## Figur
64×64 pixelportræt, fire humører: neutral, glad, spændt, træt. Lag (krop, hoved, blink) gør øvelsesanimationer mulige (skuldre, hoved, rejs dig, dyb vejrtrækning, gå). Genereres af `tools/sprites/`.

## Bevægelse
Kort og rolig. Kortet glider ind fra kanten, udgang hurtigere end indgang. `prefers-reduced-motion` fjerner alle animationer.

## Ikon
12×12 monokromt menulinjeikon.
