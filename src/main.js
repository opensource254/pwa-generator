import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

/**
 * Register the service worker
 * */
if (import.meta.env.MODE !== 'development' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js').then((reg) => {
        console.log(`Service Worker registered for ${reg.scope}`)
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error)
      })
  })
}

createApp(App).mount('#app')
