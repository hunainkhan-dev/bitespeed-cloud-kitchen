import { useEffect } from 'react';
import Hero from '@/components/sections/Hero';
import MenuGrid from '@/components/sections/MenuGrid';

export default function MenuPage() {
  useEffect(() => {
    document.title = 'BiteSpeed — Menu';
  }, []);

  return (
    <>
      <Hero />
      <MenuGrid />
    </>
  );
}
