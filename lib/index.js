const provider = require('./provider')
const processor = require('./processor')
const exporter = require('./exporter')

module.exports = (acyort) => {
  acyort.workflow.register(
    provider.bind(acyort),
    processor.bind(acyort),
    exporter.bind(acyort),
  )

  acyort.helper.register('_title', (name) => {
    const { posts } = acyort.store.get('data')
    return posts.find(({ id }) => id === name).title
  })
}
