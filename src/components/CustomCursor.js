import { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";

export default function CustomCursor() {

  const theme = useTheme();

  const headRef = useRef(null);
  const segmentsRef = useRef([]);

  useEffect(() => {

    const segmentCount = 18;
    let segments = [];

    /* create dragon body */

    for (let i = 0; i < segmentCount; i++) {

      const seg = document.createElement("div");
      seg.className = "dragon-segment";

      document.body.appendChild(seg);
      segments.push(seg);

    }

    segmentsRef.current = segments;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let positions = [];

    for (let i = 0; i < segmentCount; i++) {
      positions.push({ x: mouseX, y: mouseY });
    }

    /* mouse move */

    const move = (e) => {

      mouseX = e.clientX;
      mouseY = e.clientY;

      headRef.current.style.transform =
        `translate(${mouseX}px, ${mouseY}px)`;

    };

    document.addEventListener("mousemove", move);

    /* animation loop */

    const animate = () => {

      positions[0].x += (mouseX - positions[0].x) * 0.25;
      positions[0].y += (mouseY - positions[0].y) * 0.25;

      segments.forEach((seg, i) => {

        const prev = positions[i - 1] || positions[0];

        positions[i].x += (prev.x - positions[i].x) * 0.35;
        positions[i].y += (prev.y - positions[i].y) * 0.35;

        seg.style.transform =
          `translate(${positions[i].x}px, ${positions[i].y}px)`;

        seg.style.opacity = 1 - i / segmentCount;

        seg.style.scale = 1 - i * 0.03;

      });

      requestAnimationFrame(animate);

    };

    animate();

    return () => {

      document.removeEventListener("mousemove", move);

      segments.forEach(s => s.remove());

    };

  }, []);

  /* theme colors */

  const themeName = theme.name || theme.palette.mode;

  let color = "#ffffff";

  if (themeName === "ocean") color = "#00bfff";
  if (themeName === "student") color = "#ff4dff";
  if (theme.palette.mode === "dark") color = "#00ffff";

  return (
    <>
      <div
        ref={headRef}
        className="dragon-head"
        style={{ background: color }}
      />
    </>
  );
}