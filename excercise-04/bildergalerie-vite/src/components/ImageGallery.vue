<script>
import { ref, computed } from 'vue'

export default {
  name: 'ImageGallery',
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const currentIndex = ref(0)

    const currentImage = computed(() => props.images[currentIndex.value])

    const prev = () => {
      currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
    }

    const next = () => {
      currentIndex.value = (currentIndex.value + 1) % props.images.length
    }

    const selectImage = (index) => {
      currentIndex.value = index
      emit('click', index)
    }

    return {
      currentIndex,
      currentImage,
      prev,
      next,
      selectImage,
    }
  },
}
</script>

<template>
  <div class="gallery">
    <div class="main-view">
      <button class="nav-btn" @click="prev">&#8592;</button>
      <img :src="currentImage" :alt="`Bild ${currentIndex + 1}`" class="main-image" @click="selectImage(currentIndex)" />
      <button class="nav-btn" @click="next">&#8594;</button>
    </div>

    <div class="thumbnails">
      <img
        v-for="(url, index) in images"
        :key="index"
        :src="url"
        :alt="`Thumbnail ${index + 1}`"
        class="thumbnail"
        :class="{ active: index === currentIndex }"
        @click="selectImage(index)"
      />
    </div>
  </div>
</template>

<style scoped>
.gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.main-view {
  display: flex;
  align-items: center;
  gap: 12px;
}

.main-image {
  width: 400px;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.nav-btn {
  font-size: 24px;
  padding: 10px 16px;
  cursor: pointer;
  border: none;
  background: #e0e0e0;
  border-radius: 6px;
  transition: background 0.2s;
}

.nav-btn:hover {
  background: #bdbdbd;
}

.thumbnails {
  display: flex;
  gap: 8px;
}

.thumbnail {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s;
}

.thumbnail.active {
  border-color: #42b883;
}

.thumbnail:hover {
  border-color: #aaa;
}
</style>