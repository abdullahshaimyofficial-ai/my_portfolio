"use client";

import { useEffect, useRef } from "react";

interface Segment {
  x: number; y: number;
  dx: number; dy: number;
  len: number; traveled: number;
  alpha: number; fadeIn: boolean; fadeOut: boolean;
  speed: number; color: string; width: number;
}

interface Node {
  x: number; y: number; r: number;
  alpha: number; pulse: number; pulseSpeed: number; color: string;
}

const GRID = 40;

function snap(v: number) { return Math.round(v / GRID) * GRID; }
function rgba(c: string, a: number) {
  return `${c}${Math.min(1, Math.max(0, a)).toFixed(3)})`;
}

export default function CircuitLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const segs: Segment[] = [];
    const nodes: Node[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function dark() {
      return document.documentElement.getAttribute("data-theme") === "dark";
    }

    function colors() {
      return dark()
        ? ["rgba(96,165,250,","rgba(167,139,250,","rgba(244,114,182,","rgba(52,211,153,"]
        : ["rgba(59,130,246,","rgba(139,92,246,","rgba(236,72,153,","rgba(16,185,129,"];
    }

    function spawn() {
      if (!canvas) return;
      const col = colors();
      const c   = col[Math.floor(Math.random() * col.length)];
      const side = Math.floor(Math.random() * 4);
      const gW = Math.floor(canvas.width  / GRID);
      const gH = Math.floor(canvas.height / GRID);
      const gx = Math.floor(Math.random() * gW) * GRID;
      const gy = Math.floor(Math.random() * gH) * GRID;
      let x = 0, y = 0, dx = 0, dy = 0;
      if      (side === 0) { x = 0;             y = gy; dx =  1; dy =  0; }
      else if (side === 1) { x = canvas.width;  y = gy; dx = -1; dy =  0; }
      else if (side === 2) { x = gx;            y = 0;  dx =  0; dy =  1; }
      else                 { x = gx; y = canvas.height; dx =  0; dy = -1; }

      segs.push({
        x, y, dx, dy,
        len: (Math.floor(Math.random() * 10) + 4) * GRID,
        traveled: 0, alpha: 0,
        fadeIn: true, fadeOut: false,
        speed: Math.random() * 0.5 + 0.25,
        color: c,
        width: Math.random() < 0.2 ? 2 : 1,
      });
    }

    for (let i = 0; i < 50; i++) spawn();
    let frame = 0;

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      if (frame % 15 === 0 && segs.length < 90) spawn();

      const d = dark();
      // Ghost-level background presence
      const trailA = d ? 0.025 : 0.02;
      const peakA  = d ? 0.10  : 0.07;
      const nodeA  = d ? 0.12  : 0.08;

      for (let i = segs.length - 1; i >= 0; i--) {
        const s = segs[i];
        if (s.fadeIn)  { s.alpha = Math.min(1, s.alpha + 0.04); if (s.alpha >= 1) s.fadeIn = false; }
        if (s.fadeOut) { s.alpha = Math.max(0, s.alpha - 0.018); if (s.alpha <= 0) { segs.splice(i, 1); continue; } }

        s.traveled += s.speed;
        const cl  = Math.min(s.traveled, s.len);
        const ex  = s.x + s.dx * cl;
        const ey  = s.y + s.dy * cl;

        // ── Dim trail ──────────────────────────────────────────────
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = rgba(s.color, s.alpha * trailA);
        ctx.lineWidth = s.width;
        ctx.lineCap = "round";
        ctx.stroke();

        // ── Moving gradient light ──────────────────────────────────
        const tailLen = Math.min(GRID * 5, cl);
        if (tailLen > 1) {
          const t0x = ex - s.dx * tailLen;
          const t0y = ey - s.dy * tailLen;

          const g = ctx.createLinearGradient(t0x, t0y, ex, ey);
          g.addColorStop(0,    rgba(s.color, 0));
          g.addColorStop(0.5,  rgba(s.color, s.alpha * peakA * 0.3));
          g.addColorStop(0.85, rgba(s.color, s.alpha * peakA * 0.8));
          g.addColorStop(1,    rgba(s.color, s.alpha * peakA));

          // Soft outer glow
          ctx.beginPath();
          ctx.moveTo(t0x, t0y); ctx.lineTo(ex, ey);
          ctx.strokeStyle = g;
          ctx.lineWidth = s.width + 5;
          ctx.globalAlpha = 0.35;
          ctx.stroke();
          ctx.globalAlpha = 1;

          // Sharp core
          ctx.beginPath();
          ctx.moveTo(t0x, t0y); ctx.lineTo(ex, ey);
          ctx.strokeStyle = g;
          ctx.lineWidth = s.width;
          ctx.stroke();

          // Tip dot
          const dotR = s.width + 5;
          const tg = ctx.createRadialGradient(ex, ey, 0, ex, ey, dotR);
          tg.addColorStop(0,   rgba(s.color, s.alpha * peakA));
          tg.addColorStop(0.5, rgba(s.color, s.alpha * peakA * 0.5));
          tg.addColorStop(1,   rgba(s.color, 0));
          ctx.beginPath();
          ctx.arc(ex, ey, dotR, 0, Math.PI * 2);
          ctx.fillStyle = tg;
          ctx.fill();
        }

        if (s.traveled > 0 && s.traveled % GRID < s.speed + 1 && !s.fadeOut) {
          const nx = s.x + s.dx * Math.round(s.traveled / GRID) * GRID;
          const ny = s.y + s.dy * Math.round(s.traveled / GRID) * GRID;
          if (Math.random() < 0.3) nodes.push({ x: snap(nx), y: snap(ny), r: Math.random() * 3 + 2, alpha: 1, pulse: 0, pulseSpeed: Math.random() * 0.035 + 0.015, color: s.color });
        }
        if (s.traveled >= s.len && !s.fadeOut) s.fadeOut = true;
      }

      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        n.alpha -= 0.004; n.pulse += n.pulseSpeed;
        if (n.alpha <= 0) { nodes.splice(i, 1); continue; }
        const pA = (Math.sin(n.pulse) * 0.5 + 0.5) * n.alpha * nodeA;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 4, 0, Math.PI * 2);
        ctx.fillStyle = rgba(n.color, pA * 0.2); ctx.fill();
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(n.color, pA); ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw", height: "100vh",
        pointerEvents: "none",
        // Behind all content but visible through transparent/semi-transparent sections
        zIndex: 0,
        opacity: 0.4,
      }}
      aria-hidden="true"
    />
  );
}
