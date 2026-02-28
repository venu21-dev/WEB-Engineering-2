import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { starterRezepte } from '@/data/rezepte'

export const useRezepteStore = defineStore('rezepte', () => {
  const rezepte = ref([...starterRezepte])
  const aktiveKategorie = ref('')

  const kategorien = computed(() => [...new Set(rezepte.value.map(r => r.kategorie))])

  const gefilterteRezepte = computed(() => {
    if (!aktiveKategorie.value) return rezepte.value
    return rezepte.value.filter(r => r.kategorie === aktiveKategorie.value)
  })

  const favoriten = computed(() => rezepte.value.filter(r => r.favorit))

  const statistiken = computed(() => ({
    anzahl: rezepte.value.length,
    anzahlFavoriten: favoriten.value.length,
    durchschnittszeit: rezepte.value.length > 0
      ? Math.round(rezepte.value.reduce((sum, r) => sum + r.zubereitungszeit, 0) / rezepte.value.length)
      : 0
  }))

  function setzeKategorie(kategorie) {
    aktiveKategorie.value = kategorie
  }

  function resetKategorie() {
    aktiveKategorie.value = ''
  }

  function toggleFavorit(id) {
    const rezept = rezepte.value.find(r => r.id === id)
    if (rezept) rezept.favorit = !rezept.favorit
  }

  function rezeptHinzufuegen(neuesRezept) {
    const maxId = rezepte.value.reduce((max, r) => Math.max(max, r.id), 0)
    rezepte.value.push({ ...neuesRezept, id: maxId + 1, favorit: false })
  }

  function rezeptLoeschen(id) {
    const index = rezepte.value.findIndex(r => r.id === id)
    if (index !== -1) rezepte.value.splice(index, 1)
  }

  function getRezeptById(id) {
    return rezepte.value.find(r => r.id === Number(id))
  }

  return {
    rezepte,
    aktiveKategorie,
    kategorien,
    gefilterteRezepte,
    favoriten,
    statistiken,
    setzeKategorie,
    resetKategorie,
    toggleFavorit,
    rezeptHinzufuegen,
    rezeptLoeschen,
    getRezeptById
  }
})
