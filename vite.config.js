import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import replace from '@rollup/plugin-replace'
import wasm from 'vite-plugin-wasm'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		replace({
			'preventAssignment': true,
			'process.env.BUILD_HASH': JSON.stringify(Date.now()),
		}),
		wasm(),
	],
	server: {
		headers: {
			'Cross-Origin-Opener-Policy': 'same-origin',
			'Cross-Origin-Embedder-Policy': 'require-corp',
		},
	},
	build: {
		target: 'esnext', // No transpilation, full modern JS support
		modulePreload: { polyfill: false }, // Disable unnecessary polyfills
		rollupOptions: {
			input: {
				main: 'index.html',
				serviceWorker: 'src/service-worker.js',
			},
			output: {
				entryFileNames: chunkInfo =>
					chunkInfo.name == 'serviceWorker'
						? 'sw.js'
						: 'assets/[name]-[hash].js',
			},
		},
	},
	optimizeDeps: {},
})
