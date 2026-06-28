/* Maria Home Appliances - app.js */
'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 50 ? '0 4px 24px rgba(13,148,136,0.14)' : '';
  });

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const isOpen = navLinks.classList.contains('open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = isOpen ? '0' : '1';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
    });
  });

  // ===== ACTIVE NAV LINK =====
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 120) current = sec.id; });
    navItems.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });

  // ===== PRODUCT FILTER =====
  const filterBtns = document.querySelectorAll('.filter-tab');
  const productCards = document.querySelectorAll('.product-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      productCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
        if (match) {
          card.style.animation = 'none';
          requestAnimationFrame(() => { card.style.animation = 'fadeInUp 0.4s ease forwards'; });
        }
      });
    });
  });

  // ===== ANIMATE ON SCROLL =====
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.cat-card, .product-card, .why-card, .testi-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const status = document.getElementById('formStatus');
      if (!name || !phone) {
        status.textContent = '⚠️ Please fill in your name and phone number.';
        status.style.color = 'var(--primary)';
        return;
      }
      const product = document.getElementById('formProduct').value;
      const message = document.getElementById('formMessage').value.trim();
      const waText = `Hello Maria Home Appliances! My name is ${name}. I am interested in: ${product || 'home appliances'}. ${message ? 'Message: ' + message : ''} My phone: ${phone}`;
      window.open(`https://wa.me/914842785145?text=${encodeURIComponent(waText)}`, '_blank');
      status.textContent = '✅ Redirecting to WhatsApp...';
      status.style.color = 'var(--success)';
      contactForm.reset();
    });
  }

  // ===== MARQUEE PAUSE =====
  const track = document.getElementById('marqueeTrack');
  if (track) {
    track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
  }

  // ===== COUNTER ANIMATION =====
  function animateCounter(el, target, suffix = '') {
    let count = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      count += step;
      if (count >= target) { count = target; clearInterval(timer); }
      el.textContent = count + suffix;
    }, 30);
  }
  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num').forEach(n => {
          const text = n.textContent;
          const match = text.match(/(\d+)/);
          if (match) animateCounter(n, parseInt(match[0]), text.replace(match[0], ''));
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

});

const style = document.createElement('style');
style.textContent = `@keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }`;
document.head.appendChild(style);
