const C = "hanzi-v1";
self.addEventListener("install", e => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return;
  const fijo = u.pathname.includes("/a/") || u.pathname.endsWith("trazos.json") || u.pathname.endsWith(".png");
  e.respondWith(fijo
    ? caches.match(e.request).then(r => r || fetch(e.request).then(res => { const c = res.clone(); caches.open(C).then(x => x.put(e.request, c)); return res; }))
    : fetch(e.request).then(res => { const c = res.clone(); caches.open(C).then(x => x.put(e.request, c)); return res; }).catch(() => caches.match(e.request)));
});
