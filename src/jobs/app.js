import Vue from 'vue'; // 引入vue
import Router from 'vue-router'; // 引入vue-router
import App from '../components/app';
import router from '../router';
Vue.use( Router );
new Vue( {
    router,
    el     : '#app',
    render : h => h( App )
} );