const hosts = 'http://127.0.0.1:4321'
const path = 'json'

export default function api(url) {
  return `${hosts}/${path}/${url}`
}