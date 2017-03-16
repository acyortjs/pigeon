import Vue from 'vue'
import aksdj4 from './aksdj4'
import routes from './routes'
import store from './store'

new Vue({
  routes, 
  store, 
  render: h => h(aksdj4) 
}).$mount('#aksdj4')