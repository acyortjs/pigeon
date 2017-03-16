import Vue from 'vue'
import VueRouter from 'vue-router'
import posts from './pages/posts'
//import post from './pages/post'

const routes = [
  {
    path: '/',
    component: posts
  },
  /*
  {
    path: '/post/:id',
    component: post
  }
  */
]

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes
})