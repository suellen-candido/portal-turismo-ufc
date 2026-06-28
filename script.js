/* =====================================================
   HORIZONTE TURISMO — JavaScript Principal
   Disciplina: Programação Web — UFC Itapajé

   Funcionalidades:
   - Menu mobile toggle
   - Smooth scroll para âncoras
===================================================== */

document.addEventListener('DOMContentLoaded', function() {

  /* ── Menu Mobile ─────────────────────────────── */
  const navToggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      mobileNav.setAttribute('aria-hidden', isExpanded);

      if (!isExpanded) {
        mobileNav.style.display = 'block';
      } else {
        mobileNav.style.display = 'none';
      }
    });
  }

  /* ── Fechar menu ao clicar em link ───────────── */
  const mobileLinks = document.querySelectorAll('.mobile-link');
  mobileLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (navToggle && mobileNav) {
        navToggle.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        mobileNav.style.display = 'none';
      }
    });
  });

});