import axios from './axios'

function register(data) {
  return axios({
    method: 'post',
    url: '/user/register',
    data: JSON.stringify(data),
  })
}

function login(data) {
  return axios({
    method: 'post',
    url: '/user/login',
    data: JSON.stringify(data)
  })
}

export {
  register,
  login
}
