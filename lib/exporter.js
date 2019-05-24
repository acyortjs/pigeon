const { join, extname } = require('path')

module.exports = async function exporter() {
  const { outputHTML, copySource } = this.util
  const postData = this.store.get('data')
  const content = this.store.get('content')
  const {
    posts,
    pages,
    index,
    categories,
    tags,
    archives,
  } = postData
  const template = this.config.get('template')
  const templates = [
    'post',
    'page',
    'index',
    'categories',
    'tags',
    'category',
    'tag',
    'archives',
  ]
  const { path: current = '' } = this.store.get('status', 'acyort-server') || {}

  const html = {
    post() {
      posts.forEach((data) => {
        outputHTML({ template: 'post', path: data.path, data })
      })
    },
    page() {
      pages.forEach((data) => {
        outputHTML({ template: 'page', path: data.path, data })
      })
    },
    index() {
      index.forEach((data) => {
        const path = join(data.currentPath, 'index.html')
        outputHTML({ template: 'index', path, data })
      })
    },
    categories() {
      outputHTML({ template: 'categories', path: 'categories/index.html', data: { categories } })
    },
    tags() {
      outputHTML({ template: 'tags', path: 'tags/index.html', data: { tags } })
    },
    category() {
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
    },
    tag() {
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
    },
    archives() {
      archives.forEach((data) => {
        const path = join(data.currentPath, 'index.html')
        outputHTML({ template: 'archives', path, data: { ...data, totalPosts: posts.length } })
      })
    },
  }

  const htmls = () => {
    Object.keys(html).forEach((name) => {
      html[name]()
    })
  }

  if (current.includes(`/${template}/source/`)) {
    copySource()
    return
  }

  for (let i = 0; i < templates.length; i += 1) {
    const t = templates[i]
    if (current.includes(`/layout/${t}.html`)) {
      html[t]()
      return
    }
  }

  if (extname(current) === '.html') {
    htmls()
    return
  }

  htmls()
  copySource()

  await this.hooks.call('pigeon_after_render', content, postData)
}
