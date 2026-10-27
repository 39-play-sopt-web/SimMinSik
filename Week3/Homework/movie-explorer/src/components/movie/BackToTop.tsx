import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 600);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  function goToTop() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' });
    document.getElementById('movie-list-title')?.focus({ preventScroll: true });
  }

  return (
    <button type="button" onClick={goToTop} className="fixed right-5 bottom-5 z-10 rounded-full bg-accent px-5 py-3 font-semibold text-white shadow-lg hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4">
      ↑ 맨 위로
    </button>
  );
}
