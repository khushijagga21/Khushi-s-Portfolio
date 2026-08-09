/* Khushi — site interactions */

(function () {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Soft light page transition ---------- */
  const softTransition = document.querySelector('.soft-transition');

  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      document.body.classList.remove('is-leaving');
    }
  });

  if (!reducedMotion && softTransition) {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || link.target === '_blank') {
        return;
      }

      let url;
      try {
        url = new URL(href, window.location.href);
      } catch (_) {
        return;
      }

      if (url.origin !== window.location.origin) return;

      const next = url.pathname.replace(/\\/g, '/').split('/').pop() || 'index.html';
      const current = window.location.pathname.replace(/\\/g, '/').split('/').pop() || 'index.html';
      if (next === current && !url.hash) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      document.body.classList.add('is-leaving');
      setTimeout(() => {
        window.location.href = url.href;
      }, 380);
    });
  }

  /* ---------- Mobile nav ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('is-open');
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        toggle.classList.remove('is-open');
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Header scroll ---------- */
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Scroll reveals ---------- */
  const reveals = document.querySelectorAll('.reveal, .reveal-scale');
  if (reveals.length) {
    if (reducedMotion || !('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('is-in'));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
      );
      reveals.forEach((el) => io.observe(el));
    }
  }

  /* ---------- Hero orb parallax ---------- */
  const orbs = document.querySelectorAll('.hero__orb');
  if (orbs.length && !reducedMotion) {
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;

    window.addEventListener(
      'mousemove',
      (e) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
      },
      { passive: true }
    );

    function parallax() {
      tx += (mx - tx) * 0.06;
      ty += (my - ty) * 0.06;
      orbs.forEach((orb, i) => {
        const depth = (i + 1) * 12;
        orb.style.translate = `${tx * depth}px ${ty * depth}px`;
      });
      requestAnimationFrame(parallax);
    }
    parallax();
  }

  /* ---------- Custom cursor ---------- */
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (finePointer && !reducedMotion) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);
    document.body.classList.add('has-cursor');

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;

    window.addEventListener('mousemove', (e) => {
      x = e.clientX;
      y = e.clientY;
      cursor.classList.remove('is-hidden');
    });

    document.addEventListener('mouseleave', () => cursor.classList.add('is-hidden'));

    function loop() {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
      requestAnimationFrame(loop);
    }
    loop();

    const hoverables = 'a, button, .project, .service-item, .nav-toggle, input, textarea, select, .contact-link';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverables)) cursor.classList.add('is-hover');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverables)) cursor.classList.remove('is-hover');
    });
  }

  /* ---------- Contact Email / WhatsApp drafts ---------- */
  const contactPanel = document.querySelector('#contact-panel');
  if (contactPanel) {
    const nameInput = contactPanel.querySelector('#name');
    const serviceInput = contactPanel.querySelector('#service');
    const emailBtn = contactPanel.querySelector('#email-contact');
    const whatsappBtn = contactPanel.querySelector('#whatsapp-contact');
    const EMAIL_TO = 'khushijagga14@gmail.com';
    const WHATSAPP_NUMBER = '919817326283';

    function buildMessage() {
      const name = (nameInput && nameInput.value.trim()) || 'there';
      const service = (serviceInput && serviceInput.value) || 'a new project';
      const body =
        `Hi Khushi,\n\n` +
        `My name is ${name}. I’m interested in ${service}.\n\n` +
        `I’d love to discuss the project, timeline, and how we can work together.\n\n` +
        `Looking forward to hearing from you.\n\n` +
        `Thanks!`;
      const subject = `Project inquiry — ${service}`;
      return { name, service, body, subject };
    }

    if (emailBtn) {
      emailBtn.addEventListener('click', () => {
        const { subject, body } = buildMessage();
        const mailto =
          `mailto:${EMAIL_TO}` +
          `?subject=${encodeURIComponent(subject)}` +
          `&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
      });
    }

    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', () => {
        const { body } = buildMessage();
        const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`;
        window.open(wa, '_blank', 'noopener,noreferrer');
      });
    }

    const sideWhatsapp = document.querySelector('#whatsapp-link');
    if (sideWhatsapp) {
      sideWhatsapp.addEventListener('click', (e) => {
        e.preventDefault();
        const { body } = buildMessage();
        window.open(
          `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`,
          '_blank',
          'noopener,noreferrer'
        );
      });
    }

    const sideEmail = document.querySelector('a.contact-link[href^="mailto:khushijagga14"]');
    if (sideEmail) {
      sideEmail.addEventListener('click', (e) => {
        e.preventDefault();
        const { subject, body } = buildMessage();
        window.location.href =
          `mailto:${EMAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      });
    }
  }

  /* ---------- Active nav + sliding highlight ---------- */
  const page = document.body.dataset.page;
  const navLinks = document.querySelectorAll('.nav__link[data-nav]');
  const navCta = document.querySelector('.nav__cta[data-nav]');
  const indicator = document.querySelector('.nav__indicator');
  const linksWrap = document.querySelector('.nav__links');

  function setActiveNav() {
    if (!page) return;
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.dataset.nav === page);
    });
    if (navCta) {
      navCta.classList.toggle('is-active', navCta.dataset.nav === page);
    }
  }

  function moveIndicator(target) {
    if (!indicator || !linksWrap || !target) {
      if (indicator) indicator.classList.remove('is-ready');
      return;
    }
    const wrapRect = linksWrap.getBoundingClientRect();
    const linkRect = target.getBoundingClientRect();
    indicator.style.width = linkRect.width + 'px';
    indicator.style.left = linkRect.left - wrapRect.left + 'px';
    indicator.classList.add('is-ready');
  }

  function updateIndicator() {
    const active = document.querySelector('.nav__link.is-active');
    if (active && window.matchMedia('(min-width: 769px)').matches) {
      moveIndicator(active);
    } else if (indicator) {
      indicator.classList.remove('is-ready');
    }
  }

  setActiveNav();
  requestAnimationFrame(updateIndicator);
  window.addEventListener('resize', updateIndicator);

  navLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      if (window.matchMedia('(min-width: 769px)').matches) moveIndicator(link);
    });
  });

  if (linksWrap) {
    linksWrap.addEventListener('mouseleave', updateIndicator);
  }

  /* ---------- AI project video play ---------- */
  document.querySelectorAll('[data-video-project]').forEach((card) => {
    const video = card.querySelector('video');
    if (!video) return;

    card.addEventListener('click', () => {
      if (video.paused) {
        video.muted = false;
        video.play().catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
        card.classList.add('is-playing');
      } else {
        video.pause();
        card.classList.remove('is-playing');
      }
    });

    video.addEventListener('ended', () => {
      card.classList.remove('is-playing');
    });
  });
})();
