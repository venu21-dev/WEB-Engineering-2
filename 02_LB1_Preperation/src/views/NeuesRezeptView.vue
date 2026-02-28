<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRezepteStore } from '@/stores/rezepte'

const router = useRouter()
const store = useRezepteStore()

const formular = ref({
  name: '',
  kategorie: 'Hauptgericht',
  zubereitungszeit: 30,
  schwierigkeit: 'Mittel',
  portionen: 2,
  zutatenText: '',
  anleitung: ''
})

function speichern() {
  const zutaten = formular.value.zutatenText
    .split(',')
    .map(z => z.trim())
    .filter(z => z.length > 0)

  store.rezeptHinzufuegen({
    name: formular.value.name,
    kategorie: formular.value.kategorie,
    zubereitungszeit: Number(formular.value.zubereitungszeit),
    schwierigkeit: formular.value.schwierigkeit,
    portionen: Number(formular.value.portionen),
    zutaten,
    anleitung: formular.value.anleitung
  })

  router.push('/')
}
</script>

<template>
  <div>
    <h2>Neues Rezept erstellen</h2>
    <div class="form-card">
      <form @submit.prevent="speichern">
        <div class="form-group">
          <label for="name">Rezeptname</label>
          <input id="name" type="text" v-model="formular.name" placeholder="z.B. Pasta Bolognese" required />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="kategorie">Kategorie</label>
            <select id="kategorie" v-model="formular.kategorie">
              <option>Hauptgericht</option>
              <option>Vorspeise</option>
              <option>Dessert</option>
              <option>Snack</option>
            </select>
          </div>
          <div class="form-group">
            <label for="schwierigkeit">Schwierigkeit</label>
            <select id="schwierigkeit" v-model="formular.schwierigkeit">
              <option>Einfach</option>
              <option>Mittel</option>
              <option>Schwierig</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="zubereitungszeit">Zubereitungszeit (Min.)</label>
            <input id="zubereitungszeit" type="number" v-model="formular.zubereitungszeit" min="1" required />
          </div>
          <div class="form-group">
            <label for="portionen">Portionen</label>
            <input id="portionen" type="number" v-model="formular.portionen" min="1" required />
          </div>
        </div>

        <div class="form-group">
          <label for="zutaten">Zutaten (kommagetrennt)</label>
          <input id="zutaten" type="text" v-model="formular.zutatenText" placeholder="z.B. 400g Mehl, 3 Eier, 200ml Milch" required />
        </div>

        <div class="form-group">
          <label for="anleitung">Anleitung</label>
          <textarea id="anleitung" v-model="formular.anleitung" placeholder="Schritt-für-Schritt Anleitung..." required></textarea>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-primary">Rezept speichern</button>
          <button type="button" class="btn-secondary" @click="router.push('/')">Abbrechen</button>
        </div>
      </form>
    </div>
  </div>
</template>
