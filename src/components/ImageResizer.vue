<script setup lang="ts">
import { ref } from 'vue'
import vips from 'wasm-vips'

const sizes = [48, 72, 96, 128, 192, 256, 512, 1024]
const inputFile = ref<File | undefined>()
const filePreviewUrl = ref<string | undefined>()

const processImage = async () => {
	if (!inputFile.value) return

	// Read file as an array buffer
	const buffer = await inputFile.value.arrayBuffer()

	console.log(vips.Image)

	console.log(buffer)

	// Convert buffer to Uint8Array
	const uint8Array = new Uint8Array(buffer)

	// Load the image into libvips
	const image = vips.Image.thumbnail(inputFile.value.name, 512, {})

	for (const size of sizes) {
		// Calculate scale factor
		const scaleFactor = size / image.width

		// Resize the image
		const resized = image.resize(scaleFactor)

		console.log(resized)
	}
}

const onFileChange = (event: Event) => {
	const target = event.target as HTMLInputElement

	if (target.files && target.files.length > 0) {
		const reader = new FileReader()
		reader.onload = () => {
			const previewUrl = reader.result as string
			filePreviewUrl.value = previewUrl
		}
		reader.readAsDataURL(target.files[0])
		console.log(target.files[0])
		inputFile.value = target.files[0]
	}
	else {
		inputFile.value = undefined
		filePreviewUrl.value = undefined
	}
}

const resetForm = () => {
	inputFile.value = undefined
	filePreviewUrl.value = undefined
}
</script>

<template>
  <div>
    Resize component my good sir 😎

    <div class="border">
      <img
        v-if="filePreviewUrl"
        class="h-50 aspect-square border shadow-md"
        :src="filePreviewUrl"
      />
      <div class="h-50 text-center" v-else>Please add a Square icon</div>
    </div>

	<form @reset="resetForm" @submit.prevent="() => processImage()">
      <div class="flex flex-col">
        <div>
          <input
            class="w-full"
            name="icon"
            accept="image/png,image/jpeg"
            @change="onFileChange"
            type="file"
          />
        </div>
        <div class="flex gap-2">
          <button type="reset" class="bg-amber-500 w-full py-1 text-white rounded-lg cursor-pointer">Reset</button>
          <button class="bg-primary w-full py-1 text-white rounded-lg cursor-pointer">Generate icons</button>
        </div>
      </div>
    </form>
  </div>
</template>
