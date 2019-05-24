const { join, extname } = require('path')

module.exports = async function provider() {
  const { source = 'local', base } = this.config.get()
  const { readdirSync, readFileSync } = this.fs

  let content = []

  if (source === 'local') {
    const path = join(base, 'source')
    content = readdirSync(path)
      .filter(name => extname(name) === '.md')
      .map(name => ({ name, content: readFileSync(join(path, name), 'utf8') }))
  }

  await this.hooks.call('pigeon_after_markdown', content)

  this.store.set('content', content)
}
