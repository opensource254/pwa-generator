<template>
  <nav class=" bg-cyan-900 text-white px-1 sm:px-28 py-4">
    <h1 class=" font-bold shadow">PWA generator</h1>
  </nav>

  <section class="px-1 sm:px-28">
    <form action="#" method="post">

      <label class=" font-semibold" for="App name">Name</label>
      <input v-model="manifest.name"
        class="w-full focus:border-cyan-900 focus:ring-1 border-2 focus:outline-none rounded-md mb-3 last-of-type:mb-0"
        type="text" name="name" id="name">

      <label class=" font-semibold" for="shortname">Shortname</label>
      <input v-model="manifest.short_name"
        class="w-full focus:border-cyan-900 focus:ring-1 border-2 focus:outline-none rounded-md mb-3" type="text"
        name="shortname" id="shortname">

      <label class=" font-semibold" for="description">Description</label>
      <input v-model="manifest.description"
        class="w-full focus:border-cyan-900 focus:ring-1 border-2 focus:outline-none rounded-md mb-3" type="text"
        name="description" id="description">

      <label class=" font-semibold" for="display">Display</label>
      <select v-model="manifest.display"
        class="w-full focus:border-cyan-900 focus:ring-1 border-2 focus:outline-none rounded-md mb-3" name="display"
        id="display">
        <option class=" bg-slate-500" value="standalone">Standalone</option>
        <option value="browser">Browser</option>
      </select>

    </form>
  </section>

  <section class="px-1 sm:px-28 rounded-md">
    <div class="overflow-x-scroll relative w-full border">
      <div class="absolute right-1 top-1">
        <button @click="copyToClipboard">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
      <pre><code class="language-json">
    {
      "name": "{{ manifest.name }}",
      "short_name": "{{ manifest.short_name }}",
      "description": "{{ manifest.description }}",
      "start_url": "{{ manifest.start_url }}",
      "background_color": "{{ manifest.background_color }}",
      "theme_color": "{{ manifest.theme_color }}",
      "display": "{{ manifest.display }}",
    }
    </code></pre>
    </div>
  </section>


  <div v-show="toast.show" class="transition ease-in-out duration-[10000] text-center font-semibold border rounded-xl fixed w-full bg-black text-white p-3 opacity-70 bottom-1">
    <h1>Manifest copied to clipboard</h1>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const manifest = reactive({
  name: '',
  short_name: '',
  description: '',
  start_url: '/',
  background_color: '#fff',
  theme_color: '#fff',
  display: 'standalone',
  lang: 'en'
});

const toast = reactive({ show: false });

function copyToClipboard() {
  navigator.clipboard.writeText(JSON.stringify(manifest, null, 2));
  toast.show = true;
  setTimeout(() => {
    toast.show = false;
  }, 5000);
}
</script>

