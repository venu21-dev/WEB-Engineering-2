<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Diese Seite wurde nicht gefunden.</p>
    <RouterLink to="/" class="btn">Zurück zur Startseite</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 4rem 1rem;
}

h1 {
  font-size: 5rem;
  color: #e74c3c;
  margin-bottom: 0.5rem;
}

p {
  font-size: 1.3rem;
  color: #555;
  margin-bottom: 2rem;
}

.btn {
  display: inline-block;
  background-color: #44a574;
  color: white;
  padding: 0.75rem 1.75rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #378c60;
}
</style>
