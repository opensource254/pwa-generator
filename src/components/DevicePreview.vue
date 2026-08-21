<script setup>
import { computed } from 'vue'

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

const letterColor = computed(() => {
	const raw = (props.themeColor || '#1f9d6a').replace('#', '')
	const full = raw.length === 3
		? raw.split('').map(ch => ch + ch).join('')
		: raw.padEnd(6, '0').slice(0, 6)
	const r = Number.parseInt(full.slice(0, 2), 16) || 0
	const g = Number.parseInt(full.slice(2, 4), 16) || 0
	const b = Number.parseInt(full.slice(4, 6), 16) || 0
	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
	return luminance > 0.62 ? '#132019' : '#ffffff'
})

const dummyApps = [
	{ label: 'Mail', color: '#94a3b8' },
	{ label: 'Maps', color: '#86a789' },
	{ label: 'Music', color: '#c4b5a5' },
	{ label: 'Notes', color: '#a8b5a0' },
]
</script>

<template>
  <div v-if="compact" class="flex items-center gap-3">
    <div
      class="w-12 h-12 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center text-lg font-display font-bold shadow-sm"
      :style="{ backgroundColor: themeColor, color: letterColor }"
    >
      <img v-if="iconUrl" :src="iconUrl" alt="" class="w-full h-full object-cover" />
      <span v-else>{{ letter }}</span>
    </div>
    <div class="min-w-0 flex-1">
      <p class="font-semibold text-ink truncate">{{ name || 'App name' }}</p>
      <p class="text-xs text-ink-muted truncate">{{ shortName || 'Home screen label' }}</p>
    </div>
    <div class="flex items-center gap-1.5 shrink-0">
      <span class="w-5 h-5 rounded-full border border-line" :style="{ backgroundColor: themeColor }" title="Theme"></span>
      <span class="w-5 h-5 rounded-full border border-line" :style="{ backgroundColor: backgroundColor }" title="Splash"></span>
    </div>
  </div>
  <div v-else class="flex flex-col items-center">
    <div class="relative w-[232px]">
      <div class="rounded-[2rem] bg-ink p-[9px] shadow-[0_28px_60px_-24px_rgba(19,32,25,0.55)]">
        <div
          class="relative overflow-hidden rounded-[1.55rem] h-[420px]"
          :style="{ backgroundColor: backgroundColor }"
        >
          <!-- Home screen -->
          <div
            class="absolute inset-0"
            :style="{
              background: `linear-gradient(180deg, color-mix(in srgb, ${themeColor} 38%, #1b2a22) 0%, #1b2a22 42%, #121c17 100%)`,
            }"
          >
            <div class="flex justify-center pt-2">
              <div class="h-[22px] w-[84px] rounded-full bg-black/80"></div>
            </div>
            <div class="px-5 pt-5 text-white">
              <p class="text-[11px] font-medium tracking-wide text-white/70">9:41</p>
              <p class="font-display text-[15px] font-semibold mt-4 mb-3">Home Screen</p>
              <div class="grid grid-cols-4 gap-x-3 gap-y-4">
                <div
                  v-for="app in dummyApps"
                  :key="app.label"
                  class="flex flex-col items-center gap-1 opacity-50"
                >
                  <div
                    class="w-11 h-11 rounded-[13px]"
                    :style="{ backgroundColor: app.color }"
                  ></div>
                  <span class="text-[9px] text-white/80 truncate w-full text-center">{{ app.label }}</span>
                </div>

                <div class="flex flex-col items-center gap-1">
                  <div
                    class="w-11 h-11 rounded-[13px] overflow-hidden ring-2 ring-white/80 shadow-lg flex items-center justify-center text-white font-display font-bold"
                    :style="{ backgroundColor: themeColor, color: letterColor }"
                  >
                    <img
                      v-if="iconUrl"
                      :src="iconUrl"
                      alt=""
                      class="w-full h-full object-cover"
                    />
                    <span v-else class="text-lg">{{ letter }}</span>
                  </div>
                  <span class="text-[9px] text-white truncate w-full text-center font-medium">
                    {{ shortName || name || 'Your app' }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Installed app chrome overlay at bottom of the phone -->
          <div class="absolute inset-x-0 bottom-0 rounded-t-[1.4rem] overflow-hidden shadow-[0_-12px_40px_rgba(0,0,0,0.28)]">
            <div
              class="px-4 pt-3 pb-2 flex items-center gap-2"
              :style="{ backgroundColor: display === 'browser' ? '#f4f4f5' : themeColor }"
            >
              <div
                class="w-6 h-6 rounded-md overflow-hidden shrink-0 flex items-center justify-center text-[10px] font-bold"
                :style="{
                  backgroundColor: display === 'browser' ? themeColor : 'rgba(255,255,255,0.2)',
                  color: '#fff',
                }"
              >
                <img v-if="iconUrl" :src="iconUrl" alt="" class="w-full h-full object-cover" />
                <span v-else>{{ letter }}</span>
              </div>
              <div class="min-w-0 flex-1">
                <p
                  class="text-[11px] font-semibold truncate"
                  :style="{ color: display === 'browser' ? '#18181b' : '#fff' }"
                >
                  {{ name || 'App name' }}
                </p>
                <p
                  class="text-[9px] truncate"
                  :style="{ color: display === 'browser' ? '#71717a' : 'rgba(255,255,255,0.75)' }"
                >
                  {{ display === 'browser' ? 'example.com' : (display === 'standalone' ? 'Installed app' : display) }}
                </p>
              </div>
            </div>
            <div class="h-[108px] px-4 py-3" :style="{ backgroundColor: backgroundColor }">
              <div class="h-2 w-24 rounded-full bg-black/10 mb-2"></div>
              <div class="h-2 w-36 rounded-full bg-black/10 mb-2"></div>
              <div class="h-2 w-20 rounded-full bg-black/10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="mt-4 text-xs text-ink-muted text-center max-w-[240px]">
      Preview of the home-screen icon and
      {{ display === 'browser' ? 'browser chrome' : 'installed app shell' }}.
    </p>
  </div>
</template>
