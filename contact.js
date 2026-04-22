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

// Page Hero (Contact) - Optional smooth scroll and entrance animation
document.addEventListener('DOMContentLoaded', () => {
  const breadcrumbHome = document.querySelector('.breadcrumb-link');
  
  // If the breadcrumb "Home" links to a single-page anchor, enable smooth scroll
  if (breadcrumbHome && breadcrumbHome.getAttribute('href') === '#home') {
    breadcrumbHome.addEventListener('click', (e) => {
      e.preventDefault();
      const homeSection = document.getElementById('home');
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  // Subtle fade-in animation for hero content
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

// Get in Touch Section - Form Validation and Success Message
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const feedbackDiv = document.getElementById('formFeedback');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent actual submission

      // Get field values
      const fullname = document.getElementById('fullname').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      // Phone is optional, no validation needed

      // Reset feedback
      feedbackDiv.innerHTML = '';
      feedbackDiv.className = 'form-feedback';

      // Validation: check required fields
      if (fullname === '' || email === '' || message === '') {
        feedbackDiv.textContent = '❌ Please fill in all required fields (Name, Email, Message).';
        feedbackDiv.classList.add('error');
        return;
      }

      // Email format validation
      const emailPattern = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
      if (!emailPattern.test(email)) {
        feedbackDiv.textContent = '❌ Please enter a valid email address (e.g., name@domain.com).';
        feedbackDiv.classList.add('error');
        return;
      }

      // Success message
      feedbackDiv.textContent = '✅ Message sent successfully! We will get back to you soon.';
      feedbackDiv.classList.add('success');

      // Optionally clear the form
      form.reset();

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        if (feedbackDiv) {
          feedbackDiv.style.opacity = '0';
          setTimeout(() => {
            feedbackDiv.innerHTML = '';
            feedbackDiv.className = 'form-feedback';
            feedbackDiv.style.opacity = '1';
          }, 300);
        }
      }, 5000);
    });
  }
});

// Office Map - Optional: lazy load or console log
document.addEventListener('DOMContentLoaded', () => {
  const mapIframe = document.querySelector('.om-map iframe');
  if (mapIframe) {
    console.log('Map loaded successfully');
  }
});

// Frequently Asked Questions - Accordion Functionality
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answerDiv = item.querySelector('.faq-answer');
    
    questionBtn.addEventListener('click', () => {
      // Close other open items (optional – for compact, you can remove this)
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          const otherAnswer = otherItem.querySelector('.faq-answer');
          otherItem.classList.remove('active');
          otherAnswer.style.maxHeight = null;
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
      if (item.classList.contains('active')) {
        answerDiv.style.maxHeight = answerDiv.scrollHeight + 'px';
      } else {
        answerDiv.style.maxHeight = null;
      }
    });
  });
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