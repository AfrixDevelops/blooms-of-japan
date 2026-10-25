# Blooms of Japan — bloomsofjapan.com

Static site, deployed on Vercel. `public/` is exactly what gets served.

## Updating the site

All editing happens in `source/`:

- `source/bloomjapan/index.html` holds the spot list (`const DATA = [...]`), the single source of truth for spots.
- `source/bloomcal/` holds the site: `index.src.html` (page), `styles.css`, `hero.js`, images in `img/ th/ new/ gal/ art/`.

Rebuild, test, then copy into `public/`:

```sh
cd source/bloomcal
node build-spots.js       # spot list -> data.js
node build-index.js       # index.src.html -> index.html
node build-router.js      # adds spot / seasons views + routes
node test-router.js       # every route should say OK
node build-dist.js ../../public   # production page + only the images in use
```

Deploy from the project root: `npx vercel --prod --archive=tgz` (the archive flag uploads one bundle; without it, a day of many deploys can hit the free plan's 5,000-file upload limit).

## Pages and SEO

Every view has a real address (`/spots/<slug>`, `/flowers/<key>`, `/when/<month>`, `/calendar`, `/seasons`, `/spots?q=…`).
`build-dist.js` pre-renders each one in headless Chrome (`tools/prerender.js`) with its own title, description,
canonical URL, social image and schema.org data, and writes `sitemap.xml`. Old `/#/…` links redirect in the page.

The canonical/sitemap address defaults to https://blooms-of-japan.vercel.app. Once bloomsofjapan.com is live:

```sh
BLOOMS_SITE=https://bloomsofjapan.com node build-dist.js ../../public
```

Photos are from Wikimedia Commons (CC BY / BY-SA / CC0). Each spot's credit is printed under its photo.
