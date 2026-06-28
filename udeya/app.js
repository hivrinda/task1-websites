/* =============================================
   UDAYA AGENCIES – APP.JS
   Interactivity, Animations & Behaviour
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAVBAR SCROLL ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  /* ---- HAMBURGER MENU ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  // Close menu on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ---- ACTIVE NAV ON SCROLL ---- */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');
  const observerNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(item => item.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(sec => observerNav.observe(sec));

  /* ---- SCROLL INDICATOR ---- */
  const scrollDown = document.getElementById('scrollDown');
  if (scrollDown) {
    scrollDown.addEventListener('click', () => {
      document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---- PRODUCT FILTER TABS ---- */
  const filterTabs    = document.querySelectorAll('.filter-tab');
  const productCards  = document.querySelectorAll('.product-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Active tab
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      productCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          requestAnimationFrame(() => {
            card.style.animation = 'fadeIn .4s ease both';
          });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ---- TESTIMONIAL SLIDER ---- */
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const dots             = document.querySelectorAll('.testi-dot');
  let currentSlide = 0;
  let sliderTimer;

  const showSlide = (index) => {
    testimonialCards.forEach(c => c.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    testimonialCards[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  };

  const nextSlide = () => {
    showSlide((currentSlide + 1) % testimonialCards.length);
  };

  const startSlider = () => {
    sliderTimer = setInterval(nextSlide, 4500);
  };

  const resetSlider = () => {
    clearInterval(sliderTimer);
    startSlider();
  };

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      showSlide(parseInt(dot.dataset.index));
      resetSlider();
    });
  });

  startSlider();

  /* ---- SCROLL REVEAL ---- */
  const revealElements = document.querySelectorAll(
    '.cat-card, .product-card, .why-card, .contact-card, .about-content, .about-img-col, .testimonial-card'
  );

  revealElements.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---- COUNTER ANIMATION (Stats) ---- */
  const statNums = document.querySelectorAll('.stat-num');
  const parseNum = (str) => ({ value: parseFloat(str), suffix: str.replace(/[\d.]/g, '') });

  const animateCounter = (el) => {
    const raw     = el.dataset.target || el.textContent;
    el.dataset.target = raw;
    const { value, suffix } = parseNum(raw);
    let start = 0;
    const duration = 1800;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const display = value >= 100
        ? Math.round(eased * value)
        : (eased * value).toFixed(value % 1 !== 0 ? 1 : 0);
      el.textContent = display + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const heroStatsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNums.forEach(el => animateCounter(el));
        heroStatsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) heroStatsObserver.observe(heroStats);

  /* ---- SMOOTH SCROLL for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- FLOATING WHATSAPP pulse on hover ---- */
  const floatingWa = document.getElementById('floating-whatsapp');
  if (floatingWa) {
    floatingWa.addEventListener('mouseenter', () => {
      floatingWa.style.animation = 'none';
    });
    floatingWa.addEventListener('mouseleave', () => {
      floatingWa.style.animation = '';
    });
  }

  /* ---- GOOGLE MAPS EMBED URL fix ---- */
  // Use the precise lat/lng for Kazhakootam, Thiruvananthapuram
  const mapIframe = document.getElementById('google-map');
  if (mapIframe) {
    mapIframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.3834!2d76.8827!3d8.5653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bef0e9a7e0a9%3A0x0!2sNH%20Bypass%2C%20Udaya%20Square%2C%20Kazhakootam%2C%20Thiruvananthapuram%2C%20Kerala%20695582!5e0!3m2!1sen!2sin!4v${Date.now()}`;
  }

  /* ---- NAVBAR hide on scroll down, show on scroll up ---- */
  let lastScrollY = 0;
  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    if (currentY > lastScrollY && currentY > 120) {
      // scrolling down - hide nav (optional, comment out if unwanted)
      // navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    lastScrollY = currentY;
  });

  /* ---- PRODUCT CARD hover glow ---- */
  productCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
      const y      = ((e.clientY - rect.top)  / rect.height - 0.5) * 12;
      card.style.transform = `translateY(-6px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ---- CATEGORY CARD click -> scroll to products with filter ---- */
  document.querySelectorAll('.cat-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const catCard = link.closest('.cat-card');
      const catId   = catCard?.id || '';
      // Map cat-card ids to filter values
      const mapping = {
        'cat-ac':      'ac',
        'cat-fridge':  'fridge',
        'cat-wm':      'wm',
        'cat-tv':      'tv',
        'cat-kitchen': 'all',
        'cat-small':   'all'
      };
      const filter = mapping[catId] || 'all';

      // Scroll to products
      const productsSection = document.getElementById('products');
      if (productsSection) {
        const offset = 80;
        window.scrollTo({
          top: productsSection.getBoundingClientRect().top + window.pageYOffset - offset,
          behavior: 'smooth'
        });
        // Click the corresponding filter tab after a delay
        setTimeout(() => {
          const tab = document.querySelector(`.filter-tab[data-filter="${filter}"]`);
          if (tab) tab.click();
        }, 600);
      }
    });
  });

  console.log('✅ Udaya Agencies – All scripts loaded successfully!');
});
