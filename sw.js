// 1. Instalimi i Service Worker
self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed');
  self.skipWaiting(); // E bën SW aktiv menjëherë pas përditësimit
});

// 2. Lejimi i punës Offline/Online
self.addEventListener('fetch', (e) => {
  // Kjo lejon aplikacionin të punojë duke marrë skedarët nga rrjeti
  e.respondWith(fetch(e.request).catch(() => {
    // Këtu mund të shtohet logjika e Cache nëse do ta përdorësh 100% offline
    return fetch(e.request);
  }));
});

// 3. Logjika e Njoftimeve (Rikujtesa 24-orëshe)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SCHEDULE_NOTIFICATION') {
    const delay = event.data.delay || 0;
    
    console.log(`Njoftimi u programua për pas ${delay / 1000} sekondave`);

    // Përdorim setTimeout për të simuluar vonesën
    // Shënim: Në Android, SW mund të qëndrojë aktiv në background
    setTimeout(() => {
      const options = {
        body: 'Ka kaluar 24 orë nga fitorja e fundit. Mos e lësho veten, bëj check-in! 🛡️',
        icon: 'https://cdn-icons-png.flaticon.com/512/2618/2618576.png', // Ikona jote serioze
        badge: 'https://cdn-icons-png.flaticon.com/512/2618/2618576.png',
        vibrate: [200, 100, 200],
        tag: 'daily-reminder', // Ky tag parandalon njoftimet e shumta të panevojshme
        renotify: true,
        data: {
          url: '/' // Hap faqen kryesore kur klikohet
        }
      };

      self.registration.showNotification('Misioni Freedom: Koha për Check-in!', options);
    }, delay);
  }
});

// 4. Hapja e aplikacionit kur klikohet njoftimi
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
