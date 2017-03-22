import Vue from 'vue'
import axios from 'axios'
import aksdj4 from './aksdj4'
import router from './router'
import store from './store'
import api from './api'

Vue.config.devtools = process.env.NODE_ENV !== 'production'

Vue.prototype.$load = function load(...urls) {
  const args = urls.map(url => axios({ method: 'get', url: api(url) }))

  return axios.all(args)
  .then(
    axios.spread((...res) => {
      if (res.length == 1) {
        return res[0].data
      }
      return res.map(r => r.data)
    })
  )
  .catch(err => console.log(err))
}

new Vue({
  router,
  store,
  render: h => h(aksdj4)
}).$mount('#aksdj4')