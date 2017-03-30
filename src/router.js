import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './pages/home'
import Post from './pages/post'
import Page from './pages/page'
import Archives from './pages/archives'
import Categories from './pages/categories'
import Tags from './pages/tags'
import Category from './pages/category'
import Tag from './pages/tag'

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/page/:page', component: Home, name: 'homePage' },

  { path: '/posts/:id', component: Post, name: 'post' },
  { path: '/pages/:name', component: Page, name: 'page' },

  { path: '/archives', component: Archives, name: 'archives' },
  { path: '/archives/:page', component: Archives, name: 'archivesPage' },

  { path: '/categories', component: Categories, name: 'categories' },
  { path: '/tags', component: Tags, name: 'tags' },

  {
    path: '/categories/:id',
    component: Category,
    name: 'category',
    children: [
      { path: ':page', component: Category }
    ]
  },

  {
    path: '/tags/:id',
    component: Tag,
    name: 'tag',
    children: [
      { path: ':page', component: Tag }
    ]
  },

  { path: '*', redirect: '/' }
]

const scrollBehavior = (to, from, savedPosition) => {
  return { x: 0, y: 0 }
}

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  scrollBehavior,
  routes
})