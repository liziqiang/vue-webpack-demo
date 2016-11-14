/**
 * UserInfo - KIT
 * author: zhanghao
 * date: 2016/09/08
 */
import * as cookie from 'js-cookie';
import Inter from '../interfaces/userInfoInterface';
import PingBack from '../interfaces/pingBack';
import MD5 from 'blueimp-md5';

const userInfo = {
    authcookie: '',
    uid: '',
    name: '',
    icon: null,
    email: '',
    userType: '',
    agenttype: '118',
    hasAuth: null,
    circles: [],
    deviceId: ''
};

export default {
    // 解析cookie，获得用户信息
    getUserInfo() {
        if (this.isLogin()) {
            let p00002 = cookie.get('P00002');
            if (p00002) {
                return window.JSON ? window.JSON.parse(p00002) : eval('(' + p00002 + ')');
            }
        }
        return null;
    },
    // 设置用户信息
    setUserInfo() {
        if (this.isLogin()) {
            let infoObj = this.getUserInfo();
            if (infoObj) {
                userInfo.uid = infoObj.uid;
                userInfo.name = infoObj.nickname;
                userInfo.email = infoObj.email;
            }
            let auth = cookie.get('P00001');
            if (auth && auth !== 'deleted') {
                userInfo.authcookie = auth;
                userInfo.deviceId = MD5(auth);
            }
        }
    },
    // 判断是否登录
    isLogin() {
        return (cookie.get('P00002') &&
                cookie.get('P00002') !== 'deleted') &&
            (cookie.get('P00003') &&
                cookie.get('P00003') !== 'deleted');
    },
    // 判断是否有权限
    hasAuth() {
        if (userInfo.hasAuth === false || userInfo.hasAuth === true) {
            return Promise.resolve(userInfo.hasAuth);
        } else {
            this.setUserInfo();
            let params = {
                login: true
            };
            params.login = cookie.get('hasAuthenticated') ? false : true;
            // 鉴权接口访问
            return Inter.getAuth(params)
                .then(res => {
                    if (res.code === 'A00000') {
                        if (res.data.circles && res.data.circles.length) {
                            userInfo.circles = res.data.circles;
                            userInfo.hasAuth = true;
                            cookie.set('hasAuthenticated', 1);
                            PingBack.ping({
                                t: 20,
                                rseat: '505561_01',
                                pu: userInfo.uid
                            });
                        } else {
                            cookie.set('hasAuthenticated', 0);
                            userInfo.hasAuth = false;
                        }
                        return userInfo.hasAuth;
                    } else {
                        cookie.set('hasAuthenticated', 0);
                        return false;
                    }
                });
        }
    },
    // 获得用户uid
    getUid() {
        return userInfo.uid;
    },
    // 获得用户名称
    getName() {
        return userInfo.name;
    },
    // 获取用户头像
    getIcon() {
        if (userInfo.icon === null) {
            return Inter.getIcon({
                    authcookie: this.getAuthCookie(),
                    antiCsrf: MD5(this.getAuthCookie())
                })
                .then(res => {
                    if (res.code === 'A00000') {
                        userInfo.icon = res.data.userinfo.icon || '';
                    }
                    return userInfo.icon;
                })
        } else {
            return new Promise((resolve, reject) => {
                resolve(userInfo.icon);
            })
        }
    },
    // 获得authcookie
    getAuthCookie() {
        return userInfo.authcookie;
    },
    // 获得圈子列表
    getCircles() {
        return userInfo.circles;
    },
    // 获得圈子基本信息
    getCircleInfo(circleId) {
        circleId = circleId || '';
        if (circleId) {
            return userInfo.circles.find(elem => {
                return elem.circleId === circleId;
            });
        } else {
            return userInfo.circles[0];
        }
    },
    // 获得用户类型
    getUserType() {
        return userInfo.userType;
    },
    // 获得设备类型
    getAgentType() {
        return userInfo.agenttype;
    },
    // 获得设备ID
    getDeviceId() {
        return userInfo.deviceId;
    },
    // 清空用户信息
    clearUserInfo() {
        return Inter.doLogout().then((res) => {
            if (res.code === 'A00000') {
                for (let k in userInfo) {
                    userInfo[k] = null;
                }
                cookie.remove('P00001');
                cookie.remove('P00002');
                cookie.remove('P00003');
                cookie.remove('hasAuthenticated');
            }
            return res;
        })
    }
}