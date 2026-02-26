<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import posts from '../data/posts'

const route = useRoute()

const post = computed(() => posts.find((p) => p.id === route.params.id))
</script>

<template>
  <div class="post">
    <RouterLink to="/blog" class="back-link">← Zurück zum Blog</RouterLink>

    <div v-if="post">
      <h1>{{ post.title }}</h1>
      <p>{{ post.content }}</p>
    </div>

    <div v-else class="not-found">
      <p>Post nicht gefunden.</p>
    </div>
  </div>
</template>

<style scoped>
.back-link {
  display: inline-block;
  color: #44a574;
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 1.5rem;
}

.back-link:hover {
  text-decoration: underline;
}

h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

p {
  font-size: 1.1rem;
  color: #444;
  line-height: 1.7;
}

.not-found {
  color: #888;
  font-style: italic;
}
</style>
