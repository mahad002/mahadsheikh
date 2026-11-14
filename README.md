# mahadsheikh.com

Static site, served by Vercel from `site/` (see `vercel.json`: no framework, no build step).

- `site/index.html`: the home page; `site/work.html?p=<id>`: project pages (data in `site/data.js`)
- `site/reviews.js`: client feedback; `site/cv/`: the downloadable CVs
- `design/shoot-live.mjs`: takes the live-site screenshots used on the work wall

The previous Next.js site is kept at tag `pre-revamp-2026-11-14` and branch `concept/v1-portrait-hero-2026-11-14` holds an earlier redesign snapshot.

## Speed rules

- **Before every push run `python3 design/stamp.py`.** Browsers cache CSS and JS for a year, so each file's link carries a hash of its content; the script updates the hashes.
- Images, icons, flags and logos are cached for a day. To replace one, give the new file a new name.
- Fonts are self-hosted in `site/fonts/` (copies of the Google Fonts files, OFL). The globe library is in `site/vendor/`.
- The hero's background wall uses the small images in `site/img/t/` (640px wide). Add one there for any new screenshot used in the hero.
- The feedback wall and the globe are built only when the visitor scrolls near them, and every looping animation rests while off-screen.
