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
  setConfig({ commit }, config) {
    commit('CONFIG', config)
  },
  setMessage({ commit }, message) {
    commit('MESSAGE', message)
  },
  setLoading({ commit }, mode) {
    commit('LOADING', mode)
  }
}