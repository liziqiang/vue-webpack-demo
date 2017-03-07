import routes from './routes';
import Router from 'vue-router'; // 引入vue-router
const router = new Router( { mode : 'history', routes } );
// router.beforeEach( function( to, from, next ) {
//     // 登录验证
//     next();
// } );
export default router;