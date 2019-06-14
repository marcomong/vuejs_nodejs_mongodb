import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    goToHome ({ commit }) {
      router.push('/')
    },
    goToSignIn () {
      router.push('/signin')
    },
    goToSignUp () {
      router.push('/signUp')
    },
    goToDashboard () {
      router.push('/dashboard')
    }
  },
  modules: {
    auth
  }
})
