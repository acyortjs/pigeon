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
  setCurrent({ commit }, current) {
    commit('CURRENT', current)
  },
  setCategoryCurrent({ commit }, category_current) {
    commit('CATEGORYCURRENT', category_current)
  },
  setTagCurrent({ commit }, tag_current) {
    commit('TAGCURRENT', tag_current)
  },
  setMessage({ commit }, message) {
    commit('MESSAGE', message)
  },
  setLoading({ commit }, mode) {
    commit('LOADING', mode)
  }
}