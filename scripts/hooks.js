module.exports = (acyort) => {
  acyort.hooks.tap('pigeon_after_markdown', (markdown) => {
    const chinese = markdown.find(({ name }) => name === 'chinese.md')
    chinese.content = chinese.content.replace('中文', '中文文章')
  })

  acyort.hooks.tap('pigeon_before_render', (data) => {
    const japanese = data.posts.find(({ id }) => id === 'japanese')
    japanese.title = '日文文章'
  })

  acyort.hooks.tap('pigeon_after_render', () => {
    acyort.logger.info('done')
  })
}
