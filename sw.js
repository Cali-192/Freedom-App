self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed');
});

self.addEventListener('fetch', (e) => {
  // Kjo lejon aplikacionin të punojë online/offline
  e.respondWith(fetch(e.request));
});
