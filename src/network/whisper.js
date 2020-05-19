import axios from './axios'

function getWhisper(sid, rid) {
  return axios({
    method: 'GET',
    url: '/whisper/list',
    params: { sid, rid }
  })
}

function newWhisper(whisper) {
  return axios({
    method: 'POST',
    url: '/whisper/new',
    data: whisper
  })
}

export {
  getWhisper,
  newWhisper
}
