# Joanna Brzeska — Alchemia Aesthetic (redesign)

Statyczna strona (HTML + CSS + vanilla JS), bez zależności i bez procesu budowania.

## Struktura
```
index.html      # strona główna (bramka: zabiegi / kursy)
zabiegi.html    # lejek klientki: oferta, proces, pełny cennik, kontakt
kursy.html      # lejek specjalistki: moduły edukacyjne online
styles.css      # cały styl
script.js       # reveal on scroll, menu mobilne, zakładki cennika, player YT, feed IG
assets/         # logo + zdjęcia
```

## Uruchomienie lokalne
Dowolny statyczny serwer, np.:
```
python -m http.server 5273
```
i otwórz http://localhost:5273

## Hosting (GitHub Pages)
1. Wrzuć całą zawartość do repozytorium.
2. Settings → Pages → Source: `main` / katalog `/root`.
3. Strona startowa to `index.html`.

## Do dokończenia (placeholdery)
- Sekcja Instagram na `zabiegi.html` to placeholder — docelowo feed z @joannabrzeskapmu.
- Liczby ocen (4,9/5, „ponad 300 opinii", „1000+ klientek") do podmiany na realne.
- Hero na `kursy.html` ma jeszcze zdjęcie zastępcze.
