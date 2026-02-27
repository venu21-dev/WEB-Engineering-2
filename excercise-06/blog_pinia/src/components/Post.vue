<script>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { usePostStore } from '@/store'

export default {
  name: 'Post',
  components: { RouterLink },
  setup() {
    const route = useRoute()
    const store = usePostStore()

    if (store.posts.length === 0) {
      store.fetchPosts()
    }

    const post = computed(() => store.posts.find((p) => p.id === route.params.id))

    return { post }
  },
}
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
