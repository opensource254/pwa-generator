<template>
	<div class="min-h-screen">
		<header class="w-full border-b border-line bg-surface sticky top-0 inset-x-0 z-30">
			<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
				<div class="flex items-center gap-3 min-w-0">
					<div class="w-9 h-9 rounded-xl bg-ink text-primary-bright flex items-center justify-center shrink-0">
						<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<rect x="4" y="3" width="16" height="18" rx="3" stroke="currentColor" stroke-width="1.8" />
							<circle cx="12" cy="17" r="1" fill="currentColor" />
						</svg>
					</div>
					<div class="min-w-0">
						<p class="font-display font-bold text-ink leading-tight">PWA Generator</p>
						<p class="text-xs text-ink-muted truncate">Manifest, icons, and a service worker</p>
					</div>
				</div>
				<a
					href="https://github.com/opensource254/pwa-generator"
					target="_blank"
					rel="noopener noreferrer"
					class="text-sm font-medium text-ink-muted hover:text-ink inline-flex items-center gap-2 rounded-lg px-2 py-1 transition-colors"
				>
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
						<path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
					</svg>
					<span class="hidden sm:inline">GitHub</span>
				</a>
			</div>
		</header>

		<main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 pb-28 lg:pb-12">
			<div class="mb-8 lg:mb-10 max-w-2xl min-w-0">
				<p class="text-[11px] sm:text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-3">
					From a name to an installable app
				</p>
				<h1 class="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-ink mb-3 text-balance">
					Build a PWA package in one sitting
				</h1>
				<p class="text-ink-muted text-base leading-relaxed text-pretty">
					Type your app name. We fill the rest with defaults that work — then you can tweak colors, the icon, and how it launches.
				</p>
			</div>

			<div class="lg:hidden mb-6 bg-surface border border-line rounded-2xl p-4">
				<p class="text-xs font-semibold text-ink-muted mb-3">Live preview</p>
				<DevicePreview
					compact
					:name="manifest.name"
					:short-name="manifest.short_name"
					:theme-color="manifest.theme_color"
					:background-color="manifest.background_color"
					:icon-url="previewIcon"
					:display="manifest.display"
					:letter="previewLetter"
				/>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 lg:gap-12 items-start">
				<div class="space-y-6">
					<section class="bg-surface border border-line rounded-2xl p-5 sm:p-7 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset]">
						<div class="flex items-baseline justify-between gap-3 mb-5">
							<h2 class="font-display text-xl font-bold">App identity</h2>
							<span class="text-xs text-ink-muted">Required</span>
						</div>

						<div class="space-y-5">
							<div>
								<label class="block text-sm font-semibold text-ink mb-1.5" for="appName">
									App name
								</label>
								<input
									v-model="manifest.name"
									class="form_input text-lg"
									autocomplete="off"
									type="text"
									id="appName"
									placeholder="Coffee Timer"
								/>
								<p class="text-xs text-ink-muted mt-1.5">Shown in install prompts and the app switcher.</p>
							</div>

							<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
								<div>
									<div class="flex items-center justify-between mb-1.5">
										<label class="text-sm font-semibold text-ink" for="shortName">Short name</label>
										<span
											class="text-[11px] font-medium"
											:class="manifest.short_name.length > 12 ? 'text-red-600' : 'text-ink-muted'"
										>
											{{ manifest.short_name.length }}/12
										</span>
									</div>
									<input
										:value="manifest.short_name"
										@input="onShortNameInput"
										class="form_input"
										type="text"
										id="shortName"
										placeholder="Coffee"
										maxlength="12"
									/>
									<p class="text-xs text-ink-muted mt-1.5">
										{{ shortNameTouched ? 'Edited by you' : 'Filled from the app name' }} · home screen label
									</p>
								</div>
								<div>
									<label class="block text-sm font-semibold text-ink mb-1.5" for="description">
										Description
									</label>
									<input
										:value="manifest.description"
										@input="onDescriptionInput"
										class="form_input"
										type="text"
										id="description"
										placeholder="A calm timer for brewing coffee"
									/>
									<p class="text-xs text-ink-muted mt-1.5">
										{{ descriptionTouched ? 'Edited by you' : 'Filled from the app name if you skip it' }}
									</p>
								</div>
							</div>
						</div>
					</section>

					<section class="bg-surface border border-line rounded-2xl p-5 sm:p-7">
						<h2 class="font-display text-xl font-bold mb-1">Look</h2>
						<p class="text-sm text-ink-muted mb-5">Colors drive the status bar and splash screen. A logo is optional — we generate a letter mark if you skip it.</p>

						<div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
							<div>
								<label class="block text-sm font-semibold text-ink mb-1.5" for="theme_color">Theme color</label>
								<div class="flex items-center gap-2">
									<input
										v-model="manifest.theme_color"
										class="color-swatch h-11 w-14 cursor-pointer border border-line rounded-xl p-1 bg-white"
										type="color"
										id="theme_color"
									/>
									<input
										v-model="manifest.theme_color"
										class="form_input flex-1 font-mono text-sm"
										type="text"
										spellcheck="false"
										aria-label="Theme color hex"
									/>
								</div>
								<p class="text-xs text-ink-muted mt-1.5">Browser chrome and letter-mark background.</p>
							</div>
							<div>
								<label class="block text-sm font-semibold text-ink mb-1.5" for="background_color">Splash background</label>
								<div class="flex items-center gap-2">
									<input
										v-model="manifest.background_color"
										class="color-swatch h-11 w-14 cursor-pointer border border-line rounded-xl p-1 bg-white"
										type="color"
										id="background_color"
									/>
									<input
										v-model="manifest.background_color"
										class="form_input flex-1 font-mono text-sm"
										type="text"
										spellcheck="false"
										aria-label="Background color hex"
									/>
								</div>
								<p class="text-xs text-ink-muted mt-1.5">Shown while the app is launching.</p>
							</div>
						</div>

						<div>
							<p class="text-sm font-semibold text-ink mb-2">App icon</p>
							<div
								class="relative rounded-2xl border-2 border-dashed transition-colors"
								:class="isDragging
									? 'border-primary bg-primary-bright/10'
									: uploadedLogo
										? 'border-primary/40 bg-white'
										: 'border-line-strong bg-white/60 hover:border-primary/50'"
								@dragenter.prevent="isDragging = true"
								@dragover.prevent="isDragging = true"
								@dragleave.prevent="isDragging = false"
								@drop.prevent="onDrop"
							>
								<input
									@change="handleLogoUpload"
									class="hidden"
									type="file"
									id="logoUpload"
									accept="image/png,image/jpeg,image/webp"
									ref="fileInput"
								/>
								<label for="logoUpload" class="cursor-pointer block p-6 sm:p-8">
									<div v-if="!uploadedLogo" class="text-center">
										<div class="mx-auto mb-3 w-12 h-12 rounded-2xl bg-paper flex items-center justify-center text-ink-muted">
											<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
											</svg>
										</div>
										<p class="font-semibold text-ink">Drop a square logo, or click to upload</p>
										<p class="text-sm text-ink-muted mt-1">PNG, JPG, or WebP · 512×512 or larger works best</p>
									</div>
									<div v-else class="flex items-center gap-4">
										<img :src="uploadedLogo" alt="Uploaded logo" class="w-16 h-16 rounded-2xl object-cover border border-line shadow-sm" />
										<div class="text-left min-w-0">
											<p class="font-semibold text-ink">{{ uploadedLogoFile?.name }}</p>
											<p class="text-sm text-ink-muted">Click or drop a new file to replace it</p>
										</div>
									</div>
								</label>
								<button
									v-if="uploadedLogo"
									type="button"
									class="absolute top-3 right-3 text-xs font-medium text-ink-muted hover:text-ink bg-white border border-line rounded-lg px-2.5 py-1"
									@click.stop.prevent="clearLogo"
								>
									Remove
								</button>
							</div>
							<p v-if="iconNote" class="text-xs text-ink-muted mt-2">{{ iconNote }}</p>

							<div v-if="isProcessing" class="mt-4 flex items-center gap-2 text-sm text-ink-muted">
								<div class="animate-spin rounded-full h-4 w-4 border-2 border-line-strong border-t-primary"></div>
								Generating icon sizes…
							</div>

							<div v-else-if="processedIcons.length" class="mt-4">
								<p class="text-xs font-medium text-ink-muted mb-2">
									{{ processedIcons.length }} sizes ready
								</p>
								<div class="flex flex-wrap gap-2">
									<div
										v-for="icon in processedIcons"
										:key="icon.size"
										class="flex flex-col items-center"
									>
										<img
											:src="icon.dataUrl"
											:alt="`${icon.size}px icon`"
											class="w-9 h-9 rounded-md border border-line bg-white object-cover"
										/>
										<span class="text-[10px] text-ink-muted mt-1">{{ icon.size }}</span>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section class="bg-surface border border-line rounded-2xl p-5 sm:p-7">
						<button
							type="button"
							class="w-full flex items-center justify-between gap-3 text-left"
							@click="showAdvanced = !showAdvanced"
							:aria-expanded="showAdvanced"
						>
							<div>
								<h2 class="font-display text-xl font-bold">Launch & offline</h2>
								<p class="text-sm text-ink-muted mt-0.5">Defaults already match a typical installed app. Open only if you need to change them.</p>
							</div>
							<svg
								class="w-5 h-5 text-ink-muted shrink-0 transition-transform"
								:class="showAdvanced ? 'rotate-180' : ''"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
							</svg>
						</button>

						<div v-show="showAdvanced" class="mt-6 space-y-6">
							<div>
								<p class="text-sm font-semibold text-ink mb-2">Display mode</p>
								<div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
									<label
										v-for="option in displayOptions"
										:key="option.value"
										class="flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition-colors"
										:class="manifest.display === option.value
											? 'border-primary bg-primary-bright/10'
											: 'border-line bg-white hover:border-line-strong'"
									>
										<input
											v-model="manifest.display"
											type="radio"
											class="mt-0.5 text-primary focus:ring-primary"
											:value="option.value"
											name="display"
										/>
										<span>
											<span class="block text-sm font-semibold text-ink">
												{{ option.label }}
												<span
													v-if="option.recommended"
													class="ml-1 text-[10px] font-semibold uppercase tracking-wide text-primary"
												>Recommended</span>
											</span>
											<span class="block text-xs text-ink-muted mt-0.5">{{ option.hint }}</span>
										</span>
									</label>
								</div>
							</div>

							<div>
								<p class="text-sm font-semibold text-ink mb-2">Cache strategy</p>
								<div class="space-y-2">
									<label
										v-for="option in cacheOptions"
										:key="option.value"
										class="flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition-colors"
										:class="cacheStrategy === option.value
											? 'border-primary bg-primary-bright/10'
											: 'border-line bg-white hover:border-line-strong'"
									>
										<input
											v-model="cacheStrategy"
											type="radio"
											class="mt-0.5 text-primary focus:ring-primary"
											:value="option.value"
											name="cacheStrategy"
										/>
										<span>
											<span class="block text-sm font-semibold text-ink">
												{{ option.label }}
												<span
													v-if="option.recommended"
													class="ml-1 text-[10px] font-semibold uppercase tracking-wide text-primary"
												>Recommended</span>
											</span>
											<span class="block text-xs text-ink-muted mt-0.5">{{ option.hint }}</span>
										</span>
									</label>
								</div>
							</div>

							<div>
								<label class="block text-sm font-semibold text-ink mb-1.5" for="startUrl">Start URL</label>
								<input
									v-model="manifest.start_url"
									class="form_input font-mono text-sm"
									id="startUrl"
									type="text"
									placeholder="/"
								/>
								<p class="text-xs text-ink-muted mt-1.5">Where the installed app opens. Id matches this path; scope stays at the site root.</p>
							</div>

							<label class="flex items-start gap-3 cursor-pointer">
								<input
									v-model="serviceWorkerSkipWaiting"
									type="checkbox"
									class="mt-0.5 rounded border-line-strong text-primary focus:ring-primary"
								/>
								<span>
									<span class="block text-sm font-semibold text-ink">Apply service worker updates immediately</span>
									<span class="block text-xs text-ink-muted mt-0.5">Skip waiting so users get the new worker without a second refresh.</span>
								</span>
							</label>
						</div>
					</section>

					<section class="lg:hidden">
						<DownloadPanel
							:can-download="canDownload"
							:is-downloading="isDownloading"
							:checklist="checklist"
							:file-name="downloadFileName"
							@download="downloadPWAFiles"
						/>
					</section>
				</div>

				<aside class="hidden lg:block sticky top-24 space-y-5">
					<div class="bg-surface border border-line rounded-2xl p-5">
						<DevicePreview
							:name="manifest.name"
							:short-name="manifest.short_name"
							:theme-color="manifest.theme_color"
							:background-color="manifest.background_color"
							:icon-url="previewIcon"
							:display="manifest.display"
							:letter="previewLetter"
						/>
					</div>
					<DownloadPanel
						:can-download="canDownload"
						:is-downloading="isDownloading"
						:checklist="checklist"
						:file-name="downloadFileName"
						@download="downloadPWAFiles"
					/>
				</aside>
			</div>
		</main>

		<div
			class="lg:hidden sticky bottom-0 z-20 border-t border-line bg-surface/95 backdrop-blur-md px-4 py-3"
		>
			<button
				type="button"
				class="w-full bg-ink text-white font-semibold rounded-xl py-3.5 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-ink/90 transition-colors"
				:disabled="!canDownload || isDownloading"
				@click="downloadPWAFiles"
			>
				{{ isDownloading ? 'Preparing zip…' : 'Download PWA package' }}
			</button>
		</div>

		<div
			v-show="toast.show"
			role="status"
			aria-live="polite"
			class="fixed bottom-20 lg:bottom-6 right-4 bg-ink text-white px-4 py-3 rounded-xl shadow-lg z-50 max-w-sm"
		>
			<div class="flex items-start gap-2 text-sm">
				<svg v-if="toast.type === 'success'" class="w-5 h-5 text-primary-bright shrink-0" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
				</svg>
				<svg v-else class="w-5 h-5 text-red-300 shrink-0" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
				</svg>
				<span>{{ toast.message }}</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { reactive, ref, computed, watch, onMounted } from 'vue'
import DevicePreview from './components/DevicePreview.vue'
import DownloadPanel from './components/DownloadPanel.vue'
import { resize_square } from 'wasm-image-processor'
import JSZip from 'jszip'

const manifest = reactive({
	id: '/',
	start_url: '/',
	name: '',
	short_name: '',
	icons: [],
	description: '',
	background_color: '#ffffff',
	theme_color: '#1f9d6a',
	display: 'standalone',
	lang: 'en',
})

const cacheStrategy = ref('staleWhileRevalidate')
const serviceWorkerSkipWaiting = ref(true)
const showAdvanced = ref(false)
const isDragging = ref(false)
const shortNameTouched = ref(false)
const descriptionTouched = ref(false)
const toast = reactive({
	show: false,
	message: '',
	type: 'success',
})

const uploadedLogo = ref('')
const uploadedLogoFile = ref(null)
const isProcessing = ref(false)
const processedIcons = ref([])
const iconSource = ref('none')
const isDownloading = ref(false)
const fileInput = ref(null)
const letterTimer = ref(null)

const iconSizes = [48, 72, 96, 128, 144, 152, 192, 256, 384, 512]

const displayOptions = [
	{ value: 'standalone', label: 'Standalone', hint: 'Opens like a native app, no browser UI.', recommended: true },
	{ value: 'fullscreen', label: 'Fullscreen', hint: 'Uses the entire screen. Good for games.' },
	{ value: 'minimal-ui', label: 'Minimal UI', hint: 'Hides most chrome, keeps basic controls.' },
	{ value: 'browser', label: 'Browser', hint: 'Stays in a normal browser tab.' },
]

const cacheOptions = [
	{ value: 'staleWhileRevalidate', label: 'Stale while revalidate', hint: 'Serve cached content instantly, refresh in the background.', recommended: true },
	{ value: 'cacheFirst', label: 'Cache first', hint: 'Fastest. Best when files rarely change.' },
	{ value: 'networkFirst', label: 'Network first', hint: 'Always try the network. Best for APIs and dashboards.' },
]

const previewLetter = computed(() => {
	const source = manifest.short_name || manifest.name || 'A'
	return source.trim().charAt(0).toUpperCase() || 'A'
})

const previewIcon = computed(() => {
	const largest = processedIcons.value.find(icon => icon.size === 192)
		|| processedIcons.value[processedIcons.value.length - 1]
	return largest?.dataUrl || uploadedLogo.value || ''
})

const derivedDescription = computed(() => {
	if (manifest.description.trim()) return manifest.description.trim()
	if (manifest.name.trim()) return manifest.name.trim()
	return ''
})

const canDownload = computed(() => {
	return Boolean(manifest.name.trim()) && manifest.short_name.length > 0 && manifest.short_name.length <= 12
})

const downloadFileName = computed(() => {
	if (!manifest.short_name.trim()) return ''
	return `${manifest.short_name.replace(/\s+/g, '-').toLowerCase()}-pwa-files.zip`
})

const checklist = computed(() => [
	{ label: 'App name', done: Boolean(manifest.name.trim()) },
	{ label: 'Short name', done: Boolean(manifest.short_name.trim()) && manifest.short_name.length <= 12 },
	{ label: iconSource.value === 'logo' ? 'Custom icon' : 'Icon (letter mark)', done: processedIcons.value.length > 0 },
])

const iconNote = computed(() => {
	if (iconSource.value === 'logo') return 'Custom logo resized into the standard PWA sizes.'
	if (iconSource.value === 'letter') return `Letter mark from “${previewLetter.value}” using the theme color. Upload a logo anytime.`
	return 'Icons appear once you enter a name, or as soon as you upload a logo.'
})

const deriveShortName = (name) => {
	const compact = name.trim().replace(/\s+/g, ' ')
	if (!compact) return ''
	const firstWord = compact.split(' ')[0]
	if (compact.includes(' ') && firstWord.length >= 3 && firstWord.length <= 12) {
		return firstWord
	}
	if (compact.length <= 12) return compact
	return compact.replace(/\s+/g, '').slice(0, 12)
}

watch(() => manifest.name, (name) => {
	if (!shortNameTouched.value) {
		manifest.short_name = deriveShortName(name)
	}
	if (!descriptionTouched.value) {
		manifest.description = name.trim()
	}
})

watch(() => manifest.start_url, (url) => {
	const normalized = url.trim() || '/'
	manifest.id = normalized
})

const onShortNameInput = (event) => {
	shortNameTouched.value = true
	manifest.short_name = event.target.value.slice(0, 12)
}

const onDescriptionInput = (event) => {
	descriptionTouched.value = true
	manifest.description = event.target.value
}

const showToast = (message, type = 'success') => {
	toast.message = message
	toast.type = type
	toast.show = true
	setTimeout(() => {
		toast.show = false
	}, 4200)
}

const contrastInk = (hex) => {
	const raw = (hex || '#1f9d6a').replace('#', '')
	const full = raw.length === 3
		? raw.split('').map(ch => ch + ch).join('')
		: raw.padEnd(6, '0').slice(0, 6)
	const r = Number.parseInt(full.slice(0, 2), 16) || 0
	const g = Number.parseInt(full.slice(2, 4), 16) || 0
	const b = Number.parseInt(full.slice(4, 6), 16) || 0
	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
	return luminance > 0.62 ? '#132019' : '#ffffff'
}

const canvasToBlob = (canvas) => {
	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => {
			if (blob) resolve(blob)
			else reject(new Error('Could not create icon'))
		}, 'image/png')
	})
}

const generateLetterIcons = async () => {
	if (uploadedLogoFile.value) return
	const source = (manifest.short_name || manifest.name).trim()
	if (!source) {
		processedIcons.value = []
		iconSource.value = 'none'
		manifest.icons = []
		return
	}

	const letter = source.charAt(0).toUpperCase()
	const bg = manifest.theme_color || '#1f9d6a'
	const fg = contrastInk(bg)
	const icons = []

	for (const size of iconSizes) {
		const canvas = document.createElement('canvas')
		canvas.width = size
		canvas.height = size
		const ctx = canvas.getContext('2d')
		ctx.fillStyle = bg
		ctx.fillRect(0, 0, size, size)
		ctx.fillStyle = fg
		ctx.font = `700 ${Math.round(size * 0.52)}px "Bricolage Grotesque", Figtree, sans-serif`
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		ctx.fillText(letter, size / 2, size / 2 + size * 0.03)
		const blob = await canvasToBlob(canvas)
		icons.push({
			size,
			blob,
			dataUrl: canvas.toDataURL('image/png'),
		})
	}

	processedIcons.value = icons
	iconSource.value = 'letter'
	updateManifestIcons()
}

const scheduleLetterIcons = () => {
	clearTimeout(letterTimer.value)
	letterTimer.value = setTimeout(() => {
		generateLetterIcons()
	}, 280)
}

watch(
	() => [manifest.name, manifest.short_name, manifest.theme_color],
	() => {
		if (!uploadedLogoFile.value) scheduleLetterIcons()
	},
)

const buildManifestObject = () => {
	const start = (manifest.start_url || '/').trim() || '/'

	const icons = processedIcons.value.length > 0
		? processedIcons.value.map(icon => ({
				src: `/icons/icon-${icon.size}x${icon.size}.png`,
				type: 'image/png',
				sizes: `${icon.size}x${icon.size}`,
				purpose: 'any',
			}))
		: []

	return {
		name: manifest.name.trim(),
		short_name: manifest.short_name.trim(),
		description: derivedDescription.value,
		icons,
		id: start,
		start_url: start,
		scope: '/',
		background_color: manifest.background_color,
		theme_color: manifest.theme_color,
		display: manifest.display,
		lang: manifest.lang,
	}
}

function generateServiceWorker() {
	return `const CACHE_NAME = 'v1-cache';
const FILES_TO_CACHE = ['/'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  ${serviceWorkerSkipWaiting.value ? 'self.skipWaiting();' : ''}
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const routes = {
    '/api': 'networkFirst',
    '.css': 'cacheFirst',
    '.js': 'staleWhileRevalidate',
  };

  const matched = Object.keys(routes).find((route) => {
    if (route.startsWith('.')) return url.pathname.endsWith(route);
    return url.pathname.startsWith(route);
  });

  const strategy = routes[matched] || '${cacheStrategy.value}';

  if (strategy === 'cacheFirst') {
    event.respondWith(
      caches.match(event.request).then((response) => response || fetch(event.request))
    );
  } else if (strategy === 'networkFirst') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        });
        return cachedResponse || fetchPromise;
      })
    );
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
        })
      )
    ).then(() => self.clients.claim())
  );
});
`
}

const handleLogoFile = async (file) => {
	if (!file) return
	if (!file.type.startsWith('image/')) {
		showToast('Please upload an image file', 'error')
		return
	}
	if (file.size > 10 * 1024 * 1024) {
		showToast('Logo must be 10MB or smaller', 'error')
		return
	}

	uploadedLogoFile.value = file
	const reader = new FileReader()
	reader.onload = (event) => {
		uploadedLogo.value = event.target.result
	}
	reader.readAsDataURL(file)
	await processLogoToIcons()
}

const handleLogoUpload = (event) => {
	handleLogoFile(event.target.files[0])
}

const onDrop = (event) => {
	isDragging.value = false
	const file = event.dataTransfer?.files?.[0]
	handleLogoFile(file)
}

const clearLogo = () => {
	uploadedLogo.value = ''
	uploadedLogoFile.value = null
	if (fileInput.value) fileInput.value.value = ''
	generateLetterIcons()
}

const fileToUint8Array = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = () => resolve(new Uint8Array(reader.result))
		reader.onerror = reject
		reader.readAsArrayBuffer(file)
	})
}

const processLogoToIcons = async () => {
	if (!uploadedLogoFile.value) return

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
				processedIcons.value.push({ size, dataUrl, blob })
			}
			catch (error) {
				console.error(`Failed to resize image to ${size}x${size}:`, error)
			}
		}

		iconSource.value = 'logo'
		updateManifestIcons()
		showToast(`Generated ${processedIcons.value.length} icon sizes`)
	}
	catch (error) {
		console.error('Error processing logo:', error)
		showToast('Could not process that logo. Try a PNG or JPG.', 'error')
		clearLogo()
	}
	finally {
		isProcessing.value = false
	}
}

const updateManifestIcons = () => {
	manifest.icons = processedIcons.value.map(icon => ({
		src: `/icons/icon-${icon.size}x${icon.size}.png`,
		type: 'image/png',
		sizes: `${icon.size}x${icon.size}`,
	}))
}

const downloadPWAFiles = async () => {
	if (!canDownload.value) {
		showToast('Add an app name to download', 'error')
		return
	}

	if (!processedIcons.value.length) {
		await generateLetterIcons()
	}

	isDownloading.value = true
	try {
		const zip = new JSZip()
		const manifestObject = buildManifestObject()
		zip.file('manifest.json', `${JSON.stringify(manifestObject, null, 2)}\n`)
		zip.file('sw.js', generateServiceWorker())

		const iconsFolder = zip.folder('icons')
		for (const icon of processedIcons.value) {
			const arrayBuffer = await icon.blob.arrayBuffer()
			iconsFolder.file(`icon-${icon.size}x${icon.size}.png`, arrayBuffer)
		}

		const readmeContent = `# ${manifestObject.name}

This package contains the files you need to make the site installable.

## Files
- \`manifest.json\` — app name, colors, icons, and display mode
- \`sw.js\` — service worker (${cacheStrategy.value})
- \`icons/\` — PNG icons from 48px to 512px

## Setup

1. Put these files at the root of your site (or update the paths).

2. Add this to \`<head>\`:

\`\`\`html
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="${manifestObject.theme_color}">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="${manifestObject.short_name}">
\`\`\`

3. Register the service worker:

\`\`\`javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((registration) => console.log('SW registered:', registration.scope))
    .catch((error) => console.error('SW registration failed:', error));
}
\`\`\`

4. Serve over HTTPS (or localhost). Chrome, Edge, and Safari can then offer “Add to Home Screen”.

Generated by [PWA Generator](https://github.com/opensource254/pwa-generator)
`
		zip.file('README.md', readmeContent)

		const content = await zip.generateAsync({ type: 'blob' })
		const url = window.URL.createObjectURL(content)
		const link = document.createElement('a')
		link.href = url
		const slug = manifest.short_name.replace(/\s+/g, '-').toLowerCase() || 'app'
		link.download = `${slug}-pwa-files.zip`
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
		window.URL.revokeObjectURL(url)

		showToast('PWA package downloaded')
	}
	catch (error) {
		console.error('Error creating zip file:', error)
		showToast('Could not build the zip file', 'error')
	}
	finally {
		isDownloading.value = false
	}
}

onMounted(() => {
	generateLetterIcons()
})
</script>
