const provider = require('./provider')
const processor = require('./processor')
const exporter = require('./exporter')

module.exports = (acyort) => {
  acyort.workflow.register(
    provider.bind(acyort),
    processor.bind(acyort),
    exporter.bind(acyort),
  )
}
