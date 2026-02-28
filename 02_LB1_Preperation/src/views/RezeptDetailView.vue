<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRezepteStore } from '@/stores/rezepte'

const route = useRoute()
const router = useRouter()
const store = useRezepteStore()

const rezept = computed(() => store.getRezeptById(route.params.id))

function loeschen() {
  if (confirm(`"${rezept.value.name}" wirklich löschen?`)) {
    store.rezeptLoeschen(rezept.value.id)
    router.push('/')
  }
}
</script>

<template>
  <div class="rezept-detail">
    <button class="detail-zurueck" @click="router.back()">← Zurück</button>

    <div v-if="rezept">
      <div class="detail-header">
        <h2>{{ rezept.name }}</h2>
        <button class="btn-favorit" @click="store.toggleFavorit(rezept.id)">
          {{ rezept.favorit ? '❤️' : '🤍' }}
        </button>
      </div>

      <div class="rezept-meta">
        <span class="badge badge-kategorie">{{ rezept.kategorie }}</span>
        <span class="trenner"></span>
        <span class="badge badge-schwierigkeit">{{ rezept.schwierigkeit }}</span>
        <span class="trenner"></span>
        <span>⏱ {{ rezept.zubereitungszeit }} Min.</span>
        <span class="trenner"></span>
        <span>👥 {{ rezept.portionen }} Portionen</span>
      </div>

      <div class="detail-sections">
        <div class="detail-section">
          <h3>Zutaten</h3>
          <ul class="zutaten-liste">
            <li v-for="zutat in rezept.zutaten" :key="zutat">{{ zutat }}</li>
          </ul>
        </div>
        <div class="detail-section">
          <h3>Anleitung</h3>
          <p>{{ rezept.anleitung }}</p>
        </div>
      </div>

      <div class="detail-actions">
        <button class="btn-danger" @click="loeschen">Rezept löschen</button>
      </div>
    </div>

    <div v-else class="leer-nachricht">
      <p>Rezept nicht gefunden.</p>
      <RouterLink to="/">Zur Übersicht</RouterLink>
    </div>
  </div>
</template>
