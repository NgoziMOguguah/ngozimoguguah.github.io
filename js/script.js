const root = document.documentElement;
const navToggle = document.querySelector('.nav-toggle');
const body = document.body;
const backTop = document.querySelector('.back-top');
const heroTyping = document.querySelector('.typing-text');
const counterItems = document.querySelectorAll('[data-target]');
const publicationSearch = document.getElementById('publication-search');
const publicationYear = document.getElementById('publication-year');
const publicationTopic = document.getElementById('publication-topic');
const publicationCards = document.querySelectorAll('.publication-card');
const lightboxImages = document.querySelectorAll('.lightbox-trigger');
const lightbox = document.createElement('div');

lightbox.id = 'lightbox-overlay';
lightbox.className = 'lightbox-overlay';
document.body.appendChild(lightbox);

const typeLines = [
  'Fisheries biology shaped by evidence, policy, and community.',
  'Research leadership for ocean sustainability and coastal resilience.',
  'Connecting science with stakeholders, strategy, and global impact.'
];
let currentTyping = 0;
let currentIndex = 0;

function openMobileNav() {
  body.classList.toggle('nav-open');
}

function closeMobileNav() {
  body.classList.remove('nav-open');
}

navToggle?.addEventListener('click', openMobileNav);

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', closeMobileNav);
});

window.addEventListener('scroll', () => {
  const offset = window.scrollY;
  if (offset > 600) {
    backTop?.classList.add('visible');
  } else {
    backTop?.classList.remove('visible');
  }
});

backTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function animateOnScroll() {
  const elements = document.querySelectorAll('.fade-up, .slide-left, .slide-right, .zoom-in');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  elements.forEach((element) => observer.observe(element));
}

function lazyLoadImages() {
  const lazyImages = document.querySelectorAll('img.lazy');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.onload = () => img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    },
    { rootMargin: '100px 0px' }
  );
  lazyImages.forEach((img) => observer.observe(img));
}

function startTyping() {
  if (!heroTyping) return;
  heroTyping.textContent = '';
  const line = typeLines[currentTyping];
  currentIndex = 0;
  const interval = setInterval(() => {
    heroTyping.textContent = line.slice(0, currentIndex + 1);
    currentIndex += 1;
    if (currentIndex === line.length) {
      clearInterval(interval);
      setTimeout(() => {
        currentTyping = (currentTyping + 1) % typeLines.length;
        startTyping();
      }, 2600);
    }
  }, 50);
}

function startCounters() {
  counterItems.forEach((counter) => {
    const target = Number(counter.dataset.target);
    let current = 0;
    const step = Math.max(1, Math.round(target / 180));
    const updateCount = () => {
      current = Math.min(target, current + step);
      counter.textContent = current;
      if (current < target) {
        requestAnimationFrame(updateCount);
      }
    };
    updateCount();
  });
}

function filterPublications() {
  const search = publicationSearch?.value.toLowerCase() ?? '';
  const year = publicationYear?.value;
  const topic = publicationTopic?.value;
  publicationCards.forEach((card) => {
    const title = card.querySelector('h3')?.textContent?.toLowerCase() ?? '';
    const metadata = card.querySelector('.publication-meta')?.textContent?.toLowerCase() ?? '';
    const matchesSearch = search === '' || title.includes(search) || metadata.includes(search);
    const matchesYear = year === 'all' || card.dataset.year === year;
    const matchesTopic = topic === 'all' || card.dataset.topic === topic;
    card.style.display = matchesSearch && matchesYear && matchesTopic ? 'grid' : 'none';
  });
}

[publicationSearch, publicationYear, publicationTopic].forEach((input) => {
  input?.addEventListener('input', filterPublications);
});

function createLightbox() {
  if (!lightbox) return;
  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    lightbox.innerHTML = '';
  });
  lightboxImages.forEach((image) => {
    image.addEventListener('click', (event) => {
      event.preventDefault();
      const src = image.dataset.src || image.src;
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      img.src = src;
      img.alt = image.alt || 'Expanded image';
      figure.appendChild(img);
      lightbox.innerHTML = '';
      lightbox.appendChild(figure);
      lightbox.classList.add('active');
    });
  });
}

function validateContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const message = form.querySelector('[name="message"]');
    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      event.preventDefault();
      alert('Please complete all required fields before sending your message.');
    }
  });
}

function updateFooterYear() {
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
}

function init() {
  animateOnScroll();
  lazyLoadImages();
  startTyping();
  startCounters();
  createLightbox();
  validateContactForm();
  filterPublications();
  updateFooterYear();
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const hash = anchor.getAttribute('href');
      if (hash.length > 1 && document.querySelector(hash)) {
        event.preventDefault();
        document.querySelector(hash).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

window.addEventListener('DOMContentLoaded', init);
