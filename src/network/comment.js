import axios from './axios'

function newComment(comment) {
  return axios({
    method: 'post',
    url: '/comment/new',
    data: comment
  })
}

function likeComment(cid, likeNum, likeId) {
  return axios({
    method: 'post',
    url: '/comment/like',
    data: {
      cid,
      likeNum,
      likeId
    }
  })
}

export {
  newComment,
  likeComment
}
