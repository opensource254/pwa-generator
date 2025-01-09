// const CACHE_NAME = `pwa-cache-${process.env.BUILD_HASH}`
// Install event - Cache static assets
self.addEventListener('install', () => {
  self.skipWaiting()
  console.log('The install event will be here')
})

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.clients.claim(),
  )
})

// Fetch event - Serve cached files or fetch from the network
self.addEventListener('fetch', (event) => {
  console.log('Handling fetch')
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    }),
  )
})
