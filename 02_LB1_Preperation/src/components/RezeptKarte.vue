<script setup>
defineProps({
  rezept: { type: Object, required: true }
})

const emit = defineEmits(['toggleFavorit'])
</script>

<template>
  <div class="card">
    <div class="card-header">
      <RouterLink :to="`/rezept/${rezept.id}`">
        <h3>{{ rezept.name }}</h3>
      </RouterLink>
      <button class="btn-favorit" @click="emit('toggleFavorit', rezept.id)">
        {{ rezept.favorit ? '❤️' : '🤍' }}
      </button>
    </div>
    <div class="card-badges">
      <span class="badge badge-kategorie">{{ rezept.kategorie }}</span>
      <span class="badge badge-schwierigkeit">{{ rezept.schwierigkeit }}</span>
    </div>
    <div class="card-meta">
      <span>⏱ {{ rezept.zubereitungszeit }} Min.</span>
      <span>👥 {{ rezept.portionen }} Portionen</span>
    </div>
    <div class="card-preview">
      {{ rezept.anleitung.slice(0, 100) }}...
    </div>
  </div>
</template>
