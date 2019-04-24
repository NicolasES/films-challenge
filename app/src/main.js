import Vue from 'vue'
import App from './App.vue'

//BOOTSTRAP
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)


// AXIOS
import Axios from 'axios'
Axios.defaults.baseURL = 'https://api.themoviedb.org/3/'
Vue.use({
  install(Vue) {
    Vue.prototype.$http = Axios
  }
})

// MOMENT
Vue.use(require('vue-moment'));

//LODASH
import VueLodash from 'vue-lodash'
Vue.use(VueLodash)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
