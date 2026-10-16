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

The site uses web copies: hooks at 1600x900 (`public/trailers/`, CRF 23) and cards at 960x720 (`public/loops/<slug>-card.mp4`, CRF 24), each with a WebP poster. The homepage trailer (`public/loops/trailer.mp4`) is the opening scene of five card films joined with 0.45 s crossfades; its clip start times live in `content/home.ts`.
