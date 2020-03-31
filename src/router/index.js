import Vue from 'vue'
import VueRouter from 'vue-router'

// 一级路由
const Home = () => import('views/home/Home')
const Column = () => import('views/column/Column')
const Dynamic = () => import('views/dynamic/Dynamic')
const Detail = () => import('views/detail/Detail')
const Picture = () => import('views/picture/Picture')
const Audio = () => import('views/audio/Audio')
const Video = () => import('views/video/Video')
const User = () => import('components/content/user/User')
const Person = () => import('views/person/Person')

// Person 二级路由
const Profile = () => import('views/person/profile/Profile')
const Homepage = () => import('views/person/homepage/Homepage')
const Follow = () => import('views/person/follow/Follow')
const Star = () => import('views/person/star/Star')
const Message = () => import('views/person/message/Message')
const Block = () => import('views/person/block/Block')
const Set = () => import('views/person/set/Set')
const Blog = () => import('views/person/blog/Blog')

// Blog 三级路由
const BlogList = () => import('views/person//blog/childcomps/list/BlogList')
const NewBlog = () => import('views/person/blog/childcomps/NewBlog')
const UpdateBlog = () => import('views/person/blog/childcomps/UpdateBlog')

// Homepage 三级路由
// const UserPage = () => import('views/person/homepage/childcomps/UserPage')
// const UserDynamic = () => import('views/person/homepage/childcomps/UserDynamic')
// const UserBlog = () => import('views/person/homepage/childcomps/UserBlog')
// const UserMessage = () => import('views/person/homepage/childcomps/UserMessage')
// const UserFollow = () => import('views/person/homepage/childcomps/UserFollow')
// const UserFan = () => import('views/person/homepage/childcomps/UserFan')
// const UserStar = () => import('views/person/homepage/childcomps/UserStar')
// const UserSetting = () => import('views/person/homepage/childcomps/UserSetting')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: 'login',
        component: User
      },
      {
        path: 'register',
        component: User
      }
    ]
  },
  {
    path: '/column',
    component: Column
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
    path: '/:userId',
    component: Person,
    children: [
      {
        path: '',
        component: Profile
      },
      {
        path: 'homepage',
        component: Homepage,
        // children: [
        //   {
        //     path: '',
        //     component: UserPage
        //   },
        //   {
        //     path: 'dynamic',
        //     component: UserDynamic
        //   },
        //   {
        //     path: 'blog',
        //     component: UserBlog
        //   },
        //   {
        //     path: 'message',
        //     component: UserMessage
        //   },
        //   {
        //     path: 'follow',
        //     component: UserFollow
        //   },
        //   {
        //     path: 'fan',
        //     component: UserFan
        //   },
        //   {
        //     path: 'star',
        //     component: UserStar
        //   },
        //   {
        //     path: 'setting',
        //     component: UserSetting
        //   }
        // ]
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
        path: 'set',
        component: Set
      }
    ]
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
