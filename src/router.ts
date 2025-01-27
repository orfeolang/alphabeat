import { createMemoryHistory, createRouter } from 'vue-router'

import RegisterView from './components/auth/Register.vue'
import SigninView from './components/auth/Signin.vue'
import SoundexplorerView from './components/Soundexplorer.vue'
import SoundlibraryView from './components/Soundlibrary.vue'

const routes = [
  { path: '/register', component: RegisterView },
  { path: '/sign-in', component: SigninView },
  { path: '/explorer', component: SoundexplorerView },
  { path: '/library', component: SoundlibraryView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
