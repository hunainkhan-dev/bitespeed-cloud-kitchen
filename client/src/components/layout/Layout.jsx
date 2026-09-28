import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import Cursor from '@/components/ui/Cursor';
import { ToastContainer } from '@/components/ui/Toast';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
};

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-deep">
      <Cursor />
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="flex-1 pt-16 md:pt-20"
          {...pageTransition}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <CartDrawer />
      <ToastContainer />
    </div>
  );
}
