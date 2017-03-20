import Vue from 'vue'
import axios from 'axios'
import aksdj4 from './aksdj4'
import router from './router'
import store from './store'
import api from './api'

Vue.config.devtools = process.env.NODE_ENV !== 'production'

Vue.prototype.$load = function load(...args) {
  const reqs = args.map((arg) => {
    let { method = 'get', url, params } = arg
    url = api(url)
    return axios({ method, url, params })
  })

  return axios.all(reqs)
    .then(
      axios.spread((...res) => {
        if (res.length == 1) {
          return res[0].data
        }
        return res.map(r => r.data)
      })
    ) 
} 

new Vue({
  router, 
  store, 
  render: h => h(aksdj4) 
}).$mount('#aksdj4')