import React, { useEffect, useRef } from 'react';
import './MouseRing.css';

const MouseRing = () => {
  const dotRef = useRef(null);
  const ringsRef = useRef([null, null, null]);
  const mousePos = useRef({ x: 0, y: 0 });
  const elementsPos = useRef([
    { x: 0, y: 0, scale: 1, rotation: 0 }, // dot
    { x: 0, y: 0, scale: 1, rotation: 0 }, // ring1
    { x: 0, y: 0, scale: 1, rotation: 0 }, // ring2
    { x: 0, y: 0, scale: 1, rotation: 0 }  // ring3
  ]);

  // Configuration using your CSS variables
  const config = {
    speeds: [0.20, 0.13, 0.07, 0.03], // dot, ring1, ring2, ring3
    sizes: [4, 12, 20, 28], // sizes in pixels (dot, ring1, ring2, ring3)
    rotations: [0.3, -0.2, 0.4], // degrees per frame (ring1, ring2, ring3)
    colors: [
      'var(--bright-pink)',
      'var(--black)',
      'var(--bright-orange)',
      'var(--vibrant-red)',
    ],
    borderWidths: [0, 1.5, 1.2, 1] // border widths (dot has no border)
  };

  useEffect(() => {
    // Initialize positions
    mousePos.current.x = window.innerWidth / 2;
    mousePos.current.y = window.innerHeight / 2;
    elementsPos.current.forEach(pos => {
      pos.x = mousePos.current.x;
      pos.y = mousePos.current.y;
    });

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = (time) => {
      // Smooth pulse animation (subtle breathing effect)
      const pulseFactor = Math.sin(time * 0.003) * 0.15 + 0.85; // 0.7-1 range

      elementsPos.current.forEach((pos, i) => {
        if (i === 0) return; // dot doesn't follow with delay

        // Update position with delay
        pos.x += (mousePos.current.x - pos.x) * config.speeds[i];
        pos.y += (mousePos.current.y - pos.y) * config.speeds[i];
        
        // Update rotation
        pos.rotation += config.rotations[i - 1];
        
        // Subtle scale pulsing (all rings pulse together but less intensely)
        pos.scale = pulseFactor;
      });

      // Dot position (no delay)
      elementsPos.current[0].x = mousePos.current.x;
      elementsPos.current[0].y = mousePos.current.y;

      // Apply transformations
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${elementsPos.current[0].x}px, ${elementsPos.current[0].y}px, 0) translate(-50%, -50%)`;
      }

      ringsRef.current.forEach((ring, i) => {
        if (ring) {
          const pos = elementsPos.current[i + 1];
          ring.style.transform = `
            translate3d(${pos.x}px, ${pos.y}px, 0) 
            translate(-50%, -50%)
            scale(${pos.scale})
            rotate(${pos.rotation}deg)
          `;
        }
      });

      requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <></>

  return (
    <>
      <div 
        className="mouse-dot" 
        ref={dotRef}
        style={{ 
          backgroundColor: config.colors[0],
          width: `${config.sizes[0]}px`,
          height: `${config.sizes[0]}px`
        }}
      ></div>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="mouse-ring"
          ref={el => ringsRef.current[i - 1] = el}
          style={{
            borderColor: config.colors[i],
            width: `${config.sizes[i]}px`,
            height: `${config.sizes[i]}px`,
            borderWidth: `${config.borderWidths[i]}px`
          }}
        ></div>
      ))}
    </>
  );
};

export default MouseRing;