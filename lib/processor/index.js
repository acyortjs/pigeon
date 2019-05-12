const paginator = require('@acyort/paginator')
const getContent = require('./content')

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

  const index = paginator({ base: '/', perpage, posts })

  this.store.set('data', { posts, pages, index })
}
