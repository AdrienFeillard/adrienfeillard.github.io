# Portfolio — static build (deploy package)

Vanilla HTML/CSS/JS, no build step. Works on GitHub Pages as-is.

## Deploy to adrienfeillard.github.io

1. Copy the contents of this folder into the root of your repository,
   replacing the old `index.html`, `styles.css`, `css/` and `js/` files.
   (Delete the old `css/` and `js/` modules — they are fully replaced.)
2. `images/` and `pdfs/` here contain everything the site references,
   including the new `images/world-dots.png` map. Your existing extra
   files (e.g. `anim.gif`) can stay; they're simply unused.
3. **Add your CV** at `pdfs/CV_Adrien_Feillard.pdf` — both CV buttons
   point to that exact path.
4. Commit and push. Done.

## Customizing

- **Accent color**: edit the three `--af-*` values at the top of
  `css/style.css` (accent, glow, tint).
- **Content** (projects, skills, tool→project links): `js/data.js`.
- **Map pins**: inline `style` attributes on the `.pin` elements in
  `index.html`.
- The "01 — Next project" slot is a placeholder: when you have a real
  project, replace that block in `index.html` (and its `next` entries
  in `js/data.js`).
