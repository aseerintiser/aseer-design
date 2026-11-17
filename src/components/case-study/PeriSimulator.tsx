"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";

/**
 * Peri, playable. Four situations from the case study, each with the real
 * actions it is about: walk and stop, a message that waits, a barista who
 * speaks Finnish, a question about a building, and a recording that others
 * can always see.
 *
 * The key effect is the contrast real glasses have: while you walk, the
 * world sways and bobs, but the display stays locked in one small window
 * in the right lens. Everything Peri shows lives inside that window.
 *
 * The HUD is drawn in a fixed 1600 x 900 space and scaled to the stage
 * width, so it stays pixel-consistent with the stills on the page.
 * Reduced motion: no sway, no typing, no blinking.
 */

type Place = "street" | "cafe" | "oldtown" | "dinner";

const PLACES: { id: Place; label: string; photo: string; alt: string }[] = [
  { id: "street", label: "Street", photo: "/peri/sim/street.jpg", alt: "An old European street with colourful gabled houses, seen at eye level." },
  { id: "cafe", label: "Café", photo: "/peri/sim/cafe.jpg", alt: "A barista hands over a takeaway order across a café counter." },
  { id: "oldtown", label: "Old town", photo: "/peri/sim/oldtown.jpg", alt: "A row of ornate historic townhouses on a market square." },
  { id: "dinner", label: "Dinner", photo: "/peri/sim/dinner.jpg", alt: "Friends sharing a candlelit dinner in a cosy restaurant." },
];

const MINT = "#7CF5C8";
const MONO = "var(--font-mono), ui-monospace, monospace";

const s = {
  status: { display: "flex", justifyContent: "space-between", alignItems: "center", font: `500 12px ${MONO}`, letterSpacing: ".04em", color: "rgba(242,251,247,.88)" },
  card: { borderRadius: 18, background: "rgba(10,16,18,.62)", backdropFilter: "blur(20px) saturate(1.3)", border: "1px solid rgba(255,255,255,.2)", padding: "16px 18px", display: "flex", flexDirection: "column", gap: 8 },
  lab: { display: "flex", justifyContent: "space-between", font: `500 12px ${MONO}`, letterSpacing: ".04em", color: "rgba(242,251,247,.84)" },
  big: { fontSize: 27, fontWeight: 500, letterSpacing: "-.015em", lineHeight: 1.22, color: "#F7FFFB" },
  mid: { fontSize: 22, fontWeight: 500, lineHeight: 1.28, color: "#F7FFFB" },
  small: { fontSize: 14, lineHeight: 1.45, color: "rgba(242,251,247,.88)" },
  mono: { font: `500 12px ${MONO}`, color: "rgba(242,251,247,.78)" },
  src: { fontSize: 15, fontStyle: "italic", color: "rgba(242,251,247,.68)" },
  pill: { display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 14px", borderRadius: 999, background: "rgba(10,16,18,.62)", border: "1px solid rgba(255,255,255,.18)", backdropFilter: "blur(14px)", color: "#F7FFFB" },
  chip: { flex: 1, borderRadius: 14, padding: "10px 14px", background: "rgba(10,16,18,.62)", border: "1px solid rgba(255,255,255,.2)", color: "#F7FFFB" },
} satisfies Record<string, CSSProperties>;

const Dot = ({ c = MINT, size = 7 }: { c?: string; size?: number }) => (
  <i aria-hidden style={{ width: size, height: size, borderRadius: "50%", background: c, display: "inline-block" }} />
);
const Left = () => (
  <svg aria-hidden width="11" height="11" viewBox="0 0 12 12" style={{ marginRight: 4 }}>
    <path d="M8 2L4 6l4 4" fill="none" stroke={MINT} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

/** Reveals text letter by letter while `on`, unless motion is reduced. */
function useTyped(text: string, on: boolean, reduce: boolean, cps = 38) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!on) return setN(0);
    if (reduce) return setN(text.length);
    setN(0);
    const id = setInterval(() => setN((v) => (v >= text.length ? (clearInterval(id), v) : v + 1)), 1000 / cps);
    return () => clearInterval(id);
  }, [text, on, reduce, cps]);
  return (
    <>
      {text.slice(0, n)}
      <span style={{ opacity: 0 }}>{text.slice(n)}</span>
    </>
  );
}

export function PeriSimulator() {
  const reduce = useReducedMotion() ?? false;
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [place, setPlace] = useState<Place>("street");
  const [walking, setWalking] = useState(true);
  const [msg, setMsg] = useState<"none" | "held" | "open">("none");
  const [cafe, setCafe] = useState<"idle" | "speaking" | "replied">("idle");
  const [reply, setReply] = useState("");
  const [ask, setAsk] = useState(false);
  const [rec, setRec] = useState<"off" | "on" | "saved">("off");
  const [sec, setSec] = useState(0);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => { const e = entries[0]; if (e) setScale(e.contentRect.width / 1600); });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (rec !== "on") return;
    const id = setInterval(() => setSec((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, [rec]);

  const translated = useTyped("Here you go! Would you like the receipt?", cafe !== "idle", reduce);
  const answer = useTyped("Brick Gothic, with a stepped gable. Common in old Northern European towns.", ask, reduce);

  const stop = () => {
    setWalking(false);
    if (msg === "held") setMsg("open");
  };
  const message = () => setMsg(walking ? "held" : "open");
  const reset = (p: Place) => {
    setPlace(p);
    setWalking(true);
    setMsg("none");
    setCafe("idle");
    setReply("");
    setAsk(false);
    setRec("off");
    setSec(0);
  };

  const moving = place === "street" && walking && !reduce;
  const time = `0:${String(sec).padStart(2, "0")}`;

  // What the HUD shows, as one sentence for screen readers.
  const announce =
    place === "street"
      ? walking
        ? `Walking. Right in 120 metres.${msg === "held" ? " One message held until you stop." : ""}`
        : msg === "open"
          ? "Standing. Message from Mira: Running 5 minutes late, sorry! Grab us a table? Shown now because you stopped walking."
          : "Standing. Right in 40 metres, turn after the yellow house."
      : place === "cafe"
        ? cafe === "idle"
          ? "Listening for nearby speech."
          : reply
            ? `Peri said: ${reply}.`
            : "Barista, Finnish to English: Here you go! Would you like the receipt?"
        : place === "oldtown"
          ? ask
            ? "The brick building. Brick Gothic, with a stepped gable. Based only on what the camera sees."
            : "Nothing needs you."
          : rec === "on"
            ? "Recording. Your outward light is on, so everyone at the table can see the camera is active."
            : rec === "saved"
              ? "Recording saved. Outward light off."
              : "Nothing needs you.";

  let hud: ReactNode = null;
  if (place === "street") {
    hud = walking ? (
      <>
        <div style={s.status}><span style={{ display: "flex", gap: 8, alignItems: "center" }}><Dot />Walking</span><span>17:44</span></div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 10 }}>
          <span style={{ ...s.pill, fontSize: 20, fontWeight: 500 }}>
            <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={MINT} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V4" /><path d="M6 10l6-6 6 6" /></svg>120 m
          </span>
          {msg === "held" && <span style={{ ...s.pill, ...s.mono, color: "#F7FFFB" }}><Dot c="#FFC46B" />1 message held</span>}
        </div>
        <div style={{ flex: 1 }} />
      </>
    ) : (
      <>
        <div style={s.status}><span style={{ display: "flex", gap: 8, alignItems: "center" }}><Dot />Standing</span><span>17:45</span></div>
        {msg === "open" ? (
          <div style={s.card}>
            <div style={s.lab}><span>Message · Mira</span><span>held</span></div>
            <div style={s.mid}>Running 5 min late, sorry! Grab us a table?</div>
            <div style={s.mono}>Shown now because you stopped walking</div>
          </div>
        ) : (
          <div style={s.card}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <svg aria-hidden width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={MINT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 20V12a4 4 0 0 1 4-4h9" /><path d="M15 4l4 4-4 4" /></svg>
              <span style={s.big}>Right in 40 m</span>
            </div>
            <div style={s.small}>Turn after the yellow house</div>
          </div>
        )}
      </>
    );
  } else if (place === "cafe") {
    hud = (
      <>
        <div style={s.status}><span style={{ display: "flex", gap: 8, alignItems: "center" }}><Dot c="#FF9A6B" />Mic · translating</span><span>17:42</span></div>
        {cafe === "idle" ? (
          <div style={{ ...s.mono, textAlign: "center", marginTop: 120 }}>Listening for nearby speech</div>
        ) : (
          <div style={s.card}>
            <div style={s.lab}><span style={{ display: "flex", alignItems: "center" }}><Left />Barista</span><span>FI → EN</span></div>
            <div style={s.src}>Ole hyvä! Haluatko kuitin?</div>
            <div style={s.big}>{translated}</div>
            {reply && <div style={{ ...s.mono, color: MINT }}>Peri said: {reply}</div>}
          </div>
        )}
      </>
    );
  } else if (place === "oldtown") {
    hud = ask ? (
      <>
        <div style={s.status}><span style={{ display: "flex", gap: 8, alignItems: "center" }}><Dot c="#FF9A6B" />Camera · this question only</span><span>12:10</span></div>
        <div style={s.card}>
          <div style={s.lab}><span style={{ display: "flex", alignItems: "center" }}><Left />The brick building</span><span>You asked</span></div>
          <div style={s.src}>“What style is this building?”</div>
          <div style={s.mid}>{answer}</div>
          <div style={s.mono}>Based only on what the camera sees</div>
        </div>
      </>
    ) : (
      <>
        <div style={s.status}><span>12:10</span><span>6°</span></div>
        <div style={{ ...s.mono, textAlign: "center", marginTop: 130 }}>Nothing needs you</div>
      </>
    );
  } else {
    hud =
      rec === "on" ? (
        <>
          <div style={s.status}><span style={{ display: "flex", gap: 8, alignItems: "center" }}><Dot c="#FF6B5E" />Recording · light on</span><span>20:31</span></div>
          <div style={s.card}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className={reduce ? undefined : "peri-blink"}><Dot c="#FF6B5E" size={11} /></span>
              <span style={s.big}>Recording · {time}</span>
            </div>
            <div style={s.small}>Your outward light is on, so everyone at the table can see the camera is active.</div>
          </div>
        </>
      ) : (
        <>
          <div style={s.status}><span>20:31</span><span>{rec === "saved" ? "Saved · light off" : ""}</span></div>
          <div style={{ ...s.mono, textAlign: "center", marginTop: 130 }}>Nothing needs you</div>
        </>
      );
  }

  const photo = PLACES.find((p) => p.id === place)!;

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7">
      <style>{`
        @keyframes peri-walk { 0%{transform:translate(0,0) scale(1.1) rotate(0deg)} 25%{transform:translate(-6px,-9px) scale(1.1) rotate(-.25deg)} 50%{transform:translate(0,0) scale(1.1) rotate(0deg)} 75%{transform:translate(6px,-9px) scale(1.1) rotate(.25deg)} 100%{transform:translate(0,0) scale(1.1) rotate(0deg)} }
        @keyframes peri-blink { 0%,100%{opacity:1} 50%{opacity:.3} }
        .peri-blink{animation:peri-blink 1s steps(1) infinite}
      `}</style>
      <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
        Try it yourself
      </p>
      <p className="mt-2 max-w-[var(--measure)] text-[var(--color-text)]">
        Pick a place, then act in it. Watch how the world moves while the display stays put, and how little Peri shows while you walk.
      </p>

      <div role="tablist" aria-label="Places" className="mt-5 flex flex-wrap gap-2">
        {PLACES.map((p) => (
          <button
            key={p.id}
            role="tab"
            type="button"
            aria-selected={place === p.id}
            onClick={() => reset(p.id)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
              place === p.id
                ? "border-[var(--color-text)] bg-[var(--color-text)] text-[var(--color-surface)]"
                : "border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-text)]"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div
        ref={stageRef}
        className="relative mt-4 w-full overflow-hidden rounded-[var(--radius-md)] bg-black"
        style={{ aspectRatio: "16 / 9", position: "relative", overflow: "hidden", width: "100%" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={photo.id}
          src={photo.photo}
          alt={photo.alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            transform: "scale(1.1)",
            animation: moving ? "peri-walk 1.1s ease-in-out infinite" : undefined,
            transition: "transform .6s ease",
          }}
        />
        <div aria-hidden className="absolute inset-0" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 75% at 56% 46%, rgba(0,0,0,0) 50%, rgba(0,0,0,.6) 100%), rgba(8,14,20,.18)" }} />
        {rec === "on" && place === "dinner" && (
          <span
            aria-hidden
            className="absolute rounded-full px-3 py-1 text-[11px]"
            style={{ position: "absolute", left: "4%", top: "6%", fontFamily: MONO, color: "#fff", border: "1px dashed rgba(255,255,255,.6)", background: "rgba(0,0,0,.35)" }}
          >
            What others see: the outward light is on
          </span>
        )}
        <div
          aria-hidden
          className="absolute left-0 top-0 origin-top-left"
          style={{ position: "absolute", left: 0, top: 0, transformOrigin: "top left", pointerEvents: "none", width: 1600, height: 900, transform: `scale(${scale})`, fontFamily: "inherit", color: "#F2FBF7" }}
        >
          <div style={{ position: "absolute", left: 900, top: 200, width: 520, height: 400 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 20, border: "1px solid rgba(255,255,255,.14)" }} />
            {(["tl", "tr", "bl", "br"] as const).map((c) => (
              <div
                key={c}
                style={{
                  position: "absolute", width: 22, height: 22, borderColor: "rgba(124,245,200,.75)", borderStyle: "solid",
                  [c[0] === "t" ? "top" : "bottom"]: -1, [c[1] === "l" ? "left" : "right"]: -1,
                  borderWidth: `${c[0] === "t" ? 2 : 0}px ${c[1] === "r" ? 2 : 0}px ${c[0] === "b" ? 2 : 0}px ${c[1] === "l" ? 2 : 0}px`,
                  borderRadius: c === "tl" ? "20px 0 0 0" : c === "tr" ? "0 20px 0 0" : c === "bl" ? "0 0 0 20px" : "0 0 20px 0",
                }}
              />
            ))}
            <div style={{ position: "absolute", left: 0, top: 410, font: `500 11px ${MONO}`, letterSpacing: ".08em", color: "rgba(242,251,247,.6)" }}>
              DISPLAY AREA · RIGHT LENS
            </div>
            <div style={{ position: "absolute", inset: 0, padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>{hud}</div>
          </div>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{announce}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {place === "street" && (
          <>
            <Button type="button" variant="secondary" size="sm" withArrow={false} onClick={() => (walking ? stop() : setWalking(true))}>
              {walking ? "Stop walking" : "Start walking"}
            </Button>
            <Button type="button" variant="secondary" size="sm" withArrow={false} onClick={message} disabled={msg !== "none"}>
              Get a message
            </Button>
          </>
        )}
        {place === "cafe" &&
          (cafe === "idle" ? (
            <Button type="button" variant="secondary" size="sm" withArrow={false} onClick={() => setCafe("speaking")}>
              Let the barista speak
            </Button>
          ) : (
            <>
              <Button type="button" variant="secondary" size="sm" withArrow={false} onClick={() => { setReply("Kyllä, kiitos"); setCafe("replied"); }}>
                Reply: Yes, please
              </Button>
              <Button type="button" variant="secondary" size="sm" withArrow={false} onClick={() => { setReply("Ei kiitos"); setCafe("replied"); }}>
                Reply: No, thanks
              </Button>
            </>
          ))}
        {place === "oldtown" && (
          <Button type="button" variant="secondary" size="sm" withArrow={false} onClick={() => setAsk(!ask)}>
            {ask ? "Done, camera off" : "Ask: what style is this building?"}
          </Button>
        )}
        {place === "dinner" && (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            withArrow={false}
            onClick={() => (rec === "on" ? setRec("saved") : (setSec(0), setRec("on")))}
          >
            {rec === "on" ? "Stop and save" : "Start recording"}
          </Button>
        )}
      </div>
      <p className="mt-3 text-sm text-[var(--color-text-muted)]">
        A concept prototype. Stock photos stand in for the real world, and the display area is drawn larger than it would appear on real glasses so it can be read on a screen.
      </p>
    </div>
  );
}
