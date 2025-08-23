<template>
  <nav class="bg-primary text-white px-1 sm:px-28 py-4 px-2">
    <h1 class="font-bold">PWA generator</h1>
  </nav>

  <section class="px-2 sm:px-28">
    <StepsComponent>
      <template v-slot:step1>
        <form action="#" method="post">
          <label class="font-semibold" for="appName">Name</label>
          <input
            v-model="manifest.name"
            class="form_input"
            autocomplete="off"
            type="text"
            name="name"
            id="appName"
          />

          <label class="font-semibold" for="shortName">Short name</label>
          <input
            v-model="manifest.short_name"
            class="form_input"
            type="text"
            name="shortname"
            id="shortName"
          />

          <label class="font-semibold" for="description">Description</label>
          <input
            v-model="manifest.description"
            class="form_input"
            type="text"
            name="description"
            id="description"
          />

          <label class="font-semibold" for="theme_color">Theme color</label>
          <input
            v-model="manifest.theme_color"
            class="form_input h-10"
            type="color"
            name="theme_color"
            id="theme_color"
          />

          <label class="font-semibold" for="background_color"
            >Background color</label
          >
          <input
            v-model="manifest.background_color"
            class="form_input h-10"
            type="color"
            name="background_color"
            id="background_color"
          />
        </form>
      </template>

      <template v-slot:step2>
        <div>
          <h3 class="text-lg font-semibold mb-4">Logo Upload</h3>

          <div class="mb-4">
            <label class="font-semibold block mb-2" for="logoUpload">Upload Logo</label>
            <input
              @change="handleLogoUpload"
              class="form_input"
              type="file"
              name="logoUpload"
              id="logoUpload"
              accept="image/*"
            />
            <p class="text-sm text-gray-600 mt-1">Upload a square image (recommended: 512x512px or larger)</p>
          </div>

          <div v-if="uploadedLogo" class="mb-4">
            <h4 class="font-semibold mb-2">Preview:</h4>
            <img :src="uploadedLogo" alt="Logo preview" class="w-32 h-32 object-cover border rounded-lg" />
            <p class="text-sm text-gray-600 mt-2">✓ Logo uploaded successfully. Icons will be generated in the final step.</p>
          </div>
        </div>
      </template>      <template v-slot:step3>
        <div>
          <label class="font-semibold" for="display">Display</label>
          <select
            v-model="manifest.display"
            class="form_input"
            name="display"
            id="display"
          >
            <option value="standalone">Standalone</option>
            <option value="browser">Browser</option>
          </select>

          <label class="font-semibold" for="cacheType">Cache type</label>
          <select
            v-model="cacheStrategy"
            class="form_input"
            name="cacheType"
            id="cacheType"
          >
            <option value="cacheFirst">Cache first</option>
            <option value="networkFirst">Network first</option>
            <option value="staleWhileRevalidate">Stale while revalidate</option>
          </select>
        </div>
      </template>

      <template v-slot:step4>
        <div>
          <h3 class="text-lg font-semibold mb-4">Generate Icons & Code</h3>

          <!-- Icon Generation Section -->
          <div v-if="uploadedLogo" class="mb-6">
            <div class="flex items-center justify-between mb-4">
              <h4 class="font-semibold">PWA Icons</h4>
              <button
                @click="processLogoToIcons"
                :disabled="isProcessing"
                class="bg-primary text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isProcessing" class="flex items-center">
                  <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </span>
                <span v-else>{{ processedIcons.length > 0 ? 'Regenerate Icons' : 'Generate Icons' }}</span>
              </button>
            </div>

            <div v-if="processedIcons.length > 0" class="mb-6">
              <p class="text-sm text-green-600 mb-3">✓ Successfully generated {{ processedIcons.length }} icon sizes</p>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                <div v-for="icon in processedIcons" :key="icon.size" class="text-center">
                  <img :src="icon.dataUrl" :alt="`Icon ${icon.size}x${icon.size}`" class="w-16 h-16 mx-auto border rounded" />
                  <p class="text-xs mt-1">{{icon.size}}x{{icon.size}}</p>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p class="text-yellow-800">⚠️ No logo uploaded. Default icons will be used in the manifest.</p>
          </div>

          <!-- Download Section -->
          <section class="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg">
            <h3 class="text-lg font-semibold mb-4 text-primary">Download PWA Files</h3>
            <p class="text-sm text-gray-600 mb-4">
              Download a complete zip file containing all PWA files including manifest.json, service worker, and icons.
            </p>
            <button
              @click="downloadPWAFiles"
              :disabled="isDownloading"
              class="bg-primary text-white px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 w-full justify-center font-semibold hover:bg-primary/90 transition-colors"
            >
              <span v-if="isDownloading" class="flex items-center">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Preparing Download...
              </span>
              <span v-else class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PWA Files (.zip)
              </span>
            </button>
          </section>
        </div>
      </template>
    </StepsComponent>
  </section>

  <div
    v-show="toast.show"
    class="transition ease-in-out duration-10000 text-center font-semibold border rounded-xl fixed w-full bg-black text-white p-3 opacity-70 bottom-1"
  >
    <h1>{{ toast.message }}</h1>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
import StepsComponent from './components/StepsComponent.vue'
import { resize_image } from '../pkg/wasm_image_processor.js'
import JSZip from 'jszip'

const manifest = reactive({
	id: '/?source=pwa',
	start_url: '/?source=pwa',
	name: 'My App',
	short_name: 'MyApp',
	icons: [],
	shortcuts: [],
	description: 'My awesome PWA app',
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

// Logo processing variables
const uploadedLogo = ref('')
const uploadedLogoFile = ref(null)
const isProcessing = ref(false)
const processedIcons = ref([])
const isDownloading = ref(false)

// PWA icon sizes needed
const iconSizes = [48, 72, 96, 128, 144, 152, 192, 256, 384, 512]

// watchers
watch(cacheStrategy, () => {
	serviceWorkerString.value = generateServiceWorker()
})
watch(manifest, () => generateManifest())

const generateManifest = () => {
	let iconsSection = ''

	if (manifest.icons && manifest.icons.length > 0) {
		iconsSection = JSON.stringify(manifest.icons, null, 4).replace(/^/gm, '\t\t\t')
	}
	else {
		iconsSection = `[
				{
					"src": "/images/icons-vector.svg",
					"type": "image/svg+xml",
					"sizes": "512x512"
				},
				{
					"src": "/images/icons-192.png",
					"type": "image/png",
					"sizes": "192x192"
				},
				{
					"src": "/images/icons-512.png",
					"type": "image/png",
					"sizes": "512x512"
				}
			]`
	}

	manifestString.value = `
	{
		"name": "${manifest.name}",
		"short_name": "${manifest.short_name}",
			"icons": ${iconsSection},
		"id": "${manifest.id}",
		"start_url": "${manifest.start_url}",
		"background_color": "${manifest.background_color}",
		"display": "standalone",
		"scope": "${manifest.start_url}",
		"theme_color": "${manifest.theme_color}",
		"shortcuts": [],
		"description": "${manifest.description}",
		"screenshots": [
			{
				"src": "/images/screenshot1.png",
				"type": "image/png",
				"sizes": "540x720",
				"form_factor": "narrow"
			},
			{
				"src": "/images/screenshot2.jpg",
				"type": "image/jpg",
				"sizes": "720x540",
				"form_factor": "wide"
			}
		]
	}`
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
// Function to handle logo upload
const handleLogoUpload = async (event) => {
	const file = event.target.files[0]
	if (!file) return

	// Store the file for later processing
	uploadedLogoFile.value = file

	// Create preview
	const reader = new FileReader()
	reader.onload = (e) => {
		uploadedLogo.value = e.target.result
	}
	reader.readAsDataURL(file)
}

// Function to convert file to Uint8Array
const fileToUint8Array = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = () => {
			const arrayBuffer = reader.result
			const uint8Array = new Uint8Array(arrayBuffer)
			resolve(uint8Array)
		}
		reader.onerror = reject
		reader.readAsArrayBuffer(file)
	})
}

// Function to process logo into different icon sizes
const processLogoToIcons = async () => {
	if (!uploadedLogoFile.value) {
		toast.message = 'Please upload a logo first'
		toast.show = true
		setTimeout(() => {
			toast.show = false
		}, 5000)
		return
	}

	isProcessing.value = true
	processedIcons.value = []

	try {
		const imageData = await fileToUint8Array(uploadedLogoFile.value)

		for (const size of iconSizes) {
			try {
				const resizedData = resize_image(imageData, size)

				// Convert Uint8Array back to blob and create data URL
				const blob = new Blob([resizedData], { type: 'image/png' })
				const dataUrl = await new Promise((resolve) => {
					const reader = new FileReader()
					reader.onload = () => resolve(reader.result)
					reader.readAsDataURL(blob)
				})

				processedIcons.value.push({
					size,
					dataUrl,
					blob,
				})
			}
			catch (error) {
				console.error(`Failed to resize image to ${size}x${size}:`, error)
			}
		}

		// Update manifest icons
		updateManifestIcons()

		toast.message = `Successfully generated ${processedIcons.value.length} icon sizes`
		toast.show = true
		setTimeout(() => {
			toast.show = false
		}, 5000)
	}
	catch (error) {
		console.error('Error processing logo:', error)
		toast.message = 'Error processing logo'
		toast.show = true
		setTimeout(() => {
			toast.show = false
		}, 5000)
	}
	finally {
		isProcessing.value = false
	}
}// Function to update manifest icons based on processed icons
const updateManifestIcons = () => {
	if (processedIcons.value.length > 0) {
		manifest.icons = processedIcons.value.map(icon => ({
			src: `/icons/icon-${icon.size}x${icon.size}.png`,
			type: 'image/png',
			sizes: `${icon.size}x${icon.size}`,
		}))
		generateManifest()
	}
}

// Function to download PWA files as zip
const downloadPWAFiles = async () => {
	isDownloading.value = true
	try {
		const zip = new JSZip()

		// Add manifest.json
		zip.file('manifest.json', JSON.stringify(JSON.parse(manifestString.value), null, 2))

		// Add service worker
		zip.file('service-worker.js', serviceWorkerString.value)

		// Create icons folder and add icons
		const iconsFolder = zip.folder('icons')
		if (processedIcons.value.length > 0) {
			for (const icon of processedIcons.value) {
				// Convert blob to array buffer
				const arrayBuffer = await icon.blob.arrayBuffer()
				iconsFolder.file(`icon-${icon.size}x${icon.size}.png`, arrayBuffer)
			}
		}

		// Add README with instructions
		const readmeContent = `# PWA Files

This package contains the following files for your Progressive Web App:

## Files Included:
- \`manifest.json\` - PWA manifest file
- \`service-worker.js\` - Service worker for offline functionality
- \`icons/\` - App icons in various sizes

## Installation Instructions:

1. **Add manifest to your HTML:**
   Add this line to the \`<head>\` section of your HTML file:
   \`\`\`html
   <link rel="manifest" href="/manifest.json">
   \`\`\`

2. **Register the service worker:**
   Add this script to your HTML file or main JavaScript file:
   \`\`\`javascript
   if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register('/service-worker.js')
       .then(registration => console.log('SW registered:', registration))
       .catch(error => console.log('SW registration failed:', error));
   }
   \`\`\`

3. **Add icons to your project:**
   Place the icons folder in your public/static directory

4. **Add meta tags (optional but recommended):**
   \`\`\`html
   <meta name="theme-color" content="${manifest.theme_color}">
   <meta name="apple-mobile-web-app-capable" content="yes">
   <meta name="apple-mobile-web-app-status-bar-style" content="default">
   <meta name="apple-mobile-web-app-title" content="${manifest.short_name}">
   \`\`\`

## App Configuration:
- **Name:** ${manifest.name}
- **Short Name:** ${manifest.short_name}
- **Description:** ${manifest.description}
- **Theme Color:** ${manifest.theme_color}
- **Background Color:** ${manifest.background_color}
- **Cache Strategy:** ${cacheStrategy.value}

Generated by PWA Generator (https://github.com/opensource254/pwa-generator)
`
		zip.file('README.md', readmeContent)

		// Generate and download the zip file
		const content = await zip.generateAsync({ type: 'blob' })
		const url = window.URL.createObjectURL(content)
		const link = document.createElement('a')
		link.href = url
		link.download = `${manifest.short_name.replace(/\s+/g, '-').toLowerCase()}-pwa-files.zip`
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
		window.URL.revokeObjectURL(url)

		toast.message = 'PWA files downloaded successfully!'
		toast.show = true
		setTimeout(() => {
			toast.show = false
		}, 5000)
	}
	catch (error) {
		console.error('Error creating zip file:', error)
		toast.message = 'Error downloading PWA files'
		toast.show = true
		setTimeout(() => {
			toast.show = false
		}, 5000)
	}
	finally {
		isDownloading.value = false
	}
}

onMounted(() => {
	serviceWorkerString.value = generateServiceWorker()
	generateManifest()
})
</script>
