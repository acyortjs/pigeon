const { join } = require('path')

module.exports = function exporter() {
  const { outputHTML } = this.util
  const {
    posts,
    pages,
    index,
    categories,
    tags,
  } = this.store.get('data')

  posts.forEach((data) => {
    outputHTML({ template: 'post', path: data.path, data })
  })

  pages.forEach((data) => {
    outputHTML({ template: 'page', path: data.path, data })
  })

  index.forEach((data) => {
    const path = join(data.currentPath, 'index.html')
    outputHTML({ template: 'index', path, data })
  })

  outputHTML({
    template: 'categories',
    path: 'categories/index.html',
    data: { categories },
  })

  outputHTML({
    template: 'tags',
    path: 'tags/index.html',
    data: { tags },
  })
}
