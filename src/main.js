import App from './App.vue'
import Vue from 'vue'
import VueForm from "vue-form";
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(VueForm);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
