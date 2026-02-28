<script setup>
defineProps({
  kategorien: { type: Array, required: true },
  aktiveKategorie: { type: String, default: '' }
})

const emit = defineEmits(['filterChanged'])
</script>

<template>
  <div class="filter-leiste">
    <button
      class="filter-btn"
      :class="{ aktiv: aktiveKategorie === '' }"
      @click="emit('filterChanged', '')"
    >Alle</button>
    <button
      v-for="k in kategorien"
      :key="k"
      class="filter-btn"
      :class="{ aktiv: aktiveKategorie === k }"
      @click="emit('filterChanged', k)"
    >{{ k }}</button>
  </div>
</template>
