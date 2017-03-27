import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './pages/home'
import Post from './pages/post'
import Archives from './pages/archives'
import Categories from './pages/categories'
import Tags from './pages/tags'
import Category from './pages/category'
import Tag from './pages/tag'

const routes = [
  { path: '/', component: Home },
  { path: '/page/:page', component: Home },

  { path: '/posts/:id', component: Post },

  { path: '/archives', component: Archives },
  { path: '/archives/:page', component: Archives },

  { path: '/categories', component: Categories },
  { path: '/tags', component: Tags },

  {
    path: '/categories/:id',
    component: Category,
    children: [
      { path: ':page', component: Category }
    ]
  },

  {
    path: '/tags/:id',
    component: Tag,
    children: [
      { path: ':page', component: Tag }
    ]
  },

  { path: '*', redirect: '/' }
]

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes
})