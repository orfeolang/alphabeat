import { createMemoryHistory, createRouter } from 'vue-router'

import RegisterView from './components/auth/Register.vue'
import SigninView from './components/auth/Signin.vue'
import SoundexplorerView from './components/Soundexplorer.vue'
import SoundlibraryView from './components/Soundlibrary.vue'
import TermsOfUseView from './components/static/en/TermsOfUse.vue'
import PrivacyPolicyView from './components/static/en/PrivacyPolicy.vue'

const routes = [
  { path: '/register', component: RegisterView },
  { path: '/sign-in', component: SigninView },
  { path: '/explorer', component: SoundexplorerView },
  { path: '/library', component: SoundlibraryView },
  { path: '/terms-of-use', component: TermsOfUseView },
  { path: '/privacy-policy', component: PrivacyPolicyView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
