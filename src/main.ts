import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import store from './store'
import '@router/permission'

import 'normalize.css'

import '@/styles/index.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(store)

router.isReady().then(() => {
  app.mount('#app')
})
