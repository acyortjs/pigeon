const provider = require('./provider')
const processor = require('./processor')

module.exports = (acyort) => {
  acyort.workflow.register(
    provider.bind(acyort),
    processor.bind(acyort),
  )
}
