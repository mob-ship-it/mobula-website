import React, { useEffect, useRef } from 'react';

// Lightweight, high-performance custom cursor.
// Implementation notes:
// - Avoid React state updates on every mousemove to prevent re-renders.
// - Use refs + rAF to update DOM transforms directly.
// - Add/remove `custom-cursor-enabled` on <body> instead of global CSS that always hides the cursor.
// - Disable on touch / coarse-pointer devices for accessibility.

export default function MobulaAnimatedCursor() {
  const cursorRef = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const hoverRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Disable on touch devices / coarse pointers
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    // Enable custom cursor by adding a class to body (safer than global * { cursor: none }).
    document.body.classList.add('custom-cursor-enabled');

    const handleMouseMove = (e) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      const tag = target.tagName;
      const isInteractive =
        tag === 'A' ||
        tag === 'BUTTON' ||
        (target.getAttribute && target.getAttribute('role') === 'button') ||
        target.classList?.contains('cursor-pointer') ||
        target.classList?.contains('mobile-menu-link');

      hoverRef.current = !!isInteractive;
      // apply immediate scale change for hover via transform
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${posRef.current.x - 24}px, ${posRef.current.y - 24}px) scale(${hoverRef.current ? 1.3 : 1})`;
    };

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = '0px';
        cursorRef.current.style.top = '0px';
        cursorRef.current.style.transform = `translate(${posRef.current.x - 24}px, ${posRef.current.y - 24}px) scale(${hoverRef.current ? 1.3 : 1})`;
        cursorRef.current.style.opacity = '1';
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    // Use passive listener for performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.classList.remove('custom-cursor-enabled');
    };
  }, []);

  // Render minimal DOM nodes — styles are applied/updated directly to avoid React re-renders.
  return (
    <>

      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '48px',
          height: '48px',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
          opacity: 0,
          transform: 'translate(-24px, -24px)'
        }}
      >
        <img
          src="/cursor-mobulita-48.png"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block'
          }}
        />
      </div>
    </>
  );
}
