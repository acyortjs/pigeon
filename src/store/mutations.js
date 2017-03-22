export default {
  POSTS(state, posts) {
    state.posts = posts
  },
  ARCHIVES(state, archives) {
    state.archives = archives
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
  }
}