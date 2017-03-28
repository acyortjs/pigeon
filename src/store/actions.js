export default {
  setPosts({ commit }, posts) {
    commit('POSTS', posts)
  },
  setArchives({ commit }, archives) {
    commit('ARCHIVES', archives)
  },
  setCategories({ commit }, categories) {
    commit('CATEGORIES', categories)
  },
  setTags({ commit }, tags) {
    commit('TAGS', tags)
  },
  setPost({ commit }, post) {
    commit('POST', post)
  },
  setPage({ commit }, page) {
    commit('PAGE', page)
  },
  setConfig({ commit }, config) {
    commit('CONFIG', config)
  },
  setMessage({ commit }, message) {
    commit('MESSAGE', message)
  },
  setMenu({ commit }, mode) {
    commit('MENU', mode)
  },
  setLoading({ commit }, mode) {
    commit('LOADING', mode)
  }
}