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

// Page Hero with Background Image - Optional Enhancements
document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth scroll for breadcrumb (if href="#home")
  const breadcrumbHome = document.querySelector('.breadcrumb-link');
  if (breadcrumbHome && breadcrumbHome.getAttribute('href') === '#home') {
    breadcrumbHome.addEventListener('click', (e) => {
      e.preventDefault();
      const homeSection = document.getElementById('home');
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 2. Subtle fade-in animation for the hero content (optional)
  const heroContainer = document.querySelector('.page-hero-container');
  if (heroContainer) {
    heroContainer.style.opacity = '0';
    heroContainer.style.transform = 'translateY(15px)';
    heroContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    setTimeout(() => {
      heroContainer.style.opacity = '1';
      heroContainer.style.transform = 'translateY(0)';
    }, 100);
  }
});

// Who We Are Section - Scroll Reveal Animation
document.addEventListener('DOMContentLoaded', () => {
  const wwaSection = document.querySelector('.who-we-are');
  const wwaText = document.querySelector('.wwa-text');
  const wwaImage = document.querySelector('.wwa-image');

  if (wwaSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (wwaText) {
            wwaText.style.opacity = '1';
            wwaText.style.transform = 'translateX(0)';
          }
          if (wwaImage) {
            wwaImage.style.opacity = '1';
            wwaImage.style.transform = 'translateX(0)';
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    // Set initial hidden state
    if (wwaText) {
      wwaText.style.opacity = '0';
      wwaText.style.transform = 'translateX(-20px)';
      wwaText.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
    if (wwaImage) {
      wwaImage.style.opacity = '0';
      wwaImage.style.transform = 'translateX(20px)';
      wwaImage.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }

    observer.observe(wwaSection);
  } else {
    // Fallback: show immediately
    if (wwaText) {
      wwaText.style.opacity = '1';
      wwaText.style.transform = 'translateX(0)';
    }
    if (wwaImage) {
      wwaImage.style.opacity = '1';
      wwaImage.style.transform = 'translateX(0)';
    }
  }
});

// Mission & Vision Section - Advanced Animations
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.mv-card');
  const section = document.querySelector('.mission-vision');

  // 1. Staggered entrance animation with scale + fade
  if (cards.length) {
    cards.forEach((card, idx) => {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.95) translateY(20px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1) translateY(0)';
      }, idx * 200 + 200);
    });
  }

  // 2. Subtle mouse move tilt effect (brilliance)
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within card
      const y = e.clientY - rect.top;  // y position within card
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      setTimeout(() => {
        if (!card.matches(':hover')) {
          card.style.transform = '';
        }
      }, 100);
    });
  });

  // 3. Optional: background gradient shift on scroll (adds life)
  if (section) {
    window.addEventListener('scroll', () => {
      const rect = section.getBoundingClientRect();
      const visible = rect.top < window.innerHeight - 100 && rect.bottom > 100;
      if (visible) {
        section.style.background = 'linear-gradient(135deg, #fff5eb 0%, #ffffff 100%)';
      } else {
        section.style.background = 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)';
      }
    });
  }
});

// Core Values Section - Entrance Animation & Tilt Effect
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.cv-card');
  const section = document.querySelector('.core-values');

  // 1. Staggered entrance with scale + fade
  if (cards.length) {
    cards.forEach((card, idx) => {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.92) translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1) translateY(0)';
      }, idx * 120 + 200);
    });
  }

  // 2. Subtle tilt on mouse move (optional)
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale(1.01)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      setTimeout(() => {
        if (!card.matches(':hover')) {
          card.style.transform = 'scale(1) translateY(0)';
        }
      }, 50);
    });
  });

  // 3. Optional: section background shift on scroll (adds life)
  if (section) {
    window.addEventListener('scroll', () => {
      const rect = section.getBoundingClientRect();
      const visible = rect.top < window.innerHeight - 100 && rect.bottom > 100;
      if (visible) {
        section.style.background = 'linear-gradient(135deg, #ffffff 0%, #fff5e6 100%)';
      } else {
        section.style.background = 'linear-gradient(135deg, #ffffff 0%, #fef9e6 100%)';
      }
    });
  }
});

// Why Choose Corevia (Condensed) - Entrance Animation
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.wcc-card');
  const section = document.querySelector('.why-choose-condensed');

  if (cards.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cards.forEach((card, idx) => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, idx * 150);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    // Set initial hidden state
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
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

// Call to Action - Smooth scroll to Contact section
document.addEventListener('DOMContentLoaded', () => {
  const ctaBtn = document.getElementById('ctaContactBtn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Fallback: if no contact section, alert or redirect
        console.warn('Contact section not found');
        alert('Contact section coming soon.');
      }
    });
  }
});

// Footer Functionality: Dynamic Year + Back to Top Button
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

  // Smooth scroll for footer quick links (if using single-page anchors)
  const footerLinks = document.querySelectorAll('.footer-link');
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});

