/* Trailer engine: builds one project's showcase from a spec of scenes made
 * of real screens, as Web Animations that are paused and driven frame by
 * frame by __seek(t), so rendering is deterministic.
 *
 * ?p=<project>        which spec to build
 * &thumb=1            card version: no title, captions, labels or outro;
 *                     compositions re-centred; the first scene is replayed
 *                     at the end so the clip loops without a seam. */
(function () {
  const P = new URLSearchParams(location.search);
  const THUMB = P.has("thumb");
  const raw = window.SPECS[P.get("p")];
  const stage = document.getElementById("stage");
  const W = window.innerWidth;
  const H = window.innerHeight;
  const wide = W / H > 1.5;
  const K = THUMB ? 16 / 9 / (W / H) : 1; // spreads x offsets for narrower frames
  stage.style.setProperty("--H", H + "px");
  stage.style.setProperty("--tint", raw.tint);
  const IMG = (id) => (id.startsWith("./") ? id : id.startsWith("/") ? "../../public" + id : "../../public/media/framer/" + id);

  const E = {
    out: "cubic-bezier(.16,1,.3,1)",
    rise: "cubic-bezier(.45,0,.2,1)",
    inOut: "cubic-bezier(.65,0,.35,1)",
    in: "cubic-bezier(.7,0,.84,0)",
    exit: "cubic-bezier(.4,0,1,1)",
    lin: "linear",
  };
  const anims = [];
  const seen = new WeakMap(); // element -> properties already animated
  function anim(node, frames, start, dur, easing = E.out) {
    const props = Object.keys(Array.isArray(frames) ? frames[0] : frames).filter((k) => k !== "offset" && k !== "easing");
    const used = seen.get(node) || new Set();
    const first = props.every((p) => !used.has(p));
    props.forEach((p) => used.add(p));
    seen.set(node, used);
    const a = node.animate(frames, { duration: Math.max(1, dur * 1000), delay: start * 1000, fill: first ? "both" : "forwards", easing });
    a.pause();
    anims.push(a);
    return a;
  }
  const el = (tag, cls, parent, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    (parent || stage).appendChild(n);
    return n;
  };
  const px = (v) => v + "px";

  // ---------------------------------------------------------------- spec prep
  // Shift every absolute time inside a scene (t, at, out, swaps) by dt.
  function shift(v, dt, key) {
    if (Array.isArray(v)) return v.map((x) => (key === "swaps" && typeof x === "number" ? x + dt : shift(x, dt)));
    if (v && typeof v === "object") {
      const o = {};
      for (const k of Object.keys(v)) o[k] = ["t", "at", "out"].includes(k) && typeof v[k] === "number" ? v[k] + dt : shift(v[k], dt, k);
      return o;
    }
    return v;
  }

  let spec = raw;
  let T0 = 0;
  let D = raw.duration;
  if (THUMB) {
    // Per-scene and per-item `thumb` objects override the hook layout.
    const kept = raw.scenes
      .filter((s) => s.type !== "title" && s.type !== "outro")
      .map((s) => {
        const o = { ...s, ...(s.thumb || {}), caption: null };
        if (o.items) o.items = o.items.map((it) => ({ ...it, ...(it.thumb || {}) }));
        return o;
      });
    const first = kept[0];
    const lastEnd = Math.max(...kept.map((s) => s.t + s.d));
    const tc = lastEnd - (raw.thumbOverlap ?? 0.25);
    kept.push(shift(first, tc - first.t));
    T0 = first.t + (first.fadeIn ?? 0.45);
    D = tc - first.t;
    spec = { ...raw, scenes: kept };
  }

  // Ambient light drifts and returns, so the last frame meets the first.
  const glow = stage.querySelector(".glow");
  anim(glow, [{ transform: "translate(-6%,0) scale(1)" }, { transform: "translate(6%,4%) scale(1.12)" }, { transform: "translate(-6%,0) scale(1)" }], T0, D, E.inOut);

  function sceneShell(s) {
    const node = el("div", "scene");
    const fadeIn = s.fadeIn ?? 0.45;
    const fadeOut = s.fadeOut ?? 0.45;
    anim(node, [{ opacity: 0 }, { opacity: 1 }], s.t, fadeIn, E.inOut);
    anim(node, [{ opacity: 1 }, { opacity: 0 }], s.t + s.d - fadeOut, fadeOut, E.inOut);
    return node;
  }

  function caption(parent, c) {
    if (!c || THUMB) return;
    const scrim = el("div", "scrim", parent);
    anim(scrim, [{ opacity: 0 }, { opacity: 1 }], c.at - 0.2, 0.6, E.inOut);
    const n = el("div", "caption", parent, `<div class="k">${c.k}</div><div class="t">${c.t}</div>`);
    if (!wide) n.style.maxWidth = "80%";
    anim(n, [{ opacity: 0, transform: "translateY(30%)" }, { opacity: 1, transform: "translateY(0)" }], c.at, 0.7, E.out);
    if (c.out) anim(n, [{ opacity: 1 }, { opacity: 0 }], c.out, 0.35, E.in);
  }

  // Thumbnail framing: re-centre a scene's composition and spread it for
  // the narrower frame. Hook versions keep the authored positions.
  // Phones keep their height, so they spread by the aspect change; windows
  // and cards shrink to keep their share of the width, so they don't.
  function xMapper(items) {
    if (!THUMB) return (x) => x;
    const xs = items.map((o) => o.x);
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
    return (x, kind) => 0.5 + (x - cx) * ((kind || "phone") === "phone" ? K : 1);
  }
  const TS = THUMB && !wide ? raw.thumbScale ?? 0.8 : 1;

  // ------------------------------------------------------------- the frames
  const CURSOR = `<svg viewBox="0 0 24 24"><path d="M4 2.5 L4 19.2 L8.4 15.2 L11.3 21.6 L14.2 20.3 L11.4 14.1 L17.4 14.1 Z" fill="#fff" stroke="#111" stroke-width="1.4" stroke-linejoin="round"/></svg>`;

  /** Screen contents shared by every frame kind: stacked screens that swap,
   * a camera that can zoom, a cursor or finger taps, and highlight rings. */
  function screen(scr, o, sw, sh) {
    scr.style.setProperty("--sw", px(sw));
    const cam = el("div", "cam", scr);
    const imgs = (o.screens || []).map((id, i) => {
      const im = el("img", "", cam);
      im.src = IMG(id);
      im.style.zIndex = String(i + 1);
      if (o.fit) im.style.objectFit = o.fit;
      if (o.pos) im.style.objectPosition = o.pos;
      return im;
    });
    (o.swaps || []).forEach((at, i) => {
      const im = imgs[i + 1];
      if (!im) return;
      if ((o.swap ?? (o.kind === "phone" ? "slide" : "fade")) === "slide") anim(im, [{ transform: "translateY(102%)" }, { transform: "translateY(0)" }], at, 0.6, E.out);
      else anim(im, [{ opacity: 0 }, { opacity: 1 }], at, 0.32, E.inOut);
    });
    if (o.scroll) {
      const im = imgs[o.scroll.index ?? 0];
      im.style.height = "auto";
      im.style.bottom = "auto";
      anim(im, [{ transform: "translateY(0)" }, { transform: `translateY(${o.scroll.by})` }], o.scroll.at, o.scroll.d, E.inOut);
    }
    // Camera: each step eases from the previous framing to the next.
    let prev = { s: 1, x: 0.5, y: 0.5 };
    (o.zoom || []).forEach((z) => {
      const next = { s: z.s, x: z.x ?? prev.x, y: z.y ?? prev.y };
      anim(cam, [{ transform: `scale(${prev.s})`, transformOrigin: `${prev.x * 100}% ${prev.y * 100}%` }, { transform: `scale(${next.s})`, transformOrigin: `${next.x * 100}% ${next.y * 100}%` }], z.at, z.d, z.ease ? E[z.ease] : E.inOut);
      prev = next;
    });
    (o.rings || []).forEach((r) => {
      const ring = el("div", "ring", cam);
      Object.assign(ring.style, { left: r.x * 100 + "%", top: r.y * 100 + "%", width: r.w * 100 + "%", height: r.h * 100 + "%" });
      const dur = r.d ?? 1.4;
      anim(ring, [{ opacity: 0, transform: "scale(1.12)" }, { opacity: 1, transform: "scale(1)", offset: 0.25 }, { opacity: 1, transform: "scale(1)", offset: 0.8 }, { opacity: 0, transform: "scale(1)" }], r.at, dur, E.out);
    });
    if (o.cursor) {
      const c = o.cursor;
      const cur = el("div", "cur", cam, CURSOR);
      const p0 = c.path[0];
      cur.style.left = p0.x * 100 + "%";
      cur.style.top = p0.y * 100 + "%";
      anim(cur, [{ opacity: 0 }, { opacity: 1 }], p0.at, 0.25, E.inOut);
      for (let i = 1; i < c.path.length; i++) {
        const a = c.path[i - 1];
        const b = c.path[i];
        anim(cur, [{ left: a.x * 100 + "%", top: a.y * 100 + "%" }, { left: b.x * 100 + "%", top: b.y * 100 + "%" }], a.at + (a.hold ?? 0), b.at - a.at - (a.hold ?? 0), E.inOut);
      }
      (c.clicks || []).forEach((at) => {
        anim(cur, [{ transform: "scale(1)" }, { transform: "scale(.82)", offset: 0.35 }, { transform: "scale(1)" }], at, 0.28, E.out);
        const pt = [...c.path].reverse().find((p) => p.at <= at) || p0;
        const rip = el("div", "ripple", cam);
        rip.style.left = pt.x * 100 + "%";
        rip.style.top = pt.y * 100 + "%";
        anim(rip, [{ opacity: 0.9, transform: "translate(-50%,-50%) scale(.2)" }, { opacity: 0, transform: "translate(-50%,-50%) scale(1.6)" }], at, 0.6, E.out);
      });
      if (c.out) anim(cur, [{ opacity: 1 }, { opacity: 0 }], c.out, 0.3, E.inOut);
    }
    (o.taps || []).forEach((t) => {
      const tap = el("div", "tap", cam);
      tap.style.left = t.x * 100 + "%";
      tap.style.top = t.y * 100 + "%";
      anim(tap, [{ opacity: 0, transform: "translate(-50%,-50%) scale(.6)" }, { opacity: 1, transform: "translate(-50%,-50%) scale(1)", offset: 0.3 }, { opacity: 0, transform: "translate(-50%,-50%) scale(1.5)" }], t.at, 0.7, E.out);
    });
    return cam;
  }

  /** One device or window, absolutely positioned on the stage. Sizes are in
   * stage-height units, so a layout holds across aspect ratios. */
  function frame(parent, o, X) {
    const kind = o.kind || "phone";
    let w;
    let h;
    let n;
    let scr;
    if (kind === "phone") {
      h = o.h * H;
      w = (h * 9) / 19.5;
      n = el("div", "phone", parent);
      n.style.setProperty("--pw", px(w));
      scr = el("div", "scr", n);
      el("div", "island", scr);
      screen(scr, o, w * 0.93, h * 0.965);
    } else if (kind === "browser") {
      w = o.w * H * (o.fixed ? 1 : TS);
      const bar = w * 0.03;
      h = w / (o.ar ?? 1.6) + bar;
      n = el("div", "win", parent);
      n.style.setProperty("--ww", px(w));
      n.style.setProperty("--bar", px(bar));
      el("div", "bar", n, "<i></i><i></i><i></i>");
      scr = el("div", "scr", n);
      screen(scr, o, w, h - bar);
    } else {
      w = o.w * H * (o.fixed ? 1 : TS);
      h = w / (o.ar ?? 1);
      n = el("div", "card", parent);
      n.style.setProperty("--cw", px(w));
      if (o.bg) n.style.background = o.bg;
      scr = el("div", "scr", n);
      screen(scr, { fit: "cover", pos: "left top", ...o }, w, h);
    }
    n.style.width = px(w);
    n.style.height = px(h);
    n.style.left = px((X ? X(o.x, kind) : o.x) * W - w / 2);
    n.style.top = px(H * (o.y ?? 0.5) - h / 2);
    return n;
  }

  const builders = {
    title(s) {
      const node = sceneShell(s);
      const box = el("div", "title", node);
      const k = el("div", "kicker", box, s.kicker);
      k.style.position = "absolute";
      k.style.top = px(-H * 0.12);
      anim(k, [{ opacity: 0, transform: "translateY(40%)" }, { opacity: 1, transform: "translateY(0)" }], s.t + 0.15, 0.6);
      s.lines.forEach((line) => {
        const ln = el("div", "headline line", box);
        ln.style.top = px(-H * 0.05);
        const parts = line.text.split(/(\[[^\]]+\])/g).filter(Boolean);
        let wi = 0;
        parts.forEach((part) => {
          const isMark = part.startsWith("[");
          const words = (isMark ? part.slice(1, -1) : part).split(/(\s+)/);
          words.forEach((wd) => {
            if (!wd) return;
            if (/^\s+$/.test(wd)) {
              ln.appendChild(document.createTextNode(" "));
              return;
            }
            const span = el("span", "w", ln);
            if (isMark) {
              const m = el("mark", "", span, wd);
              anim(m, [{ backgroundSize: "0% 88%" }, { backgroundSize: "100% 88%" }], line.at + 0.55, 0.5, E.out);
            } else span.textContent = wd;
            anim(span, [{ opacity: 0, transform: "translateY(0.45em)", filter: "blur(8px)" }, { opacity: 1, transform: "translateY(0)", filter: "blur(0)" }], line.at + wi * 0.06, 0.7, E.out);
            wi++;
          });
        });
        if (line.out) anim(ln, [{ opacity: 1, transform: "translateY(0)" }, { opacity: 0, transform: "translateY(-0.25em)" }], line.out, 0.4, E.in);
      });
      anim(box, [{ transform: "translateY(-50%) scale(1)" }, { transform: "translateY(-50%) scale(1.04)" }], s.t, s.d, E.lin);
    },

    /** Devices, windows and cards floating in one 3D rig. */
    float(s) {
      const node = sceneShell(s);
      const persp = el("div", "persp", node);
      const rig = el("div", "rig", persp);
      const items = s.items || s.phones;
      const X = xMapper(items);
      items.forEach((o, i) => {
        const holder = el("div", "rig", rig);
        const n = frame(holder, o, X);
        const final = `rotateX(${o.rotX || 0}deg) rotateY(${o.rotY || 0}deg) rotateZ(${o.rotZ || 0}deg) translateZ(${o.z || 0}px)`;
        const at = s.t + 0.1 + (o.delay ?? i * 0.12);
        if ((o.enter ?? s.enter) === "fly") {
          anim(n, [{ opacity: 0, transform: `${final} translateZ(${-H * 0.9}px)` }, { opacity: 1, transform: final }], at, 1.2, E.out);
        } else {
          anim(n, [{ opacity: 0, transform: `translateY(${H * 0.5}px) rotateX(24deg) ${final}` }, { opacity: 1, transform: `translateY(0) rotateX(0deg) ${final}` }], at, 1.1, E.out);
        }
        if (o.drift) anim(holder, [{ transform: "translate3d(0,0,0)" }, { transform: `translate3d(${(o.drift.x ?? 0) * H}px,${(o.drift.y ?? 0) * H}px,0)` }], s.t, s.d, E.lin);
        if (o.out) anim(n, [{ opacity: 1 }, { opacity: o.outTo ?? 0 }], o.out, 0.45, E.inOut);
      });
      anim(rig, [{ transform: `scale(1) rotateY(0deg) rotateX(${s.tilt ?? 0}deg)` }, { transform: `scale(${s.push ?? 1.06}) rotateY(${s.turn ?? -3}deg) rotateX(${s.tilt ?? 0}deg)` }], s.t, s.d, E.inOut);
      caption(node, s.caption);
    },

    phones(s) {
      builders.float(s);
    },

    row(s) {
      const node = sceneShell(s);
      const persp = el("div", "persp", node);
      const rig = el("div", "rig", persp);
      const kind = s.kind || "phone";
      const h = s.h * H;
      const w = kind === "phone" ? (h * 9) / 19.5 : s.w * H;
      const gap = w * (s.gap ?? 0.22);
      s.screens.forEach((id, i) => {
        const x = (i * (w + gap) + w / 2) / W;
        const n = frame(rig, { kind, h: s.h, w: s.w, ar: s.ar, x, y: s.y ?? 0.47, screens: [id], fixed: true });
        anim(n, [{ opacity: 0, transform: "translateY(12%)" }, { opacity: 1, transform: "translateY(0)" }], s.t + 0.1 + i * 0.08, 0.8, E.out);
      });
      const total = s.screens.length * (w + gap) - gap;
      const from = W * (s.from ?? 0.55);
      const to = W - total - W * (s.to ?? 0.08);
      anim(rig, [{ transform: `translateX(${from}px) rotateY(-14deg) rotateX(4deg)` }, { transform: `translateX(${to}px) rotateY(-14deg) rotateX(4deg)` }], s.t, s.d, E.inOut);
      caption(node, s.caption);
    },

    wall(s) {
      const node = sceneShell(s);
      const persp = el("div", "persp", node);
      persp.style.perspective = px(H * 3.2);
      const wall = el("div", "wall", persp);
      const kind = s.kind || "phone";
      const h = kind === "phone" ? s.h * H : (s.w * H) / (s.ar ?? 1.6) + s.w * H * 0.03;
      const w = kind === "phone" ? (h * 9) / 19.5 : s.w * H;
      const gx = w * (kind === "phone" ? 0.18 : 0.08);
      const gy = h * (kind === "phone" ? 0.06 : 0.1);
      const cols = s.cols;
      const rows = Math.ceil(s.screens.length / cols);
      const ww = cols * w + (cols - 1) * gx;
      const wh = rows * h + (rows - 1) * gy;
      wall.style.width = px(ww);
      wall.style.height = px(wh);
      s.screens.forEach((id, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        const n = frame(wall, { kind, h: s.h, w: s.w, ar: s.ar, x: 0, y: 0, screens: [id], fixed: true });
        n.style.left = px(c * (w + gx));
        n.style.top = px(r * (h + gy) + (c % 2 ? h * (s.stagger ?? 0.35) : 0));
        anim(n, [{ opacity: 0, transform: "translateZ(-200px)" }, { opacity: 1, transform: "translateZ(0)" }], s.t + 0.05 + (c + r) * 0.05, 0.9, E.out);
      });
      const base = `translate(-50%,-50%) rotateX(${s.tilt ?? 50}deg) rotateZ(${s.spin ?? -28}deg)`;
      anim(wall, [{ transform: `${base} translateY(${wh * 0.08}px)` }, { transform: `${base} translateY(${-wh * 0.1}px)` }], s.t, s.d, E.lin);
      caption(node, s.caption);
    },

    /** An exploded stack: flat layers of cards that lift apart in 3D. */
    layers(s) {
      const node = sceneShell(s);
      const persp = el("div", "persp", node);
      persp.style.perspective = px(H * 3.4);
      const pw = s.pw * H;
      const ph = s.ph * H;
      const stack = el("div", "wall", persp);
      stack.style.width = px(pw);
      stack.style.height = px(ph);
      s.layers.forEach((L, li) => {
        const plane = el("div", "plane", stack);
        L.items.forEach((o, i) => {
          const n = frame(plane, { kind: "card", ...o, x: o.x * (pw / W), y: o.y * (ph / H), fixed: true });
          n.style.left = px(o.x * pw - (o.w * H) / 2);
          n.style.top = px(o.y * ph - (o.w * H) / (o.ar ?? 1) / 2);
          anim(n, [{ opacity: 0 }, { opacity: 1 }], s.t + 0.15 + li * 0.25 + i * 0.06, 0.6, E.inOut);
        });
        if (L.label && !THUMB) {
          const lab = el("div", "plabel", plane, L.label);
          anim(lab, [{ opacity: 0 }, { opacity: 1 }], (L.at ?? s.t + 0.6) + 0.2, 0.5, E.inOut);
        }
        anim(plane, [{ transform: "translateZ(0px)" }, { transform: `translateZ(${L.z * H}px)` }], L.at ?? s.t + 0.6, 1.2, E.out);
      });
      const base = `translate(-50%,-50%) rotateX(${s.tilt ?? 56}deg) rotateZ(${s.spin ?? -32}deg)`;
      anim(stack, [{ transform: `${base} scale(.94)` }, { transform: `${base} scale(1.02)` }], s.t, s.d, E.lin);
      caption(node, s.caption);
    },

    /** Lumi's finding drawn as the trust line: slow rises, one fast break.
     * Same rhythm as the site's demo (rise 1.2 s, break 0.14 s). */
    trust(s) {
      const node = sceneShell(s);
      const box = el("div", "trust", node);
      const X0 = W * (THUMB ? 0.1 : s.x0 ?? 0.12);
      const X1 = W * (THUMB ? 0.9 : s.x1 ?? 0.9);
      const top = H * (THUMB ? 0.24 : s.top ?? 0.2);
      const bot = H * (THUMB ? 0.74 : s.bottom ?? 0.6);
      const Y = (lv) => bot - (lv / 100) * (bot - top);
      const n = s.events.length;
      const step = (X1 - X0) / (n + 0.6);
      const pts = [{ x: X0, y: Y(s.start ?? 14) }];
      let lvl = s.start ?? 14;
      const segs = [];
      s.events.forEach((ev, i) => {
        const a = pts[pts.length - 1];
        const isBreak = ev.level < lvl;
        lvl = ev.level;
        const b = { x: X0 + step * (i + 1), y: Y(lvl) };
        const dx = b.x - a.x;
        const d = isBreak ? `L${a.x + dx * 0.08} ${b.y} L${b.x} ${b.y}` : `C${a.x + dx * 0.55} ${a.y} ${b.x - dx * 0.3} ${b.y} ${b.x} ${b.y}`;
        segs.push({ d, isBreak, at: ev.at, ev, b });
        pts.push(b);
      });
      const tail = { x: X1, y: pts[pts.length - 1].y };
      segs.push({ d: `L${tail.x} ${tail.y}`, tail: true, at: s.tailAt ?? segs[segs.length - 1].at + 0.5 });
      const full = `M${pts[0].x} ${pts[0].y} ` + segs.map((g) => g.d).join(" ");
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.setAttribute("class", "tsvg");
      box.appendChild(svg);
      const NS = "http://www.w3.org/2000/svg";
      const guide = document.createElementNS(NS, "line");
      Object.entries({ x1: X0, x2: X1, y1: bot + H * 0.04, y2: bot + H * 0.04, class: "tguide" }).forEach(([k, v]) => guide.setAttribute(k, v));
      svg.appendChild(guide);
      const path = document.createElementNS(NS, "path");
      path.setAttribute("d", full);
      path.setAttribute("class", "tline");
      svg.appendChild(path);
      // Cumulative length at the end of each segment, measured on a scratch path.
      const probe = document.createElementNS(NS, "path");
      svg.appendChild(probe);
      let acc = `M${pts[0].x} ${pts[0].y}`;
      const total = path.getTotalLength();
      const ends = segs.map((g) => {
        acc += " " + g.d;
        probe.setAttribute("d", acc);
        return probe.getTotalLength() / total;
      });
      probe.remove();
      path.style.strokeDasharray = `${total}`;
      const dot = el("div", "tdot", box);
      dot.style.offsetPath = `path("${full}")`;
      let from = 0;
      segs.forEach((g, i) => {
        const dur = g.isBreak ? 0.14 : g.tail ? 0.7 : s.rise ?? 1.2;
        const ease = g.isBreak ? E.exit : g.tail ? E.inOut : E.rise;
        anim(path, [{ strokeDashoffset: total * (1 - from) }, { strokeDashoffset: total * (1 - ends[i]) }], g.at, dur, ease);
        anim(dot, [{ offsetDistance: from * 100 + "%" }, { offsetDistance: ends[i] * 100 + "%" }], g.at, dur, ease);
        if (g.ev && !THUMB) {
          const lab = el("div", "tlabel" + (g.isBreak ? " is-break" : ""), box, `<span>${String(i + 1).padStart(2, "0")}</span>${g.ev.label}`);
          lab.style.left = px(g.b.x);
          lab.style.top = px(g.isBreak ? g.b.y + H * 0.045 : g.b.y - H * 0.075);
          anim(lab, [{ opacity: 0, transform: "translate(-50%,30%)" }, { opacity: 1, transform: "translate(-50%,0)" }], g.at + (g.isBreak ? 0.12 : 0.75), 0.5, E.out);
        }
        if (g.isBreak) {
          anim(box, [{ transform: "translateX(0)" }, { transform: `translateX(${-H * 0.006}px)`, offset: 0.25 }, { transform: `translateX(${H * 0.005}px)`, offset: 0.5 }, { transform: "translateX(0)" }], g.at + 0.1, 0.3, E.lin);
          const flash = el("div", "tflash", box);
          anim(flash, [{ opacity: 0 }, { opacity: 0.5, offset: 0.15 }, { opacity: 0 }], g.at + 0.08, 0.7, E.out);
        }
        from = ends[i];
      });
      anim(dot, [{ opacity: 0 }, { opacity: 1 }], s.t + 0.2, 0.4, E.inOut);
      caption(node, s.caption);
    },

    outro(s) {
      const node = sceneShell(s);
      const box = el("div", "outro", node);
      box.innerHTML = `<svg viewBox="0 0 32 20"><path d="M3 16.5 C10 16.2 15.6 12 21 3.5 L24 16.5 C26.2 15.6 28 14.8 30 14.2" fill="none" stroke="#FFD84A" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="10" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg><div class="name">${s.name}</div><div class="kicker">${s.kicker || ""}</div>`;
      const path = box.querySelector("path");
      anim(path, [{ strokeDashoffset: 1, offset: 0 }, { strokeDashoffset: 0.46, offset: 0.6 }, { strokeDashoffset: 0.15, offset: 0.69 }, { strokeDashoffset: 0 }], s.t + 0.1, 1.1, E.lin);
      const name = box.querySelector(".name");
      anim(name, [{ opacity: 0, transform: "translateY(20%)" }, { opacity: 1, transform: "translateY(0)" }], s.t + 0.35, 0.6);
      const k = box.querySelector(".kicker");
      anim(k, [{ opacity: 0 }, { opacity: 1 }], s.t + 0.55, 0.5);
    },
  };

  spec.scenes.forEach((s) => builders[s.type](s));
  el("div", "grain");
  el("div", "vignette");

  window.__duration = D;
  window.__seek = (t) => anims.forEach((a) => (a.currentTime = (t + T0) * 1000));
  window.__ready = Promise.all([
    document.fonts.ready,
    ...[...document.images].map((im) => (im.complete ? Promise.resolve() : new Promise((r) => (im.onload = im.onerror = r)))),
  ]).then(() => Promise.all([...document.images].map((im) => im.decode().catch(() => {}))));
})();
