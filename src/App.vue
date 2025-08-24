<template>
	<div class="min-h-screen bg-gray-50">
		<nav class="bg-primary text-white shadow-lg">
			<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
				<div class="flex items-center justify-between">
					<h1 class="text-xl font-bold">PWA Generator</h1>
					<div class="text-sm opacity-90">
						Create Progressive Web Apps easily
					</div>
				</div>
			</div>
		</nav>

		<main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div class="mb-8 text-center">
				<h2 class="text-3xl font-bold text-gray-900 mb-2">
					Generate Your Progressive Web App
				</h2>
				<p class="text-lg text-gray-600 max-w-2xl mx-auto">
					Create a complete PWA with manifest, service worker, and optimized icons in just a few steps.
				</p>
			</div>

			<StepsComponent>
				<template v-slot:step1>
					<form @submit.prevent class="space-y-6">
						<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label class="block text-sm font-semibold text-gray-700 mb-2" for="appName">
									App Name *
								</label>
								<input
									v-model="manifest.name"
									class="form_input"
									autocomplete="off"
									type="text"
									name="name"
									id="appName"
									placeholder="My Awesome App"
									required
								/>
								<p class="text-xs text-gray-500 mt-1">The full name of your app as it will appear to users</p>
							</div>

							<div>
								<label class="block text-sm font-semibold text-gray-700 mb-2" for="shortName">
									Short Name *
								</label>
								<input
									v-model="manifest.short_name"
									class="form_input"
									type="text"
									name="shortname"
									id="shortName"
									placeholder="MyApp"
									maxlength="12"
									required
								/>
								<p class="text-xs text-gray-500 mt-1">Short name for home screen (max 12 characters)</p>
							</div>
						</div>

						<div>
							<label class="block text-sm font-semibold text-gray-700 mb-2" for="description">
								Description *
							</label>
							<textarea
								v-model="manifest.description"
								class="form_input resize-none"
								name="description"
								id="description"
								rows="3"
								placeholder="A brief description of what your app does..."
								required
							></textarea>
							<p class="text-xs text-gray-500 mt-1">Describe your app's purpose and features</p>
						</div>

						<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label class="block text-sm font-semibold text-gray-700 mb-2" for="theme_color">
									Theme Color
								</label>
								<div class="flex items-center space-x-3">
									<input
										v-model="manifest.theme_color"
										class="form_input w-16 h-12 p-1"
										type="color"
										name="theme_color"
										id="theme_color"
									/>
									<input
										v-model="manifest.theme_color"
										class="form_input flex-1"
										type="text"
										placeholder="#69dc9e"
									/>
								</div>
								<p class="text-xs text-gray-500 mt-1">Color for browser UI elements</p>
							</div>

							<div>
								<label class="block text-sm font-semibold text-gray-700 mb-2" for="background_color">
									Background Color
								</label>
								<div class="flex items-center space-x-3">
									<input
										v-model="manifest.background_color"
										class="form_input w-16 h-12 p-1"
										type="color"
										name="background_color"
										id="background_color"
									/>
									<input
										v-model="manifest.background_color"
										class="form_input flex-1"
										type="text"
										placeholder="#000000"
									/>
								</div>
								<p class="text-xs text-gray-500 mt-1">Splash screen background color</p>
							</div>
						</div>

						<!-- Validation Summary -->
						<div v-if="step1Errors.length > 0" class="bg-red-50 border border-red-200 rounded-lg p-4">
							<div class="flex">
								<svg class="w-5 h-5 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
								</svg>
								<div class="ml-3">
									<h3 class="text-sm font-medium text-red-800">Please fix the following errors:</h3>
									<ul class="mt-2 text-sm text-red-700 list-disc list-inside">
										<li v-for="error in step1Errors" :key="error">{{ error }}</li>
									</ul>
								</div>
							</div>
						</div>
					</form>
				</template>

				<template v-slot:step2>
					<div class="space-y-6">
						<div class="text-center">
							<svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
							<h3 class="text-lg font-semibold text-gray-900 mb-2">Upload Your App Logo</h3>
							<p class="text-gray-600 mb-6">Upload a square image that will be used to generate all required PWA icons</p>
						</div>

						<div class="max-w-md mx-auto">
							<div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
								<input
									@change="handleLogoUpload"
									class="hidden"
									type="file"
									name="logoUpload"
									id="logoUpload"
									accept="image/*"
									ref="fileInput"
								/>
								<label for="logoUpload" class="cursor-pointer">
									<div v-if="!uploadedLogo">
										<svg class="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
										</svg>
										<div class="text-lg font-medium text-gray-900 mb-2">Click to upload logo</div>
										<p class="text-sm text-gray-500">PNG, JPG, SVG up to 10MB</p>
									</div>
									<div v-else class="space-y-4">
										<img :src="uploadedLogo" alt="Logo preview" class="w-32 h-32 mx-auto object-cover border rounded-lg shadow-sm" />
										<div>
											<p class="text-sm font-medium text-green-600 mb-1">✓ Logo uploaded successfully</p>
											<p class="text-xs text-gray-500">Click to change logo</p>
										</div>
									</div>
								</label>
							</div>

							<div class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
								<div class="flex">
									<svg class="w-5 h-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
									</svg>
									<div class="ml-3">
										<h4 class="text-sm font-medium text-blue-800">Logo Requirements</h4>
										<ul class="mt-2 text-sm text-blue-700 list-disc list-inside space-y-1">
											<li>Recommended size: 512x512px or larger</li>
											<li>Square aspect ratio for best results</li>
											<li>PNG format preferred for transparency</li>
											<li>Simple, clear design works best at small sizes</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</template>
        <template v-slot:step3>
					<div class="space-y-6">
						<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label class="block text-sm font-semibold text-gray-700 mb-2" for="display">
									Display Mode
								</label>
								<select
									v-model="manifest.display"
									class="form_input"
									name="display"
									id="display"
								>
									<option value="standalone">Standalone - App-like experience</option>
									<option value="browser">Browser - Traditional web page</option>
									<option value="fullscreen">Fullscreen - Full device screen</option>
									<option value="minimal-ui">Minimal UI - Basic browser controls</option>
								</select>
								<p class="text-xs text-gray-500 mt-1">How your app appears when launched</p>
							</div>

							<div>
								<label class="block text-sm font-semibold text-gray-700 mb-2" for="cacheType">
									Cache Strategy
								</label>
								<select
									v-model="cacheStrategy"
									class="form_input"
									name="cacheType"
									id="cacheType"
								>
									<option value="cacheFirst">Cache First - Fastest, best for static content</option>
									<option value="networkFirst">Network First - Always fresh, fallback to cache</option>
									<option value="staleWhileRevalidate">Stale While Revalidate - Fast + fresh</option>
								</select>
								<p class="text-xs text-gray-500 mt-1">How your app handles offline content</p>
							</div>
						</div>

						<!-- Cache Strategy Explanation -->
						<div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
							<h4 class="text-sm font-medium text-gray-900 mb-2">
								Cache Strategy: {{ cacheStrategyNames[cacheStrategy] }}
							</h4>
							<p class="text-sm text-gray-600">
								{{ cacheStrategyDescriptions[cacheStrategy] }}
							</p>
						</div>

						<!-- Additional PWA Settings -->
						<div class="space-y-4">
							<h4 class="text-lg font-semibold text-gray-900">Additional Settings</h4>
							<div class="space-y-3">
								<label class="flex items-center">
									<input
										v-model="serviceWorkerSkipWaiting"
										type="checkbox"
										class="rounded border-gray-300 text-primary focus:border-primary focus:ring-primary"
									/>
									<span class="ml-2 text-sm text-gray-700">
										Enable automatic updates (skip waiting)
									</span>
								</label>
								<p class="text-xs text-gray-500 ml-6">
									Automatically update the service worker without user intervention
								</p>
							</div>
						</div>
					</div>
				</template>

				<template v-slot:step4>
					<div class="space-y-8">
						<!-- Icon Generation Section -->
						<div v-if="uploadedLogo" class="bg-white border border-gray-200 rounded-lg p-6">
							<div class="flex items-center justify-between mb-6">
								<div>
									<h3 class="text-lg font-semibold text-gray-900">PWA Icons</h3>
									<p class="text-sm text-gray-600">Generate all required icon sizes from your logo</p>
								</div>
								<button
									@click="processLogoToIcons"
									:disabled="isProcessing"
									class="bg-primary text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors flex items-center space-x-2"
								>
									<span v-if="isProcessing" class="flex items-center">
										<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
										Processing...
									</span>
									<span v-else class="flex items-center">
										<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
										</svg>
										{{ processedIcons.length > 0 ? 'Regenerate Icons' : 'Generate Icons' }}
									</span>
								</button>
							</div>

							<div v-if="processedIcons.length > 0" class="space-y-4">
								<div class="flex items-center text-green-600 text-sm">
									<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
									</svg>
									Successfully generated {{ processedIcons.length }} icon sizes
								</div>
								<div class="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
									<div v-for="icon in processedIcons" :key="icon.size" class="text-center">
										<img :src="icon.dataUrl" :alt="`Icon ${icon.size}x${icon.size}`" class="w-12 h-12 mx-auto border rounded shadow-sm" />
										<p class="text-xs text-gray-600 mt-1">{{icon.size}}px</p>
									</div>
								</div>
							</div>
						</div>

						<div v-else class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
							<div class="flex">
								<svg class="w-5 h-5 text-yellow-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
								</svg>
								<div class="ml-3">
									<h3 class="text-sm font-medium text-yellow-800">No logo uploaded</h3>
									<p class="text-sm text-yellow-700 mt-1">Default placeholder icons will be included in the manifest. Go back to step 2 to upload a custom logo.</p>
								</div>
							</div>
						</div>

						<!-- Download Section -->
						<div class="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6">
							<div class="text-center mb-6">
								<svg class="w-16 h-16 mx-auto mb-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
								</svg>
								<h3 class="text-xl font-semibold text-primary mb-2">Ready to Download</h3>
								<p class="text-gray-600 max-w-lg mx-auto">
									Your PWA files are ready! Download a complete package with manifest.json, service worker, icons, and installation instructions.
								</p>
							</div>

							<div class="max-w-md mx-auto">
								<button
									@click="downloadPWAFiles"
									:disabled="isDownloading"
									class="w-full bg-primary text-white px-6 py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center space-x-3 text-lg"
								>
									<span v-if="isDownloading" class="flex items-center">
										<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
										Preparing Download...
									</span>
									<span v-else class="flex items-center">
										<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
										</svg>
										Download PWA Package
									</span>
								</button>

								<div class="mt-4 text-sm text-gray-600 text-center">
									<p>Includes: manifest.json, service-worker.js, icons, and setup guide</p>
								</div>
							</div>
						</div>

						<!-- Preview Section -->
						<div class="bg-white border border-gray-200 rounded-lg p-6">
							<h3 class="text-lg font-semibold text-gray-900 mb-4">PWA Preview</h3>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<h4 class="text-sm font-medium text-gray-700 mb-2">App Information</h4>
									<div class="space-y-2 text-sm">
										<div class="flex justify-between">
											<span class="text-gray-600">Name:</span>
											<span class="font-medium">{{ manifest.name || 'Not set' }}</span>
										</div>
										<div class="flex justify-between">
											<span class="text-gray-600">Short Name:</span>
											<span class="font-medium">{{ manifest.short_name || 'Not set' }}</span>
										</div>
										<div class="flex justify-between">
											<span class="text-gray-600">Display:</span>
											<span class="font-medium">{{ manifest.display }}</span>
										</div>
										<div class="flex justify-between">
											<span class="text-gray-600">Cache Strategy:</span>
											<span class="font-medium">{{ cacheStrategyNames[cacheStrategy] }}</span>
										</div>
									</div>
								</div>
								<div>
									<h4 class="text-sm font-medium text-gray-700 mb-2">Colors</h4>
									<div class="space-y-2">
										<div class="flex items-center justify-between">
											<span class="text-sm text-gray-600">Theme:</span>
											<div class="flex items-center space-x-2">
												<div class="w-4 h-4 rounded border" :style="{ backgroundColor: manifest.theme_color }"></div>
												<span class="text-sm font-mono">{{ manifest.theme_color }}</span>
											</div>
										</div>
										<div class="flex items-center justify-between">
											<span class="text-sm text-gray-600">Background:</span>
											<div class="flex items-center space-x-2">
												<div class="w-4 h-4 rounded border" :style="{ backgroundColor: manifest.background_color }"></div>
												<span class="text-sm font-mono">{{ manifest.background_color }}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</template>
			</StepsComponent>
		</main>

		<!-- Toast Notification -->
		<div
			v-show="toast.show"
			class="fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 z-50"
			:class="toast.show ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'"
		>
			<div class="flex items-center space-x-2">
				<svg v-if="toast.type === 'success'" class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
				</svg>
				<svg v-else-if="toast.type === 'error'" class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
				</svg>
				<span>{{ toast.message }}</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { reactive, ref, onMounted, watch, computed } from 'vue'
import StepsComponent from './components/StepsComponent.vue'
import { resize_square } from 'wasm-image-processor'
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
	theme_color: '#69dc9e',
	display: 'standalone',
	lang: 'en',
})

const cacheStrategy = ref('cacheFirst')
const serviceWorkerSkipWaiting = ref(true)
const toast = reactive({
	show: false,
	message: '',
	type: 'success', // 'success' | 'error' | 'info'
})
const serviceWorkerString = ref('')
const manifestString = ref('')

const uploadedLogo = ref('')
const uploadedLogoFile = ref(null)
const isProcessing = ref(false)
const processedIcons = ref([])
const isDownloading = ref(false)
const fileInput = ref(null)

const iconSizes = [48, 72, 96, 128, 144, 152, 192, 256, 384, 512]

const cacheStrategyNames = {
	cacheFirst: 'Cache First',
	networkFirst: 'Network First',
	staleWhileRevalidate: 'Stale While Revalidate',
}

const cacheStrategyDescriptions = {
	cacheFirst: 'Serves content from cache first, then falls back to network. Best for static assets like images and CSS.',
	networkFirst: 'Tries network first, falls back to cache if offline. Best for dynamic content that should always be fresh.',
	staleWhileRevalidate: 'Serves from cache immediately, then updates cache in background. Best balance of speed and freshness.',
}

const step1Errors = computed(() => {
	const errors = []
	if (!manifest.name.trim()) errors.push('App name is required')
	if (!manifest.short_name.trim()) errors.push('Short name is required')
	if (manifest.short_name.length > 12) errors.push('Short name must be 12 characters or less')
	if (!manifest.description.trim()) errors.push('Description is required')
	return errors
})

const showToast = (message, type = 'success') => {
	toast.message = message
	toast.type = type
	toast.show = true
	setTimeout(() => {
		toast.show = false
	}, 5000)
}
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
const handleLogoUpload = async (event) => {
	const file = event.target.files[0]
	if (!file) return

	uploadedLogoFile.value = file

	const reader = new FileReader()
	reader.onload = (e) => {
		uploadedLogo.value = e.target.result
	}
	reader.readAsDataURL(file)
}

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

const processLogoToIcons = async () => {
	if (!uploadedLogoFile.value) {
		showToast('Please upload a logo first', 'error')
		return
	}

	isProcessing.value = true
	processedIcons.value = []

	try {
		const imageData = await fileToUint8Array(uploadedLogoFile.value)

		for (const size of iconSizes) {
			try {
				const resizedData = resize_square(imageData, size)

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

		updateManifestIcons()

		showToast(`Successfully generated ${processedIcons.value.length} icon sizes`)
	}
	catch (error) {
		console.error('Error processing logo:', error)
		showToast('Error processing logo', 'error')
	}
	finally {
		isProcessing.value = false
	}
}

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

const downloadPWAFiles = async () => {
	isDownloading.value = true
	try {
		const zip = new JSZip()

		zip.file('manifest.json', JSON.stringify(JSON.parse(manifestString.value), null, 2))

		zip.file('sw.js', serviceWorkerString.value)

		const iconsFolder = zip.folder('icons')
		if (processedIcons.value.length > 0) {
			for (const icon of processedIcons.value) {
				const arrayBuffer = await icon.blob.arrayBuffer()
				iconsFolder.file(`icon-${icon.size}x${icon.size}.png`, arrayBuffer)
			}
		}

		const readmeContent = `# PWA Files

This package contains the following files for your Progressive Web App:

## Files Included:
- \`manifest.json\` - PWA manifest file
- \`sw.js\` - Service worker for offline functionality
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
     navigator.serviceWorker.register('/sw.js')
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

		const content = await zip.generateAsync({ type: 'blob' })
		const url = window.URL.createObjectURL(content)
		const link = document.createElement('a')
		link.href = url
		link.download = `${manifest.short_name.replace(/\s+/g, '-').toLowerCase()}-pwa-files.zip`
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
		window.URL.revokeObjectURL(url)

		showToast('PWA files downloaded successfully!')
	}
	catch (error) {
		console.error('Error creating zip file:', error)
		showToast('Error downloading PWA files', 'error')
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
