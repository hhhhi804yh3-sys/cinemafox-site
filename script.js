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
    if (window.scrollY > 40) {
      nav.style.background = 'rgba(12, 2, 4, 0.75)';
      nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.6)';
    } else {
      nav.style.background = 'var(--glass-bg)';
      nav.style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.45)';
    }
  });
});
