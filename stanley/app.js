/*
  Stanley Electricals - Interactive JavaScript Engine
*/

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Sticky Header scrolled state
  // ==========================================
  const header = document.getElementById('mainHeader');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });


  // ==========================================
  // 2. Mobile Menu Navigation
  // ==========================================
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      
      // Update active state visual style
      navLinks.forEach(item => item.classList.remove('active'));
      link.classList.add('active');
    });
  });


  // ==========================================
  // 3. Featured Products Filtering System
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const productCards = document.querySelectorAll('.product-card');

  function filterProducts(category) {
    productCards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      
      if (category === 'all' || cardCat === category) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      filterProducts(filterValue);
    });
  });


  // ==========================================
  // 4. Categories Card Shortcut Clicks
  // ==========================================
  const categoryCards = document.querySelectorAll('.category-card');
  const featuredSection = document.getElementById('featured');

  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const targetCat = card.getAttribute('data-target-cat');
      
      // Find the corresponding filter button and trigger click
      const correspondingFilterBtn = document.querySelector(`.filter-tab-btn[data-filter="${targetCat}"]`);
      if (correspondingFilterBtn) {
        correspondingFilterBtn.click();
      }

      // Smooth scroll to featured products section
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    });
  });


  // ==========================================
  // 5. Interactive EMI Calculator Math
  // ==========================================
  const sliderProductVal = document.getElementById('sliderProductVal');
  const sliderTenure = document.getElementById('sliderTenure');
  const sliderRate = document.getElementById('sliderRate');

  const valProductVal = document.getElementById('valProductVal');
  const valTenure = document.getElementById('valTenure');
  const valRate = document.getElementById('valRate');

  const emiResult = document.getElementById('emiResult');
  const emiInterest = document.getElementById('emiInterest');
  const emiPayback = document.getElementById('emiPayback');

  function calculateEMI() {
    const P = parseFloat(sliderProductVal.value);
    const months = parseInt(sliderTenure.value);
    const annualInterestRate = parseFloat(sliderRate.value);

    // Update Slider UI Display values
    valProductVal.innerText = `₹${P.toLocaleString('en-IN')}`;
    valTenure.innerText = `${months} Months`;
    valRate.innerText = `${annualInterestRate}%`;

    let emi = 0;
    let totalPayback = 0;
    let totalInterest = 0;

    if (annualInterestRate === 0) {
      emi = P / months;
      totalPayback = P;
      totalInterest = 0;
    } else {
      // Monthly interest rate
      const r = (annualInterestRate / 12) / 100;
      // EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
      emi = (P * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
      totalPayback = emi * months;
      totalInterest = totalPayback - P;
    }

    // Format outputs to INR
    emiResult.innerText = `₹${Math.round(emi).toLocaleString('en-IN')}`;
    emiInterest.innerText = `₹${Math.round(totalInterest).toLocaleString('en-IN')}`;
    emiPayback.innerText = `₹${Math.round(totalPayback).toLocaleString('en-IN')}`;
  }

  // Event Listeners for inputs
  if (sliderProductVal && sliderTenure && sliderRate) {
    sliderProductVal.addEventListener('input', calculateEMI);
    sliderTenure.addEventListener('input', calculateEMI);
    sliderRate.addEventListener('input', calculateEMI);
    
    // Initial run
    calculateEMI();
  }


  // ==========================================
  // 6. Customer Testimonials Slider Carousel
  // ==========================================
  const track = document.getElementById('testimonialsTrack');
  const slides = Array.from(document.querySelectorAll('.testimonial-slide'));
  const nextBtn = document.getElementById('carouselNextBtn');
  const prevBtn = document.getElementById('carouselPrevBtn');
  const indicatorsContainer = document.getElementById('carouselIndicators');
  const indicatorDots = Array.from(document.querySelectorAll('.indicator-dot'));

  let activeIndex = 0;
  let autoPlayTimer = null;

  function updateCarousel(index) {
    // Keep index in range
    if (index >= slides.length) {
      activeIndex = 0;
    } else if (index < 0) {
      activeIndex = slides.length - 1;
    } else {
      activeIndex = index;
    }

    // Move track container
    track.style.transform = `translateX(-${activeIndex * 100}%)`;

    // Update active dot indicators
    indicatorDots.forEach((dot, dIdx) => {
      if (dIdx === activeIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function handleNextSlide() {
    updateCarousel(activeIndex + 1);
  }

  function handlePrevSlide() {
    updateCarousel(activeIndex - 1);
  }

  if (track && nextBtn && prevBtn) {
    // Click navigations
    nextBtn.addEventListener('click', () => {
      stopAutoPlay();
      handleNextSlide();
      startAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
      stopAutoPlay();
      handlePrevSlide();
      startAutoPlay();
    });

    // Indicator Dot Clicks
    indicatorDots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        stopAutoPlay();
        const slideIndex = parseInt(e.target.getAttribute('data-slide'));
        updateCarousel(slideIndex);
        startAutoPlay();
      });
    });

    // Auto Play loop
    function startAutoPlay() {
      autoPlayTimer = setInterval(handleNextSlide, 7000); // Shift every 7 seconds
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
      }
    }

    // Initialize Testimonial loops
    startAutoPlay();
  }


  // ==========================================
  // 7. Contact Query Form Submissions
  // ==========================================
  const queryForm = document.getElementById('queryForm');
  const formStatus = document.getElementById('formMessageStatus');
  const submitBtn = document.getElementById('formSubmitBtn');

  if (queryForm) {
    queryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('formName').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const productType = document.getElementById('formProductType').value;
      const message = document.getElementById('formMessage').value.trim();

      // Simple validations
      if (!name || !phone || !email || !message) {
        showStatus('Please fill in all mandatory fields.', 'error');
        return;
      }

      if (phone.length < 10 || isNaN(phone)) {
        showStatus('Please enter a valid 10-digit mobile number.', 'error');
        return;
      }

      // Check email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }

      // Show submitting state
      submitBtn.disabled = true;
      submitBtn.innerText = 'Submitting Query...';

      // Mock network latency (1.5s)
      setTimeout(() => {
        showStatus(`Thank you, ${name}! Your query regarding appliances has been submitted successfully. Our executive will reach out to you at ${phone} shortly.`, 'success');
        queryForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerText = 'Submit Query';
      }, 1500);
    });

    function showStatus(msg, type) {
      formStatus.innerText = msg;
      formStatus.className = 'form-message ' + type;
      // Scroll slightly to status message if in mobile view
      formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }


  // ==========================================
  // 8. Custom WhatsApp Interactive CTA Chat
  // ==========================================
  const waTrigger = document.getElementById('waTrigger');
  const waChatWindow = document.getElementById('waChatWindow');
  const waBadge = document.getElementById('waBadge');
  const waChatInput = document.getElementById('waChatInput');
  const waSendBtn = document.getElementById('waSendBtn');
  const waChatBody = document.getElementById('waChatBody');
  const waTypingIndicator = document.getElementById('waTypingIndicator');

  // Toggle chat widget
  if (waTrigger && waChatWindow) {
    waTrigger.addEventListener('click', () => {
      waChatWindow.classList.toggle('active');
      // Hide red notification alert badge on first click
      if (waBadge) {
        waBadge.style.display = 'none';
      }
    });

    // Send customer typed query redirecting to WA Web API
    function handleSendMessage() {
      const userText = waChatInput.value.trim();
      if (!userText) return;

      // 1. Add user bubble to local chat UI
      const userMsgDiv = document.createElement('div');
      userMsgDiv.className = 'wa-msg';
      userMsgDiv.style.alignSelf = 'flex-end';
      userMsgDiv.style.backgroundColor = '#e1ffc7'; // WhatsApp light-green user bubble
      userMsgDiv.innerHTML = `${userText}<span class="wa-msg-meta">Just now</span>`;
      
      // Insert before typing indicator
      waChatBody.insertBefore(userMsgDiv, waTypingIndicator);
      waChatInput.value = '';
      
      // Auto-scroll chat body
      waChatBody.scrollTop = waChatBody.scrollHeight;

      // 2. Redirect to WA API after 1 second
      setTimeout(() => {
        const phone = '919876543210';
        const encodedText = encodeURIComponent(userText);
        const waUrl = `https://wa.me/${phone}?text=${encodedText}`;
        window.open(waUrl, '_blank');
      }, 1000);
    }

    waSendBtn.addEventListener('click', handleSendMessage);
    
    waChatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleSendMessage();
      }
    });

    // Simulate standard agent typing notification on load
    setTimeout(() => {
      // 1. Display typing indicator bubble
      waTypingIndicator.classList.add('active');
      waChatBody.scrollTop = waChatBody.scrollHeight;

      // 2. Output custom suggestion bubble after 2.5s
      setTimeout(() => {
        waTypingIndicator.classList.remove('active');
        const promoMsgDiv = document.createElement('div');
        promoMsgDiv.className = 'wa-msg';
        promoMsgDiv.innerHTML = `🎁 <strong>SPECIAL OFFER:</strong> Get up to 15% discount on Double-door Refrigerators and free installation on Split ACs this weekend! Ask me anything about specifications or stock availability. <span class="wa-msg-meta">Just now</span>`;
        
        waChatBody.insertBefore(promoMsgDiv, waTypingIndicator);
        waChatBody.scrollTop = waChatBody.scrollHeight;
        
        // Show red badge to notify user if chat is not open
        if (!waChatWindow.classList.contains('active') && waBadge) {
          waBadge.style.display = 'block';
        }
      }, 2500);

    }, 3000);
  }

});
