import { createApp } from 'vue'
import './assets/css/reset.css'
import './assets/css/font.css'
import './assets/css/style.css'
import router from './router'
import App from './App.vue'

createApp(App)
  .use(router)
  .mount('#app')
