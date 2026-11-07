// Cinema Fox Interactive Landing Page Script
document.addEventListener('DOMContentLoaded', () => {

  // 1. Scroll-Triggered Section Reveals (Soft fade + slight rise, once only)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target); // Reveal once only!
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // 2. FAQ Accordion (Smooth slide open/close in 200-250ms)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      // Close other open FAQ items for clean single accordion
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        }
      });
      if (isOpen) {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 3. Screenshots Carousel
  const slidesTrack = document.getElementById('slidesTrack');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const thumbBtns = document.querySelectorAll('.thumb-btn');
  const totalSlides = slides.length;
  let currentIndex = 0;
  let autoTimer = null;

  function updateSlider(index) {
    if (totalSlides === 0) return;
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;

    if (slidesTrack) {
      slidesTrack.style.transform = `translateX(${currentIndex * 100}%)`;
    }

    slides.forEach((s, idx) => {
      s.classList.toggle('active', idx === currentIndex);
    });

    thumbBtns.forEach((b, idx) => {
      b.classList.toggle('active', idx === currentIndex);
    });
  }

  nextBtn?.addEventListener('click', () => {
    resetAutoPlay();
    updateSlider(currentIndex + 1);
  });

  prevBtn?.addEventListener('click', () => {
    resetAutoPlay();
    updateSlider(currentIndex - 1);
  });

  thumbBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      resetAutoPlay();
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      updateSlider(idx);
    });
  });

  function startAutoPlay() {
    autoTimer = setInterval(() => {
      updateSlider(currentIndex + 1);
    }, 4500);
  }

  function resetAutoPlay() {
    clearInterval(autoTimer);
    startAutoPlay();
  }

  startAutoPlay();

  const phoneMockup = document.querySelector('.phone-mockup');
  phoneMockup?.addEventListener('mouseenter', () => clearInterval(autoTimer));
  phoneMockup?.addEventListener('mouseleave', () => startAutoPlay());

  let touchStartX = 0;
  let touchEndX = 0;

  phoneMockup?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  phoneMockup?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      resetAutoPlay();
      if (diff > 0) {
        updateSlider(currentIndex + 1);
      } else {
        updateSlider(currentIndex - 1);
      }
    }
  }, { passive: true });

  // 4. Download buttons tactile feedback & status hint
  const downloadBtns = document.querySelectorAll('a[download]');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isWindows = btn.id.includes('windows') || btn.href.endsWith('.exe');
      const filename = isWindows ? 'CinemaFox_Windows_Setup.exe' : 'CinemaFox.apk';
      const meta = btn.querySelector('.btn-hero-meta');
      if (meta) {
        const originalText = meta.textContent;
        meta.textContent = `جاري بدء تنزيل ${filename} الآن... ⏳`;
        setTimeout(() => {
          meta.textContent = originalText;
        }, 3500);
      }
    });
  });

  // 5. Navbar glass effect on scroll
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (nav) {
      if (window.scrollY > 30) {
        nav.style.background = 'rgba(7, 9, 19, 0.94)';
        nav.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.7)';
      } else {
        nav.style.background = 'rgba(11, 15, 25, 0.82)';
        nav.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.5)';
      }
    }
  });

  // 6. Installation Tabs Switcher
  const stepTabs = document.querySelectorAll('.step-tab-btn');
  const stepPanes = document.querySelectorAll('.steps-pane');
  stepTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      stepTabs.forEach(t => t.classList.remove('active'));
      stepPanes.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // 7. Poster Marquee and filters
  const filterPills = document.querySelectorAll('.filter-pill');
  const marqueeWrapper = document.getElementById('marqueeWrapper');
  const filteredGridView = document.getElementById('filteredGridView');
  const filteredCardsContainer = document.getElementById('filteredCardsContainer');
  const tracks = document.querySelectorAll('.marquee-track');
  const marqueeToggleBtn = document.getElementById('marqueeToggleBtn');
  const marqueeToggleIcon = document.getElementById('marqueeToggleIcon');
  const marqueeToggleLabel = document.getElementById('marqueeToggleLabel');
  let isMarqueePaused = false;

  marqueeToggleBtn?.addEventListener('click', () => {
    isMarqueePaused = !isMarqueePaused;
    tracks.forEach(t => t.classList.toggle('paused', isMarqueePaused));
    if (marqueeToggleIcon) marqueeToggleIcon.textContent = isMarqueePaused ? '▶️' : '⏸️';
    if (marqueeToggleLabel) marqueeToggleLabel.textContent = isMarqueePaused ? 'تشغيل الحركة' : 'إيقاف مؤقت';
  });

  const allCards = [];
  const track1 = document.getElementById('track1');
  const track2 = document.getElementById('track2');
  
  if (track1 && track2) {
    const t1Cards = track1.querySelectorAll('.poster-card');
    const t2Cards = track2.querySelectorAll('.poster-card');
    for (let i = 0; i < t1Cards.length / 2; i++) allCards.push(t1Cards[i]);
    for (let i = 0; i < t2Cards.length / 2; i++) allCards.push(t2Cards[i]);
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');

      if (filter === 'all') {
        if (marqueeWrapper) marqueeWrapper.style.display = 'block';
        if (filteredGridView) filteredGridView.style.display = 'none';
      } else {
        if (marqueeWrapper) marqueeWrapper.style.display = 'none';
        if (filteredGridView) filteredGridView.style.display = 'block';
        if (filteredCardsContainer) {
          filteredCardsContainer.innerHTML = '';
          const matching = allCards.filter(c => c.getAttribute('data-cat') === filter);
          matching.forEach(c => {
            const clone = c.cloneNode(true);
            clone.addEventListener('click', handlePosterClick);
            filteredCardsContainer.appendChild(clone);
          });
        }
      }
    });
  });

  function handlePosterClick() {
    const dlSection = document.getElementById('download');
    if (dlSection) {
      dlSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  document.querySelectorAll('.poster-card').forEach(card => {
    card.addEventListener('click', handlePosterClick);
  });
});
