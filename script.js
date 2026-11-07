// Cinema Fox Landing Page Script (Figma 28-1964 Spec)
document.addEventListener('DOMContentLoaded', () => {

  // 1. FAQ Accordion Toggle
  const faqRows = document.querySelectorAll('.faq-row');
  faqRows.forEach(row => {
    const questionBtn = row.querySelector('.faq-question-btn');
    questionBtn?.addEventListener('click', () => {
      const isAlreadyActive = row.classList.contains('active');
      
      // Close all other open rows
      faqRows.forEach(r => {
        if (r !== row) {
          r.classList.remove('active');
          r.querySelector('.faq-question-btn')?.setAttribute('aria-expanded', 'false');
        }
      });

      if (isAlreadyActive) {
        row.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        row.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 2. Category Filter Tabs in Section 2
  const filterBtns = document.querySelectorAll('.filter-btn');
  const posterBoxes = document.querySelectorAll('.poster-box');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      posterBoxes.forEach(box => {
        const cat = box.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          box.style.display = 'block';
          box.style.opacity = '1';
        } else {
          box.style.display = 'none';
        }
      });
    });
  });

  // 3. Smooth scrolling for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // 4. Poster click shortcut -> smooth scroll to download section
  posterBoxes.forEach(poster => {
    poster.addEventListener('click', () => {
      const dlSection = document.getElementById('download');
      if (dlSection) {
        dlSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
