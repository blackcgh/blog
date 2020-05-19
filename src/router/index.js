import Vue from 'vue'
import VueRouter from 'vue-router'

// 一级路由
const Home = () => import('views/home/Home')
const Dynamic = () => import('views/dynamic/Dynamic')
const Detail = () => import('views/detail/Detail')
const Search = () => import('views/search/Search')
const Message = () => import('views/message/Message')
const History = () => import('views/history/History')
const User = () => import('views/user/User')
const Profile = () => import('views/profile/Profile')

// Message 二级路由
const ReplyMes = () => import('views/message/childcomps/ReplyMes')
const LikeMes = () => import('views/message/childcomps/LikeMes')
const SystemMes = () => import('views/message/childcomps/SystemMes')
const WhisperMes = () => import('views/message/childcomps/WhisperMes')
const ConfigMes = () => import('views/message/childcomps/ConfigMes')

// LikeMes 三级路由
const LikeDetail = () => import('views/message/childcomps/like/LikeDetail')

// WhisperMes 三级路由
const Chat = () => import('views/message/childcomps/whisper/Chat')

// User 二级路由
const Homepage = () => import('views/user/homepage/Homepage')
const MyDynamic = () => import('views/user/dynamic/MyDynamic')
const Blog = () => import('views/user/blog/Blog')
const Follow = () => import('views/user/follow/Follow')
const Star = () => import('views/user/star/Star')
const Set = () => import('views/user/set/Set')


// Blog 三级路由
const BlogList = () => import('views/user//blog/childcomps/BlogList')
const NewBlog = () => import('views/user/blog/childcomps/NewBlog')
const UpdateBlog = () => import('views/user/blog/childcomps/UpdateBlog')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/column/:path',
    component: Home
  },
  {
    path: '/dynamic',
    component: Dynamic
  },
  {
    path: '/message',
    component: Message,
    children: [
      {
        path: 'reply',
        component: ReplyMes
      },
      {
        path: 'like',
        component: LikeMes
      },
      {
        path: 'system',
        component: SystemMes
      },
      {
        path: 'whisper',
        component: WhisperMes,
        children:[
          {
            path: ':uid',
            component: Chat
          }
        ]
      },
      {
        path: 'config',
        component: ConfigMes
      },
      {
        path: 'like/:cid',
        component: LikeDetail
      }
    ]
  },
  {
    path: '/history',
    component: History
  },
  {
    path: '/profile/:name',
    component: Profile
  },
  {
    path: '/blog/:bid',
    component: Detail
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/:userId',
    component: User,
    children: [
      {
        path: 'homepage',
        component: Homepage,
      },
      {
        path: 'dynamic',
        component: MyDynamic
      },
      {
        path: 'follow',
        component: Follow
      },
      {
        path: 'fan',
        component: Follow
      },
      {
        path: 'star',
        component: Star
      },
      {
        path: 'set',
        component: Set
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
      }
    ]
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
