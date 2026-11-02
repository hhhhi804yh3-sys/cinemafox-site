// Cinema Fox Interactive Landing Page Script
document.addEventListener('DOMContentLoaded', () => {
  const slidesTrack = document.getElementById('slidesTrack');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const thumbBtns = document.querySelectorAll('.thumb-btn');
  const totalSlides = slides.length;
  let currentIndex = 0;
  let autoTimer = null;

  function updateSlider(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;

    // Slide track translate
    slidesTrack.style.transform = `translateX(${currentIndex * 100}%)`;

    // Update active class on slides
    slides.forEach((s, idx) => {
      s.classList.toggle('active', idx === currentIndex);
    });

    // Update thumb buttons
    thumbBtns.forEach((b, idx) => {
      b.classList.toggle('active', idx === currentIndex);
    });
  }

  // Next / Prev listeners
  nextBtn?.addEventListener('click', () => {
    resetAutoPlay();
    updateSlider(currentIndex + 1);
  });

  prevBtn?.addEventListener('click', () => {
    resetAutoPlay();
    updateSlider(currentIndex - 1);
  });

  // Thumbnails click
  thumbBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      resetAutoPlay();
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      updateSlider(idx);
    });
  });

  // Auto-play timer
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

  // Pause on hover
  const phoneMockup = document.querySelector('.phone-mockup');
  phoneMockup?.addEventListener('mouseenter', () => clearInterval(autoTimer));
  phoneMockup?.addEventListener('mouseleave', () => startAutoPlay());

  // Touch Swipe for mobile inside phone screen
  let touchStartX = 0;
  let touchEndX = 0;

  phoneMockup?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  phoneMockup?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      resetAutoPlay();
      if (diff > 0) {
        // Swiped right (in RTL: next slide)
        updateSlider(currentIndex + 1);
      } else {
        // Swiped left (in RTL: prev slide)
        updateSlider(currentIndex - 1);
      }
    }
  }

  // Direct download button click feedback
  const downloadBtns = document.querySelectorAll('a[download]');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const sub = btn.querySelector('.btn-sub-label');
      if (sub) {
        const originalText = sub.textContent;
        sub.textContent = "جاري بدء تنزيل CinemaFox.apk الآن... ⏳";
        setTimeout(() => {
          sub.textContent = originalText;
        }, 4000);
      }
    });
  });

  // Navbar background change on scroll
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (nav) {
      if (window.scrollY > 30) {
        nav.style.background = 'rgba(8, 12, 20, 0.95)';
        nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.7)';
      } else {
        nav.style.background = 'rgba(11, 15, 25, 0.82)';
        nav.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.5)';
      }
    }
  });

  // ===================================================
  // أعمال في التطبيق (DYNAMIC 40 TITLES INTERACTIVITY)
  // ===================================================
  const filterPills = document.querySelectorAll('.filter-pill');
  const marqueeWrapper = document.getElementById('marqueeWrapper');
  const filteredGridView = document.getElementById('filteredGridView');
  const filteredCardsContainer = document.getElementById('filteredCardsContainer');
  const tracks = document.querySelectorAll('.marquee-track');
  const marqueeToggleBtn = document.getElementById('marqueeToggleBtn');
  const marqueeToggleIcon = document.getElementById('marqueeToggleIcon');
  const marqueeToggleLabel = document.getElementById('marqueeToggleLabel');
  let isMarqueePaused = false;

  // Toggle Marquee Pause / Play
  marqueeToggleBtn?.addEventListener('click', () => {
    isMarqueePaused = !isMarqueePaused;
    tracks.forEach(t => t.classList.toggle('paused', isMarqueePaused));
    if (marqueeToggleIcon) marqueeToggleIcon.textContent = isMarqueePaused ? '▶️' : '⏸️';
    if (marqueeToggleLabel) marqueeToggleLabel.textContent = isMarqueePaused ? 'تشغيل الحركة' : 'إيقاف مؤقت';
  });

  // Get all unique poster cards from track1 and track2 (first half only to avoid duplicates)
  const allCards = [];
  const track1 = document.getElementById('track1');
  const track2 = document.getElementById('track2');
  
  if (track1 && track2) {
    const t1Cards = track1.querySelectorAll('.poster-card');
    const t2Cards = track2.querySelectorAll('.poster-card');
    // Each track has 20 cards duplicated (40 total per track)
    for (let i = 0; i < t1Cards.length / 2; i++) allCards.push(t1Cards[i]);
    for (let i = 0; i < t2Cards.length / 2; i++) allCards.push(t2Cards[i]);
  }

  // Filter Pills Click
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');

      if (filter === 'all') {
        marqueeWrapper.style.display = 'block';
        filteredGridView.style.display = 'none';
      } else {
        marqueeWrapper.style.display = 'none';
        filteredGridView.style.display = 'block';
        filteredCardsContainer.innerHTML = '';

        const matching = allCards.filter(c => c.getAttribute('data-cat') === filter);
        matching.forEach(c => {
          const clone = c.cloneNode(true);
          clone.addEventListener('click', handlePosterClick);
          filteredCardsContainer.appendChild(clone);
        });
      }
    });
  });

  // Poster card click -> smooth scroll to download
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
