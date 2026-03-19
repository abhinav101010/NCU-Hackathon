import { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";

/* ─────────────────────────────────────────────────────────────────────────────
   Detect which theme is active based on primary colour hex
   darkNeon    → #00ffa3
   lightTheme  → #2563eb  (or #1976d2)
   oceanTheme  → #00d4ff  (or #4facfe)
   crimsonTheme→ #ff3b5c
   studentTheme→ #7c4dff
   windTheme   → #1c6bba  (or #0066cc / #0053a0)
───────────────────────────────────────────────────────────────────────────── */
function detectTheme(theme) {
  const p = theme.palette.primary.main.toLowerCase();
  if (p === "#ff3b5c") return "crimson";
  if (p === "#c0173a" || p === "#a8102f") return "bloodmoon";
  if (p === "#7c4dff") return "student";
  if (p === "#00d4ff" || p === "#4facfe") return "ocean";
  if (p === "#00ffa3") return "dark";
  if (p === "#1a9e5c" || p === "#1c6bba" || p === "#0066cc" || p === "#0053a0") return "wind";
  return "light";
}
const hexToRgb = (hex = "#000000") => {
  const c = hex.length === 7 ? hex : "#000000";
  return `${parseInt(c.slice(1,3),16)},${parseInt(c.slice(3,5),16)},${parseInt(c.slice(5,7),16)}`;
};

/* ─────────────────────────────────────────────────────────────────────────────
   DARK / LIGHT  →  floating particle network
───────────────────────────────────────────────────────────────────────────── */
function runNetwork(canvas, ctx, theme) {
  const rgb = hexToRgb(theme.palette.primary.main);
  const isDark = theme.palette.mode === "dark";
  const NUM = 70;
  let particles = [], W, H;

  const init = () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    particles = Array.from({ length: NUM }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 1.5 + 0.8,
    }));
  };
  init();
  window.addEventListener("resize", init);

  let id;
  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? `rgba(${rgb},0.55)` : `rgba(${rgb},0.35)`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(${rgb},${(1-d/130)*(isDark?0.18:0.12)})`;
          ctx.lineWidth = 0.8; ctx.stroke();
        }
      }
    }
    id = requestAnimationFrame(draw);
  };
  draw();
  return () => { cancelAnimationFrame(id); window.removeEventListener("resize", init); };
}

/* ─────────────────────────────────────────────────────────────────────────────
   OCEAN  →  chaotic multi-frequency waves with random rogue giants + foam + bubbles
───────────────────────────────────────────────────────────────────────────── */
function runOcean(canvas, ctx) {
  let W, H;
  const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
  resize();
  window.addEventListener("resize", resize);

  const WAVES = [
    {
      yOff: 0.48,
      harmonics: [
        { amp:55, per:0.006, spd:0.022, phase:0.0 },
        { amp:30, per:0.013, spd:0.031, phase:1.2 },
        { amp:18, per:0.021, spd:0.017, phase:2.5 },
        { amp:12, per:0.037, spd:0.044, phase:0.8 },
      ],
      rogueAmp: 95, roguePer:0.0018, rogueSpd:0.008, roguePhase: 0.0,
      stroke:"rgba(0,160,255,0.18)", fill:"rgba(0,100,200,0.07)",
    },
    {
      yOff: 0.57,
      harmonics: [
        { amp:45, per:0.009, spd:0.019, phase:3.1 },
        { amp:25, per:0.016, spd:0.028, phase:0.6 },
        { amp:14, per:0.028, spd:0.038, phase:1.9 },
        { amp: 8, per:0.048, spd:0.052, phase:4.2 },
      ],
      rogueAmp: 75, roguePer:0.0022, rogueSpd:0.011, roguePhase: 2.1,
      stroke:"rgba(0,200,255,0.22)", fill:"rgba(0,140,220,0.09)",
    },
    {
      yOff: 0.67,
      harmonics: [
        { amp:35, per:0.011, spd:0.026, phase:1.5 },
        { amp:20, per:0.019, spd:0.035, phase:3.8 },
        { amp:10, per:0.033, spd:0.048, phase:2.3 },
        { amp: 6, per:0.055, spd:0.060, phase:0.4 },
      ],
      rogueAmp: 55, roguePer:0.0028, rogueSpd:0.014, roguePhase: 4.5,
      stroke:"rgba(60,230,255,0.26)", fill:"rgba(0,180,240,0.10)",
    },
    {
      yOff: 0.76,
      harmonics: [
        { amp:22, per:0.014, spd:0.032, phase:2.7 },
        { amp:14, per:0.024, spd:0.043, phase:1.1 },
        { amp: 8, per:0.040, spd:0.055, phase:3.3 },
        { amp: 5, per:0.065, spd:0.070, phase:5.1 },
      ],
      rogueAmp: 38, roguePer:0.0035, rogueSpd:0.018, roguePhase: 1.3,
      stroke:"rgba(140,245,255,0.22)", fill:"rgba(80,210,255,0.08)",
    },
    {
      yOff: 0.84,
      harmonics: [
        { amp:14, per:0.018, spd:0.038, phase:4.1 },
        { amp: 9, per:0.030, spd:0.050, phase:0.9 },
        { amp: 5, per:0.050, spd:0.065, phase:2.0 },
      ],
      rogueAmp: 22, roguePer:0.0042, rogueSpd:0.022, roguePhase: 3.7,
      stroke:"rgba(200,255,255,0.20)", fill:"rgba(120,230,255,0.07)",
    },
  ];

  const waveY = (layer, x, t) => {
    let y = H * layer.yOff;
    layer.harmonics.forEach(h => {
      y += Math.sin(x * h.per + t * h.spd + h.phase) * h.amp;
    });
    const rogueCenterX = ((t * layer.rogueSpd * 80) % (W * 1.6)) - W * 0.3;
    const rogueDist = x - rogueCenterX;
    const rogueEnvelope = Math.exp(-(rogueDist * rogueDist) / (W * W * layer.roguePer * 6000));
    y += Math.sin(x * layer.roguePer * 4 + t * layer.rogueSpd + layer.roguePhase)
         * layer.rogueAmp * rogueEnvelope;
    return y;
  };

  const foam = Array.from({ length: 60 }, () => ({
    x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 0, r: 0,
  }));
  let foamPtr = 0;
  const spawnFoam = (x, y) => {
    const f = foam[foamPtr % foam.length]; foamPtr++;
    f.x = x; f.y = y;
    f.vx = (Math.random() - 0.5) * 2.5;
    f.vy = -(Math.random() * 2 + 0.5);
    f.life = 1; f.maxLife = Math.random() * 40 + 20;
    f.r = Math.random() * 3 + 1;
  };

  const bubbles = Array.from({ length: 28 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight + window.innerHeight,
    r: Math.random() * 16 + 3,
    vy: -(Math.random() * 0.5 + 0.1),
    alpha: Math.random() * 0.20 + 0.05,
    phase: Math.random() * Math.PI * 2,
  }));

  let t = 0, id;
  const draw = () => {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < 6; i++) {
      const x = (W * (i + 0.5)) / 6 + Math.sin(t * 0.008 + i) * 30;
      const g = ctx.createLinearGradient(x, 0, x + 50, H * 0.65);
      g.addColorStop(0, "rgba(0,210,255,0.07)");
      g.addColorStop(1, "rgba(0,210,255,0)");
      ctx.beginPath();
      ctx.moveTo(x-18,0); ctx.lineTo(x+18,0);
      ctx.lineTo(x+70,H*0.65); ctx.lineTo(x-70,H*0.65);
      ctx.closePath(); ctx.fillStyle = g; ctx.fill();
    }

    WAVES.forEach((l, li) => {
      ctx.beginPath(); ctx.moveTo(0, H);
      for (let x = 0; x <= W; x += 2) {
        const y = waveY(l, x, t);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
      ctx.fillStyle = l.fill; ctx.fill();

      ctx.beginPath();
      for (let x = 0; x <= W; x += 2) {
        const y = waveY(l, x, t);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = l.stroke; ctx.lineWidth = li === 0 ? 2 : 1.5; ctx.stroke();

      if (li <= 1 && t % 6 === li) {
        for (let x = 20; x < W - 20; x += 40 + Math.random()*60) {
          const y1 = waveY(l, x-3, t), y2 = waveY(l, x+3, t);
          if (y1 > waveY(l, x, t) && y2 > waveY(l, x, t)) {
            spawnFoam(x, waveY(l, x, t));
          }
        }
      }
    });

    foam.forEach(f => {
      if (f.life <= 0) return;
      f.x += f.vx; f.y += f.vy; f.vy += 0.06; f.life -= 1 / f.maxLife;
      const a = f.life * 0.55;
      ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(200,245,255,${a})`; ctx.fill();
    });

    bubbles.forEach(b => {
      b.y += b.vy; b.x += Math.sin(t * 0.025 + b.phase) * 0.35;
      if (b.y + b.r < 0) { b.y = H + b.r; b.x = Math.random() * W; }
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(160,240,255,${b.alpha})`; ctx.lineWidth = 1; ctx.stroke();
      ctx.beginPath(); ctx.arc(b.x - b.r*0.3, b.y - b.r*0.3, b.r*0.25, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255,255,255,${b.alpha*0.55})`; ctx.fill();
    });

    t++;
    id = requestAnimationFrame(draw);
  };
  draw();
  return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
}

/* ─────────────────────────────────────────────────────────────────────────────
   STUDENT  →  glowing rising orbs + sparkles
───────────────────────────────────────────────────────────────────────────── */
function runStudent(canvas, ctx) {
  let W, H;
  const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
  resize();
  window.addEventListener("resize", resize);

  const orbs = Array.from({ length: 38 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight + window.innerHeight,
    r: Math.random() * 28 + 8,
    vy: -(Math.random() * 0.5 + 0.2),
    vx: (Math.random() - 0.5) * 0.3,
    hue: Math.floor(Math.random() * 80) + 250,
    alpha: Math.random() * 0.22 + 0.06,
    phase: Math.random() * Math.PI * 2,
  }));

  let t = 0, id;
  const draw = () => {
    ctx.clearRect(0, 0, W, H);

    orbs.forEach(b => {
      b.y += b.vy; b.x += b.vx + Math.sin(t*0.02 + b.phase)*0.4;
      if (b.y + b.r < 0) { b.y = H + b.r*2; b.x = Math.random()*W; }
      if (b.x < -b.r) b.x = W + b.r;
      if (b.x > W + b.r) b.x = -b.r;

      const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      g.addColorStop(0, `hsla(${b.hue},100%,70%,${b.alpha*1.5})`);
      g.addColorStop(0.6, `hsla(${b.hue},100%,60%,${b.alpha*0.6})`);
      g.addColorStop(1, `hsla(${b.hue},100%,50%,0)`);
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI*2);
      ctx.fillStyle = g; ctx.fill();

      ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI*2);
      ctx.strokeStyle = `hsla(${b.hue},100%,80%,${b.alpha*0.8})`; ctx.lineWidth = 0.8; ctx.stroke();

      ctx.beginPath(); ctx.arc(b.x - b.r*0.3, b.y - b.r*0.3, b.r*0.18, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255,255,255,${b.alpha*1.2})`; ctx.fill();
    });

    if (t % 4 === 0) {
      for (let i = 0; i < 2; i++) {
        ctx.beginPath();
        ctx.arc(Math.random()*W, Math.random()*H, Math.random()*1.5+0.5, 0, Math.PI*2);
        ctx.fillStyle = `rgba(200,180,255,${Math.random()*0.5+0.1})`; ctx.fill();
      }
    }

    t++;
    id = requestAnimationFrame(draw);
  };
  draw();
  return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
}

/* ─────────────────────────────────────────────────────────────────────────────
   CRIMSON  →  roaring flame columns + explosive embers + lens flares
               + shockwave rings + smoke wisps
───────────────────────────────────────────────────────────────────────────── */
function runCrimson(canvas, ctx) {
  let W, H;
  const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
  resize();
  window.addEventListener("resize", resize);

  const EMBER_COUNT = 200;
  const embers = Array.from({ length: EMBER_COUNT }, () => ({
    x:0, y:0, r:0, vx:0, vy:0, life:0, decay:0, hue:0, trail:[],
  }));
  const resetEmber = e => {
    e.x = W * 0.5 + (Math.random() - 0.5) * W * 0.9;
    e.y = H * (0.6 + Math.random() * 0.4);
    e.r = Math.random() * 3.5 + 0.8;
    e.vy = -(Math.random() * 4.5 + 1.5);
    e.vx = (Math.random() - 0.5) * 3.0;
    e.life = 1;
    e.decay = Math.random() * 0.010 + 0.004;
    e.hue = Math.random() * 40;
    e.trail = [];
  };
  embers.forEach(resetEmber);

  const FLAME_COUNT = 14;
  const flames = Array.from({ length: FLAME_COUNT }, (_, i) => ({
    baseX: (W * (i + 0.5)) / FLAME_COUNT,
    phase: Math.random() * Math.PI * 2,
    heightFrac: 0.25 + Math.random() * 0.45,
    widthBase: 18 + Math.random() * 28,
    spd: 0.03 + Math.random() * 0.03,
  }));

  const flares = [
    { cx:0.12, cy:0.20, r:200, hue:0,   alpha:0.13, pulseSpd:0.031 },
    { cx:0.82, cy:0.55, r:260, hue:18,  alpha:0.10, pulseSpd:0.024 },
    { cx:0.50, cy:0.08, r:150, hue:8,   alpha:0.12, pulseSpd:0.042 },
    { cx:0.28, cy:0.75, r:170, hue:28,  alpha:0.09, pulseSpd:0.027 },
    { cx:0.72, cy:0.18, r:130, hue:5,   alpha:0.11, pulseSpd:0.038 },
  ];

  const rings = Array.from({ length: 6 }, () => ({ x:0, y:0, r:0, maxR:0, life:0 }));
  let ringPtr = 0;
  const spawnRing = () => {
    const ring = rings[ringPtr++ % rings.length];
    ring.x = W * (0.2 + Math.random() * 0.6);
    ring.y = H * (0.3 + Math.random() * 0.5);
    ring.r = 0; ring.maxR = 80 + Math.random() * 140; ring.life = 1;
  };

  const wisps = Array.from({ length: 18 }, () => ({ x:0, y:0, r:0, vx:0, vy:0, life:0, decay:0 }));
  let wispPtr = 0;
  const spawnWisp = (x, y) => {
    const w = wisps[wispPtr++ % wisps.length];
    w.x = x; w.y = y; w.r = 12 + Math.random() * 20;
    w.vx = (Math.random() - 0.5) * 0.8; w.vy = -(Math.random() * 0.6 + 0.2);
    w.life = 1; w.decay = Math.random() * 0.006 + 0.003;
  };

  let t = 0, id;
  const draw = () => {
    ctx.clearRect(0, 0, W, H);

    const glowGrad = ctx.createLinearGradient(0, H*0.55, 0, H);
    glowGrad.addColorStop(0, "rgba(255,60,0,0.0)");
    glowGrad.addColorStop(0.5, "rgba(255,30,0,0.07)");
    glowGrad.addColorStop(1, "rgba(255,80,0,0.18)");
    ctx.fillStyle = glowGrad; ctx.fillRect(0, 0, W, H);

    if (t % 55 === 0) spawnRing();
    rings.forEach(ring => {
      if (ring.life <= 0) return;
      ring.r += (ring.maxR - ring.r) * 0.06; ring.life -= 0.018;
      const a = ring.life * 0.25;
      ctx.beginPath(); ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI*2);
      ctx.strokeStyle = `rgba(255,120,20,${a})`; ctx.lineWidth = 2.5; ctx.stroke();
      ctx.beginPath(); ctx.arc(ring.x, ring.y, ring.r*0.7, 0, Math.PI*2);
      ctx.strokeStyle = `rgba(255,200,60,${a*0.5})`; ctx.lineWidth = 1; ctx.stroke();
    });

    flames.forEach(f => {
      const baseX = f.baseX + Math.sin(t * f.spd + f.phase) * 22;
      const tipY = H - H * f.heightFrac * (0.85 + 0.15*Math.sin(t*f.spd*1.7 + f.phase));
      for (let s = 12; s >= 0; s--) {
        const frac = s / 12;
        const y = H - (H - tipY) * frac;
        const wx = baseX + Math.sin(t * f.spd * 2.3 + frac * 4 + f.phase) * f.widthBase * (1 - frac*0.7);
        const width = f.widthBase * (1 - frac) * (0.9 + 0.1*Math.sin(t*0.08 + frac*3));
        const hue = frac > 0.6 ? 55 - (frac-0.6)*80 : 15 + frac*60;
        const alpha = (1-frac) * 0.22;
        const grd = ctx.createRadialGradient(wx, y, 0, wx, y, width);
        grd.addColorStop(0, `hsla(${hue},100%,${60+frac*35}%,${alpha*1.4})`);
        grd.addColorStop(1, `hsla(${hue},100%,${40+frac*35}%,0)`);
        ctx.beginPath(); ctx.arc(wx, y, width, 0, Math.PI*2);
        ctx.fillStyle = grd; ctx.fill();
      }
    });

    embers.forEach(e => {
      e.trail.push({ x: e.x, y: e.y });
      if (e.trail.length > 6) e.trail.shift();
      e.y += e.vy; e.x += e.vx + Math.sin(t*0.07 + e.r*8)*0.7;
      e.vy += 0.04; e.vx *= 0.995; e.life -= e.decay;
      if (e.life <= 0 || e.y < -20) resetEmber(e);
      const a = e.life;
      if (e.trail.length > 1) {
        ctx.beginPath(); ctx.moveTo(e.trail[0].x, e.trail[0].y);
        e.trail.forEach(pt => ctx.lineTo(pt.x, pt.y));
        ctx.strokeStyle = `hsla(${e.hue+10},100%,65%,${a*0.35})`;
        ctx.lineWidth = e.r * 0.6; ctx.stroke();
      }
      const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r*4);
      g.addColorStop(0, `hsla(${e.hue},100%,92%,${a*0.95})`);
      g.addColorStop(0.3, `hsla(${e.hue+5},100%,70%,${a*0.6})`);
      g.addColorStop(0.7, `hsla(${e.hue+15},100%,50%,${a*0.3})`);
      g.addColorStop(1, `hsla(${e.hue+20},100%,40%,0)`);
      ctx.beginPath(); ctx.arc(e.x, e.y, e.r*4, 0, Math.PI*2); ctx.fillStyle = g; ctx.fill();
      ctx.beginPath(); ctx.arc(e.x, e.y, e.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255,245,200,${a})`; ctx.fill();
    });

    if (t % 8 === 0) spawnWisp(W*(0.2 + Math.random()*0.6), H*(0.3 + Math.random()*0.2));
    wisps.forEach(w => {
      if (w.life <= 0) return;
      w.x += w.vx; w.y += w.vy; w.r += 0.5; w.life -= w.decay;
      const a = w.life * 0.06;
      const g = ctx.createRadialGradient(w.x, w.y, 0, w.x, w.y, w.r);
      g.addColorStop(0, `rgba(80,30,10,${a})`); g.addColorStop(1, `rgba(30,10,5,0)`);
      ctx.beginPath(); ctx.arc(w.x, w.y, w.r, 0, Math.PI*2); ctx.fillStyle = g; ctx.fill();
    });

    flares.forEach((f, i) => {
      const pulse = 0.75 + 0.25*Math.sin(t*f.pulseSpd + i*1.4);
      const x = f.cx*W + Math.sin(t*0.009+i*1.1)*12;
      const y = f.cy*H + Math.cos(t*0.011+i*0.9)*10;
      const rad = f.r * pulse;
      const g = ctx.createRadialGradient(x,y,0,x,y,rad);
      g.addColorStop(0, `hsla(${f.hue},100%,75%,${f.alpha*2.2*pulse})`);
      g.addColorStop(0.2, `hsla(${f.hue+8},100%,60%,${f.alpha*1.4})`);
      g.addColorStop(0.5, `hsla(${f.hue+15},100%,45%,${f.alpha*0.6})`);
      g.addColorStop(1, `hsla(${f.hue},100%,30%,0)`);
      ctx.beginPath(); ctx.arc(x,y,rad,0,Math.PI*2); ctx.fillStyle = g; ctx.fill();
      const core = ctx.createRadialGradient(x,y,0,x,y,rad*0.15);
      core.addColorStop(0, `rgba(255,255,220,${f.alpha*3*pulse})`);
      core.addColorStop(1, `rgba(255,200,100,0)`);
      ctx.beginPath(); ctx.arc(x,y,rad*0.15,0,Math.PI*2); ctx.fillStyle = core; ctx.fill();
      ctx.save(); ctx.globalAlpha = f.alpha*0.8*pulse;
      [0,1,2,3,4,5,6,7].forEach(k => {
        const angle = (k/8)*Math.PI*2 + t*0.004;
        const len = rad*(k%2===0?2.2:1.3);
        const lg = ctx.createLinearGradient(x,y,x+Math.cos(angle)*len,y+Math.sin(angle)*len);
        lg.addColorStop(0,`hsla(${f.hue+5},100%,75%,1)`); lg.addColorStop(1,`hsla(${f.hue+5},100%,75%,0)`);
        ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+Math.cos(angle)*len,y+Math.sin(angle)*len);
        ctx.strokeStyle=lg; ctx.lineWidth=k%2===0?1.5:0.8; ctx.stroke();
      });
      ctx.restore();
    });

    for (let i = 0; i < 5; i++) {
      const lx=Math.random()*W, ly=H*0.50+Math.random()*H*0.45;
      ctx.beginPath(); ctx.moveTo(lx,ly);
      ctx.bezierCurveTo(lx+Math.random()*40-20,ly-Math.random()*30,lx+Math.random()*60-30,ly-Math.random()*50,lx+Math.random()*80-40,ly-Math.random()*70);
      ctx.strokeStyle=`rgba(255,80,10,${Math.random()*0.05})`; ctx.lineWidth=Math.random()*1.5+0.5; ctx.stroke();
    }

    t++;
    id = requestAnimationFrame(draw);
  };
  draw();
  return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
}

/* ─────────────────────────────────────────────────────────────────────────────
   WIND (BMW theme)  →  carbon-fibre texture, speed streaks, rain,
                        headlight beam sweeps, kidney-grille pulse rings,
                        road reflection glow
                        — no logo or roundel
───────────────────────────────────────────────────────────────────────────── */
function runWind(canvas, ctx) {
  let W, H;
  const resize = () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  // ── CARBON FIBRE TILE ─────────────────────────────────────────────────────
  const carbonCanvas = document.createElement("canvas");
  carbonCanvas.width  = 40;
  carbonCanvas.height = 40;
  const cc = carbonCanvas.getContext("2d");
  (() => {
    cc.clearRect(0, 0, 40, 40);
    const positions = [
      {x:0,y:0,w:18,h:8},  {x:20,y:10,w:18,h:8},
      {x:0,y:20,w:18,h:8}, {x:20,y:30,w:18,h:8},
      {x:10,y:0,w:8,h:18}, {x:30,y:0,w:8,h:18},
      {x:0,y:10,w:8,h:8},  {x:20,y:0,w:8,h:8},
    ];
    positions.forEach(p => {
      const g = cc.createLinearGradient(p.x, p.y, p.x+p.w, p.y+p.h);
      g.addColorStop(0, "rgba(30,30,35,0.9)");
      g.addColorStop(0.5, "rgba(50,52,58,0.9)");
      g.addColorStop(1, "rgba(22,22,26,0.9)");
      cc.fillStyle = g;
      cc.beginPath();
      cc.roundRect(p.x+1, p.y+1, p.w-2, p.h-2, 2);
      cc.fill();
    });
    cc.strokeStyle = "rgba(0,0,0,0.5)";
    cc.lineWidth = 0.5;
    for (let i = 0; i <= 40; i += 20) {
      cc.beginPath(); cc.moveTo(i, 0); cc.lineTo(i, 40); cc.stroke();
      cc.beginPath(); cc.moveTo(0, i); cc.lineTo(40, i); cc.stroke();
    }
  })();

  // ── SPEED STREAKS ─────────────────────────────────────────────────────────
  const streaks = Array.from({ length: 55 }, () => ({ x:0,y:0,len:0,vy:0,vx:0,life:0,decay:0,w:0,hue:0 }));
  const resetStreak = s => {
    s.x = Math.random() * W * 1.2; s.y = Math.random() * H;
    s.len = Math.random() * 180 + 60;
    s.vx = -(Math.random() * 14 + 6); s.vy = (Math.random() - 0.5) * 0.8;
    s.life = 1; s.decay = Math.random() * 0.012 + 0.005;
    s.w = Math.random() * 1.2 + 0.3;
    s.hue = Math.random() < 0.7 ? 145 : 80; // mostly green, occasional yellow-green
  };
  streaks.forEach(resetStreak);

  // ── RAIN ──────────────────────────────────────────────────────────────────
  const rain = Array.from({ length: 120 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    len: Math.random() * 22 + 8,
    spd: Math.random() * 5 + 8,
    alpha: Math.random() * 0.12 + 0.04,
  }));

  // ── HEADLIGHT BEAMS ───────────────────────────────────────────────────────
  const beams = [
    { angleBase: -0.22, spread: 0.18, phase: 0,   alpha: 0.06 },
    { angleBase: -0.08, spread: 0.14, phase: 1.8, alpha: 0.05 },
  ];

  // ── KIDNEY GRILLE PULSES ──────────────────────────────────────────────────
  const grillePulses = Array.from({ length: 4 }, (_, i) => ({
    life: Math.random(), phase: i * 0.8,
  }));

  let t = 0, id;
  const draw = () => {
    W = canvas.width; H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // carbon fibre texture (very subtle)
    const pat = ctx.createPattern(carbonCanvas, "repeat");
    if (pat) {
      ctx.save(); ctx.globalAlpha = 0.04;
      ctx.fillStyle = pat; ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }

    // deep vignette
    const vig = ctx.createRadialGradient(W/2, H/2, H*0.1, W/2, H/2, H*0.85);
    vig.addColorStop(0, "rgba(0,0,0,0)");
    vig.addColorStop(1, "rgba(4,6,12,0.55)");
    ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H);

    // headlight beam sweeps
    const bOX = W * 0.08, bOY = H * 0.72;
    beams.forEach(b => {
      const angle = b.angleBase + Math.sin(t * 0.008 + b.phase) * 0.06;
      const len   = W * 1.1;
      const x1 = bOX + Math.cos(angle - b.spread/2) * len;
      const y1 = bOY + Math.sin(angle - b.spread/2) * len;
      const x2 = bOX + Math.cos(angle + b.spread/2) * len;
      const y2 = bOY + Math.sin(angle + b.spread/2) * len;
      const bg = ctx.createLinearGradient(bOX, bOY, (x1+x2)/2, (y1+y2)/2);
      bg.addColorStop(0, `rgba(80,220,140,${b.alpha * 3})`);
      bg.addColorStop(0.25, `rgba(80,220,140,${b.alpha})`);
      bg.addColorStop(1, "rgba(80,220,140,0)");
      ctx.beginPath();
      ctx.moveTo(bOX, bOY); ctx.lineTo(x1, y1); ctx.lineTo(x2, y2);
      ctx.closePath(); ctx.fillStyle = bg; ctx.fill();
    });

    // speed streaks
    streaks.forEach(s => {
      s.x += s.vx; s.y += s.vy; s.life -= s.decay;
      if (s.life <= 0 || s.x + s.len < 0) resetStreak(s);
      const a = s.life * 0.7;
      const tailX = s.x + s.len;
      const isGreen = s.hue === 145;
      const lg = ctx.createLinearGradient(s.x, s.y, tailX, s.y + s.vy * 4);
      lg.addColorStop(0, `rgba(${isGreen?"80,220,140":"180,255,120"},0)`);
      lg.addColorStop(0.3, `rgba(${isGreen?"100,230,160":"200,255,140"},${a*0.8})`);
      lg.addColorStop(0.7, `rgba(${isGreen?"160,245,200":"230,255,180"},${a})`);
      lg.addColorStop(1, `rgba(220,255,220,${a*0.4})`);
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(tailX, s.y + s.vy * (s.len / Math.abs(s.vx)));
      ctx.strokeStyle = lg; ctx.lineWidth = s.w; ctx.stroke();
    });

    // rain
    rain.forEach(r => {
      r.y += r.spd; r.x -= r.spd * 0.18;
      if (r.y > H + r.len) { r.y = -r.len; r.x = Math.random() * W; }
      ctx.beginPath();
      ctx.moveTo(r.x, r.y); ctx.lineTo(r.x - r.len*0.18, r.y + r.len);
      ctx.strokeStyle = `rgba(120,210,160,${r.alpha})`; ctx.lineWidth = 0.6; ctx.stroke();
    });

    // kidney grille pulse rings (bottom-center)
    const gx = W * 0.5, gy = H * 0.92;
    grillePulses.forEach((gp, i) => {
      gp.life += 0.008;
      if (gp.life > 1) gp.life = 0;
      const radius = (80 + i * 45) * gp.life + 20;
      const alpha  = (1 - gp.life) * 0.10;
      [-55, 55].forEach(ox => {
        ctx.beginPath();
        ctx.ellipse(gx + ox, gy, radius * 0.55, radius * 0.28, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(60,200,120,${alpha})`;
        ctx.lineWidth = 1.5; ctx.stroke();
      });
    });

    // road reflection glow (green from bottom)
    const roadGlow = ctx.createLinearGradient(0, H*0.65, 0, H);
    roadGlow.addColorStop(0, "rgba(10,80,40,0)");
    roadGlow.addColorStop(0.6, "rgba(15,100,55,0.08)");
    roadGlow.addColorStop(1, "rgba(20,160,80,0.18)");
    ctx.fillStyle = roadGlow; ctx.fillRect(0, 0, W, H);

    // top green highlight
    const topHL = ctx.createLinearGradient(0, 0, 0, H*0.3);
    topHL.addColorStop(0, "rgba(40,180,100,0.06)");
    topHL.addColorStop(1, "rgba(40,180,100,0)");
    ctx.fillStyle = topHL; ctx.fillRect(0, 0, W, H);

    t++;
    id = requestAnimationFrame(draw);
  };

  draw();
  return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
}

/* ─────────────────────────────────────────────────────────────────────────────
   BLOODMOON  →  blood dripping from the top (navbar/buttons), slow crimson
                 puddles pooling at bottom, drifting nebula clouds, heartbeat
                 rings, floating cells — pure black canvas, no white patches
───────────────────────────────────────────────────────────────────────────── */
function runBloodmoon(canvas, ctx) {
  let W, H;
  const resize = () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  // ── DRIP SOURCES along the top edge (simulating navbar bleed) ─────────────
  const DRIP_SOURCES = 18;
  const sources = Array.from({ length: DRIP_SOURCES }, (_, i) => ({
    x: (i / DRIP_SOURCES) * window.innerWidth + Math.random() * 60 - 30,
    active: Math.random() < 0.7,
    nextDrip: Math.random() * 200,
  }));

  // ── DRIP DROPS ────────────────────────────────────────────────────────────
  const MAX_DROPS = 120;
  const drops = Array.from({ length: MAX_DROPS }, () => ({
    x: 0, y: 0,
    vy: 0,           // falling speed
    r: 0,            // drop radius
    len: 0,          // tail length
    life: 0,         // 0=dead 1=alive
    alpha: 0,
    hue: 348,
    phase: 0,
    pooling: false,  // has it hit the bottom area and started spreading?
    poolR: 0,        // pool radius
    poolX: 0, poolY: 0,
    poolAlpha: 0,
  }));
  let dropPtr = 0;

  const spawnDrop = (sx) => {
    const d = drops[dropPtr++ % MAX_DROPS];
    d.x = sx + (Math.random() - 0.5) * 8;
    d.y = 60 + Math.random() * 20;   // just below navbar
    d.vy = Math.random() * 2.5 + 0.8;
    d.r = Math.random() * 4 + 2;
    d.len = Math.random() * 35 + 15;
    d.life = 1;
    d.alpha = Math.random() * 0.55 + 0.35;
    d.hue = 340 + Math.random() * 20;
    d.phase = Math.random() * Math.PI * 2;
    d.pooling = false;
    d.poolR = 0;
    d.poolX = d.x;
    d.poolY = 0;
    d.poolAlpha = d.alpha * 0.5;
  };

  // ── NEBULA CLOUDS ─────────────────────────────────────────────────────────
  const nebulae = Array.from({ length: 6 }, () => ({
    x: Math.random() * window.innerWidth,
    y: 200 + Math.random() * (window.innerHeight - 200),
    r: Math.random() * 280 + 140,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.12,
    hue: Math.random() < 0.65 ? 348 : 18,
    alpha: Math.random() * 0.18 + 0.08,
    phase: Math.random() * Math.PI * 2,
  }));

  // ── HEARTBEAT RINGS ───────────────────────────────────────────────────────
  const rings = Array.from({ length: 8 }, () => ({
    x:0, y:0, r:0, maxR:0, life:0, hue:0,
  }));
  let ringPtr = 0;
  const spawnRing = () => {
    const r = rings[ringPtr++ % rings.length];
    r.x = (0.1 + Math.random() * 0.8) * W;
    r.y = (0.15 + Math.random() * 0.75) * H;
    r.r = 0;
    r.maxR = 80 + Math.random() * 180;
    r.life = 1;
    r.hue = Math.random() < 0.7 ? 348 : 14;
  };
  for (let i = 0; i < 2; i++) spawnRing();

  // ── FLOATING BLOOD CELLS ──────────────────────────────────────────────────
  const cells = Array.from({ length: 28 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 9 + 3,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.16,
    alpha: Math.random() * 0.28 + 0.10,
    phase: Math.random() * Math.PI * 2,
  }));

  // ── CORNER FLARES ─────────────────────────────────────────────────────────
  const flares = [
    { cx: 0.02, cy: 0.04, rFrac: 0.45, hue: 348, alpha: 0.18, spd: 0.009 },
    { cx: 0.96, cy: 0.94, rFrac: 0.40, hue: 16,  alpha: 0.14, spd: 0.012 },
  ];

  let t = 0, id;

  const draw = () => {
    W = canvas.width; H = canvas.height;

    // ── PURE BLACK clear — no white, no tint accumulation ─────────────────
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, W, H);

    // ── corner flares (dark crimson glow only) ────────────────────────────
    flares.forEach((f, i) => {
      const pulse = 0.80 + 0.20 * Math.sin(t * f.spd + i * 1.9);
      const x = f.cx * W, y = f.cy * H;
      const rad = f.rFrac * Math.min(W, H) * pulse;
      const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
      g.addColorStop(0, `hsla(${f.hue},100%,30%,${f.alpha * 2.5 * pulse})`);
      g.addColorStop(0.4, `hsla(${f.hue},90%,18%,${f.alpha})`);
      g.addColorStop(1, `hsla(${f.hue},80%,6%,0)`);
      ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
    });

    // ── nebula clouds ──────────────────────────────────────────────────────
    nebulae.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < -n.r) n.x = W + n.r;
      if (n.x > W + n.r) n.x = -n.r;
      if (n.y < -n.r) n.y = H + n.r;
      if (n.y > H + n.r) n.y = -n.r;
      const pulse = 0.92 + 0.08 * Math.sin(t * 0.005 + n.phase);
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * pulse);
      g.addColorStop(0, `hsla(${n.hue},100%,28%,${n.alpha * 1.8})`);
      g.addColorStop(0.45, `hsla(${n.hue},95%,16%,${n.alpha * 0.8})`);
      g.addColorStop(1, `hsla(${n.hue},80%,6%,0)`);
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
    });

    // ── heartbeat rings ────────────────────────────────────────────────────
    if (t % 90 === 0) spawnRing();
    rings.forEach(r => {
      if (r.life <= 0) return;
      r.r += (r.maxR - r.r) * 0.048;
      r.life -= 0.018;
      const a = r.life;
      ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(${r.hue},100%,50%,${a * 0.55})`;
      ctx.lineWidth = 2; ctx.stroke();
      ctx.beginPath(); ctx.arc(r.x, r.y, r.r * 0.58, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(${r.hue},100%,65%,${a * 0.22})`;
      ctx.lineWidth = 1; ctx.stroke();
      if (a > 0.82) {
        const fl = (a - 0.82) / 0.18;
        ctx.beginPath(); ctx.arc(r.x, r.y, 6 * fl, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,60,90,${fl * 0.7})`; ctx.fill();
      }
    });

    // ── blood cells ────────────────────────────────────────────────────────
    cells.forEach(c => {
      c.x += c.vx + Math.sin(t * 0.013 + c.phase) * 0.18;
      c.y += c.vy + Math.cos(t * 0.010 + c.phase) * 0.13;
      if (c.x < -c.r) c.x = W + c.r;
      if (c.x > W + c.r) c.x = -c.r;
      if (c.y < -c.r) c.y = H + c.r;
      if (c.y > H + c.r) c.y = -c.r;
      ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(210,25,55,${c.alpha})`; ctx.lineWidth = 1; ctx.stroke();
      ctx.beginPath(); ctx.arc(c.x, c.y, c.r * 0.40, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(175,15,40,${c.alpha * 0.55})`; ctx.lineWidth = 0.7; ctx.stroke();
      ctx.beginPath(); ctx.arc(c.x - c.r*0.28, c.y - c.r*0.28, c.r*0.18, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255,80,105,${c.alpha * 0.45})`; ctx.fill();
    });

    // ── drip source timers → spawn drops ──────────────────────────────────
    sources.forEach(src => {
      if (!src.active) return;
      src.nextDrip -= 1;
      if (src.nextDrip <= 0) {
        spawnDrop(src.x);
        src.nextDrip = 80 + Math.random() * 280;
      }
    });

    // ── draw drops ────────────────────────────────────────────────────────
    drops.forEach(d => {
      if (d.life <= 0) return;

      if (!d.pooling) {
        // falling drop
        d.y += d.vy;
        d.vy += 0.06;  // gravity
        // slight sway
        d.x += Math.sin(t * 0.04 + d.phase) * 0.15;

        // draw tail (streak)
        const tailLen = Math.min(d.len, d.y - 64);
        if (tailLen > 2) {
          const lg = ctx.createLinearGradient(d.x, d.y - tailLen, d.x, d.y);
          lg.addColorStop(0, `hsla(${d.hue},100%,25%,0)`);
          lg.addColorStop(0.5, `hsla(${d.hue},100%,30%,${d.alpha * 0.5})`);
          lg.addColorStop(1, `hsla(${d.hue},100%,38%,${d.alpha * 0.85})`);
          ctx.beginPath();
          ctx.moveTo(d.x, d.y - tailLen);
          ctx.lineTo(d.x, d.y);
          ctx.strokeStyle = lg;
          ctx.lineWidth = d.r * 0.55;
          ctx.stroke();
        }

        // draw bulging teardrop head
        const gd = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 1.4);
        gd.addColorStop(0, `hsla(${d.hue},100%,55%,${d.alpha})`);
        gd.addColorStop(0.5, `hsla(${d.hue},100%,38%,${d.alpha * 0.8})`);
        gd.addColorStop(1, `hsla(${d.hue},100%,22%,0)`);
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = gd; ctx.fill();

        // check if hit bottom area
        if (d.y > H * 0.88) {
          d.pooling = true;
          d.poolX = d.x;
          d.poolY = d.y;
          d.poolR = d.r * 2;
          d.poolAlpha = d.alpha * 0.6;
          d.life = 1;
        }

        // fade out if somehow off screen
        if (d.y > H + 20) d.life = 0;

      } else {
        // pooling — spread outward
        d.poolR += 0.35;
        d.poolAlpha -= 0.0018;
        d.life = d.poolAlpha > 0 ? 1 : 0;

        const gp = ctx.createRadialGradient(d.poolX, d.poolY, 0, d.poolX, d.poolY, d.poolR);
        gp.addColorStop(0, `hsla(${d.hue},100%,28%,${d.poolAlpha})`);
        gp.addColorStop(0.6, `hsla(${d.hue},95%,18%,${d.poolAlpha * 0.5})`);
        gp.addColorStop(1, `hsla(${d.hue},80%,10%,0)`);
        ctx.beginPath(); ctx.ellipse(d.poolX, d.poolY, d.poolR, d.poolR * 0.35, 0, 0, Math.PI * 2);
        ctx.fillStyle = gp; ctx.fill();
      }
    });

    // ── top edge bleed (blood seeping from navbar bottom) ─────────────────
    for (let i = 0; i < 6; i++) {
      const bx = (i / 6) * W + Math.sin(t * 0.005 + i) * 30;
      const blen = 20 + Math.sin(t * 0.008 + i * 1.4) * 12;
      const bg = ctx.createLinearGradient(bx, 64, bx, 64 + blen);
      bg.addColorStop(0, `rgba(180,10,30,0.35)`);
      bg.addColorStop(1, `rgba(140,5,20,0)`);
      ctx.beginPath();
      ctx.moveTo(bx - 4, 64); ctx.lineTo(bx + 4, 64);
      ctx.lineTo(bx + 2, 64 + blen); ctx.lineTo(bx - 2, 64 + blen);
      ctx.closePath();
      ctx.fillStyle = bg; ctx.fill();
    }

    // ── dark vignette ──────────────────────────────────────────────────────
    const vig = ctx.createRadialGradient(W*0.5, H*0.5, H*0.18, W*0.5, H*0.5, H*0.82);
    vig.addColorStop(0, "rgba(0,0,0,0)");
    vig.addColorStop(1, "rgba(0,0,0,0.65)");
    ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H);

    t++;
    id = requestAnimationFrame(draw);
  };

  draw();
  return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
}

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
export default function NetworkBackground() {
  const canvasRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const which = detectTheme(theme);

    let cleanup;
    if      (which === "ocean")      cleanup = runOcean(canvas, ctx);
    else if (which === "student")    cleanup = runStudent(canvas, ctx);
    else if (which === "crimson")    cleanup = runCrimson(canvas, ctx);
    else if (which === "bloodmoon")  cleanup = runBloodmoon(canvas, ctx);
    else if (which === "wind")       cleanup = runWind(canvas, ctx);
    else                             cleanup = runNetwork(canvas, ctx, theme);

    return cleanup;
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 1,
      }}
    />
  );
}