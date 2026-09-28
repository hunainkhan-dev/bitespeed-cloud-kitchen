import { lazy, Suspense, useState, useEffect } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import Button from '@/components/ui/Button';

const EmberField = lazy(() => import('@/components/three/EmberField'));

export default function Hero() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const id = requestAnimationFrame(() => setShow3D(true));
    return () => cancelAnimationFrame(id);
  }, [reduced]);

  const scrollToMenu = () => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Full-bleed cinematic imagery */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=2000&h=1400&fit=crop"
          alt="Signature wagyu smash burger from the BiteSpeed kitchen"
          className="w-full h-full object-cover animate-ken-burns"
        />
        {/* Editorial scrims — dark on the left/bottom for legibility, image breathes on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-deep via-deep/80 to-deep/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-transparent to-deep/40" />
        {/* Warm ambient wash */}
        <div className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] rounded-full blur-[160px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.14), transparent 70%)' }} />
      </div>

      {/* 3D amber ember field — atmospheric WebGL layer above the image, behind the copy */}
      {show3D && !reduced && (
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <Suspense fallback={null}>
            <EmberField />
          </Suspense>
        </div>
      )}

      {/* Content — editorial, left aligned */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-8 animate-rise" style={{ animationDelay: '0.15s' }}>
            <span className="h-px w-10 bg-amber/60" />
            <span className="text-[11px] font-semibold tracking-[0.32em] uppercase text-amber">
              Premium Cloud Kitchen
            </span>
          </div>

          <h1 className="font-heading font-extrabold tracking-[-0.045em] leading-[0.94] text-[3.5rem] sm:text-7xl lg:text-[5.75rem]">
            <span className="block text-alabaster animate-rise" style={{ animationDelay: '0.25s' }}>
              Bold flavors,
            </span>
            <span className="block gradient-text text-shadow-glow animate-rise" style={{ animationDelay: '0.4s' }}>
              delivered fast.
            </span>
          </h1>

          <p
            className="mt-7 text-lg md:text-xl text-slate-muted max-w-lg leading-relaxed animate-rise"
            style={{ animationDelay: '0.55s' }}
          >
            Chef-crafted plates from our state-of-the-art kitchen, plated with intent
            and at your door in thirty minutes.
          </p>

          <div
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-rise"
            style={{ animationDelay: '0.7s' }}
          >
            <Button
              size="lg"
              className="group text-base px-8 shadow-glow-strong hover:shadow-glow-intense w-full sm:w-auto"
              onClick={scrollToMenu}
            >
              Explore the Menu
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="text-base px-8 w-full sm:w-auto" onClick={() => navigate('/reserve')}>
              Reserve a Table
            </Button>
          </div>

          {/* Understated editorial trust strip — no boxy cards */}
          <div
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-muted animate-fade-in"
            style={{ animationDelay: '0.95s' }}
          >
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber fill-amber" />
              <span className="text-alabaster font-semibold">4.9</span>
              <span className="text-slate-dim">/ 2,400+ reviews</span>
            </span>
            <span className="h-4 w-px bg-white/10" />
            <span><span className="text-alabaster font-semibold">30 min</span> <span className="text-slate-dim">avg. delivery</span></span>
            <span className="h-4 w-px bg-white/10" />
            <span><span className="text-alabaster font-semibold">50+</span> <span className="text-slate-dim">signature dishes</span></span>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={scrollToMenu}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-slate-dim hover:text-amber transition-colors duration-300 animate-fade-in"
        style={{ animationDelay: '1.3s' }}
        aria-label="Scroll to menu"
      >
        <span className="text-[10px] font-semibold tracking-[0.25em] uppercase">Scroll</span>
        <span className="relative flex h-9 w-5 items-start justify-center rounded-full border border-white/15 p-1">
          <span className="h-1.5 w-1.5 rounded-full bg-amber" style={{ animation: 'scroll-dot 1.8s ease-in-out infinite' }} />
        </span>
      </button>
    </section>
  );
}
