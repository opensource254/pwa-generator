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
  <div class="bg-ink text-white rounded-2xl p-5">
    <p class="font-display text-lg font-bold">Ready when you are</p>
    <p class="text-sm text-white/70 mt-1 mb-4">
      Zip includes manifest.json, sw.js, icons, and a short setup guide.
    </p>
    <ul class="space-y-2 mb-5">
      <li
        v-for="item in checklist"
        :key="item.label"
        class="flex items-center gap-2 text-sm"
      >
        <span
          class="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
          :class="item.done ? 'bg-primary-bright text-ink' : 'border border-white/30'"
        >
          <span v-if="item.done" aria-hidden="true">✓</span>
        </span>
        <span :class="item.done ? 'text-white' : 'text-white/55'">{{ item.label }}</span>
      </li>
    </ul>
    <button
      type="button"
      class="w-full bg-primary-bright text-ink font-semibold rounded-xl py-3 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-105 transition"
      :disabled="!canDownload || isDownloading"
      @click="$emit('download')"
    >
      {{ isDownloading ? 'Preparing zip…' : 'Download PWA package' }}
    </button>
    <p v-if="fileName" class="text-[11px] text-white/45 mt-3 text-center font-mono break-all">
      {{ fileName }}
    </p>
  </div>
</template>
