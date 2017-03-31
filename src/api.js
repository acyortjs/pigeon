const hosts = ''
const path = 'json'

export default function api(url) {
  return `${hosts}/${path}/${url}.json`
}
