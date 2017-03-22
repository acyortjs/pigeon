import Vue from 'vue'
import VueRouter from 'vue-router'
import Posts from './pages/posts'
import Post from './pages/post'
import Archives from './pages/archives'

const routes = [
  {
    path: '/',
    component: Posts
  },
  {
    path: '/posts/:id',
    component: Post
  },
  {
    path: '/archives',
    component: Archives
  },
  {
    path: '*',
    redirect: '/'
  }
]

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes
})