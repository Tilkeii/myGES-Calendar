import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';

Vue.config.productionTip = false;

/**
 * Vue Configuration
 */

Vue.use(Buefy);

/**
 * Axios Configuration
 */

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

/**
 * Vue variables globales
 */

 Vue.prototype.$http = axios;

/**
 * Vue Instantiation
 */

new Vue({
  render: h => h(App)
}).$mount('#app');
