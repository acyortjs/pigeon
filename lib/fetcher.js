const { join } = require('path')
const axios = require('axios')

module.exports = (acyort) => {
  const { fs, logger } = acyort
  const cacheFile = join(process.cwd(), 'issues.json')
  const { repository } = acyort.config.get()
  const { TOKEN } = process.env
  const fetchHeaders = { 'User-Agent': 'Pigeon' }

  if (TOKEN) {
    fetchHeaders.Authorization = `token ${TOKEN}`
  }

  if (fs.existsSync(cacheFile)) {
    return Promise.resolve(require(cacheFile)) // eslint-disable-line
  }

  const config = page => ({
    url: `/repos/${repository}/issues`,
    baseURL: 'https://api.github.com',
    headers: fetchHeaders,
    params: {
      per_page: 20,
      page,
    },
  })

  let back = []

  return new Promise((resolve) => {
    async function load(page = 1) {
      logger.info(`getting data...${page}`)

      const { data, headers } = await axios(config(page))

      back = back.concat(data)

      if (headers.link && headers.link.includes('rel="next"')) {
        load(page + 1)
      } else {
        fs.outputFileSync(cacheFile, JSON.stringify(back))
        resolve(back)
      }
    }
    load()
  })
}
