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
  MESSAGE(state, message) {
    state.message = message
  },
  LOADING(state, mode) {
    state.loading = mode
  }
}