import axios from './axios'

function sendQuestion(uid, username, question) {
  return axios({
    method: 'POST',
    url: '/question/aid',
    data: { uid, username, question }
  })
}

export {
  sendQuestion
}
