const CACHE_NAME = 'wordquest-v3'
const APP_SHELL = ['./', './manifest.webmanifest', './icons/icon.svg']

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)))
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key.startsWith('wordquest-') && key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', event => {
  const request = event.request
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return

  // Sempre busca o HTML mais recente no servidor; usa o cache apenas se estiver offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request, { cache: 'no-store' })
        .then(response => {
          if (response.ok) {
            const copy = response.clone()
            caches.open(CACHE_NAME).then(cache => cache.put('./', copy))
          }
          return response
        })
        .catch(() => caches.match(request).then(cached => cached || caches.match('./')))
    )
    return
  }

  // Os arquivos gerados pelo Vite têm nomes com hash; podem ser armazenados em cache.
  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(response => {
      if (response.ok) {
        const copy = response.clone()
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy))
      }
      return response
    }).catch(() => caches.match('./')))
  )
})
