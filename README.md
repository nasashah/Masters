# Masters Barber Lounge — website

Static site. No build step, no dependencies.

## Deploy to Vercel

1. vercel.com/new → drag this folder in (or `vercel --prod` from inside it).
2. Framework preset: **Other**. Build command: none. Output directory: leave blank.
3. Add your domain under Settings → Domains.

`vercel.json` already sets clean URLs, asset caching, security headers, and
redirects for /services, /privacy, /terms.

## Routes

| URL                  | File                            |
|----------------------|---------------------------------|
| /                    | index.html                      |
| /menu                | menu/index.html                 |
| /privacy-policy      | privacy-policy/index.html       |
| /terms-of-service    | terms-of-service/index.html     |

## Live Google reviews

The reviews section is server-rendered with six real reviews, then upgraded to
live Google data by `assets/site.js`, which calls the reviews proxy at:

    https://masters-omega.vercel.app/api/reviews

**Before launch:** add the site's domain to that proxy's `ALLOWED_ORIGINS`
environment variable (comma-separated), otherwise the browser blocks the call
and the page quietly falls back to the six static reviews.

    ALLOWED_ORIGINS=https://mastersbarberlounge.store,https://www.mastersbarberlounge.store

To point at a different endpoint, edit `data-endpoint` on the
`.rev-grid` element in index.html.

## Images

Gallery and product photos load from mastersbarberlounge.com/wp-content/.
If that WordPress site is taken down, download those images into /assets and
update the `src` paths in index.html.

## Editing content

Everything is plain HTML — prices live in `menu/index.html` and in the
services grid on `index.html` (keep them in sync). Hours are in the
`.hours` list on index.html and in the JSON-LD block in the `<head>`.
