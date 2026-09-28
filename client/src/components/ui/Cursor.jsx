import { useEffect, useRef, useState } from 'react';

// Context-aware custom cursor. Disabled on touch / reduced-motion.
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [label, setLabel] = useState('');
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    document.body.classList.add('cursor-on');

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const rp = { ...pos };
    let raf;
    const move = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    };
    const loop = () => {
      rp.x += (pos.x - rp.x) * 0.2;
      rp.y += (pos.y - rp.y) * 0.2;
      if (ring.current) ring.current.style.transform = `translate(${rp.x}px, ${rp.y}px)`;
      raf = requestAnimationFrame(loop);
    };
    const over = (e) => {
      const t = e.target.closest('[data-cursor], a, button');
      if (!t) {
        setActive(false);
        setLabel('');
        return;
      }
      setActive(true);
      setLabel(t.getAttribute('data-cursor') || '');
    };
    addEventListener('mousemove', move);
    addEventListener('mouseover', over);
    raf = requestAnimationFrame(loop);
    return () => {
      removeEventListener('mousemove', move);
      removeEventListener('mouseover', over);
      cancelAnimationFrame(raf);
      document.body.classList.remove('cursor-on');
    };
  }, []);

  return (
    <>
      <div ref={dot} className="k-cursor -ml-1 -mt-1 h-2 w-2 rounded-full bg-amber" />
      <div
        ref={ring}
        className="k-cursor flex items-center justify-center rounded-full text-[10px] font-semibold uppercase tracking-wider"
        style={{
          width: active ? 64 : 32,
          height: active ? 64 : 32,
          marginLeft: active ? -32 : -16,
          marginTop: active ? -32 : -16,
          border: active && label ? 'none' : '1px solid rgba(245,158,11,0.7)',
          backgroundColor: active && label ? '#f59e0b' : 'transparent',
          color: active && label ? '#060606' : '#f59e0b',
          transition: 'width .2s, height .2s, margin .2s',
        }}
      >
        {active ? label : ''}
      </div>
    </>
  );
}
