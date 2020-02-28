import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Update = () => import('views/update/Update')
const Picture = () => import('views/picture/Picture')
const Audio = () => import('views/audio/Audio')
const Video = () => import('views/video/Video')
const User = () => import('views/user/User')

const Login = () => import('components/common/login/Login')
const Register = () => import('components/common/login/Register')

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Home
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/update',
    component: Update
  },
  {
    path: '/picture',
    component: Picture
  },
  {
    path: '/audio',
    component: Audio
  },
  {
    path: '/video',
    component: Video
  },
  {
    path: '/user',
    component: User,
    children: [{
        path: '',
        component: Login
      },
      {
        path: 'login',
        component: Login
      },
      {
        path: 'register',
        component: Register
      }
    ]
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
