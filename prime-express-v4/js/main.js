/* Prime Express · motor de recorrido
   Un solo rAF: el scroll nativo manda, los valores se suavizan (lerp) y se escriben
   como custom properties. Nada de scroll-jacking: sticky, anclas e inercia móvil intactos. */
(() => {
  "use strict";

  const q = (sel, root = document) => root.querySelector(sel);
  const qa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
  const smoothstep = (t) => { const s = t * t * (3 - 2 * t); return s * s * (3 - 2 * s); };
  const between = (v, a, b) => clamp((v - a) / (b - a));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- menú y barra superior ---------- */

  const topbar = q("[data-topbar]");
  const drawer = q("[data-drawer]");
  const menuBtn = q("[data-menu]");

  const setDrawer = (open) => {
    if (!drawer || !menuBtn) return;
    drawer.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    menuBtn.querySelector("use")?.setAttribute("href", open ? "#i-close" : "#i-menu");
    document.body.style.overflow = open ? "hidden" : "";
  };

  menuBtn?.addEventListener("click", () => setDrawer(!drawer.classList.contains("is-open")));
  drawer?.addEventListener("click", (e) => { if (e.target.closest("a")) setDrawer(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setDrawer(false); });

  /* ---------- secciones y rail ---------- */

  const rail = q("[data-rail]");
  const railFill = q("[data-rail-fill]");
  const railItems = qa("[data-rail-item]");
  const sections = railItems.map((a) => document.getElementById(a.dataset.railItem)).filter(Boolean);
  const darkSections = qa(".dark, .aisle");

  /* ---------- pasillo (A-01) ---------- */

  const aisle = q("[data-aisle]");
  const canvas = q("[data-canvas]");
  const scenes = qa(".scene");
  const meters = qa(".aisle-meter span");
  const boot = q("[data-boot]");
  const bootFill = q("[data-boot-fill]");
  const bootPct = q("[data-boot-pct]");

  const TOTAL = 200;
  const PRIORITY = 10;
  const small = window.matchMedia("(max-width: 860px)").matches;
  const dir = small ? "hero-frames-sm" : "hero-frames";
  const frames = new Array(TOTAL).fill(null);
  const asked = new Set();
  const ctx = canvas ? canvas.getContext("2d", { alpha: false }) : null;

  let ready = 0;
  let drawn = -1;

  const src = (i) => `${dir}/frame-${String(i + 1).padStart(3, "0")}.webp`;

  const paint = (img) => {
    if (!ctx || !canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.7);
    const w = Math.round(canvas.clientWidth * dpr);
    const h = Math.round(canvas.clientHeight * dpr);
    if (!w || !h) return;
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = w / h;
    let sw = img.naturalWidth, sh = img.naturalHeight, sx = 0, sy = 0;
    if (ir > cr) { sw = img.naturalHeight * cr; sx = (img.naturalWidth - sw) / 2; }
    else { sh = img.naturalWidth / cr; sy = (img.naturalHeight - sh) / 2; }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
  };

  const nearest = (i) => {
    if (frames[i]) return frames[i];
    for (let d = 1; d < TOTAL; d += 1) {
      if (i - d >= 0 && frames[i - d]) return frames[i - d];
      if (i + d < TOTAL && frames[i + d]) return frames[i + d];
    }
    return null;
  };

  const show = (i) => {
    const img = nearest(i);
    if (img) { paint(img); drawn = i; }
  };

  const closeBoot = () => {
    if (!boot) return;
    boot.classList.add("is-gone");
    document.body.classList.remove("is-booting");
    window.setTimeout(() => boot.setAttribute("hidden", ""), 700);
  };

  const ask = (i, priority = false) => {
    if (i < 0 || i >= TOTAL || asked.has(i)) return;
    asked.add(i);
    const img = new Image();
    img.decoding = "async";
    img.src = src(i);
    img.addEventListener("load", () => {
      frames[i] = img;
      if (priority) {
        ready += 1;
        const pct = Math.round((ready / PRIORITY) * 100);
        if (bootFill) bootFill.style.transform = `scaleX(${pct / 100})`;
        if (bootPct) bootPct.textContent = String(pct);
        if (ready === PRIORITY) { show(0); closeBoot(); }
      }
      if (Math.abs(i - drawn) <= 2) show(drawn < 0 ? 0 : drawn);
    });
    img.addEventListener("error", () => {
      if (priority) { ready += 1; if (ready === PRIORITY) closeBoot(); }
    });
  };

  if (canvas && !reduced.matches) {
    document.body.classList.add("is-booting");
    for (let i = 0; i < PRIORITY; i += 1) ask(i, true);
    window.setTimeout(closeBoot, 2500);
    window.setTimeout(() => {
      let i = PRIORITY;
      const batch = () => {
        const end = Math.min(i + 12, TOTAL);
        for (; i < end; i += 1) ask(i);
        if (i < TOTAL) window.setTimeout(batch, 90);
      };
      batch();
    }, 700);
  } else {
    boot?.classList.add("is-gone");
    boot?.setAttribute("hidden", "");
  }

  /* ---------- mapa WMS ---------- */

  const map = q("[data-map]");
  const grid = q(".wms-grid");
  if (grid) {
    const n = Number(grid.dataset.unitCount) || 40;
    for (let i = 0; i < n; i += 1) {
      const cell = document.createElement("i");
      if (i % 9 === 3 || i % 13 === 7) cell.className = "is-hot";
      grid.appendChild(cell);
    }
    if (!reduced.matches) {
      const cells = Array.from(grid.children);
      let timer = null;
      const cycle = () => {
        const off = cells.filter((c) => !c.classList.contains("is-hot"));
        const on = cells.filter((c) => c.classList.contains("is-hot"));
        on[Math.floor(Math.random() * on.length)]?.classList.remove("is-hot");
        off[Math.floor(Math.random() * off.length)]?.classList.add("is-hot");
      };
      new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && timer === null) timer = window.setInterval(cycle, 1400);
          else if (!entry.isIntersecting && timer !== null) { window.clearInterval(timer); timer = null; }
        });
      }, { threshold: 0.2 }).observe(map || grid);
    }
  }

  /* ---------- video de fondo bajo demanda ---------- */

  const video = q("[data-video]");
  if (video && !reduced.matches) {
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!video.dataset.on) { video.dataset.on = "1"; video.load(); }
          video.play().catch(() => {});
        } else video.pause();
      });
    }, { threshold: 0.1 }).observe(video);
  }

  /* ---------- capacidad (A-05) ---------- */

  const capacity = q("[data-capacity]");
  const capCells = capacity ? qa(".cap-level i", capacity) : [];
  const setCapacity = (p) => {
    const perRow = 8;
    const rows = Math.max(Math.ceil(capCells.length / perRow), 1);
    const peakRows = p > 0.58 ? 2 : p > 0.34 ? 1 : 0;
    capCells.forEach((cell, i) => {
      const row = Math.floor(i / perRow);
      const delay = (rows - 1 - row) * 0.12 + (i % perRow) * 0.015;
      const local = clamp((p - 0.04 - delay) * 5);
      cell.style.setProperty("--fill", String(0.1 + local * 0.9));
      cell.classList.toggle("is-peak", row < peakRows);
    });
  };

  /* ---------- motor ---------- */

  const corridor = q("[data-corridor]");
  const track = q("[data-track]");
  const corridorFill = q("[data-corridor-fill]");
  const stages = qa("[data-stage]");
  const lifts = qa("[data-bay], [data-plate]");
  const tilts = qa("[data-tilt]");

  const smooth = new Map();
  const ease = (key, target, k = 0.14) => {
    const prev = smooth.has(key) ? smooth.get(key) : target;
    const next = prev + (target - prev) * k;
    const settled = Math.abs(target - next) < 0.0004;
    smooth.set(key, settled ? target : next);
    return smooth.get(key);
  };

  const progressOf = (el, from = 0.9, to = 0.45) => {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    return between(rect.top, vh * from, vh * to);
  };

  const stickyProgress = (el) => {
    const rect = el.getBoundingClientRect();
    const run = Math.max(el.offsetHeight - window.innerHeight, 1);
    return clamp(-rect.top / run);
  };

  let scene = -1;
  let stage = -1;
  let stageCenters = [];

  let stageTravel = 0;

  /* El recorrido se mide sobre las tarjetas, no sobre el scrollWidth del contenedor:
     el track desborda con overflow visible y su scrollWidth se queda corto. */
  const measureStages = () => {
    stageCenters = stages.map((li) => li.offsetLeft + li.offsetWidth / 2);
    const last = stageCenters[stageCenters.length - 1] || 0;
    stageTravel = Math.max(last - window.innerWidth / 2, 0);
  };
  let lastY = window.scrollY;
  let idle = 0;
  let running = false;

  const setScene = (i) => {
    if (i === scene) return;
    scene = i;
    scenes.forEach((el, k) => el.classList.toggle("is-on", k === i));
    meters.forEach((el, k) => el.classList.toggle("is-on", k === i));
  };

  const setStage = (i) => {
    if (i === stage) return;
    stage = i;
    stages.forEach((el, k) => el.classList.toggle("is-on", k === i));
  };

  const frame = () => {
    const y = window.scrollY;
    const vh = window.innerHeight;

    /* pasillo */
    if (aisle && !reduced.matches) {
      const p = stickyProgress(aisle);
      const eased = ease("aisle", p, 0.16);
      aisle.style.setProperty("--scene", String(eased));
      aisle.style.setProperty("--depth", String(eased));
      aisle.style.setProperty("--close", String(between(eased, 0.82, 1)));
      const idx = Math.min(Math.round(eased * (TOTAL - 1)), TOTAL - 1);
      if (idx !== drawn) {
        show(idx);
        ask(idx);
        for (let d = 1; d <= 6; d += 1) { ask(idx + d); ask(idx - d); }
      }
      setScene(p < 0.33 ? 0 : p < 0.66 ? 1 : 2);
    }

    /* entradas en profundidad */
    lifts.forEach((el, i) => {
      const target = progressOf(el, 0.98, 0.72);
      el.style.setProperty("--in", ease("lift" + i, target, 0.12).toFixed(4));
    });

    tilts.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      const target = clamp((rect.top + rect.height / 2 - vh / 2) / vh, -1, 1);
      el.style.setProperty("--tilt", ease("tilt" + i, target, 0.1).toFixed(4));
    });

    if (capacity) setCapacity(ease("cap", progressOf(capacity, 0.95, 0.4), 0.1));

    /* pasillo horizontal: el track descansa con una etapa encuadrada y avanza de una a otra */
    if (corridor && track && stages.length && !reduced.matches) {
      const p = ease("corridor", stickyProgress(corridor), 0.13);
      const travel = clamp(p / 0.92);
      const stagesEl = track.firstElementChild;
      if (!stageCenters.length) measureStages();

      const steps = Math.max(stages.length - 1, 1);
      const step = travel * steps;
      const index = Math.min(Math.floor(step), steps - 1);
      /* la transición ocupa el tramo central del paso: el track descansa encuadrado */
      const local = smoothstep(clamp((step - index - 0.22) / 0.56));
      const center = stageCenters[index] + (stageCenters[index + 1] - stageCenters[index]) * local;
      const shift = window.innerWidth / 2 - center;

      if (stagesEl) stagesEl.style.setProperty("--shift", shift.toFixed(1) + "px");
      corridor.style.setProperty("--run", travel.toFixed(4));
      if (corridorFill) corridorFill.style.transform = `scaleX(${travel.toFixed(4)})`;
      setStage(local < 0.5 ? index : index + 1);
    }

    /* rail y barra */
    if (sections.length) {
      const doc = Math.max(document.documentElement.scrollHeight - vh, 1);
      if (railFill) railFill.style.transform = `scaleY(${clamp(y / doc).toFixed(4)})`;
      let active = 0;
      sections.forEach((sec, i) => { if (sec.getBoundingClientRect().top <= vh * 0.42) active = i; });
      railItems.forEach((a, i) => a.classList.toggle("is-on", i === active));
      if (rail) {
        const onDark = darkSections.some((sec) => {
          const r = sec.getBoundingClientRect();
          return r.top <= vh * 0.5 && r.bottom >= vh * 0.5;
        });
        rail.classList.toggle("on-dark", onDark);
        if (corridor) {
          const r = corridor.getBoundingClientRect();
          rail.classList.toggle("is-out", r.top <= vh * 0.5 && r.bottom >= vh * 0.5);
        }
      }
    }

    if (topbar) {
      const down = y > lastY + 6;
      const up = y < lastY - 6;
      topbar.classList.toggle("is-docked", y > 90);
      if (y > 220 && down) topbar.classList.add("is-away");
      if (up || y < 120) topbar.classList.remove("is-away");
    }

    const moved = Math.abs(y - lastY) > 0.5;
    lastY = y;
    idle = moved ? 0 : idle + 1;
    if (idle > 90) { running = false; return; }
    window.requestAnimationFrame(frame);
  };

  const kick = () => {
    idle = 0;
    if (!running) { running = true; window.requestAnimationFrame(frame); }
  };

  window.addEventListener("scroll", kick, { passive: true });
  window.addEventListener("resize", () => { drawn = -1; measureStages(); kick(); }, { passive: true });
  window.addEventListener("orientationchange", () => { drawn = -1; kick(); });
  document.addEventListener("visibilitychange", () => { if (!document.hidden) kick(); });
  measureStages();
  kick();

  /* ---------- formulario ---------- */

  const form = q("[data-form]");
  const errorBox = q("[data-error]");
  const done = q("[data-done]");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = qa("input, select", form);
    let firstBad = null;

    fields.forEach((field) => {
      const ok = field.checkValidity() && field.value.trim() !== "";
      field.closest(".field")?.classList.toggle("is-bad", !ok);
      if (!ok && !firstBad) firstBad = field;
    });

    if (firstBad) {
      if (errorBox) {
        errorBox.textContent = "Faltan datos para preparar la evaluación. Revisa los campos marcados.";
        errorBox.hidden = false;
      }
      firstBad.focus();
      return;
    }

    if (errorBox) errorBox.hidden = true;
    const data = new FormData(form);
    const body = [
      `Empresa: ${data.get("empresa")}`,
      `Contacto: ${data.get("nombre")}`,
      `Teléfono: ${data.get("telefono")}`,
      `Correo: ${data.get("correo")}`,
      `Servicio de interés: ${data.get("servicio")}`,
      `Volumen aproximado: ${data.get("volumen")}`,
      "",
      "Enviado desde prime-express.pe",
    ].join("\n");

    form.classList.add("is-sent");
    if (done) { done.hidden = false; done.focus?.(); }
    window.location.href =
      "mailto:ventas@prime-express.pe" +
      "?subject=" + encodeURIComponent("Solicitud de evaluación logística") +
      "&body=" + encodeURIComponent(body);
  });

  qa(".field input, .field select").forEach((field) => {
    field.addEventListener("input", () => field.closest(".field")?.classList.remove("is-bad"));
  });
})();
