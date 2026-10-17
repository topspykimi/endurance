/**
 * Section renderers
 *
 * These functions contain the markup for the frequently updated sections. Most
 * content changes should happen in content/site-content.js instead of here.
 */

const detailsMarkup = (details) => details
  .map(({ label, value }) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
  .join('');

const registrationMarkup = (race) => {
  if (race.registrationUrl) {
    return `<a class="race-action" href="${race.registrationUrl}">Register now</a>`;
  }

  return '<span class="race-action" aria-disabled="true">Registration link coming soon</span>';
};

const raceCardMarkup = (race, index) => {
  const title = race.name.replace(' Sprint Race', '<br>Sprint Race');

  if (race.featured) {
    return `
      <article class="race-card race-card-featured reveal">
        <div class="race-image image-zoom" role="img" aria-label="${race.imageAlt}" style="background-image: url('${race.image}')"></div>
        <div class="race-card-body">
          <div class="race-topline"><span>${race.type}</span><strong>${race.status}</strong></div>
          <h3>${title}</h3>
          <dl>${detailsMarkup(race.details)}</dl>
          ${registrationMarkup(race)}
        </div>
      </article>`;
  }

  return `
    <article class="race-card race-card-soon reveal">
      <div class="race-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</div>
      <div class="race-card-body">
        <div class="race-topline"><span>${race.type}</span><strong>${race.status}</strong></div>
        <h3>${title}</h3>
        <dl>${detailsMarkup(race.details)}</dl>
        ${registrationMarkup(race)}
      </div>
    </article>`;
};

export function renderHero(container, content) {
  container.innerHTML = `
    <div class="hero-media" role="img" aria-label="${content.imageAlt}" style="background-image: url('${content.image}')"></div>
    <div class="hero-grid" aria-hidden="true"></div>
    <div class="hero-slash" aria-hidden="true"></div>
    <div class="hero-content">
      <p class="eyebrow"><span></span>${content.label}</p>
      <h1 id="hero-title" class="hero-title" aria-label="${content.headlineWords.join(' ')}">
        <span class="typed-words" aria-hidden="true" data-typewriter></span><span class="type-cursor" aria-hidden="true"></span>
      </h1>
      <div class="event-strip reveal">
        <div class="event-location"><span class="meta-label">Next Race</span><strong>${content.nextEvent.location}</strong></div>
        <div><span class="meta-label">Date</span><strong>${content.nextEvent.displayDate}</strong></div>
        <div><span class="meta-label">Start</span><strong>${content.nextEvent.displayTime}</strong><small>${content.nextEvent.timeZone}</small></div>
      </div>
    </div>
    <div class="countdown-wrap reveal" aria-label="Countdown to ${content.nextEvent.location} race">
      <span class="countdown-label">Lights out in</span>
      <div class="countdown" data-countdown data-target="${content.nextEvent.countdownUtc}" role="timer" aria-live="off">
        <div><strong data-days>000</strong><span>Days</span></div>
        <div><strong data-hours>00</strong><span>Hours</span></div>
        <div><strong data-minutes>00</strong><span>Minutes</span></div>
        <div><strong data-seconds>00</strong><span>Seconds</span></div>
      </div>
    </div>
    <a class="discover" href="#races" aria-label="Discover upcoming races">
      <span>Discover</span>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v14m0 0 6-6m-6 6-6-6"/></svg>
    </a>`;
}

export function renderLatestNews(container, content) {
  const storyAction = content.storyUrl
    ? `<a class="text-link" href="${content.storyUrl}"><span>Read Story</span><span aria-hidden="true">↗</span></a>`
    : `<button class="text-link" type="button" data-story aria-expanded="false"><span>Read Story</span><span aria-hidden="true">↗</span></button>
       <p class="story-note" data-story-note hidden>${content.unavailableMessage}</p>`;

  container.innerHTML = `
    <div class="section-head reveal">
      <p class="eyebrow dark"><span></span>${content.sectionLabel}</p>
      <h2 id="news-title">${content.sectionTitle}</h2>
      <span class="section-index">01</span>
    </div>
    <article class="news-feature reveal">
      <div class="news-image image-zoom" role="img" aria-label="${content.imageAlt}" style="background-image: url('${content.image}')"></div>
      <div class="news-panel">
        <div class="news-meta"><span>${content.location}</span><span>${content.category}</span></div>
        <h3>${content.title}</h3>
        <p>${content.introduction}</p>
        ${storyAction}
      </div>
    </article>
    <div class="section-action reveal"><span class="outline-button" aria-disabled="true">View All <small>Coming Soon</small></span></div>`;
}

export function renderUpcomingRaces(container, content) {
  container.innerHTML = `
    <div class="race-ghost" aria-hidden="true">Race</div>
    <div class="section-head light reveal">
      <p class="eyebrow"><span></span>${content.sectionLabel}</p>
      <h2 id="races-title">${content.sectionTitle}</h2>
      <span class="section-index">02</span>
    </div>
    <div class="race-grid">${content.events.map(raceCardMarkup).join('')}</div>`;
}
