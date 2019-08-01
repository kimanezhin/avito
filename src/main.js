import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
Vue.config.productionTip = false


const init = async () =>{
  Vue.prototype.$hostname = "https://avito.dump.academy"
  Vue.prototype.$eventHub = new Vue();
  Vue.prototype.$homepage = Vue.config.productionTip ? "" : "http://localhost:8080/#/";
  await Axios.get(Vue.prototype.$hostname).then((response) =>{
    Vue.prototype.$products = response.data.links.products
    Vue.prototype.$sellers = response.data.links.sellers
    
})
}

init()
.then(() =>{
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
  
})

