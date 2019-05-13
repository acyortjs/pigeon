const paginator = require('@acyort/paginator')
const getContent = require('./content')
const getArchives = require('./archives')

module.exports = function processor() {
  const { perpage = 10 } = this.config.get()
  const { posts, pages } = getContent(this)
  const categories = []
  const tags = []

  posts.forEach((post, i) => {
    post.prev = i > 0 ? posts[i - 1].id : '' // eslint-disable-line no-param-reassign
    post.next = i < posts.length - 1 ? posts[i + 1].id : '' // eslint-disable-line no-param-reassign

    const {
      category = 'uncategorized',
      tags: tag = [],
      id,
    } = post

    const exc = categories.find(item => item.name === category)
    if (exc) {
      exc.posts.push(id)
    } else {
      categories.push({
        name: category,
        posts: [id],
        url: `/categories/${category}/`,
      })
    }

    tag.forEach((item) => {
      const ext = tags.find(t => t.name === item)
      if (ext) {
        ext.posts.push(id)
      } else {
        tags.push({
          name: item,
          posts: [id],
          url: `/tags/${item}/`,
        })
      }
    })
  })

  this.config.set('pages', pages.map(({ url, title }) => ({ url, title })))

  this.store.set('data', {
    archives: getArchives.call(this, posts),
    posts,
    pages,
    index: paginator({ base: '/', perpage, posts }),
    categories: categories.map(item => ({
      ...item,
      pages: paginator({ base: item.url.toLowerCase(), perpage, posts: item.posts }),
    })),
    tags: tags.map(item => ({
      ...item,
      pages: paginator({ base: item.url.toLowerCase(), perpage, posts: item.posts }),
    })),
  })
}
