import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

export const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://productionServer/' : 'http://localhost:8000/'
})

instance.defaults.headers.common['authorization'] = getAccessToken()

const refreshAuthLogic = failedRequest => instance.post(apis.refreshToken, getRefreshTokenInfo())
  .then(tokenRefresh => {
    const newToken = tokenRefresh.data.token
    localStorage.setItem('token', newToken)
    failedRequest.response.config.headers['authorization'] = getAccessToken()
    return Promise.resolve()
  })

function getRefreshTokenInfo () {
  return {
    _id: localStorage.getItem('userId'),
    refreshToken: localStorage.getItem('refreshToken')
  }
}

function getAccessToken () {
  return localStorage.getItem('token')
}

createAuthRefreshInterceptor(instance, refreshAuthLogic)

export const apis = {
  signIn: '/user/signIn',
  signUp: '/user/signUp',
  refreshToken: 'auth/refreshToken'
}
