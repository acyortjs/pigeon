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
  PAGE(state, page) {
    state.page = page
  },
  CONFIG(state, config) {
    state.config = config
  },
  MENU(state, mode) {
    state.menu = mode
  },
  MESSAGE(state, message) {
    state.message = message
  },
  LOADING(state, mode) {
    state.loading = mode
  }
}