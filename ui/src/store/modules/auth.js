import authService from '@/services/authService'

const state = {
  token: null,
  refreshToken: null,
  userId: null,
  isLogged: false
}

const mutations = {
  setCookies (state, payload) {
    localStorage.setItem('token', payload.token)
    localStorage.setItem('refreshToken', payload.refreshToken)
    localStorage.setItem('userId', payload._id)
    localStorage.setItem('isLogged', true)
  },
  storeUser (state, payload) {
    state.token = payload.token
    state.refreshToken = payload.refreshToken
    state.userId = payload._id
    state.isLogged = true
  },
  resetUserInfo (state) {
    state.token = null
    state.refreshToken = null
    state.userId = null
    state.isLogged = false
  }
}

const getters = {
  isLogged: state => state.isLogged
}

const actions = {
  signUp ({ commit, dispatch }, payload) {
    authService.signUp(payload, (err, res) => {
      if (err) {
        console.log(err)
      } else {
        commit('setCookies', res)
        commit('storeUser', res)
        dispatch('goToHome')
      }
    })
  },
  signIn ({ commit, dispatch }, payload) {
    authService.signIn(payload, (err, res) => {
      if (err) {
        console.log(err)
      } else {
        commit('setCookies', res)
        commit('storeUser', res)
        dispatch('goToHome')
      }
    })
  },
  tryAutoSignIn ({ commit, dispatch }, page) {
    const token = localStorage.getItem('token')
    const _id = localStorage.getItem('userId')
    const refreshToken = localStorage.getItem('refreshToken')
    if (!token || !_id || !refreshToken) return

    commit('storeUser', { token, _id, refreshToken })
    if (page === 'signin') {
      dispatch('goToDashboard')
    }
  },
  logOut ({ commit, dispatch }) {
    commit('resetUserInfo')
    localStorage.clear()
    localStorage.setItem('isLogged', false)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
