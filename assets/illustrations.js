/* GLightbox (third-party plugin) powers artwork zoom when CDN is reachable.
   Native dialog remains as a working offline fallback. */
(() => {
  const cards = [...document.querySelectorAll('.art-card')];
  const viewer = document.querySelector('.viewer');
  if (!viewer || !cards.length) return;
  const photo = viewer.querySelector('img');
  const caption = viewer.querySelector('p');
  let lightbox = null;
  if (typeof window.GLightbox === 'function') {
    lightbox = window.GLightbox({
      elements: cards.map(card => ({
        href: card.dataset.full,
        type: 'image',
        title: card.dataset.title || '',
      })),
      touchNavigation: true,
      loop: true,
      keyboardNavigation: true,
    });
  }
  cards.forEach((card, index) => card.addEventListener('click', () => {
    if (lightbox) { lightbox.openAt(index); return; }
    photo.src = card.dataset.full;
    photo.alt = card.dataset.title || '';
    caption.textContent = card.dataset.title || '';
    viewer.showModal();
  }));
  const close = viewer.querySelector('.close');
  if (close) close.addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', e => { if (e.target === viewer) viewer.close(); });
})();
