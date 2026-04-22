// Navigation Bar Interactivity
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle mobile menu
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      // Optional: animate hamburger to X (basic)
      const spans = navToggle.querySelectorAll('.hamburger');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        // Reset hamburger
        const spans = navToggle.querySelectorAll('.hamburger');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  });

  // Active link highlight based on scroll (optional, works with page sections)
  const sections = document.querySelectorAll('section[id]');
  if (sections.length > 0) {
    window.addEventListener('scroll', () => {
      let current = '';
      const scrollPos = window.scrollY + 100;
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === current) {
          link.classList.add('active');
        }
      });
    });
  }
});

// Page Hero (Services) - Optional smooth scroll or external link handling
document.addEventListener('DOMContentLoaded', () => {
  const breadcrumbHome = document.querySelector('.breadcrumb-link');
  
  // If the link is a single-page anchor (href="#home"), enable smooth scroll
  if (breadcrumbHome && breadcrumbHome.getAttribute('href') === '#home') {
    breadcrumbHome.addEventListener('click', (e) => {
      e.preventDefault();
      const homeSection = document.getElementById('home');
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  // Optional: subtle fade-in for hero content
  const heroContainer = document.querySelector('.page-hero-container');
  if (heroContainer) {
    heroContainer.style.opacity = '0';
    heroContainer.style.transform = 'translateY(15px)';
    heroContainer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
      heroContainer.style.opacity = '1';
      heroContainer.style.transform = 'translateY(0)';
    }, 100);
  }
});

// Services Overview - Scroll Reveal Animation
document.addEventListener('DOMContentLoaded', () => {
  const overviewSection = document.querySelector('.services-overview');
  const statement = document.querySelector('.so-statement');
  const icons = document.querySelectorAll('.so-icon-item');

  if (overviewSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (statement) {
            statement.style.opacity = '1';
            statement.style.transform = 'translateY(0)';
          }
          icons.forEach((icon, idx) => {
            setTimeout(() => {
              icon.style.opacity = '1';
              icon.style.transform = 'translateY(0)';
            }, idx * 100);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    // Set initial hidden state
    if (statement) {
      statement.style.opacity = '0';
      statement.style.transform = 'translateY(15px)';
      statement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }
    icons.forEach(icon => {
      icon.style.opacity = '0';
      icon.style.transform = 'translateY(15px)';
      icon.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });

    observer.observe(overviewSection);
  } else {
    // Fallback: show immediately
    if (statement) {
      statement.style.opacity = '1';
      statement.style.transform = 'translateY(0)';
    }
    icons.forEach(icon => {
      icon.style.opacity = '1';
      icon.style.transform = 'translateY(0)';
    });
  }
});

// Full Services Grid - Interactivity & Entrance Animation
document.addEventListener('DOMContentLoaded', () => {
  // 1. "Learn more" button functionality (alert placeholder)
  const btns = document.querySelectorAll('.sg-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const serviceName = btn.getAttribute('data-service');
      alert(`More information about "${serviceName}" coming soon.`);
      // Future: open modal or redirect to detail page
    });
  });

  // 2. Staggered fade-in animation on scroll
  const cards = document.querySelectorAll('.sg-card');
  const section = document.querySelector('.services-grid-section');

  if (cards.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cards.forEach((card, idx) => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, idx * 50);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // Set initial hidden state
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });

    observer.observe(section);
  } else {
    // Fallback: show immediately
    cards.forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  }
});

// Why Choose Our Services - Entrance Animation (with background image)
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.wos-card');
  const section = document.querySelector('.why-our-services');

  if (cards.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cards.forEach((card, idx) => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, idx * 120);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    // Initial hidden state
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    observer.observe(section);
  } else {
    cards.forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  }
});

// Footer Functionality: Dynamic Year + Back to Top Button + Smooth Scroll
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in copyright
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Back to Top button logic
  const backBtn = document.getElementById('backToTop');
  if (backBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backBtn.classList.add('show');
      } else {
        backBtn.classList.remove('show');
      }
    });

    backBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Smooth scroll for footer quick links (for single-page anchors)
  const footerLinks = document.querySelectorAll('.footer-link');
  footerLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });
});

