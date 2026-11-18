// Service worker of the visitor assistant demo (scope: /demo-ai-agent/).
// Caches the app shell and the public fair data so the hall plan and the notebook work offline.
// Never touches the admin area, the chat API or any non-GET request.
const V = "da-v2";
const SCOPE = "/demo-ai-agent/";
const SHELL = [SCOPE, SCOPE + "nb.js", SCOPE + "cal.js", SCOPE + "icons/icon-192.png", SCOPE + "icons/icon-512.png"];
const DATA = ["da-meta", "da-list", "da-plan", "da-manifest"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(V).then((c) => c.addAll(SHELL)).catch(() => {}).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

async function networkFirst(req, fallbackKey) {
  const c = await caches.open(V);
  try {
    const r = await fetch(req);
    if (r && r.ok) c.put(fallbackKey || req, r.clone()).catch(() => {});
    return r;
  } catch (err) {
    const hit = await c.match(fallbackKey || req, { ignoreSearch: !!fallbackKey });
    if (hit) return hit;
    throw err;
  }
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const u = new URL(req.url);
  if (u.origin !== self.location.origin) return;
  const p = u.pathname;
  if (p.startsWith(SCOPE + "admin")) return;                       // admin: always straight to the network
  if (p.includes("/.netlify/functions/")) {
    if (DATA.some((n) => p.endsWith("/" + n))) e.respondWith(networkFirst(req));
    return;                                                          // da-chat, da-admin, ...: network only
  }
  if (req.mode === "navigate" && (p === SCOPE || p === SCOPE + "index.html")) {
    e.respondWith(networkFirst(req, SCOPE));                         // one cached shell for every ?fair=
    return;
  }
  if (p === SCOPE + "nb.js" || p === SCOPE + "cal.js") { e.respondWith(networkFirst(req)); return; }
  if (p.startsWith(SCOPE + "icons/")) {
    e.respondWith(caches.match(req).then((h) => h || fetch(req)));
  }
});
