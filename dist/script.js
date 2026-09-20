const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const setHeaderState = () => header.classList.toggle('scrolled', window.scrollY > 40);
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
}

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

const typeTarget = document.querySelector('[data-typewriter]');
const headlineWords = ['Two', 'Hours.', 'One', 'Team.', 'No', 'Excuses.'];

async function typeHeadline() {
  if (prefersReducedMotion) {
    typeTarget.textContent = headlineWords.join(' ');
    return;
  }

  for (let index = 0; index < headlineWords.length; index += 1) {
    const word = headlineWords[index];
    for (const character of word) {
      typeTarget.textContent += character;
      await new Promise((resolve) => window.setTimeout(resolve, 55));
    }
    if (index < headlineWords.length - 1) typeTarget.textContent += ' ';
    await new Promise((resolve) => window.setTimeout(resolve, 110));
  }
}

typeHeadline();

const countdownTarget = Date.UTC(2026, 8, 27, 17, 0, 0);
const countdown = document.querySelector('[data-countdown]');
const fields = {
  days: countdown.querySelector('[data-days]'),
  hours: countdown.querySelector('[data-hours]'),
  minutes: countdown.querySelector('[data-minutes]'),
  seconds: countdown.querySelector('[data-seconds]'),
};

function updateCountdown() {
  const distance = Math.max(0, countdownTarget - Date.now());
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);
  fields.days.textContent = String(days).padStart(3, '0');
  fields.hours.textContent = String(hours).padStart(2, '0');
  fields.minutes.textContent = String(minutes).padStart(2, '0');
  fields.seconds.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

const revealElements = document.querySelectorAll('.reveal');
if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach((element) => element.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -7% 0px' });
  revealElements.forEach((element) => observer.observe(element));
}

const newsletter = document.querySelector('[data-newsletter]');
const emailInput = newsletter.querySelector('input[type="email"]');
const formMessage = newsletter.querySelector('[data-form-message]');

newsletter.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = emailInput.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  emailInput.setAttribute('aria-invalid', String(!valid));
  formMessage.classList.toggle('error', !valid);
  formMessage.textContent = valid
    ? 'Thanks — newsletter sign-up will be connected soon.'
    : 'Enter a valid email address to continue.';
});

const storyButton = document.querySelector('[data-story]');
const storyNote = document.querySelector('[data-story-note]');
storyButton.addEventListener('click', () => {
  const expanded = storyButton.getAttribute('aria-expanded') === 'true';
  storyButton.setAttribute('aria-expanded', String(!expanded));
  storyNote.hidden = expanded;
});
