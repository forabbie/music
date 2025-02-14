import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth, usersCollection } from '@/plugins/firebase'

export const useAuthStore = defineStore('auth', () => {
  const isAuthModalOpen = ref(false)
  const userLoggedIn = ref(false)
  const toggleAuthModal = () => {
    isAuthModalOpen.value = !isAuthModalOpen.value
  }

  const toggleAuth = () => {
    userLoggedIn.value = !userLoggedIn.value
  }

  const register = async (payload) => {
    const userCred = await auth.createUserWithEmailAndPassword(payload.email, payload.password)

    await usersCollection.doc(userCred.user.uid).set({
      name: payload.name,
      email: payload.email,
      age: payload.age,
      country: payload.country
    })

    await userCred.user.updateProfile({
      displayName: payload.name
    })

    toggleAuth()
  }

  const login = async (payload) => {
    await auth.signInWithEmailAndPassword(payload.email, payload.password)

    toggleAuth()
  }

  const init_login = () => {
    const user = auth.currentUser

    if (user) {
      toggleAuth()
    }
  }

  const signout = async () => {
    await auth.signOut()
    toggleAuth()
  }
  return { toggleAuthModal, toggleAuth, register, login, init_login, signout, isAuthModalOpen }
})
