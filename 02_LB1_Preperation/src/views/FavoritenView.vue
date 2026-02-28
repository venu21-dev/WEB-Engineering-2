<script setup>
import { useRezepteStore } from '@/stores/rezepte'
import RezeptKarte from '@/components/RezeptKarte.vue'

const store = useRezepteStore()
</script>

<template>
  <div>
    <h2>Meine Favoriten</h2>

    <div v-if="store.favoriten.length > 0" class="rezept-grid">
      <RezeptKarte
        v-for="rezept in store.favoriten"
        :key="rezept.id"
        :rezept="rezept"
        @toggleFavorit="store.toggleFavorit"
      />
    </div>
    <div v-else class="leer-nachricht">
      <p>Noch keine Favoriten vorhanden.</p>
      <RouterLink to="/">Rezepte entdecken</RouterLink>
    </div>
  </div>
</template>
