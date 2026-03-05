/* ═══════════════════════════════════════════
   NEURA — main.js
   EmailJS · Flatpickr · GSAP · ScrollTrigger
═══════════════════════════════════════════ */

/* ── EMAILJS INIT ── */
emailjs.init('1VdCI2eX6dJpfj7OY');

const EMAILJS_SERVICE  = 'service_p4cl5e7';
const EMAILJS_TEMPLATE = 'template_eoe10gs';

/* ── FLATPICKR — Calendario ── */
document.addEventListener('DOMContentLoaded', () => {

  /* ── INICIO CARRUSEL ── */
  startCarousel();

  flatpickr('#input-fecha', {
    locale: 'es',
    minDate: 'today',
    disableMobile: false,
    disable: [
      function(date) {
        // Deshabilitar domingos (0)
        return date.getDay() === 0;
      }
    ],
    dateFormat: 'd/m/Y',
    theme: 'airbnb',
  });

  /* ── GSAP HERO ENTRANCE ── */
  gsap.registerPlugin(ScrollTrigger);

  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTl
    .from('.hero-tag',     { opacity: 0, y: 20, duration: 0.6, delay: 0.2 })
    .from('h1',            { opacity: 0, y: 30, duration: 0.7 }, '-=0.3')
    .from('.hero-sub',     { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
    .from('.hero-actions', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
    .from('.hero-shape',   { opacity: 0, scale: 0.8, duration: 1.2, ease: 'elastic.out(1, 0.5)' }, '-=0.3');

  /* ── GSAP SCROLL REVEALS ── */
  gsap.utils.toArray('.gsap-reveal').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 40,
      duration: 0.7,
      delay: (i % 3) * 0.12,
      ease: 'power2.out',
    });
  });

  /* ── GSAP SECTION TITLES ── */
  gsap.utils.toArray('.section-title').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      opacity: 0,
      x: -30,
      duration: 0.8,
      ease: 'power2.out',
    });
  });

  /* ── GSAP APPROACH CARDS stagger ── */
  gsap.from('.approach-card', {
    scrollTrigger: { trigger: '.approach', start: 'top 70%' },
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power2.out',
  });

  /* ── STATS COUNTER ANIMATION ── */
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el      = entry.target;
        const target  = parseInt(el.dataset.target);
        const prefix  = el.dataset.prefix  || '';
        const suffix  = el.dataset.suffix  || '';
        const duration = 1800;
        const step     = Math.ceil(target / (duration / 16));
        let current    = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = prefix + current + suffix;
        }, 16);

        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    statsObserver.observe(el);
  });

  /* ── NAV SCROLL EFFECT ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ── MOBILE HAMBURGER ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Cerrar menú al hacer clic en un enlace
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  /* ── ACTIVE NAV LINK ON SCROLL ── */
  const sections = document.querySelectorAll('section[id], div.stats-bar');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ── SMOOTH SCROLL for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});

/* ── HERO CAROUSEL ── */
let currentSlide = 0;
let carouselTimer;

function goToSlide(index) {
  const quotes = document.querySelectorAll('.hero-quote');
  const dots   = document.querySelectorAll('.dot');

  quotes[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');

  currentSlide = index;

  quotes[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');

  clearInterval(carouselTimer);
  startCarousel();
}

function startCarousel() {
  carouselTimer = setInterval(() => {
    const total = document.querySelectorAll('.hero-quote').length;
    goToSlide((currentSlide + 1) % total);
  }, 4500);
}

/* ── MODALES ── */
function openModal(tipo) {
  const template = document.getElementById('modal-' + tipo);
  const body     = document.getElementById('modalBody');
  const overlay  = document.getElementById('modalOverlay');

  if (!template) return;
  body.innerHTML = '';
  body.appendChild(template.content.cloneNode(true));
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* ── PRECIO TABS ── */
function switchTab(btn, tabId) {
  document.querySelectorAll('.precio-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.precio-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  const tab = document.getElementById('tab-' + tabId);
  tab.classList.add('active');
  gsap.from(tab, { opacity: 0, y: 16, duration: 0.4, ease: 'power2.out' });
}

/* ── CHIP SELECTION ── */
function toggleChip(el) {
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  // Micro-animación al seleccionar
  gsap.from(el, { scale: 0.9, duration: 0.2, ease: 'back.out(2)' });
}

/* ── EMAILJS FORM SUBMIT ── */
function handleSubmit() {
  const nombre       = document.getElementById('input-nombre').value.trim();
  const apellidos    = document.getElementById('input-apellidos').value.trim();
  const email        = document.getElementById('input-email').value.trim();
  const telefono     = document.getElementById('input-telefono').value.trim();
  const fecha        = document.getElementById('input-fecha').value;
  const disponibilidad = document.getElementById('input-disponibilidad').value;
  const mensaje      = document.getElementById('input-mensaje').value.trim();
  const servicio     = document.querySelector('.chip.active')?.textContent || 'No especificado';

  // Validación básica
  if (!nombre || !email) {
    gsap.from('#submitBtn', { x: -8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' });
    return;
  }

  const btn     = document.getElementById('submitBtn');
  const btnText = document.getElementById('btn-text');
  const btnLoad = document.getElementById('btn-loading');

  // Estado cargando
  btnText.style.display = 'none';
  btnLoad.style.display = 'inline';
  btn.disabled = true;

  const templateParams = {
    nombre,
    apellidos,
    email,
    telefono,
    servicio,
    disponibilidad,
    fecha: fecha || 'Sin fecha especificada',
    mensaje: mensaje || 'Sin mensaje',
  };

  emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, templateParams)
    .then(() => {
      btn.style.display = 'none';
      const success = document.getElementById('form-success');
      success.style.display = 'flex';
      gsap.from(success, { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' });
    })
    .catch((err) => {
      console.error('EmailJS error:', err);
      btnText.style.display = 'inline';
      btnLoad.style.display = 'none';
      btn.disabled = false;
      const error = document.getElementById('form-error');
      error.style.display = 'block';
      gsap.from(error, { opacity: 0, y: 10, duration: 0.4 });
    });
}
