<script>
import { computed, reactive, ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { usePostStore } from '@/store'

export default {
  name: 'Blog',
  components: { RouterLink },
  setup() {
    const store = usePostStore()

    onMounted(() => {
      store.fetchPosts()
    })

    const posts = computed(() => store.posts)

    const searchQuery = ref('')

    const filteredPosts = computed(() => {
      if (!searchQuery.value.trim()) return posts.value
      const query = searchQuery.value.toLowerCase()
      return posts.value.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query)
      )
    })

    const newPost = reactive({
      title: '',
      content: '',
    })

    const addPost = () => {
      if (newPost.title.trim() && newPost.content.trim()) {
        store.addNewPost({ title: newPost.title, content: newPost.content })
        newPost.title = ''
        newPost.content = ''
      }
    }

    return {
      posts,
      searchQuery,
      filteredPosts,
      newPost,
      addPost,
    }
  },
}
</script>

<template>
  <div class="blog">
    <h1>Blog</h1>

    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Posts durchsuchen..."
      />
    </div>

    <p v-if="filteredPosts.length === 0" class="no-results">
      Keine Posts gefunden für "{{ searchQuery }}".
    </p>

    <ul v-else class="post-list">
      <li v-for="post in filteredPosts" :key="post.id" class="post-card">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
        <RouterLink :to="`/blog/${post.id}`" class="read-more">Weiterlesen →</RouterLink>
      </li>
    </ul>

    <div class="new-post-form">
      <h2>Neuen Post hinzufügen</h2>
      <input
        v-model="newPost.title"
        type="text"
        placeholder="Titel"
      />
      <textarea
        v-model="newPost.content"
        placeholder="Inhalt"
        rows="4"
      ></textarea>
      <button @click="addPost">Post hinzufügen</button>
    </div>
  </div>
</template>

<style scoped>
.blog h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.search-bar {
  margin-bottom: 2rem;
}

.search-bar input {
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;
}

.search-bar input:focus {
  border-color: #44a574;
}

.no-results {
  color: #888;
  font-style: italic;
}

.post-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.post-card {
  background: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
}

.post-card h2 {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.post-card p {
  color: #555;
  margin-bottom: 1rem;
}

.read-more {
  color: #44a574;
  font-weight: 600;
  text-decoration: none;
}

.read-more:hover {
  text-decoration: underline;
}

.new-post-form {
  margin-top: 3rem;
  padding: 1.5rem;
  background: #f0f8f4;
  border: 1px solid #b2dcc8;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.new-post-form h2 {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.new-post-form input,
.new-post-form textarea {
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  font-family: inherit;
  transition: border-color 0.2s;
}

.new-post-form input:focus,
.new-post-form textarea:focus {
  border-color: #44a574;
}

.new-post-form button {
  align-self: flex-start;
  background-color: #44a574;
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.new-post-form button:hover {
  background-color: #378c60;
}
</style>
