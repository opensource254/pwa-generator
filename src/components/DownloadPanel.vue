<script setup>
defineProps({
	canDownload: { type: Boolean, default: false },
	isDownloading: { type: Boolean, default: false },
	checklist: { type: Array, default: () => [] },
	fileName: { type: String, default: '' },
})

defineEmits(['download'])
</script>

<template>
	<section class="download-panel" aria-label="Download package">
		<h2 class="preview-heading">Your PWA package</h2>
		<p class="download-description">Manifest, service worker, icons, and a setup guide. All in one zip.</p>
		<ul class="download-checklist">
			<li v-for="item in checklist" :key="item.label">
				<span class="check-status" :class="{ 'is-done': item.done }" aria-hidden="true">{{ item.done ? '✓' : '—' }}</span>
				<span>{{ item.label }}<span class="sr-only">{{ item.done ? ': ready' : ': needed' }}</span></span>
			</li>
		</ul>
		<button class="primary-action" type="button" :disabled="!canDownload || isDownloading" :aria-busy="isDownloading" @click="$emit('download')">
			{{ isDownloading ? 'Preparing zip…' : 'Download package' }}
		</button>
		<p class="download-filename">{{ fileName || 'Add an app name to get started.' }}</p>
	</section>
</template>
