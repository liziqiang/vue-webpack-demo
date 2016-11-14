import Index from '../../components/index';// 大首页
import Group from '../../components/index/group/group'; // 圈子管理（首页）
import MyContents from '../../components/index/myContents'; // 我的内容
import MyMessage from '../../components/index/myMessage'; //我的消息
import OperationLog from '../../components/index/operationLog'; //操作日志
import Statistics from '../../components/index/statistics'; //统计
import MemberNotice from '../../components/memberNotice'; // 成员通知
import MemberMange from '../../components/memberManage'; // 成员管理
const routes = [
    { path : '/', component : Index },
    { path : '/myfeed/draft', component : MyContents },
    { path : '/record', component : OperationLog },
    { path : '/inform', component : MyMessage },
    { path : '/analysis', component : Statistics },
    { path : '/msg', component : MemberNotice, alias : 'msg' },
    { path : '/user', component : MemberMange, alias : 'user' }
];
export default routes;