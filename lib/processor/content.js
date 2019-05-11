const fm = require('front-matter')
const { slugify } = require('acyort-toc')
const getExcept = require('./except')

module.exports = function getContent(acyort) {
  const {
    renderer,
    store,
    helper,
  } = acyort
  const toc = helper.get('_toc') || (() => null)
  const posts = []
  const pages = []

  store.get('content').forEach(({ name, content }) => {
    const id = name.replace('.md', '')
    const { attributes, body } = fm(content)
    const { type = 'post', title } = attributes

    if (type === 'post') {
      const url = `/posts/${id}.html`
      posts.push({
        ...attributes,
        type,
        path: url,
        id,
        url,
        toc: toc(body),
        except: renderer.render('markdown', getExcept(body)),
        content: renderer.render('markdown', body, { getHeadingId: slugify }),
      })
    }

    if (type === 'page') {
      const url = `/${name}/`
      pages.push({
        id,
        type,
        url,
        path: `${url}index.html`,
        title,
        content: renderer.render('markdown', body),
      })
    }
  })

  return { posts: posts.sort((a, b) => new Date(a.date) < new Date(b.date)), pages }
}
