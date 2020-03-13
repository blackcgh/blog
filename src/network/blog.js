import axios from './axios'

function getAll(blogCount) {
  return axios({
    method: 'get',
    url: '/blog/all',
    params: { blogCount }
  })
}

function getBlogList(uid) {
  return axios({
    method: 'get',
    url: '/blog/bloglist',
    params: { uid }
  })
}

function getList(uid) {
  return axios({
    method: 'get',
    url: '/blog/list',
    params: { uid }
  })
}

function getDetail(bid) {
  return axios({
    method: 'get',
    url: '/blog/detail',
    params: { bid }
  })
}

function newBlog(blog, tag) {
  return axios({
    method: 'post',
    url: '/blog/new',
    data: {
      blog,
      tag
    }
  })
}

function updateBlog(blog, tag) {
  return axios({
    method: 'post',
    url: '/blog/update',
    data: {
      blog,
      tag
    }
  })
}

function delBlog(bid) {
  return axios({
    method: 'post',
    url: '/blog/del',
    data: { bid }
  })
}

function likeBlog(bid, likeNum, username) {
  return axios({
    method: 'post',
    url: '/blog/like',
    data: {
      bid,
      likeNum,
      username
    }
  })
}

function validateBlog(bid, username) {
  return axios({
    method: 'get',
    url: '/blog/validate',
    params: {
      bid,
      username
    }
  })
}

export {
  getAll,
  getBlogList,
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
  likeBlog,
  validateBlog
}
