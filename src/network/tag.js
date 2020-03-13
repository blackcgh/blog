import axios from './axios'

function getAll() {
  return axios({
    method: 'get',
    url: '/tag/all'
  })
}

export {
  getAll
}
