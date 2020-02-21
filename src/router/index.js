const Vue = require('vue')
const VueRouter = require('vue-router')

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

module.exports = router
