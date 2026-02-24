<template>
  <main class="min-h-screen flex items-center justify-center p-4">
    <article class="text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-200 mb-6" aria-hidden="true">
        <span class="text-3xl font-bold text-stone-400">404</span>
      </div>
      <h1 class="text-2xl font-bold text-stone-800 mb-2">Page not found</h1>
      <p class="text-stone-500 mb-6">The page you're looking for doesn't exist.</p>
      <nav>
        <BaseButton @click="$router.push('/')">
          <template #icon>
            <ArrowLeftIcon class="w-5 h-5" aria-hidden="true" />
          </template>
          Back to home
        </BaseButton>
      </nav>
    </article>
  </main>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/20/solid'
import BaseButton from '@/components/BaseButton.vue'
</script>
