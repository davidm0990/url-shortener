# Cloudflare Course — KV URL Shortener (Phase 2 log)

Project: `C:\code\kvlearn\url-shortener`
Live app: https://url-shortener.davidmiles0990.workers.dev
GitHub: `git@github.com:davidm0990/url-shortener.git`
Last updated: 2026-07-04

---

## What this project is

A URL shortener built to learn **Cloudflare KV**. You paste a long URL → the app
makes a short code and stores `code → URL` in KV → visiting the short link redirects
you to the original site.

Tech stack: SvelteKit (minimal, Svelte 5 runes, plain JS) + `@sveltejs/adapter-cloudflare`,
deployed as a Cloudflare Worker. KV namespace `SHORT_LINKS`
(id `69b84e4374cf48169c96159d9cd501f9`), binding reached via `platform.env.SHORT_LINKS`.

---

## KV — the three commands learned

| Command | Job | Where used |
|---|---|---|
| `.put(key, value, options?)` | save a pair | create action |
| `.get(key)` | read one value | redirect route |
| `.list()` | get all keys | homepage list |

Extra options learned: `{ expirationTtl: seconds }` on `.put()` makes KV auto-delete
a key after a time (min 60s).

Local vs cloud: this Wrangler version **defaults to `--local`** (a laptop sandbox).
Use `--remote` to touch the real cloud namespace.
- `npx wrangler kv key list --binding SHORT_LINKS --local`  → laptop sandbox
- `npx wrangler kv key list --binding SHORT_LINKS --remote` → real cloud

The KV namespace already lives in the cloud — nothing to "deploy". Only the DATA is
local-vs-cloud, depending on where the write came from (dev writes local, live site
writes cloud).

---

## Files

- `src/routes/+page.svelte` — form (URL + expiry dropdown) + "All short links" list, styled.
- `src/routes/+page.server.js` — `load()` lists all links (with clicks); `actions.default`
  validates, makes a code, stores `JSON.stringify({url, clicks:0})`.
- `src/routes/[code]/+server.js` — GET reads the value, bumps the click count
  (read-modify-write), redirects (or 404).
- `src/lib/links.js` — shared helpers `makeCode()` and `parseLink()` (safe-reads both
  JSON values and old plain-string URLs). Imported via the `$lib` alias.
- `wrangler.jsonc` — Cloudflare settings: name, compatibility_date, main/assets, and the
  `kv_namespaces` binding `SHORT_LINKS`.

Note: this newer SvelteKit layout has **no `svelte.config.js`** — the adapter lives inside
`vite.config.js`.

---

## Git basics learned

`git init` → `git add .` → `git commit -m "..."` → `git branch -m main`
→ `git remote add origin <ssh-url>` → `git push -u origin main`.
Everyday loop after that: `git add .` → `git commit -m "..."` → `git push`.
Auth via SSH key (`~/.ssh/id_ed25519`, registered to GitHub user `davidm0990`).

---

## Ship loop (every change)

edit → test on `http://localhost:5173` → `git add/commit/push`
→ `npm run build` → `npx wrangler deploy` → hard-refresh the live site (Ctrl+Shift+R).
The live site is a snapshot; it only changes after a deploy (localhost hot-reloads).

---

## Features

- ✅ Core shortener (put/get + redirect) — DONE, live.
- ✅ List all links on homepage (`.list()`) — DONE, live.
- ✅ Feature 1: Click counter (read-modify-write) — DONE, live.
- ✅ UI restyle — light `#eef2f8` background, white card, blue gradient
  `#38bdf8 → #2563eb` button/title/click-pills — DONE, live.
- ⏳ Feature 2: Expiring links (`expirationTtl`) — instructions ready, NOT yet applied.
- ⬜ Feature 3: Delete button (`.delete()`) — planned.

## Resume point (next session)

Apply Feature 2 (expiring links):
1. `+page.svelte`: add `<select name="ttl">` to the form with options
   `""`=never, `60`, `3600`, `86400`, `604800`; make the form wrap; style the select.
2. `+page.server.js` action: `const ttl = Number(data.get('ttl'));`
   `const options = ttl ? { expirationTtl: ttl } : {};`
   `await platform.env.SHORT_LINKS.put(code, value, options);`
3. Test a 1-minute link (wait ~60s → it disappears), then commit + deploy.

Then Feature 3 (delete button with `.delete()`), then move on to the next service
(R2 — file/image storage).
