self.addEventListener("install", e => { self.skipWaiting(); });
self.addEventListener("activate", e => { self.clients.claim(); });
self.addEventListener("fetch", e => {
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).catch(() =>
      new Response("<h1>Offline</h1>", { headers: { "Content-Type": "text/html" } })
    ));
  }
});
