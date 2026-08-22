document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'light') {
    body.classList.add('theme-light');
  }

  const themeToggles = document.querySelectorAll('.theme-toggle');
  themeToggles.forEach((toggle) => {
    const updateToggleLabel = () => {
      const isLight = body.classList.contains('theme-light');
      toggle.setAttribute('aria-label', isLight ? 'Переключить на тёмную тему' : 'Переключить на светлую тему');
      toggle.innerHTML = isLight ? '☾' : '☀';
    };

    updateToggleLabel();
    toggle.addEventListener('click', () => {
      body.classList.toggle('theme-light');
      const isLight = body.classList.contains('theme-light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      updateToggleLabel();
    });
  });

  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    if (!header) return;
    const scrolled = window.scrollY > 18;
    header.classList.toggle('scrolled', scrolled);
  };
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  const navToggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.site-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const heroMedia = document.querySelector('.hero-media');
  if (heroMedia) {
    const updateParallax = () => {
      const offset = window.scrollY * 0.18;
      heroMedia.style.transform = `scale(1.08) translateY(${offset * 0.75}px)`;
    };
    updateParallax();
    window.addEventListener('scroll', updateParallax, { passive: true });
  }

  const navLinks = document.querySelectorAll('.site-nav a');
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === window.location.pathname.split('/').pop() ||
      link.getAttribute('href') === window.location.pathname;
    if (isActive) {
      link.classList.add('active');
    }
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const scrollTopButton = document.querySelector('.scroll-top');
  if (scrollTopButton) {
    const toggleScrollTop = () => {
      scrollTopButton.classList.toggle('visible', window.scrollY > 340);
    };
    toggleScrollTop();
    window.addEventListener('scroll', toggleScrollTop, { passive: true });
    scrollTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const portfolioItems = [...document.querySelectorAll('.portfolio-item')];
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length && portfolioItems.length) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.dataset.filter;

        filterButtons.forEach((btn) => btn.classList.toggle('is-active', btn === button));

        portfolioItems.forEach((item) => {
          const matches = target === 'all' || item.dataset.category === target;
          item.classList.toggle('is-hidden', !matches);
        });
      });
    });
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.querySelector('#lightbox img');
  const lightboxTitle = document.querySelector('#lightbox [data-lightbox-title]');
  const lightboxDescription = document.querySelector('#lightbox [data-lightbox-description]');
  const lightboxMeta = document.querySelector('#lightbox [data-lightbox-meta]');
  const lightboxClose = document.querySelector('#lightboxClose');
  const lightboxPrev = document.querySelector('#lightboxPrev');
  const lightboxNext = document.querySelector('#lightboxNext');

  let lightboxIndex = 0;
  let lightboxCollection = [];

  const updateLightbox = () => {
    if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxDescription || !lightboxMeta) {
      return;
    }
    const entry = lightboxCollection[lightboxIndex];
    if (!entry) return;
    lightboxImage.src = entry.image;
    lightboxImage.alt = entry.title;
    lightboxTitle.textContent = entry.title;
    lightboxDescription.textContent = entry.description;
    lightboxMeta.textContent = entry.meta;
  };

  const openLightbox = (index, items) => {
    if (!lightbox || !items.length) return;
    lightboxCollection = items;
    lightboxIndex = index;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    updateLightbox();
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  const galleryCards = [...document.querySelectorAll('[data-lightbox-image]')];
  galleryCards.forEach((card, index) => {
    const items = galleryCards.map((item) => ({
      image: item.dataset.lightboxImage,
      title: item.dataset.lightboxTitle,
      description: item.dataset.lightboxDescription,
      meta: item.dataset.lightboxMeta,
    }));

    card.addEventListener('click', () => openLightbox(index, items));
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
      if (!lightboxCollection.length) return;
      lightboxIndex = (lightboxIndex - 1 + lightboxCollection.length) % lightboxCollection.length;
      updateLightbox();
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
      if (!lightboxCollection.length) return;
      lightboxIndex = (lightboxIndex + 1) % lightboxCollection.length;
      updateLightbox();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (!lightbox || !lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowRight') {
      if (!lightboxCollection.length) return;
      lightboxIndex = (lightboxIndex + 1) % lightboxCollection.length;
      updateLightbox();
    }
    if (event.key === 'ArrowLeft') {
      if (!lightboxCollection.length) return;
      lightboxIndex = (lightboxIndex - 1 + lightboxCollection.length) % lightboxCollection.length;
      updateLightbox();
    }
  });

  if (lightbox) {
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const status = document.getElementById('formStatus');
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const name = (formData.get('name') || '').toString().trim();
      const email = (formData.get('email') || '').toString().trim();
      const phone = (formData.get('phone') || '').toString().trim();
      const agree = formData.get('agree') === 'on';

      if (!name || !email || !phone || !agree) {
        status.textContent = 'Пожалуйста, заполните все обязательные поля и согласие на обработку данных.';
        status.style.color = 'var(--danger)';
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        status.textContent = 'Проверьте корректность email.';
        status.style.color = 'var(--danger)';
        return;
      }

      status.textContent = 'Спасибо! Ваша заявка успешно отправлена. Я свяжусь с вами в ближайшее время.';
      status.style.color = 'var(--success)';
      contactForm.reset();
    });
  }

  const shootType = document.getElementById('shootType');
  if (shootType) {
    const params = new URLSearchParams(window.location.search);
    const preselectedType = params.get('type');
    if (preselectedType) {
      shootType.value = preselectedType;
    }
  }

  const currentYear = document.getElementById('currentYear');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
});
