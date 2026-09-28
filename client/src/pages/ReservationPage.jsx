import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Clock, Users, CheckCircle, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import useReservationStore from '@/store/reservationStore';
import { useToast } from '@/components/ui/Toast';
import { formatTime, generateTimeSlots } from '@/lib/utils';
import { MIN_GUESTS, MAX_GUESTS } from '@/lib/constants';

export default function ReservationPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const { addReservation, getAvailableSeats } = useReservationStore();
  const addToast = useToast((s) => s.addToast);

  const timeSlots = useMemo(() => generateTimeSlots(), []);
  const availableSeats = useMemo(
    () => (date && time ? getAvailableSeats(date, time) : null),
    [date, time, getAvailableSeats]
  );

  useEffect(() => {
    document.title = 'BiteSpeed — Reserve a Table';
  }, []);

  const today = new Date().toISOString().split('T')[0];

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Name is required';
    if (!email.trim()) errs.email = 'Email is required';
    if (!phone.trim()) errs.phone = 'Phone is required';
    if (!date) errs.date = 'Pick a date';
    if (!time) errs.time = 'Pick a time slot';
    if (guests < MIN_GUESTS || guests > MAX_GUESTS) {
      errs.guests = `Party size must be between ${MIN_GUESTS} and ${MAX_GUESTS} guests`;
    }
    if (availableSeats !== null && guests > availableSeats) {
      errs.guests = `Only ${availableSeats} seats available for this slot`;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    addReservation({ name, email, phone, date, time, guests });
    addToast({ type: 'success', message: 'Table reserved! Check your email for confirmation.' });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[80dvh] flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-success/10 border border-success/20 flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-9 h-9 text-success" />
          </div>
          <h2 className="text-3xl font-bold font-heading mb-4">Table Reserved!</h2>
          <p className="text-slate-muted leading-relaxed">
            Your reservation for {guests} guests on {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {formatTime(time)} is confirmed.
          </p>
          <Button className="mt-10" onClick={() => { setSubmitted(false); setName(''); setEmail(''); setPhone(''); setDate(''); setTime(''); setGuests(2); setErrors({}); }}>
            Book Another Table
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[80dvh] section-spacing px-4 md:px-8 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-14"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-6"
        >
          <Sparkles className="w-3 h-3 text-amber" />
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-amber">Fine Dining Experience</span>
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-extrabold font-heading tracking-[-0.04em]">
          Reserve a <span className="gradient-text text-shadow-glow">Table</span>
        </h1>
        <p className="text-slate-muted mt-5 max-w-lg mx-auto leading-relaxed">
          Secure your spot for an unforgettable dining experience. Party size up to {MAX_GUESTS} guests.
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        onSubmit={handleSubmit}
        className="glass-card rounded-2xl p-7 md:p-10 space-y-7"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Full Name" placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} icon={Users} />
          <Input label="Email" type="email" placeholder="jane@example.com" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
          <Input label="Phone" type="tel" placeholder="(555) 123-4567" value={phone} onChange={(e) => setPhone(e.target.value)} error={errors.phone} />
          <div className="space-y-2">
            <label className="block text-xs font-semibold tracking-wide uppercase text-slate-muted">Number of Guests</label>
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => setGuests(Math.max(MIN_GUESTS, guests - 1))}
                className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-lg font-bold text-slate-muted hover:text-alabaster hover:border-amber/20 transition-all duration-300 active:scale-95">
                −
              </button>
              <span className="text-3xl font-bold w-10 text-center font-heading">{guests}</span>
              <button type="button" onClick={() => setGuests(Math.min(MAX_GUESTS, guests + 1))}
                className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-lg font-bold text-slate-muted hover:text-alabaster hover:border-amber/20 transition-all duration-300 active:scale-95">
                +
              </button>
            </div>
            {errors.guests && <p className="text-xs text-error font-medium">{errors.guests}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Date" type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} error={errors.date} icon={CalendarDays} />
          <div className="space-y-2">
            <label className="block text-xs font-semibold tracking-wide uppercase text-slate-muted">Time Slot</label>
            <div className="relative group">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-dim group-focus-within:text-amber transition-colors duration-300" />
              <select value={time} onChange={(e) => setTime(e.target.value)}
                className="w-full glass-card rounded-xl pl-11 pr-4 py-3 text-sm text-alabaster appearance-none focus:outline-none focus:border-amber/30 focus:shadow-glow transition-all duration-300 min-h-[48px]">
                <option value="">Select a time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot} className="bg-charcoal">{formatTime(slot)}</option>
                ))}
              </select>
            </div>
            {errors.time && <p className="text-xs text-error font-medium">{errors.time}</p>}
          </div>
        </div>

        {date && time && availableSeats !== null && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            className="flex items-center gap-3 px-5 py-4 rounded-xl bg-amber/5 border border-amber/15">
            <CalendarDays className="w-4 h-4 text-amber shrink-0" />
            <p className="text-sm text-amber">
              <span className="font-bold">{availableSeats}</span> seats remaining for this time slot
            </p>
          </motion.div>
        )}

        <Button type="submit" size="lg" className="w-full text-base">
          Confirm Reservation
        </Button>
      </motion.form>
    </div>
  );
}
