const fm = require('front-matter')
const getExcept = require('./except')

module.exports = function getContent(acyort) {
  const { renderer, store } = acyort
  const posts = []
  const pages = []

  store.get('content').forEach(({ name, content }) => {
    const id = name.replace('.md', '')
    const { attributes, body } = fm(content)
    const {
      type = 'post',
      tags = [],
      title,
      date = Date.now(),
    } = attributes

    if (type === 'post') {
      const url = `/posts/${id.toLowerCase()}.html`
      posts.push({
        ...attributes,
        date,
        tags,
        type,
        path: url,
        id,
        url,
        except: renderer.render('markdown', getExcept(body), { lineNumbers: true }),
        content: renderer.render('markdown', body, { lineNumbers: true }),
      })
    }

    if (type === 'page') {
      const url = `/${id.toLowerCase()}/`
      pages.push({
        id,
        type,
        url,
        path: `${url}index.html`,
        title,
        content: renderer.render('markdown', body, { lineNumbers: true }),
      })
    }
  })

  return { posts: posts.sort((a, b) => new Date(a.date) < new Date(b.date)), pages }
}
