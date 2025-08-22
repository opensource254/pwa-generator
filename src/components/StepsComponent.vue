<script setup lang="ts">
import { ref } from 'vue'
const currentStep = ref<1 | 2 | 3 | 4>(1)

const decrement = () => {
	if (currentStep.value > 1) {
		currentStep.value--
	}
}
const increment = () => {
	if (currentStep.value < 4) {
		currentStep.value++
	}
}
</script>

<template>
  <div class="m-5">
    <!-- Step 1 -->
    <div v-show="currentStep === 1">
      <div class="mb-2">
        <h4 class="text-xl font-bold">Step 1 of 4</h4>
      </div>

      <slot name="step1"></slot>
    </div>

    <!-- Step 2 -->
    <div v-show="currentStep === 2">
      <div class="mb-2">
        <h4 class="text-xl font-bold">Step 2 of 4</h4>
      </div>

      <slot name="step2"></slot>
    </div>

    <!-- Step 3 -->
    <div v-show="currentStep === 3">
      <div class="mb-2">
        <h4 class="text-xl font-bold">Step 3 of 4</h4>
      </div>
      <slot name="step3"></slot>
    </div>

    <!-- Step 4 -->
    <div v-show="currentStep === 4">
      <div class="mb-2">
        <h4 class="text-xl font-bold">Step 4 of 4</h4>
      </div>
      <slot name="step4"></slot>
    </div>

    <div class="flex justify-between gap-2">
      <button
        @click="decrement"
        class="bg-primary text-white px-2 py-1 rounded-lg w-full"
      >
        Previous
      </button>
      <button
        @click="increment"
        class="bg-primary text-white px-2 py-1 rounded-lg w-full"
      >
        Next
      </button>
    </div>
  </div>
</template>
