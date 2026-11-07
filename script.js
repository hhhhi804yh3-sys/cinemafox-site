/**
 * Cinema Fox Official Site Script
 * Animations & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. FAQ Accordion Toggle (Smooth 200-250ms transition)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const toggleIcon = item.querySelector('.faq-toggle-icon');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const icon = otherItem.querySelector('.faq-toggle-icon');
        if (icon) icon.textContent = '+';
      });

      // If it wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
        if (toggleIcon) toggleIcon.textContent = '−';
      }
    });
  });

  // 2. Discovery Tabs Active State
  const tabs = document.querySelectorAll('.tab-link');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // 3. Smooth Cinematic Scroll Reveal for Sections (one-time gentle rise)
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const sectionsToReveal = document.querySelectorAll('section:not(.hero-section), .final-cta-section');
  sectionsToReveal.forEach(sec => {
    sec.style.opacity = '0';
    sec.style.transform = 'translateY(28px)';
    sec.style.transition = 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(sec);
  });

  // 4. Dynamic Mobile Optimization (Hide Windows PC buttons on mobile)
  function applyMobileRules() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
      || (window.innerWidth <= 768 && ('ontouchstart' in window || navigator.maxTouchPoints > 0));
    
    document.querySelectorAll('.btn-pc, .btn-pc-download').forEach(btn => {
      btn.style.display = isMobile ? 'none' : '';
    });
  }
  applyMobileRules();
  window.addEventListener('resize', applyMobileRules);
});
