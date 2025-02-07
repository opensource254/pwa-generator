<script setup lang="ts">
import { ref } from 'vue'
import vips from 'wasm-vips'

const sizes = [48, 72, 96, 128, 192, 256, 512, 1024]
const inputFile = ref<File | undefined>()

const processImage = async (file: File) => {
	console.log(file)
	const buffer = await file.arrayBuffer()
	const image = vips.Image.newFromBuffer(new Uint8Array(buffer))

	for (const size of sizes) {
		const resized = image.resize(size / image.width)
		image.preprocess({ resize: { width: size, height: size } })

		const pngBuffer = resized.writeToBuffer('.png')

		// Convert output to Blob
		const blob = new Blob([pngBuffer], { type: 'image/png' })
		const url = URL.createObjectURL(blob)
	}
}
</script>

<template>
	<div>
		Resize component my good sir 😎

		<form @submit.prevent="processImage">
			<input @change="(event) => processImage(event.target.value)" type="file" />

			<button>Generate icons</button>
		</form>
	</div>
</template>
