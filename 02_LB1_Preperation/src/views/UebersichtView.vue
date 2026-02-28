<script setup>
import { useRezepteStore } from '@/stores/rezepte'
import RezeptKarte from '@/components/RezeptKarte.vue'
import KategorieFilter from '@/components/KategorieFilter.vue'

const store = useRezepteStore()
</script>

<template>
  <div>
    <h2>Alle Rezepte</h2>

    <div class="statistik">
      <div class="stat-box">
        <div class="zahl">{{ store.statistiken.anzahl }}</div>
        <div class="beschreibung">Rezepte</div>
      </div>
      <div class="stat-box">
        <div class="zahl">{{ store.statistiken.anzahlFavoriten }}</div>
        <div class="beschreibung">Favoriten</div>
      </div>
      <div class="stat-box">
        <div class="zahl">{{ store.statistiken.durchschnittszeit }}</div>
        <div class="beschreibung">Ø Minuten Zubereitungszeit</div>
      </div>
    </div>

    <KategorieFilter
      :kategorien="store.kategorien"
      :aktiveKategorie="store.aktiveKategorie"
      @filterChanged="store.setzeKategorie"
    />

    <div v-if="store.gefilterteRezepte.length > 0" class="rezept-grid">
      <RezeptKarte
        v-for="rezept in store.gefilterteRezepte"
        :key="rezept.id"
        :rezept="rezept"
        @toggleFavorit="store.toggleFavorit"
      />
    </div>
    <div v-else class="leer-nachricht">
      <p>Keine Rezepte in dieser Kategorie gefunden.</p>
    </div>
  </div>
</template>
