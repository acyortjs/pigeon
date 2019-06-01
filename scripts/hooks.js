const { join } = require('path')

module.exports = (acyort) => {
  const { base, public: publicDir } = acyort.config.get()

  acyort.hooks.tap('pigeon_after_markdown', (markdown) => {
    const chinese = markdown.find(({ name }) => name === 'chinese.md')
    if (chinese) {
      chinese.content = chinese.content.replace('中文', '中文文章')
    }
  })

  acyort.hooks.tap('pigeon_before_render', (data) => {
    const japanese = data.posts.find(({ id }) => id === 'japanese')
    if (japanese) {
      japanese.title = '日文文章'
    }
  })

  acyort.hooks.tap('pigeon_after_render', () => {
    acyort.fs.outputFileSync(join(base, publicDir, 'CNAME'), 'aksdj4.am0200.com')
    acyort.logger.info('done')
  })
}
