const getContent = require('./content')

module.exports = function processor() {
  const { posts, pages } = getContent(this)
  const categories = []
  const tags = []

  posts.forEach((post, i) => {
    post.prev = i > 0 ? posts[i - 1].id : '' // eslint-disable-line no-param-reassign
    post.next = i < posts.length - 1 ? posts[i + 1].id : '' // eslint-disable-line no-param-reassign

    const { category, tags: tag, name } = post

    const exc = categories.find(item => item.name === category)
    if (exc) {
      exc.posts.push(name)
    } else {
      const url = `/categories/${category}/`
      categories.push({
        name: category,
        posts: [name],
        url,
        path: `${url}index.html`,
      })
    }

    const ext = tags.find(item => tag.includes(item.name))
    if (ext) {
      ext.posts.push(name)
    } else {
      const url = `/tags/${tag}/`
      categories.push({
        name: category,
        posts: [name],
        url,
        path: `${url}index.html`,
      })
    }
  })
}
