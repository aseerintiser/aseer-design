# Project trailers

The short films on project cards, case heroes and the homepage are made here from each project's real screens. Nothing is filmed or generated: `engine.js` lays the screens out as HTML and animates them with Web Animations, and `render.py` steps through the timeline frame by frame and pipes the frames to ffmpeg.

- `specs.js` holds one spec per project: its chapter color, its scenes (title, devices or windows, rows, walls, layered stacks, the Lumi trust line, outro) and the on-screen text. Every line of text is condensed from that project's case study; keep it that way.
- `ids.js` lists each project's screens in `public/media/framer/`, so specs can refer to them by index.
- `assets/` holds two crops of aRENEWberg screens that were exported inside a device frame.

## Render

Needs Python with Playwright (Chromium) and ffmpeg.

```
python3 render.py lumi 1920 1080 lumi-trailer.mp4            # hook, with titles
python3 render.py lumi 1200 900 lumi-card.mp4 30 --thumb      # card, no text, seamless loop
python3 render.py lumi 1920 1080 still --stills 3.5,7.2       # stills for checking a layout
```

Project keys: `mobile`, `ai`, `notif`, `ds`, `fitvibe`, `travelmate`, `lumi`, `arenewberg`.

The site uses web copies: hooks at 1600x900 (`public/trailers/`, CRF 23) and cards at 960x720 (`public/loops/<slug>-card.mp4`, CRF 24), each with a WebP poster. The homepage hero plays the card films themselves, in the order listed in `heroReel` in `content/home.ts`, so it needs no film of its own.

## TravelMate (v2 redesign)

TravelMate's films no longer come from `specs.js` (its old `travelmate` spec still describes the 2025 version and is kept only for reference). The v2 films live in `travelmate/`: `film.html` is a self-contained timeline built from the redesign's real screens in `public/travelmate/` and Tuki, the ink-bird mascot, and `render-film.py` renders it the same way, frame by frame into ffmpeg.

```
cd scripts/trailers/travelmate
python3 render-film.py hero 1920 1080 travelmate-ai-trailer-1920x1080.mp4   # hook, with titles
python3 render-film.py card 1200 900 travelmate-ai-card-1200x900.mp4           # card, no text, seamless loop
```

Fonts are bundled in `travelmate/fonts/` so the film renders the same on any machine.

## Convay Mobile App Revamp (2026 redesign)

The Convay mobile films no longer come from `specs.js` (its old `mobile` spec still describes the 2023–24 screens and is kept only for reference). They live in `convay-mobile/`: `film.html` (hero) and `card.html` (card loop) are self-contained timelines built from the shipped 2023–24 home screen and the 2026 redesign's real screens in `public/convay-mobile/`, and `render-film.py` renders it frame by frame into ffmpeg, the same way as TravelMate.

```
cd scripts/trailers/convay-mobile
python3 render-film.py hero 1920 1080 convay-mobile-app-revamp-trailer-1920x1080.mp4   # hook, with titles
python3 render-film.py card 1200 900 convay-mobile-app-revamp-card-1200x900.mp4         # card, no text, seamless 14 s loop
```

Geist and Noto Sans Bengali are bundled in `convay-mobile/fonts/`. The homepage trailer's Convay Mobile clip takes 1.0–4.15 s of the card film.
