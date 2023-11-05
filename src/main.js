import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

router.beforeEach((to) => {
  document.title = to.meta.title ?? 'Real Estate'

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
})
