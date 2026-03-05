/* ── CHIP SELECTION ── */
function toggleChip(el) {
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

/* ── FORM SUBMIT ── */
function handleSubmit() {
  const btn = document.getElementById('submitBtn');
  btn.textContent = '✓ Solicitud enviada — te contactaremos pronto';
  btn.style.background = 'var(--sage)';
  btn.style.transform = 'none';
  btn.disabled = true;
}

/* ── SCROLL REVEAL ── */
document.addEventListener('DOMContentLoaded', () => {
  const revealTargets = document.querySelectorAll(
    '.service-card, .approach-card, .testimonial-card, .info-item, .qs-exp-item, .qs-tags-section'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.1 });

  revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});
