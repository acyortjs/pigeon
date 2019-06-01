const { join, extname } = require('path')
const fetcher = require('./fetcher')

module.exports = async function provider() {
  const { source = 'source', base, repository } = this.config.get()
  const { readdirSync, readFileSync } = this.fs

  let content = []

  if (repository) {
    const issues = await fetcher(this)
    await this.hooks.call('pigeon_after_fetch', issues)

    content = issues.map((issue) => {
      const {
        body,
        id,
        title,
        updated_at: updatedAt,
        labels,
        milestone,
      } = issue

      let fm
      let name

      if (/^\[(.+?)]/.test(title)) {
        const splited = title.split(/^\[(.+?)]/)
        name = `${splited[1]}.md`
        fm = `---
type: page
title: ${splited[2]}
---

`
      } else {
        name = `${id}.md`
        fm = `---
title: ${title}
date: ${updatedAt}
category: ${milestone ? milestone.title : 'uncategorized'}
tags:
${labels.map(({ name: n }) => `  - ${n}`).join('\n')}
---

`
      }

      return {
        name,
        content: fm + body,
      }
    })
  } else {
    const path = join(base, source)
    content = readdirSync(path)
      .filter(name => extname(name) === '.md')
      .map(name => ({ name, content: readFileSync(join(path, name), 'utf8') }))
  }

  await this.hooks.call('pigeon_after_markdown', content)

  this.store.set('content', content)
}
