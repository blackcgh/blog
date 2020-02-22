import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')

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

export default router
