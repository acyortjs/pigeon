const { join } = require('path')

module.exports = function exporter() {
  const { outputHTML } = this.util
  const {
    posts,
    pages,
    index,
    categories,
    tags,
    archives,
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

  categories.forEach((category) => {
    category.pages.forEach((data) => {
      const path = join(data.currentPath, 'index.html')
      outputHTML({
        template: 'category',
        path,
        data: {
          ...data,
          name: category.name,
          posts: posts.filter(({ id }) => data.posts.includes(id)),
        },
      })
    })
  })

  tags.forEach((tag) => {
    tag.pages.forEach((data) => {
      const path = join(data.currentPath, 'index.html')
      outputHTML({
        template: 'tag',
        path,
        data: {
          ...data,
          name: tag.name,
          posts: posts.filter(({ id }) => data.posts.includes(id)),
        },
      })
    })
  })

  archives.forEach((data) => {
    const path = join(data.currentPath, 'index.html')
    outputHTML({ template: 'archives', path, data: { ...data, total: posts.length } })
  })
}
