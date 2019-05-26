const provider = require('./provider')
const processor = require('./processor')
const exporter = require('./exporter')

module.exports = (acyort) => {
  const { config } = acyort
  const { title, description, menu } = config.get()

  if (title === undefined) {
    config.set('title', 'Pigeon')
  }
  if (description === undefined) {
    config.set('description', 'Why is the pigeon so big')
  }
  if (!menu) {
    config.set('menu', {
      archives: '/archives/',
      categories: '/categories/',
      tags: '/tags/',
    })
  }

  acyort.workflow.register(
    provider.bind(acyort),
    processor.bind(acyort),
    exporter.bind(acyort),
  )
}
