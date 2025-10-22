// Small interactions for the landing page
// - Mobile nav toggle with ARIA state sync
// - Smooth scroll for in-page links and CTA buttons
// - FAQ accordion (single open)
// - "See proof" panel toggle

(function () {
  // Safe viewport height for mobile Safari: set CSS --vh unit
  (function setSafeVh(){
    var set = function(){
      document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
    };
    set();
    window.addEventListener('resize', set, { passive: true });
  })();
  // Helpers
  function qs(selector, scope) { return (scope || document).querySelector(selector); }
  function qsa(selector, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(selector)); }
  function smoothScrollTo(target) {
    if (!target) return;
    const el = typeof target === 'string' ? qs(target) : target;
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Header year
  const yearEl = qs('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = qs('.nav-toggle');
  const navMenu = qs('#nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('open', !expanded);
    });
    // Close on link click (mobile)
    qsa('a[href^="#"]', navMenu).forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      });
    });
  }

  // Smooth scroll for elements with data-scroll or in-page anchor links in header/footer/cta
  qsa('[data-scroll], header a[href^="#"], .site-footer a[href^="#"], .sticky-demo').forEach(function (el) {
    el.addEventListener('click', function (e) {
      const target = this.getAttribute('data-scroll') || this.getAttribute('href');
      if (target && target.startsWith('#')) {
        e.preventDefault();
        smoothScrollTo(target);
      }
    });
  });

  // FAQ accordion (only one open at a time)
  const triggers = qsa('.accordion-trigger');
  triggers.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      const controls = this.getAttribute('aria-controls');
      const panel = controls && qs('#' + CSS.escape(controls));

      // Close all
      triggers.forEach(function (b) {
        const c = b.getAttribute('aria-controls');
        const p = c && qs('#' + CSS.escape(c));
        b.setAttribute('aria-expanded', 'false');
        if (p) p.hidden = true;
      });

      // Toggle current
      this.setAttribute('aria-expanded', String(!expanded));
      if (panel) panel.hidden = expanded; // open when previously closed
    });
  });

  // Proof toggle
  const showProofBtn = qs('.show-proof');
  const evidence = qs('#evidence');
  if (showProofBtn && evidence) {
    showProofBtn.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      const next = !expanded;
      this.setAttribute('aria-expanded', String(next));
      evidence.hidden = !next;
      if (next) evidence.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
})();



