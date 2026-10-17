import { heroContent, latestNews, upcomingRaces } from '../content/site-content.js';
import { renderHero, renderLatestNews, renderUpcomingRaces } from './modules/sections.js';
import {
  setupCountdown,
  setupHeaderAndMenu,
  setupNewsletter,
  setupScrollReveals,
  setupStoryAction,
  setupTypewriter,
} from './modules/interactions.js';

// Render content first so interaction setup can find the generated elements.
renderHero(document.querySelector('[data-hero-section]'), heroContent);
renderLatestNews(document.querySelector('[data-news-section]'), latestNews);
renderUpcomingRaces(document.querySelector('[data-races-section]'), upcomingRaces);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
setupHeaderAndMenu();
setupCountdown();
setupScrollReveals(prefersReducedMotion);
setupNewsletter();
setupStoryAction();
setupTypewriter(heroContent.headlineWords, prefersReducedMotion);
