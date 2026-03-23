/* ============================================
   HEATER HOUSE — Interactive Enhancements
   ============================================ */

(function () {
  'use strict';

  // ---------- Floating Particles ----------
  const particleContainer = document.getElementById('particles');

  function createParticle() {
    const el = document.createElement('div');
    el.classList.add('particle');

    const size = Math.random() * 4 + 2;            // 2–6px
    const left = Math.random() * 100;               // 0–100%
    const duration = Math.random() * 12 + 8;        // 8–20s
    const delay = Math.random() * 8;                // 0–8s
    const opacity = Math.random() * 0.3 + 0.05;     // 0.05–0.35

    el.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      opacity: ${opacity};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    particleContainer.appendChild(el);

    // Clean up + recreate when animation ends
    el.addEventListener('animationend', () => {
      el.remove();
      createParticle();
    });
  }

  // Spawn initial batch — fewer on mobile
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const particleCount = isMobile ? 15 : 30;
  for (let i = 0; i < particleCount; i++) {
    createParticle();
  }

  // ---------- Subtle Parallax on Logo ----------
  const logo = document.getElementById('logo');
  const hero = document.getElementById('hero');

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 → 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      requestAnimationFrame(() => {
        logo.style.transform = `translate(${x * 12}px, ${y * 10}px)`;
      });
    });

    hero.addEventListener('mouseleave', () => {
      logo.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      logo.style.transform = 'translate(0, 0)';
      setTimeout(() => { logo.style.transition = ''; }, 600);
    });
  }

  // ---------- Touch-friendly: remove hover styles on touch ----------
  window.addEventListener('touchstart', () => {
    document.body.classList.add('touch-device');
  }, { once: true });

})();
