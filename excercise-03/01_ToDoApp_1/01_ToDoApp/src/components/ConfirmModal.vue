<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-stone-900/50 backdrop-blur-sm"
          @click="emit('cancel')"
        />

        <!-- Modal -->
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 space-y-4">
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-3">
              <ExclamationTriangleIcon class="w-6 h-6 text-red-600" aria-hidden="true" />
            </div>
            <h2 :id="titleId" class="text-lg font-semibold text-stone-800">
              {{ title }}
            </h2>
            <p class="text-stone-500 text-sm mt-1">
              {{ message }}
            </p>
          </div>

          <div class="flex gap-3 pt-2">
            <BaseButton variant="secondary" class="flex-1" @click="emit('cancel')">
              Cancel
            </BaseButton>
            <BaseButton variant="danger" class="flex-1" @click="emit('confirm')">
              <template #icon>
                <TrashIcon class="w-5 h-5" aria-hidden="true" />
              </template>
              Delete
            </BaseButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ExclamationTriangleIcon, TrashIcon } from '@heroicons/vue/20/solid'
import BaseButton from '@/components/BaseButton.vue'

interface Props {
  isOpen: boolean
  title?: string
  message?: string
}

interface Emits {
  confirm: []
  cancel: []
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Delete task?',
  message: 'This action cannot be undone.',
})

const emit = defineEmits<Emits>()

const titleId = computed(() => `modal-title-${Math.random().toString(36).slice(2, 9)}`)
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
