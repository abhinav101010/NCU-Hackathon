import { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";

export default function NetworkBackground() {
  const canvasRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const primary = theme.palette.primary.main;

    let particles = [];
    const num = 80;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    particles = Array.from({ length: num }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // particle color
        ctx.fillStyle = primary;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < num; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);

            const opacity = 1 - dist / 120;
            ctx.strokeStyle =
              theme.palette.mode === "light"
                ? `rgba(0,0,0,${opacity * 0.25})`
                : `${primary}${Math.floor(opacity * 80).toString(16)}`;

            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [theme]); // ✅ re-run when theme changes

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}