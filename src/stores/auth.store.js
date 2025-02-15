import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth, db } from '@/plugins/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

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
    const userCred = await createUserWithEmailAndPassword(auth, payload.email, payload.password)

    // Save user info in Firestore
    await setDoc(doc(db, 'users', userCred.user.uid), {
      name: payload.name,
      email: payload.email,
      age: payload.age,
      country: payload.country
    })

    // Update user's display name
    await updateProfile(userCred.user, {
      displayName: payload.name
    })

    toggleAuth()
  }

  const login = async (payload) => {
    await signInWithEmailAndPassword(auth, payload.email, payload.password)

    toggleAuth()
  }

  const init_login = () => {
    const user = auth.currentUser

    if (user) {
      toggleAuth()
    }
  }

  const signout = async () => {
    await signOut(auth)
    toggleAuth()
  }
  return {
    toggleAuthModal,
    toggleAuth,
    register,
    login,
    init_login,
    signout,
    isAuthModalOpen,
    userLoggedIn
  }
})
