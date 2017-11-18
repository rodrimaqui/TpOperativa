import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import store from './store/store'

import App from './components/App.vue'
import router from './utils/router'

Vue.use(VueRouter);
Vue.use(BootstrapVue);

new Vue({
	router,
	store,
    el: '#app',
    render: h => h(App)
})
