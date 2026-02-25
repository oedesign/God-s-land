(function initGlobal() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  document.querySelectorAll('[data-theme-toggle]').forEach(btn => btn.addEventListener('click', window.toggleTheme));

  const drawer = document.querySelector('.mobile-drawer');
  const openBtn = document.querySelector('[data-open-menu]');
  const closeDrawer = () => drawer?.classList.remove('open');
  openBtn?.addEventListener('click', () => drawer?.classList.add('open'));
  drawer?.addEventListener('click', (e) => {
    if (e.target.matches('.mobile-drawer, [data-close-menu], .mobile-drawer a')) closeDrawer();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

  document.querySelectorAll('.global-search').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = (form.querySelector('input')?.value || '').trim();
      if (location.pathname.includes('listings.html')) {
        const search = document.querySelector('#filter-q');
        if (search) search.value = q;
        document.dispatchEvent(new CustomEvent('godsland:applyFilters'));
      } else {
        location.href = `listings.html?q=${encodeURIComponent(q)}`;
      }
    });
  });

  const waFloat = document.querySelector('.floating-wa');
  if (waFloat) {
    waFloat.style.display = 'none';
    window.addEventListener('scroll', () => {
      waFloat.style.display = window.scrollY > 280 ? 'grid' : 'none';
    });
  }
})();
