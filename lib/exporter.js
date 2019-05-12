module.exports = function exporter() {
  const { outputHTML } = this.util
  const { posts, pages } = this.store.get('data')

  posts.forEach((post) => {
    outputHTML({ template: 'post', path: post.path, data: post })
  })

  pages.forEach((page) => {
    outputHTML({ template: 'page', path: page.path, data: page })
  })
}
