/**
 * EDITABLE SITE CONTENT
 *
 * Update this file when the next event, featured story, or race calendar changes.
 * The rendering code in scripts/modules/sections.js turns these values into HTML.
 * Keep image paths relative to index.html (for example: assets/hero.webp).
 * Use an empty string for links that are not available yet; the UI will show the
 * supplied coming-soon label instead of creating a broken link.
 */

export const heroContent = {
  label: 'Arrive & Drive · Ontario',
  headlineWords: ['New', 'Driver.', 'Workshop'],
  image: 'assets/hero.webp',
  imageAlt: 'Rental karts racing in an Ontario endurance event',
  nextEvent: {
    location: 'Mosport',
    displayDate: 'Oct 25, 2026',
    displayTime: '4:00–6:00 PM',
    timeZone: 'Eastern Time',
    // October 25, 2026 at 4:00 PM in Toronto is 16:00 UTC (EDT).
    countdownUtc: '2026-10-25T16:00:00Z',
  },
};

export const latestNews = {
  sectionLabel: 'From the paddock',
  sectionTitle: 'Latest News',
  location: 'Mosport',
  category: 'Race Report',
  title: 'Luca Helps Seal the Endurance Victory',
  introduction: 'A decisive team effort, clean stints and relentless pace turned the final laps into a win.',
  image: 'assets/mosport.webp',
  imageAlt: 'Endurance kart racing at Mosport',
  storyUrl: '',
  unavailableMessage: 'Full race reports are coming soon.',
};

export const upcomingRaces = {
  sectionLabel: 'Calendar 2026',
  sectionTitle: 'Upcoming Races',
  events: [
    {
      name: 'Mosport',
      type: 'Sprint',
      status: 'Next Race',
      image: 'assets/race.webp',
      imageAlt: 'Karts racing side by side',
      featured: true,
      details: [
        { label: 'Date', value: 'October 25, 2026' },
        { label: 'Time', value: '4:00 PM–6:00 PM ET' },
        { label: 'Format', value: 'Arrive & Drive' },
      ],
      registrationUrl: '',
    },
    {
      name: 'Audi Group Sprint Race',
      type: 'Endurance',
      status: 'Announcing Soon',
      image: '',
      imageAlt: '',
      featured: false,
      details: [
        { label: 'Date', value: '2027 Spring' },
        { label: 'Location', value: 'To Be Announced' },
      ],
      registrationUrl: '',
    },
  ],
};
