# social-renderer

Tiny HTTP service that turns generated text into on-brand **carousel slides (1080×1350)** and
**Pinterest pins (1000×1500)** for the *Connected, Not Consumed* brand. Crisp text (HTML render,
not AI image gen). Sibling to your existing `ffmpeg-renderer`.

## Endpoints
- `GET  /health` → `{ ok: true }`
- `POST /carousel`  body `{ "slides": [ {type,...}, ... ] }` → `{ count, images:[<base64 png>, ...] }`
- `POST /pin`       body `{ title, sub, badge, footer, url }` → `{ image: <base64 png> }`

Auth: if `SHARED_SECRET` is set, send header `Authorization: Bearer <SHARED_SECRET>`.

### Slide types (for /carousel)
- `{ "type":"cover", "hook":"...", "sub":"..." }`  (use `<span class='hl'>word</span>` to gold-highlight)
- `{ "type":"tip", "n":1, "kicker":"Screen-time scripts", "instead":"...", "tryLine":"..." }`
- `{ "type":"point", "n":2, "kicker":"...", "heading":"...", "body":"...", "bullets":["...","..."] }`
- `{ "type":"cta", "headline":"...", "sub":"...", "button":"Free chapter in bio →" }`

## Deploy (Dokploy, same pattern as ffmpeg-renderer)
1. Push this folder to a GitHub repo (e.g. `finwyse2107/social-renderer`).
2. In Dokploy → new **Application** (Dockerfile build) from that repo.
3. Env vars: `SHARED_SECRET=<random>` (and optionally `PORT=4000`).
4. Deploy. It joins the same Docker network as n8n, reachable at `http://<service-name>:4000`.
5. Test: `curl -XPOST http://<service>:4000/pin -H 'Authorization: Bearer <SECRET>' -H 'Content-Type: application/json' -d '{"title":"Test"}'`

## Notes
- Container needs outbound internet at render time (to fetch Google Fonts). If your host blocks
  egress, bake Poppins/Open Sans .ttf into the image and add an `@font-face` block in `templates.js`.
- Emoji render via `fonts-noto-color-emoji`.
- One shared headless Chromium is reused across requests.
