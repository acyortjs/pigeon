const paginator = require('@acyort/paginator')

module.exports = function getArchives(posts) {
  const perpage = 30
  const timer = this.helper.get('_time')
  const pages = paginator({ base: '/archives/', perpage, posts })

  pages.forEach((page) => {
    const result = []
    let year

    page.posts.forEach((post) => {
      const current = timer(post.date, 'YYYY')
      if (year !== current) {
        year = current
        result.push(current)
      }
      result.push(post)
    })

    page.posts = result // eslint-disable-line no-param-reassign
  })

  return pages
}
