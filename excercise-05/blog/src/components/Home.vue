<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="home">
    <h1>Willkommen auf meinem Blog</h1>
    <p>Hier findest du interessante Artikel zu verschiedenen Themen.</p>
    <RouterLink to="/blog" class="btn">Alle Posts ansehen</RouterLink>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  padding: 4rem 1rem;
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
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
