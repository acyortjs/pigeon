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
  POST(state, post) {
    state.post = post
  },
  CONFIG(state, config) {
    state.config = config
  },
  CURRENT(state, current) {
    state.current = current
  },
  ARCHIVECURRENT(state, archive_current) {
    state.archive_current = archive_current
  },
  CATEGORYCURRENT(state, category_current) {
    state.category_current = category_current
  }
}