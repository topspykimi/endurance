# 2 Hours Endurance Race

Static one-page website for the Ontario arrive-and-drive karting league.

## Project structure

```text
dist/
  assets/                  Optimized photographs, sponsor marks, and favicon
  content/
    site-content.js        Frequently updated hero, news, and race information
  scripts/
    main.js                Page startup and module wiring
    modules/
      sections.js          HTML templates for editable content sections
      interactions.js      Menu, countdown, animation, and form behavior
  index.html               Stable page shell and lower-frequency sections
  styles.css               Visual design and responsive layout
```

## Updating content

Start with `dist/content/site-content.js`. It contains the editable hero event,
featured news story, and upcoming race list. Add a race by copying an event object
inside `upcomingRaces.events`; leave a future link as an empty string until it is
real so the page shows its coming-soon state.

Images belong in `dist/assets/`. Reference them from the content file with a path
such as `assets/new-race.webp`.

## Local preview

ES modules require the site to be served rather than opened directly as a file:

```powershell
python -m http.server 4173 --directory dist
```

Then open `http://127.0.0.1:4173/`.
