import axios from './axios'

function getReply(uid, total) {
  return axios({
    method: 'GET',
    url: '/message/reply',
    params: { uid, total }
  })
}

function delReply(uid, replyId) {
  return axios({
    method: 'POST',
    url: '/message/delreply',
    data: { uid, replyId }
  })
}

function getLike(uid, total) {
  return axios({
    method: 'GET',
    url: '/message/like',
    params: { uid, total }
  })
}

function getSystem(uid, total) {
  return axios({
    method: 'GET',
    url: '/message/system',
    params: { uid, total }
  })
}

function getWhisperUser(uid, cid, total) {
  return axios({
    method:'GET',
    url: '/message/whisper',
    params: { uid, cid, total }
  })
}

function delWhisperUser(uid, cid) {
  return axios({
    method: 'POST',
    url: '/message/delwhisper',
    data: { uid, cid }
  })
}

function saveMessage(uid, messageSet) {
  return axios({
    method: 'POST',
    url: '/message/save',
    data: { uid, messageSet }
  })
}

export {
  getReply,
  delReply,
  getLike,
  getSystem,
  getWhisperUser,
  delWhisperUser,
  saveMessage
}
