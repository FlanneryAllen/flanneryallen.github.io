/**
 * Main JavaScript file for portfolio site
 * Handles all interactive elements securely without inline handlers
 */

(function() {
  'use strict';

  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {

    // Timeline item toggle functionality
    initTimelineItems();

    // Carousel functionality
    initCarousels();

    // Modal functionality
    initModals();

    // External link security
    secureExternalLinks();

    // Lazy load iframes
    lazyLoadIframes();
  });

  /**
   * Initialize timeline item interactions
   */
  function initTimelineItems() {
    const timelineItems = document.querySelectorAll('.tl-item');
    let currentlyOpenItem = null;
    let scrollStartPosition = 0;
    let isScrolling = false;

    timelineItems.forEach(item => {
      // Skip the "Now" item which doesn't have interaction
      if (item.classList.contains('tl-now')) return;

      item.addEventListener('click', function(e) {
        // Don't toggle if clicking on links or close button
        if (e.target.closest('a') || e.target.closest('.tl-close')) return;

        // Close other open items first (accordion behavior)
        if (currentlyOpenItem && currentlyOpenItem !== this) {
          closeTimelineItem(currentlyOpenItem);
        }

        toggleTimelineItem(this);

        // Track which item is open
        if (this.classList.contains('is-open')) {
          currentlyOpenItem = this;
          scrollStartPosition = window.scrollY;

          // Smooth scroll to position drawer in view
          setTimeout(() => {
            const drawer = this.querySelector('.tl-drawer');
            const rect = drawer.getBoundingClientRect();
            const offset = 100; // Space from top

            if (rect.top < offset) {
              window.scrollTo({
                top: window.scrollY + rect.top - offset,
                behavior: 'smooth'
              });
            }
          }, 100);
        } else {
          currentlyOpenItem = null;
        }
      });
    });

    // Close buttons
    const closeButtons = document.querySelectorAll('.tl-close');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const item = this.closest('.tl-item');
        closeTimelineItem(item);
        if (currentlyOpenItem === item) {
          currentlyOpenItem = null;
        }
      });
    });

    // Smart scroll behavior - close drawer when scrolling away
    // BUT keep interactive items open (carousels, chatbots, audio players)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
      if (!currentlyOpenItem) return;

      // Check if the open item contains interactive elements - if so, don't auto-close
      const hasCarousel = currentlyOpenItem.querySelector('.tl-carousel');
      const hasAIExperiments = currentlyOpenItem.querySelector('.ai-experiments');
      const hasChatbot = currentlyOpenItem.querySelector('.chatbot-container');
      const hasAudioPlayer = currentlyOpenItem.querySelector('.audio-player');

      if (hasCarousel || hasAIExperiments || hasChatbot || hasAudioPlayer) return;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const currentScroll = window.scrollY;
        const scrollDistance = Math.abs(currentScroll - scrollStartPosition);

        // If user has scrolled more than 300px from where they opened the drawer
        if (scrollDistance > 300) {
          smoothCloseTimelineItem(currentlyOpenItem);
          currentlyOpenItem = null;
        }
      }, 150); // Debounce scroll events
    });

    // ESC key to close open drawer
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && currentlyOpenItem) {
        smoothCloseTimelineItem(currentlyOpenItem);
        currentlyOpenItem = null;
      }
    });
  }

  /**
   * Toggle timeline item open/closed
   */
  function toggleTimelineItem(item) {
    const drawer = item.querySelector('.tl-drawer');
    const hint = item.querySelector('.tl-hint');

    if (!drawer) return;

    const isOpen = drawer.classList.contains('open');
    drawer.classList.toggle('open', !isOpen);
    item.classList.toggle('is-open', !isOpen);

    if (hint) {
      hint.style.visibility = isOpen ? 'visible' : 'hidden';
    }
  }

  /**
   * Close timeline item
   */
  function closeTimelineItem(item) {
    const drawer = item.querySelector('.tl-drawer');
    const hint = item.querySelector('.tl-hint');

    drawer.classList.remove('open');
    item.classList.remove('is-open');

    if (hint) {
      hint.style.visibility = 'visible';
    }
  }

  /**
   * Smoothly close timeline item with enhanced animation
   */
  function smoothCloseTimelineItem(item) {
    const drawer = item.querySelector('.tl-drawer');
    const hint = item.querySelector('.tl-hint');

    // Add closing class for smooth animation
    drawer.classList.add('closing');

    setTimeout(() => {
      drawer.classList.remove('open', 'closing');
      item.classList.remove('is-open');

      if (hint) {
        hint.style.visibility = 'visible';
      }
    }, 300); // Match CSS transition duration
  }

  /**
   * Initialize all carousels
   */
  function initCarousels() {
    // Main portfolio carousel
    const carousels = document.querySelectorAll('.tl-carousel');
    carousels.forEach(carousel => {
      initCarousel(carousel);
    });

    // Strategy page carousel
    const strategyCarousel = document.querySelector('.carousel-container');
    if (strategyCarousel) {
      initStrategyCarousel();
    }
  }

  /**
   * Initialize individual carousel
   */
  function initCarousel(carousel) {
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dots = carousel.querySelectorAll('.dot');

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        changeSlide(carousel, -1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        changeSlide(carousel, 1);
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(carousel, index);
      });
    });
  }

  /**
   * Change carousel slide
   */
  function changeSlide(carousel, direction) {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');

    let currentIndex = Array.from(slides).findIndex(slide =>
      slide.classList.contains('active')
    );

    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');

    currentIndex = (currentIndex + direction + slides.length) % slides.length;

    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
  }

  /**
   * Go to specific slide
   */
  function goToSlide(carousel, index) {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
  }

  /**
   * Initialize strategy page carousel
   */
  function initStrategyCarousel() {
    let currentSlide = 1;
    const totalSlides = 3;

    // Previous/Next buttons
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => moveSlide(-1));
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => moveSlide(1));
    }

    // Dots
    const dots = document.querySelectorAll('.carousel-indicators .dot');
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => showSlide(index + 1));
    });

    function moveSlide(direction) {
      showSlide(currentSlide + direction);
    }

    function showSlide(n) {
      const slides = document.getElementsByClassName('carousel-slide');
      const dots = document.getElementsByClassName('dot');

      if (n > totalSlides) currentSlide = 1;
      else if (n < 1) currentSlide = totalSlides;
      else currentSlide = n;

      for (let slide of slides) {
        slide.style.display = 'none';
      }

      for (let dot of dots) {
        dot.classList.remove('active');
      }

      if (slides[currentSlide - 1]) {
        slides[currentSlide - 1].style.display = 'flex';
        dots[currentSlide - 1].classList.add('active');
      }
    }

    // Initialize first slide
    showSlide(1);
  }

  /**
   * Initialize modal functionality
   */
  function initModals() {
    // Narrative Agent modal
    const narrativeAgentLink = document.querySelector('[data-modal="narrative-agent"]');
    if (narrativeAgentLink) {
      narrativeAgentLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openNarrativeAgent();
      });
    }

    // Modal close button
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
      modalClose.addEventListener('click', closeNarrativeAgent);
    }

    // Modal overlay click
    const modalOverlay = document.getElementById('narrativeAgentModal');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', function(e) {
        if (e.target === this) {
          closeNarrativeAgent();
        }
      });
    }

    // Start walkthrough button
    const startBtn = document.querySelector('.start-button');
    if (startBtn) {
      startBtn.addEventListener('click', startWalkthrough);
    }

    // ESC key to close modal
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const modal = document.getElementById('narrativeAgentModal');
        if (modal && modal.classList.contains('active')) {
          closeNarrativeAgent();
        }
      }
    });
  }

  /**
   * Open Narrative Agent modal
   */
  function openNarrativeAgent() {
    const modal = document.getElementById('narrativeAgentModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close Narrative Agent modal
   */
  function closeNarrativeAgent() {
    const modal = document.getElementById('narrativeAgentModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';

    // Reset modal for next time
    const iframe = document.getElementById('walkthroughFrame');
    const startScreen = document.getElementById('walkthroughStart');

    if (iframe) {
      iframe.src = '';
      iframe.style.display = 'none';
    }

    if (startScreen) {
      startScreen.style.display = 'flex';
    }
  }

  /**
   * Start walkthrough in modal
   */
  function startWalkthrough() {
    const iframe = document.getElementById('walkthroughFrame');
    const startScreen = document.getElementById('walkthroughStart');

    // Hide start screen
    startScreen.style.display = 'none';

    // Show and load iframe
    iframe.style.display = 'block';
    iframe.src = 'https://narrative-intelligence-demo.netlify.app';
  }

  /**
   * Add security attributes to external links
   */
  function secureExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.host + '"])');

    externalLinks.forEach(link => {
      link.setAttribute('rel', 'noopener noreferrer');
      link.setAttribute('target', '_blank');
    });
  }

  /**
   * Lazy load iframes for better performance
   */
  function lazyLoadIframes() {
    const iframes = document.querySelectorAll('iframe[data-src]');

    if ('IntersectionObserver' in window) {
      const iframeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const iframe = entry.target;
            iframe.src = iframe.dataset.src;
            iframe.removeAttribute('data-src');
            observer.unobserve(iframe);
          }
        });
      }, {
        rootMargin: '100px'
      });

      iframes.forEach(iframe => iframeObserver.observe(iframe));
    } else {
      // Fallback for older browsers
      iframes.forEach(iframe => {
        iframe.src = iframe.dataset.src;
        iframe.removeAttribute('data-src');
      });
    }
  }

})();