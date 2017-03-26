export default {
  POSTS(state, posts) {
    state.posts = posts
  },
  ARCHIVES(state, archives) {
    state.archives = archives
  },
  CATEGORIES(state, categories) {
    state.categories = categories
  },
  TAGS(state, tags) {
    state.tags = tags
  },
  POST(state, post) {
    state.post = post
  },
  CONFIG(state, config) {
    state.config = config
  },
  CATEGORYCURRENT(state, category_current) {
    state.category_current = category_current
  },
  TAGCURRENT(state, tag_current) {
    state.tag_current = tag_current
  },
  MESSAGE(state, message) {
    state.message = message
  },
  LOADING(state, mode) {
    state.loading = mode
  }
}