<template>
  <nav class="bg-primary text-white px-1 sm:px-28 py-4 px-2">
    <h1 class="font-bold">PWA generator</h1>
  </nav>

  <section class="px-2 sm:px-28">
    <form action="#" method="post">

      <label class="font-semibold" for="App name">Name</label>
      <input v-model="manifest.name"
        class="form_input"
        type="text" name="name" id="name">

      <label class=" font-semibold" for="shortname">Short name</label>
      <input v-model="manifest.short_name"
        class="form_input" type="text"
        name="shortname" id="shortname">

      <label class="font-semibold" for="description">Description</label>
      <input v-model="manifest.description"
        class="form_input" type="text"
        name="description" id="description">

      <label class="font-semibold" for="theme_color">Theme color</label>
      <input v-model="manifest.theme_color"
        class="form_input h-10" type="color"
        name="theme_color" id="theme_color">

      <label class="font-semibold" for="background_color">Background color</label>
      <input v-model="manifest.background_color"
        class="form_input h-10" type="color"
        name="background_color" id="background_color">

      <label class="font-semibold" for="display">Display</label>
      <select v-model="manifest.display"
        class="form_input" name="display"
        id="display">
        <option value="standalone">Standalone</option>
        <option value="browser">Browser</option>
      </select>

      <label class="font-semibold" for="display">Cache type</label>
      <select v-model="cacheStrategy"
        class="form_input" name="cacheType"
        id="display">
        <option value="cacheFirst">Cache first</option>
        <option value="networkFirst">Network first</option>
        <option value="staleWhileRevalidate">Stale while revalidate</option>
      </select>

    </form>
  </section>

  <section class="px-2 sm:px-28">
      <h3 class="text-lg font-semibold">Manifest</h3>
    <div class="overflow-x-scroll relative w-full border rounded-lg">
      <div class="absolute right-1 top-1">
        <button @click="copyToClipboard('manifest')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>

      <pre>
      <code  v-html="hljs.highlight(manifestString, {language: 'json'}).value"/>
      </pre>
    </div>
  </section>

  <section class="px-2 sm:px-28">
      <h3 class="text-lg font-semibold">Service Worker</h3>
    <div class="overflow-x-scroll relative w-full border rounded-lg">
      <div class="absolute right-1 top-1">
        <button @click="copyToClipboard('serviceWorker')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>

      <pre>
      <code v-html="hljs.highlight(serviceWorkerString,  { language: 'javascript' }).value"/>
      </pre>
    </div>
  </section>

  <div v-show="toast.show" class="transition ease-in-out duration-[10000] text-center font-semibold border rounded-xl fixed w-full bg-black text-white p-3 opacity-70 bottom-1">
    <h1>{{ toast.message }}</h1>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
// Using ES6 import syntax
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import 'highlight.js/styles/github.css'

hljs.registerLanguage('javascript', javascript)

hljs.registerLanguage('json', json)
const manifest = reactive({
  name: '',
  short_name: '',
  description: '',
  start_url: '/',
  background_color: '#000000',
  theme_color: '#000000',
  display: 'standalone',
  lang: 'en',
})
const cacheStrategy = ref('cacheFirst')
const serviceWorkerSkipWaiting = ref(true)
const toast = reactive({
  show: false,
  message: '',
})
const serviceWorkerString = ref('')
const manifestString = ref('')

// watchers
watch(cacheStrategy, () => {
  serviceWorkerString.value = generateServiceWorker()
})
watch(manifest, () => {
  manifestString.value
  = `{
        "name": "${manifest.name}",
        "short_name": "${manifest.short_name}",
        "description": "${manifest.description}",
        "start_url": "${manifest.start_url}",
        "background_color": "${manifest.background_color}",
        "theme_color": "${manifest.theme_color}",
        "display": "${manifest.display}",
     }`
})

function copyToClipboard(part = 'manifest') {
  let textToCopy = JSON.stringify(manifest, null, 2)
  toast.message = 'Manifest copied to clipboard'
  if (part !== 'manifest') {
    toast.message = 'Service worker copied to clipboard'
    textToCopy = serviceWorkerString.value
  }

  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      toast.show = true
      setTimeout(() => {
        toast.show = false
      }, 5000)
    })
}

// Function to generate Service Worker
function generateServiceWorker() {
  return `
    const CACHE_NAME = 'V1-CACHE';
    const FILES_TO_CACHE = ['/'];

    // Install event
    self.addEventListener('install', (event) => {
      event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
      )
    })

    // Fetch event
    self.addEventListener('fetch', (event) => {
      const url = new URL(event.request.url)

      // Define route-based strategies
      // This is temp as an example of route based strategy
      // The user should be able to configure this or we can start 
      // With sensible defaults
      const routes = {
        '/api': 'networkFirst',
        '.css': 'cacheFirst',
        '.js': 'staleWhileRevalidate',
      };

      let strategy = Object.keys(routes).find((route) => {
        if (route.startsWith('.')) {
          // Match by file extension
          return url.pathname.endsWith(route)
        }
        // Match by path
        return url.pathname.startsWith(route)
      });

      // Default to the selected option if no match
      strategy = routes[strategy] || '${cacheStrategy.value}'

      // Apply the selected strategy
      if (strategy === 'cacheFirst') {
        event.respondWith(
          caches.match(event.request).then((response) =>
            response || fetch(event.request)
          )
        );
      } else if (strategy === 'networkFirst') {
        event.respondWith(
          fetch(event.request)
            .then((response) => {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) =>
                cache.put(event.request, clone)
              );
              return response;
            })
            .catch(() => caches.match(event.request))
        );
      } else if (strategy === 'staleWhileRevalidate') {
        event.respondWith(
          caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request).then((response) => {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) =>
                cache.put(event.request, clone)
              );
              return response;
            });
            return cachedResponse || fetchPromise;
          })
        );
      }
    });

    // Activate event
    self.addEventListener('activate', (event) => {
      event.waitUntil(
        caches.keys().then((cacheNames) =>
          Promise.all(
            cacheNames.map((cacheName) => {
              if (cacheName !== CACHE_NAME) {
                return caches.delete(cacheName)
              }
            })
          )
        )
      );
    });

    ${serviceWorkerSkipWaiting.value ? 'self.skipWaiting();' : ''}
  `
}
onMounted(() => {
  serviceWorkerString.value = generateServiceWorker()
  manifestString.value
  = `{
        "name": "${manifest.name}",
        "short_name": "${manifest.short_name}",
        "description": "${manifest.description}",
        "start_url": "${manifest.start_url}",
        "background_color": "${manifest.background_color}",
        "theme_color": "${manifest.theme_color}",
        "display": "${manifest.display}",
     }`
})
</script>
