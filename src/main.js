import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import event from './store.js'

import './assets/style/reset.css'
import './assets/style/index.less'

import './plugins/element.js'
// import './plugins/draggable'

Vue.use(event)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
