(function initTheme() {
  const stored = localStorage.getItem('godsland-theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (systemDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

window.toggleTheme = function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('godsland-theme', next);
};
