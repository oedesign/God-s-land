window.setupCarousel = function setupCarousel(containerSelector, slides) {
  const container = document.querySelector(containerSelector);
  if (!container || !slides?.length) return;
  let idx = 0;

  container.innerHTML = slides.map((item, i) => `
    <article class="carousel-slide card ${i === 0 ? 'active' : ''}" data-index="${i}">
      <img loading="lazy" src="${item.images[0]}" alt="${item.title}">
      <div class="slide-meta">
        <strong>${item.title}</strong>
        <p class="muted">${item.type} • ${item.state}, ${item.lga}</p>
        <div class="tags">${item.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <a class="btn" href="${buildWhatsAppLink(item)}" target="_blank" rel="noopener">Enquire / Buy on WhatsApp</a>
      </div>
    </article>
  `).join('');

  const dotsWrap = document.querySelector('.dots');
  if (dotsWrap) {
    dotsWrap.innerHTML = slides.map((_, i) => `<button class="dot ${i === 0 ? 'active' : ''}" data-dot="${i}" aria-label="Go to slide ${i+1}"></button>`).join('');
    dotsWrap.addEventListener('click', (e) => {
      const dot = e.target.closest('[data-dot]');
      if (!dot) return;
      idx = Number(dot.dataset.dot);
      render();
    });
  }

  const render = () => {
    [...container.querySelectorAll('.carousel-slide')].forEach((el, i) => el.classList.toggle('active', i === idx));
    [...document.querySelectorAll('.dot')].forEach((el, i) => el.classList.toggle('active', i === idx));
  };

  document.querySelector('[data-prev]')?.addEventListener('click', () => { idx = (idx - 1 + slides.length) % slides.length; render(); });
  document.querySelector('[data-next]')?.addEventListener('click', () => { idx = (idx + 1) % slides.length; render(); });

  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { idx = (idx - 1 + slides.length) % slides.length; render(); }
    if (e.key === 'ArrowRight') { idx = (idx + 1) % slides.length; render(); }
  });
};
