import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthModalStore = defineStore('authModal', () => {
  const isOpen = ref(false)
  const toggleAuthModal = () => {
    isOpen.value = !isOpen.value
  }
  return { toggleAuthModal, isOpen }
})
