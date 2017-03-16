import Vue from 'vue'
import aksdj4 from './aksdj4'
import router from './routes'
import store from './store'

Vue.config.devtools = process.env.NODE_ENV !== 'production'

new Vue({
  router, 
  store, 
  render: h => h(aksdj4) 
}).$mount('#aksdj4')