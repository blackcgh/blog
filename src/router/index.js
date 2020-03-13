import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Dynamic = () => import('views/dynamic/Dynamic')
const Detail = () => import('views/detail/Detail')
const Picture = () => import('views/picture/Picture')
const Audio = () => import('views/audio/Audio')
const Video = () => import('views/video/Video')
const User = () => import('views/user/User')
const Account = () => import('views/account/Account')

const Admin = () => import('views/account/childcomps/Admin')
const Profile = () => import('views/account/childcomps/Profile')
const Blog = () => import('views/account/childcomps/blog/Blog')
const Follow = () => import('views/account/childcomps/Follow')
const Star = () => import('views/account/childcomps/Star')
const Message = () => import('views/account/childcomps/Message')
const Block = () => import('views/account/childcomps/Block')
const Setting = () => import('views/account/childcomps/Setting')

const Login = () => import('components/common/login/Login')
const Register = () => import('components/common/login/Register')

const BlogList = () => import('views/account/childcomps/blog/childcomps/BlogList')
const NewBlog = () => import('views/account/childcomps/blog/childcomps/NewBlog')
const UpdateBlog = () => import('views/account/childcomps/blog/childcomps/UpdateBlog')

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/dynamic',
    component: Dynamic
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
    path: '/blog/:bid',
    component: Detail
  },
  {
    path: '/user',
    component: User,
    children: [{
        path: '',
        redirect: 'login'
      },
      {
        path: 'login',
        component: Login
      },
      {
        path: 'register',
        component: Register
      },
    ]
  },
  {
    path: '/:userId',
    component: Account,
    children: [
      {
        path: '',
        component: Admin
      },
      {
        path: 'profile',
        component: Profile
      },
      {
        path: 'blog',
        component: Blog,
        children: [
          {
            path: '',
            component: BlogList
          },
          {
            path: 'new',
            component: NewBlog
          },
          {
            path: 'update/:bid',
            component: UpdateBlog
          }
        ]
      },
      {
        path: 'follow',
        component: Follow
      },
      {
        path: 'star',
        component: Star
      },
      {
        path: 'message',
        component: Message
      },
      {
        path: 'block',
        component: Block
      },
      {
        path: 'setting',
        component: Setting
      }
    ]
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
