import Vue from 'vue'; // 引入vue
import Router from 'vue-router'; // 引入vue-router
import App from '../components/app/app';
// filters
import '../filters/formatBigNumber';
import '../filters/formatDate';
// vuex
import store from '../stores/store';
import router from '../router';
Vue.use( Router );
new Vue( {
    router,
    el     : '#app',
    render : h => h( App ),
    store
} );