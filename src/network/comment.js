import axios from './axios'

function getList(bid) {
  return axios({
    method: 'get',
    url: '/comment/list',
    params: {
      bid
    }
  })
}

function newComment(comment) {
  return axios({
    method: 'post',
    url: '/comment/new',
    data: comment
  })
}

function likeComment(cid, likeNum, username) {
  return axios({
    method: 'post',
    url: '/comment/like',
    data: {
      cid,
      likeNum,
      username
    }
  })
}

function validateComment(cid, username) {
  return axios({
    method: 'get',
    url: '/comment/validate',
    params: {
      cid,
      username
    }
  })
}

export {
  getList,
  newComment,
  likeComment,
  validateComment
}
