// Modern Interactive Features for OpenHazards Landing Page

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all features
  initNavigation();
  initScrollProgress();
  initCounterAnimations();
  initScrollReveal();
  initTiltEffects();
  initParticleAnimations();
  initSmoothScrolling();
  initHeroAnimations();
  initLoadingAnimations();
});

// Navigation Functions
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close mobile menu when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // Active link highlighting
  window.addEventListener('scroll', updateActiveLink);

  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);

      if (scrollPos >= top && scrollPos <= bottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  }
}

// Scroll Progress Indicator
function initScrollProgress() {
  const progressBar = document.querySelector('.progress-indicator');

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = scrollPercent + '%';
  });
}

// Counter Animations
function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter');
  const observerOptions = {
    threshold: 0.7,
    rootMargin: '0px 0px -100px 0px'
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });

  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }

  // Hero stats animation
  const heroStats = document.querySelectorAll('.hero-stats .stat-number');
  heroStats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    animateCounterImmediate(stat, target, 1500);
  });

  function animateCounterImmediate(element, target, duration) {
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }
}

// Scroll Reveal Animations
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.feature-card, .stat-card, .testimonial-card, .section-header');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal', 'active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    element.classList.add('reveal');
    revealObserver.observe(element);
  });
}

// 3D Tilt Effects
function initTiltEffects() {
  const tiltElements = document.querySelectorAll('[data-tilt]');

  tiltElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.style.transition = 'transform 0.3s ease';
    });

    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / centerY * -10;
      const rotateY = (x - centerX) / centerX * 10;

      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });

    element.addEventListener('mouseleave', () => {
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });
}

// Particle Animations
function initParticleAnimations() {
  createFloatingParticles();
  animateEarthquakePoints();
  animateDataStream();
}

function createFloatingParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(0, 212, 255, ${Math.random() * 0.5 + 0.1});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 20 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
    particlesContainer.appendChild(particle);
  }
}

function animateEarthquakePoints() {
  const eqPoints = document.querySelectorAll('.eq-point');

  eqPoints.forEach((point, index) => {
    setInterval(() => {
      point.style.opacity = Math.random() > 0.5 ? '1' : '0.3';
      point.style.transform = `scale(${Math.random() * 0.5 + 0.8})`;
    }, Math.random() * 3000 + 2000);
  });
}

function animateDataStream() {
  const dataLines = document.querySelectorAll('.data-line');

  setInterval(() => {
    dataLines.forEach(line => {
      const newHeight = Math.random() * 70 + 30;
      line.style.height = `${newHeight}%`;
      line.style.opacity = Math.random() > 0.3 ? '1' : '0.5';
    });
  }, 1500);

  // Seismic reading animation
  const readingLines = document.querySelectorAll('.reading-line');
  setInterval(() => {
    readingLines.forEach(line => {
      const newHeight = Math.random() * 80 + 20;
      line.style.height = `${newHeight}%`;
    });
  }, 500);
}

// Smooth Scrolling
function initSmoothScrolling() {
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Hero Animations
function initHeroAnimations() {
  // Staggered text animations
  const titleLines = document.querySelectorAll('.title-line');
  titleLines.forEach((line, index) => {
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    }, index * 200 + 500);
  });

  // Globe rotation effect
  const globe = document.getElementById('earthquakeGlobe');
  if (globe) {
    let rotation = 0;
    setInterval(() => {
      rotation += 0.5;
      globe.style.transform = `rotate(${rotation}deg)`;
    }, 50);
  }

  // Status dot animation
  const statusDots = document.querySelectorAll('.status-dot.active');
  statusDots.forEach(dot => {
    setInterval(() => {
      dot.style.opacity = dot.style.opacity === '0.5' ? '1' : '0.5';
    }, 1000);
  });
}

// Loading Animations
function initLoadingAnimations() {
  // Add loading class to buttons on click
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      if (button.href && !button.href.includes('#')) {
        button.classList.add('loading');

        setTimeout(() => {
          button.classList.remove('loading');
        }, 2000);
      }
    });
  });
}

// Parallax Effect
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.seismic-waves, .cta-particles');

  parallaxElements.forEach(element => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Intersection Observer for Performance
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observe all main sections
document.querySelectorAll('section').forEach(section => {
  sectionObserver.observe(section);
});

// Preloader (if needed)
window.addEventListener('load', () => {
  document.body.classList.add('loaded');

  // Start hero animations after page load
  setTimeout(() => {
    const heroElements = document.querySelectorAll('.animate-fade-up');
    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }, 500);
});

// Mouse tracking for enhanced effects
document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  // Subtle parallax on particles
  const particles = document.querySelector('.particles-container');
  if (particles) {
    particles.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
  }
});

// Resize handler for responsive updates
window.addEventListener('resize', () => {
  // Recalculate any position-dependent elements
  debounce(() => {
    // Update calculations if needed
  }, 250)();
});

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Custom cursor effect for interactive elements
document.addEventListener('mouseover', (e) => {
  if (e.target.matches('.btn, .feature-card, .stat-card')) {
    document.body.style.cursor = 'pointer';
  } else {
    document.body.style.cursor = 'default';
  }
});

// Keyboard navigation enhancement
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close mobile menu if open
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  }
});

// Error handling for animations
window.addEventListener('error', (e) => {
  console.warn('Animation error caught:', e.error);
  // Graceful degradation - disable problematic animations
});

// Performance monitoring
const perfObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.entryType === 'measure') {
      console.log(`${entry.name}: ${entry.duration}ms`);
    }
  });
});

if ('PerformanceObserver' in window) {
  perfObserver.observe({ entryTypes: ['measure'] });
} 