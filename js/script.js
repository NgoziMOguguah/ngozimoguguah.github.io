document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  const navLinks = document.querySelectorAll('.nav-list a');
  const lazyImages = document.querySelectorAll('img.lazy');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navList.classList.toggle('show');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navList.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const revealLazyImages = () => {
    lazyImages.forEach((img) => {
      const source = img.getAttribute('data-src');
      if (!source) return;
      const rect = img.getBoundingClientRect();
      if (rect.top < window.innerHeight * 1.3) {
        img.setAttribute('src', source);
        img.classList.add('loaded');
        img.removeAttribute('data-src');
      }
    });
  };

  if (lazyImages.length) {
    revealLazyImages();
    window.addEventListener('scroll', revealLazyImages, { passive: true });
    window.addEventListener('resize', revealLazyImages);
  }
});