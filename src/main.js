import App from './App.vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import VeeValidatePlugin from './plugins/validation'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './plugins/firebase'

import './assets/styles/main.scss'

let app

onAuthStateChanged(auth, () => {
  if (!app) {
    const app = createApp(App)

    app.use(createPinia())
    app.use(router)
    app.use(VeeValidatePlugin)

    app.mount('#app')
  }
})
