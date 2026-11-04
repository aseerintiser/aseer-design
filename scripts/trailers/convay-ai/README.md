# Convay AI for Physical Meetings films

`film.html` holds both films: the hero trailer (`mode=hero`, 1920x1080, 20.5 s,
with titles) and the card loop (`mode=card`, 1200x900, 14 s, no text, seamless).
Every window and phone shows a real 2x export from the "Convay AI for Physical
Meetings" Figma file in `public/convay-ai/`. A coral line carries every scene change.

    python3 render-film.py hero 1920 1080 convay-ai-for-physical-meetings-trailer-1920x1080.mp4
    python3 render-film.py card 1200 900 convay-ai-for-physical-meetings-card-1200x900.mp4
    python3 render-film.py hero 1920 1080 st/h --stills 1,4.5,8.4   # check frames

Web copies: hero scaled to 1600x900 at CRF 23 into `public/trailers/`, card to
960x720 at CRF 24 into `public/loops/`, each with a .webp poster.
