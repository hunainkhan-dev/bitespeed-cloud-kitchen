import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import MenuPage from '@/pages/MenuPage';
import ReservationPage from '@/pages/ReservationPage';
import AdminPage from '@/pages/AdminPage';

// Strip trailing slash so React Router accepts the basename. When built
// standalone BASE_URL is "/" (basename becomes ""), when built for the
// portfolio it is "/demos/bitespeed/" so routing works under that subpath.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MenuPage />} />
          <Route path="/reserve" element={<ReservationPage />} />
          <Route path="/admin" element={<AdminPage />} />
          {/* Catch-all: /index.html (portfolio deep link) or any unknown path → menu */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
