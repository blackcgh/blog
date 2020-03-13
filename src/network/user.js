import axios from './axios'

function register(data) {
  return axios({
    method: 'post',
    url: '/user/register',
    data
  })
}

function login(data) {
  return axios({
    method: 'post',
    url: '/user/login',
    data
  })
}

function logout() {
  return axios({
    method: 'post',
    url: '/user/logout'
  })
}

export {
  register,
  login,
  logout
}
