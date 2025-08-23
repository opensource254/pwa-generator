<script setup lang="ts">
import { ref, computed } from 'vue'
const currentStep = ref<1 | 2 | 3 | 4>(1)

const stepTitles = {
	1: 'App Information',
	2: 'Logo & Icons',
	3: 'Configuration',
	4: 'Generate & Download',
}

const stepDescriptions = {
	1: 'Basic information about your PWA',
	2: 'Upload your logo for icon generation',
	3: 'Configure display and caching options',
	4: 'Generate icons and download PWA files',
}

const progressPercentage = computed(() => (currentStep.value / 4) * 100)

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

const goToStep = (step: 1 | 2 | 3 | 4) => {
	currentStep.value = step
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <!-- Progress Bar -->
    <div class="mb-8">
		<div class="flex items-center justify-between mb-4">
			<div
				v-for="step in 4"
				:key="step"
				@click="goToStep(step as 1 | 2 | 3 | 4)"
				class="flex flex-col items-center cursor-pointer group transition-all duration-200"
				:class="step <= currentStep ? 'text-primary' : 'text-gray-400'"
			>
				<div
					class="w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2 transition-all duration-200"
					:class="step < currentStep
						? 'bg-primary border-primary text-white'
						: step === currentStep
							? 'border-primary text-primary bg-primary/10'
							: 'border-gray-300 text-gray-400 group-hover:border-gray-400'"
				>
					<svg v-if="step < currentStep" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
					</svg>
					<span v-else class="text-sm font-semibold">{{ step }}</span>
				</div>
				<span class="text-xs font-medium text-center hidden sm:block">
					{{ stepTitles[step as keyof typeof stepTitles] }}
				</span>
			</div>
		</div>

		<!-- Progress line -->
		<div class="relative">
			<div class="absolute inset-0 flex items-center">
				<div class="w-full border-t border-gray-300"></div>
			</div>
			<div class="absolute inset-0 flex items-center">
				<div
					class="border-t-2 border-primary transition-all duration-300"
					:style="{ width: `${progressPercentage}%` }"
				></div>
			</div>
		</div>
    </div>

    <!-- Step Content -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <!-- Step Header -->
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">
          {{ stepTitles[currentStep] }}
        </h2>
        <p class="text-gray-600">
          {{ stepDescriptions[currentStep] }}
        </p>
      </div>

      <!-- Step Content -->
      <div v-show="currentStep === 1">
        <slot name="step1"></slot>
      </div>

      <div v-show="currentStep === 2">
        <slot name="step2"></slot>
      </div>

      <div v-show="currentStep === 3">
        <slot name="step3"></slot>
      </div>

      <div v-show="currentStep === 4">
        <slot name="step4"></slot>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-between items-center">
      <button
        @click="decrement"
        :disabled="currentStep === 1"
        class="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>

      <div class="text-sm text-gray-500">
        Step {{ currentStep }} of 4
      </div>

      <button
        v-if="currentStep < 4"
        @click="increment"
        class="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary border border-primary rounded-lg hover:bg-primary/90 transition-colors"
      >
        Next
        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div v-else class="w-20"></div> <!-- Spacer to maintain layout -->
    </div>
  </div>
</template>
