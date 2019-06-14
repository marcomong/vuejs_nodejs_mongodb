import { instance as axios, apis } from '@/axios'

function signIn (user, callback) {
  axios.post(apis.signIn, user)
    .then((res) => {
      callback(null, res.data)
    })
    .catch((err) => {
      callback(err.response.data)
    })
}

function signUp (user, callback) {
  axios.post(apis.signUp, user)
    .then((res) => {
      callback(null, res.data)
    })
    .catch((err) => {
      callback(err.response.data)
    })
}

export default {
  signIn,
  signUp
}
