# Ruqiyya Aghatalibova — Portfolio (React/Vite)

This is your original static HTML portfolio converted into a React + Vite +
React Router project, so each page is now its own file instead of one giant
HTML blob.

## Running it

```
npm install
npm run dev
```

Then open the printed localhost URL. `npm run build` produces a production
build in `dist/`.

## How it was converted (read this before editing)

Your original site was hand-built HTML/CSS/JS with no build step. To get it
into React **without silently breaking any of the custom cursor effects,
scroll reveals, language toggle, or Chart.js dashboards**, each page was
converted like this:

- `src/pages/*.jsx` (and `src/pages/projects/*.jsx`) = one component per
  original `.html` file.
- Inside each component, the page's `<style>` block became a plain `css`
  string rendered via `<style>{css}</style>` — same CSS as before, unchanged.
- The page's `<body>` markup became an `bodyHtml` string, rendered using
  [`html-react-parser`](https://github.com/remarkable-web/html-react-parser)
  (`parse(bodyHtml)`). This avoids hand-converting thousands of lines of
  markup to JSX (which is extremely easy to break — self-closing tags,
  `class`→`className`, inline `style` strings, etc.) while still rendering
  real DOM through React.
- The page's `<script>` content (language toggle, scroll-reveal,
  Chart.js setup, the little embedded games on the Projects page, etc.)
  is injected via `useEffect` on mount — functionally identical to how it
  ran in the original static HTML.
- Internal links (`index.html`, `project-*.html`) were rewritten to route
  paths (`/`, `/projects/academic-analytics`, etc.) but are still plain
  `<a>` tags, so navigating between pages does a normal full page load
  (exactly like your original site did). If you want SPA-style navigation
  with no reload, swap `<a href="/...">` for React Router's `<Link to="/...">`
  in the relevant `.jsx` files.
- Images (`cert1.jpg`…`cert4.jpg`, `my_picture.jpg`) live in `public/` and
  are referenced as `/cert1.jpg` etc.
- Chart.js and Font Awesome are loaded globally in `index.html` (same CDN
  links you were already using), so every project page has them available.

**What this buys you:** each page is now its own editable file, routing is
handled by React Router, and the project has a real build pipeline (Vite) —
but the internals of each page are still mostly the original CSS/HTML/JS,
just organized. It is *not* a from-scratch idiomatic React rewrite (no
component state for the language toggle, charts aren't React components,
etc.) — doing that properly for 12 highly custom pages would mean
re-implementing everything by hand and risking visual regressions. This
approach keeps the site working exactly as it did while giving you a much
easier structure to edit going forward.

## Suggested next steps (optional, not required)

- Pick one project page and refactor its language toggle into a small
  `useState`-based component if you want a fully "React-native" feel.
- Replace `<a href="...">` with `<Link to="...">` for instant page
  switches instead of full reloads.
- Split `Projects.jsx`'s big embedded mini-games (`GD` object, base64 HTML
  blobs) out into separate files in `public/` and load them by URL instead
  of inline strings, if you want that file to be less enormous.

## Adding a video to a project page

Yes — you host it in the repo, and yes — that means it's committed to git.
Steps:

1. Drop your video file into `public/videos/`, e.g.
   `public/videos/hotel-reservation-demo.mp4`.
2. That's it. `public/` files are served as-is at the site root, so
   `public/videos/hotel-reservation-demo.mp4` becomes available at
   `/videos/hotel-reservation-demo.mp4` automatically — no import, no build
   step, no code change needed once the filename matches what the page
   already references.

**One real caveat:** git (and most static hosts / free-tier deploys) is not
great with large binary files. Keep it under ~20-30MB if you can — compress
it first (HandBrake, or `ffmpeg -i in.mp4 -vcodec h264 -crf 28 out.mp4` is a
quick way to shrink an mp4 a lot with barely-noticeable quality loss). If
your video is long or high-res, it's usually better to upload it to YouTube
(unlisted, if you don't want it public) and swap the `<video>` tag for a
YouTube `<iframe>` embed instead — ask me and I'll do that swap for you.

The Hotel Reservation System page (`src/pages/projects/HotelReservation.jsx`)
already has a `<video>` element wired up and waiting for
`public/videos/hotel-reservation-demo.mp4` — just add the file with that
exact name and it'll appear automatically. Rename it in the code if you'd
rather use a different filename.
