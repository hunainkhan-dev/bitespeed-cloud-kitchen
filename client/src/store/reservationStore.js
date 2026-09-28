import { create } from 'zustand';

const useReservationStore = create((set, get) => ({
  reservations: [],

  addReservation: (reservation) =>
    set((state) => ({
      reservations: [
        ...state.reservations,
        { ...reservation, _id: String(Date.now()), createdAt: new Date().toISOString() },
      ],
    })),

  getSlotsForDate: (date) => {
    const reservations = get().reservations.filter((r) => r.date === date);
    const slotCounts = {};
    reservations.forEach((r) => {
      slotCounts[r.time] = (slotCounts[r.time] || 0) + r.guests;
    });
    return slotCounts;
  },

  getAvailableSeats: (date, time, maxCapacity = 40) => {
    const reservations = get().reservations.filter(
      (r) => r.date === date && r.time === time
    );
    const booked = reservations.reduce((sum, r) => sum + r.guests, 0);
    return maxCapacity - booked;
  },
}));

export default useReservationStore;
