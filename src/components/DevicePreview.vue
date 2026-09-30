<script setup>
import { computed } from 'vue'
import { contrastInk } from '../utils/contrast'

const props = defineProps({
	name: { type: String, default: '' },
	shortName: { type: String, default: '' },
	themeColor: { type: String, default: '#1f9d6a' },
	backgroundColor: { type: String, default: '#ffffff' },
	iconUrl: { type: String, default: '' },
	display: { type: String, default: 'standalone' },
	letter: { type: String, default: 'A' },
	compact: { type: Boolean, default: false },
})

const letterColor = computed(() => contrastInk(props.themeColor) === '#000000'
	? 'var(--color-preview-dark)'
	: 'var(--color-preview-light)')
const displayLabel = computed(() => ({
	'standalone': 'Standalone',
	'fullscreen': 'Fullscreen',
	'minimal-ui': 'Minimal UI',
	'browser': 'Browser',
})[props.display])
</script>

<template>
	<section class="live-preview" :class="{ 'is-compact': compact }" aria-label="App preview">
		<h2 class="preview-heading">Your app, taking shape</h2>
		<div class="preview-identity">
			<div class="preview-icon" :style="{ backgroundColor: themeColor, color: letterColor }">
				<img v-if="iconUrl" :src="iconUrl" alt="App icon preview" width="80" height="80" />
				<span v-else>{{ letter }}</span>
			</div>
			<div class="preview-names">
				<p class="preview-name">{{ name || 'Your app' }}</p>
				<p class="preview-label">{{ shortName || 'Home screen label' }}</p>
			</div>
		</div>
		<dl class="preview-details">
			<div><dt>Theme</dt><dd><span class="preview-swatch" :style="{ backgroundColor: themeColor }" aria-hidden="true"></span>{{ themeColor }}</dd></div>
			<div><dt>Splash</dt><dd><span class="preview-swatch" :style="{ backgroundColor: backgroundColor }" aria-hidden="true"></span>{{ backgroundColor }}</dd></div>
			<div><dt>Launch</dt><dd>{{ displayLabel }}</dd></div>
		</dl>
		<p v-if="!compact" class="preview-note">Icon and launch settings. Appearance varies by browser and device.</p>
	</section>
</template>
