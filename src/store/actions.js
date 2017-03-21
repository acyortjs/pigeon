export default {
  setPosts({ commit }, posts) {
    commit('POSTS', posts)
  },
  setPost({ commit }, post) {
    commit('POST', post)
  },
  setConfig({ commit }, config) {
    commit('CONFIG', config)
  },
  setCurrent({ commit }, current) {
    commit('CURRENT', current)
  }
}