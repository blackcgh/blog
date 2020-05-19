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

function validate() {
  return axios({
    method: 'GET',
    url: '/user/validate'
  })
}

function addFavorite(uid, favorite) {
  return axios({
    method: 'POST',
    url: '/user/add',
    data: {
      uid,
      favorite
    }
  })
}

function delFavorite(uid, fid) {
  return axios({
    method: 'POST',
    url: '/user/del',
    data: {
      uid,
      fid
    }
  })
}

function updateFavorite(fid, favorite) {
  return axios({
    method: 'POST',
    url: '/user/update',
    data: {
      fid,
      favorite
    }
  })
}

function addStar(fid,ofid,  bid) {
  return axios({
    method: 'POST',
    url: '/user/addstar',
    data: {
      fid,
      ofid,
      bid
    }
  })
}

function delStar(fid, bid) {
  return axios({
    method: 'POST',
    url: '/user/delstar',
    data: {
      fid,
      bid
    }
  })
}

function addFollow(mid, fid, hid) {
  return axios({
    method: 'POST',
    url: '/user/follow',
    data: {
      mid,
      fid,
      hid
    }
  })
}

function getFollow(hids) {
  return axios({
    method: 'GET',
    url: '/user/followlist',
    params: { hids }
  })
}

function changeFollow(did, aid, fid) {
  return axios({
    method: 'POST',
    url: '/user/changefollow',
    data: {
      did,
      aid,
      fid
    }
  })
}

function cancelFollow(mid, fid, hid) {
  return axios({
    method: 'POST',
    url: '/user/cancelfollow',
    data: {
      mid,
      fid,
      hid
    }
  })
}

function searchUser(keyword) {
  return axios({
    method: 'GET',
    url: '/user/search',
    params: { keyword }
  })
}

function emptyHistory(uid) {
  return axios({
    method: 'POST',
    url: '/user/emptyhistory',
    data: { uid }
  })
}

function delHistory(uid, bid) {
  return axios({
    method: 'POST',
    url: '/user/delhistory',
    data: { uid, bid }
  })
}

function updateSet(uid, userSet) {
  return axios({
    method: 'POST',
    url: '/user/updateset',
    data: { uid, userSet }
  })
}

function updateSign(uid, sign) {
  return axios({
    method: 'POST',
    url: '/user/updatesign',
    data: { uid, sign }
  })
}

function updateNotice(uid, notice) {
  return axios({
    method: 'POST',
    url: '/user/updatenotice',
    data: { uid, notice }
  })
}

function getUserData(uid) {
  return axios({
    method: 'GET',
    url: '/user/userdata',
    params: { uid }
  })
}

function saveUserInfo(userInfo) {
  return axios({
    method: 'POST',
    url: '/user/info',
    data: userInfo
  })
}

function updateAvatar(formData) {
  return axios({
    method: 'POST',
    url: '/user/avatar',
    data: formData,
    headers: {'Content-Type': 'multipart/form-data'}
  })
}

function updateBgImg(formData) {
  return axios({
    method: 'POST',
    url: '/user/bgimg',
    data: formData,
    headers: {'Content-Type': 'multipart/form-data'}
  })
}

export {
  register,
  login,
  logout,
  validate,
  addFavorite,
  delFavorite,
  updateFavorite,
  addStar,
  delStar,
  addFollow,
  getFollow,
  changeFollow,
  cancelFollow,
  searchUser,
  emptyHistory,
  delHistory,
  updateSet,
  updateSign,
  updateNotice,
  getUserData,
  saveUserInfo,
  updateAvatar,
  updateBgImg
}
