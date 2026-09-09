// Minimal service worker for Eliza Cup.
//
// Deliberately does NOT cache index.html, admin.html, or any fetched data.
// Both HTML files change often, and Google Sheets/Apps Script responses
// already go through cachedFetch's own sessionStorage TTL (see index.html).
// A second cache layer here would risk silently serving a stale site or
// stale scores instead of just failing visibly online, which isn't a
// trade-off this project needs right now.
//
// This file exists only to satisfy Chrome/Android's install requirement,
// which needs a registered service worker with a fetch handler present.
// If real offline support is wanted later, this is the place to add a
// cache-first strategy for genuinely static assets (fonts, icons).

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Required for install eligibility — intentionally a no-op, so every
// request just falls through to the network as normal.
self.addEventListener('fetch', () => {});
