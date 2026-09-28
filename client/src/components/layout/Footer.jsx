import { UtensilsCrossed, Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] mt-auto overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-amber/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber to-gold flex items-center justify-center">
                <UtensilsCrossed className="w-4 h-4 text-jet" />
              </div>
              <span className="text-lg font-bold font-heading">
                Bite<span className="text-amber">Speed</span>
              </span>
            </div>
            <p className="text-sm text-slate-dim leading-relaxed max-w-xs">
              Premium cloud kitchen crafting bold, chef-driven flavors delivered fast to your door.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-slate-muted mb-5">Hours</h4>
            <div className="space-y-3 text-sm text-slate-dim">
              <p>Monday – Friday: 11 AM – 10 PM</p>
              <p>Saturday – Sunday: 10 AM – 11 PM</p>
              <p className="text-amber font-medium">Delivery until 30 min before close</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-slate-muted mb-5">Connect</h4>
            <div className="flex items-center gap-3">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-11 h-11 rounded-xl glass-card flex items-center justify-center text-slate-muted hover:text-amber hover:border-amber/20 hover:shadow-glow transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="mt-5 text-sm text-slate-dim">hello@bitespeed.kitchen</p>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/[0.04] text-center text-xs text-slate-dim">
          &copy; {new Date().getFullYear()} BiteSpeed. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
