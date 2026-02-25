<script>
import ImageGallery from './components/ImageGallery.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    ImageGallery,
  },
  setup() {
    const images = ref([
      'https://picsum.photos/seed/gallery1/400/400',
      'https://picsum.photos/seed/gallery2/400/400',
      'https://picsum.photos/seed/gallery3/400/400',
      'https://picsum.photos/seed/gallery4/400/400',
    ])

    const lastClickedIndex = ref(null)

    const handleImageClick = (index) => {
      lastClickedIndex.value = index
      console.log('Bild angeklickt, Index:', index)
    }

    return {
      images,
      lastClickedIndex,
      handleImageClick,
    }
  },
})
</script>

<template>
  <div class="app">
    <h1>Bildergalerie</h1>
    <ImageGallery :images="images" @click="handleImageClick" />
    <p v-if="lastClickedIndex !== null" class="click-info">
      Zuletzt angeklickt: Bild {{ lastClickedIndex + 1 }}
    </p>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  font-family: sans-serif;
}

h1 {
  margin-bottom: 24px;
}

.click-info {
  margin-top: 16px;
  color: #42b883;
  font-weight: bold;
}
</style>