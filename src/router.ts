import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './components/Home.vue'
import LibraryView from './components/Library.vue'
import PrivacyPolicyView from './components/static/en/PrivacyPolicy.vue'
import RegisterView from './components/auth/Register.vue'
import SigninView from './components/auth/Signin.vue'
import SoundexplorerView from './components/Soundexplorer.vue'
import TermsOfUseView from './components/static/en/TermsOfUse.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/library', component: LibraryView },
  { path: '/privacy-policy', component: PrivacyPolicyView },
  { path: '/register', component: RegisterView },
  { path: '/sign-in', component: SigninView },
  { path: '/sound-explorer', component: SoundexplorerView },
  { path: '/terms-of-use', component: TermsOfUseView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
