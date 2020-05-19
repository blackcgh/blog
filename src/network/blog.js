import axios from './axios'

function getAll(page, category, flag, uid) {
  return axios({
    method: 'GET',
    url: '/blog/all',
    params: { page, category, flag, uid }
  })
}

function getBlogList(uid, c) {
  return axios({
    method: 'GET',
    url: '/blog/bloglist',
    params: { uid, c }
  })
}

function getList(uid) {
  return axios({
    method: 'GET',
    url: '/blog/list',
    params: { uid }
  })
}

function getDetail(bid, uid) {
  return axios({
    method: 'GET',
    url: '/blog/detail',
    params: { bid, uid }
  })
}

function newBlog(formData) {
  return axios({
    method: 'POST',
    url: '/blog/new',
    data: formData,
    headers: {'Content-Type': 'multipart/form-data'}
  })
}

function updateDetail(bid) {
  return axios({
    method: 'POST',
    url: '/blog/detail',
    data: { bid }
  })
}

function updateBlog(blog, tag) {
  return axios({
    method: 'POST',
    url: '/blog/update',
    data: {
      blog,
      tag
    }
  })
}

function delBlog(bid, uid) {
  return axios({
    method: 'POST',
    url: '/blog/del',
    data: { bid, uid }
  })
}

function likeBlog(bid, likeNum, likeId) {
  return axios({
    method: 'POST',
    url: '/blog/like',
    data: {
      bid,
      likeNum,
      likeId
    }
  })
}

function starBlog(bid, starNum, starId) {
  return axios({
    method: 'POST',
    url: '/blog/star',
    data: {
      bid,
      starNum,
      starId
    }
  })
}

function getStarBlog(bids) {
  return axios({
    method: 'GET',
    url: '/blog/starblog',
    params: { bids }
  })
}

function delAllStar(bids, uid) {
  return axios({
    method: 'POST',
    url: '/blog/allstar',
    data: { bids, uid }
  })
}

function getMyDynamic(uid) {
  return axios({
    method: 'GET',
    url: '/blog/mydynamic',
    params: { uid }
  })
}

function getDynamic(uids) {
  return axios({
    method: 'GET',
    url: '/blog/dynamic',
    params: { uids }
  })
}

function search(keyword) {
  return axios({
    method: 'GET',
    url: '/search/list',
    params: { keyword }
  })
}

function getHistory(bids) {
  return axios({
    method: 'GET',
    url: '/blog/historylist',
    params: { bids }
  })
}

function uploadBlogImg(formData) {
  return axios({
    method: 'POST',
    url: '/blog/img',
    data: formData,
    headers: {'Content-Type': 'multipart/form-data'}
  })
}

export {
  getAll,
  getBlogList,
  getList,
  getDetail,
  newBlog,
  updateDetail,
  updateBlog,
  delBlog,
  likeBlog,
  starBlog,
  getStarBlog,
  delAllStar,
  getMyDynamic,
  getDynamic,
  search,
  getHistory,
  uploadBlogImg
}
