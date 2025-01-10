// eslint-disable-next-line no-undef
const CACHE_NAME = `cache-${process.env.BUILD_HASH}`
// Install event - Cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        cache.addAll([
          '/',
        ])
      }),
  )
})

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  const cacheAllowList = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then((allCaches) => {
      allCaches.forEach(async (cache) => {
        if (!cacheAllowList.includes(cache)) {
          await caches.delete(cache)
        }
      })
    }),
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
