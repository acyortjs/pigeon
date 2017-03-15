import Vue from 'vue'
import VueRouter from 'vue-router'
import Posts from './pages/posts'
import Post from './pages/post'

const routes = [
  {
    path: '/',
    name: 'posts',
    component: Posts
  },
  {
    path: '/post/:id',
    name: 'post',
    component: Post
  }
]

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes
})