import Vue from 'vue'
import App from './App.vue'
import VueTouch from 'vue-touch'
Vue.use(VueTouch,{name: 'v-touch'})
Vue.config.productionTip = false
new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
