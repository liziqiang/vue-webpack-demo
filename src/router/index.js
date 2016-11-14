import routes from './routes';
import Router from 'vue-router'; // 引入vue-router
import UserInfo from '../kit/userInfo'; // 基本信息
const router         = new Router( { mode : 'history', routes } );
const loginUrl       = 'http://mp.iqiyi.com/paopao/login?from=' + encodeURIComponent( location.href );
const loginNoAuthUrl = 'http://mp.iqiyi.com/paopao/login?noAuth';
router.beforeEach( function( to, from, next ) {
    // 登录验证
    if ( UserInfo.isLogin() ) {
        // 鉴权验证
        UserInfo.hasAuth()
                .catch( ( err ) => {
                    location.href = loginNoAuthUrl;
                } )
                .then( ( flag ) => {
                    if ( flag ) {
                        next();
                    } else {
                        location.href = loginNoAuthUrl;
                    }
                } );
    } else {
        location.href = loginUrl;
    }
} );
export default router;