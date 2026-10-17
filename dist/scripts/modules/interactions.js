/**
 * Interactive behavior shared across the page.
 * Each setup function owns one feature so it can be reviewed or changed alone.
 */

const delay = (milliseconds) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));

export function setupHeaderAndMenu() {
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');

  const setHeaderState = () => header.classList.toggle('scrolled', window.scrollY > 40);
  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

export async function setupTypewriter(words, prefersReducedMotion) {
  const target = document.querySelector('[data-typewriter]');
  if (prefersReducedMotion) {
    target.textContent = words.join(' ');
    return;
  }

  // Type one character at a time and stop after the final word.
  for (let index = 0; index < words.length; index += 1) {
    for (const character of words[index]) {
      target.textContent += character;
      await delay(55);
    }
    if (index < words.length - 1) target.textContent += ' ';
    await delay(110);
  }
}

export function setupCountdown() {
  const countdown = document.querySelector('[data-countdown]');
  const targetTime = Date.parse(countdown.dataset.target);
  const fields = {
    days: countdown.querySelector('[data-days]'),
    hours: countdown.querySelector('[data-hours]'),
    minutes: countdown.querySelector('[data-minutes]'),
    seconds: countdown.querySelector('[data-seconds]'),
  };

  const update = () => {
    const distance = Math.max(0, targetTime - Date.now());
    fields.days.textContent = String(Math.floor(distance / 86400000)).padStart(3, '0');
    fields.hours.textContent = String(Math.floor((distance % 86400000) / 3600000)).padStart(2, '0');
    fields.minutes.textContent = String(Math.floor((distance % 3600000) / 60000)).padStart(2, '0');
    fields.seconds.textContent = String(Math.floor((distance % 60000) / 1000)).padStart(2, '0');
  };

  update();
  window.setInterval(update, 1000);
}

export function setupScrollReveals(prefersReducedMotion) {
  const elements = document.querySelectorAll('.reveal');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -7% 0px' });
  elements.forEach((element) => observer.observe(element));
}

export function setupNewsletter() {
  const form = document.querySelector('[data-newsletter]');
  const emailInput = form.querySelector('input[type="email"]');
  const message = form.querySelector('[data-form-message]');

  // Validate locally only; no address is transmitted until a service is connected.
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
    emailInput.setAttribute('aria-invalid', String(!valid));
    message.classList.toggle('error', !valid);
    message.textContent = valid
      ? 'Thanks — newsletter sign-up will be connected soon.'
      : 'Enter a valid email address to continue.';
  });
}

export function setupStoryAction() {
  const button = document.querySelector('[data-story]');
  const note = document.querySelector('[data-story-note]');
  if (!button || !note) return; // A real story URL replaces this temporary action.

  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    note.hidden = expanded;
  });
}
