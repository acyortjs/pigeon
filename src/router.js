import Vue from 'vue'
import VueRouter from 'vue-router'
import Posts from './pages/posts'
import Post from './pages/post'
import Archives from './pages/archives'
import Categories from './pages/categories'
import Tags from './pages/tags'
import Category from './pages/category'

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
    path: '/categories',
    component: Categories
  },
  {
    path: '/tags',
    component: Tags
  },
  {
    path: '/categories/:id',
    component: Category
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