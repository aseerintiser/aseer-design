"""Render the TravelMate film. usage: render-film.py <mode hero|card> <w> <h> <out.mp4|stills> [fps] [--base path] [--stills t1,t2]"""
import asyncio, os, subprocess, sys
from playwright.async_api import async_playwright
HERE = os.path.dirname(os.path.abspath(__file__))
async def main():
    mode, w, h, out = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
    fps = int(sys.argv[5]) if len(sys.argv) > 5 and sys.argv[5].isdigit() else 30
    base = sys.argv[sys.argv.index("--base") + 1] if "--base" in sys.argv else ""
    stills = [float(x) for x in sys.argv[sys.argv.index("--stills") + 1].split(",")] if "--stills" in sys.argv else None
    async with async_playwright() as p:
        b = await p.chromium.launch(args=["--allow-file-access-from-files", "--force-color-profile=srgb"])
        pg = await b.new_page(viewport={"width": w, "height": h}, device_scale_factor=1)
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        q = f"?mode={mode}" + (f"&base={base}" if base else "")
        await pg.goto(f"file://{HERE}/film.html{q}")
        await pg.evaluate("window.__ready")
        if errs: print("errors", errs)
        if stills is not None:
            for t in stills:
                await pg.evaluate(f"window.__seek({t})")
                await pg.screenshot(path=f"{out}-{t:05.2f}.png")
            await b.close(); return
        dur = await pg.evaluate("window.__duration")
        n = int(round(dur * fps))
        enc = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "image2pipe", "-c:v", "mjpeg", "-framerate", str(fps), "-i", "-",
            "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out], stdin=subprocess.PIPE)
        for f in range(n):
            await pg.evaluate(f"window.__seek({f / fps})")
            enc.stdin.write(await pg.screenshot(type="jpeg", quality=94))
        enc.stdin.close(); enc.wait(); await b.close(); print("wrote", out, n, "frames")
asyncio.run(main())
