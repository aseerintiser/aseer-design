"""Render a trailer spec to frames, then MP4.

usage: render.py <project> <width> <height> <out.mp4> [fps] [--thumb] [--stills t1,t2,...]
"""
import asyncio
import os
import subprocess
import sys

from playwright.async_api import async_playwright

HERE = os.path.dirname(os.path.abspath(__file__))


async def main():
    project, w, h, out = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
    thumb = "--thumb" in sys.argv
    fps = int(sys.argv[5]) if len(sys.argv) > 5 and sys.argv[5].isdigit() else 30
    stills = None
    if "--stills" in sys.argv:
        stills = [float(x) for x in sys.argv[sys.argv.index("--stills") + 1].split(",")]
    async with async_playwright() as p:
        b = await p.chromium.launch(args=["--allow-file-access-from-files", "--force-color-profile=srgb"])
        pg = await b.new_page(viewport={"width": w, "height": h}, device_scale_factor=1)
        errors = []
        pg.on("pageerror", lambda e: errors.append(str(e)))
        await pg.goto(f"file://{HERE}/engine.html?p={project}" + ("&thumb=1" if thumb else ""))
        await pg.evaluate("window.__ready")
        if errors:
            print("errors", errors)
        if stills is not None:
            for t in stills:
                await pg.evaluate(f"window.__seek({t})")
                await pg.screenshot(path=f"{out}-{t:05.2f}.png")
            await b.close()
            return
        duration = await pg.evaluate("window.__duration")
        n = int(round(duration * fps))
        enc = subprocess.Popen(
            ["ffmpeg", "-v", "error", "-y", "-f", "image2pipe", "-c:v", "mjpeg", "-framerate", str(fps), "-i", "-",
             "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out],
            stdin=subprocess.PIPE,
        )
        for f in range(n):
            await pg.evaluate(f"window.__seek({f / fps})")
            enc.stdin.write(await pg.screenshot(type="jpeg", quality=94))
        enc.stdin.close()
        enc.wait()
        await b.close()
        print("wrote", out, n, "frames")


asyncio.run(main())
