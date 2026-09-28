# Cameron Petrie — Portfolio v3

This is the redesign of `portfolio-v2`. It is built with Vite and React 18, uses plain three.js for the 3D models, and sends the contact form through EmailJS.

## Run it

```bash
npm install
cp .env.example .env      # add your EmailJS IDs (same values as REACT_APP_EMAIL_* in v2)
npm run dev               # http://localhost:5173
npm run build             # outputs to build/
npm run preview           # serve the production build locally
```

## Deploy

Hosted on Netlify (campetrie.com). Pushing to `main` triggers a production deploy. Build settings live in `netlify.toml`: build command `npm run build`, publish directory `build`, Node 20.

The three `VITE_EMAIL_*` variables must be set under Site configuration → Environment variables in the Netlify dashboard.

## Where things live

```
src/
  data/content.js          ← all copy: hero, stats, case studies, other work, links
  App.jsx                  ← page composition + light/dark theme wiring
  hooks.js                 ← useTheme (persisted to localStorage), useTypewriter
  styles.css               ← design tokens (CSS vars per theme) + all styles
  components/
    Header.jsx             ← sticky nav, theme toggle, résumé download
    Hero.jsx               ← award pill, typewriter name/intro, laptop viewport
    CaseStudies.jsx        ← bento cards; flagship has award flag + stats; expandable spec
    MoreWork.jsx           ← project grid (links open when a live URL exists)
    Blender.jsx            ← 3D section with the desk model
    Contact.jsx            ← EmailJS form with sending / sent / error states
    ModelViewport.jsx      ← mounts a three.js scene into a transparent div
  three/
    stage.js               ← shared renderer, ortho camera, mouse-follow orbit, resize, offscreen pause
    laptop.js              ← laptop8.glb, me9.jpg screen texture, click to open/close
    desk.js                ← desk-chairs.glb, spins when scrolled into view, click to replay
public/
  models/                  ← laptop8.glb, desk-chairs.glb
  images/                  ← project screenshots, award icon, screen texture
  resources/               ← résumé PDF
```

## Editing content

Everything in the page text comes from `src/data/content.js`:
- `metrics`: the stats shown inside the Cognitive Talent Analyzer card.
- `cases`: the three case studies. `award: true` shows the HR Tech Award flag. `stats: "metrics"` shows the stats row.
- `other`: the "More work" grid. Set `link` to a URL to make the card clickable.

## Theming

The color tokens are defined in `src/styles.css`:
- **Themes:** `[data-theme="dark"]` is Acid and `[data-theme="light"]` is Paper.
- **Fonts:** Archivo is loaded from Google Fonts in `index.html`. The design uses its width axis: `font-stretch: 125%` for the name and "Let's talk", and `75%` for section titles.
- **3D colors:** the laptop body and screen-glow colors for each theme are set in `LAPTOP_COLORS` in `App.jsx`.

## Behavior carried over from v2

- **3D models:** the laptop camera, lighting, hinge animation and materials match the old site, and so does the desk's spin timing.
- **Other features:** the typewriter intro (55ms per character for the name, 18ms for the intro), the dimming of other cards on hover (now done in CSS with `:has()`), the light/dark toggle, résumé download and EmailJS contact form.
- **Reduced motion:** users with reduced-motion turned on get a static camera and no typewriter.
