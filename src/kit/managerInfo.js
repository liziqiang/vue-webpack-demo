import MmInterface from '../interfaces/memberManageInterface';

export default {
	cached:false,
	data:{
		masters:[],
		managers:[],
		friends:[]
	},
	getManager(param,fn) {
		var _this = this;
		var param = param || {};

		MmInterface.getManager(param).then( (data)=>{
            if(data.code == "A00000") {
			  _this.data.managers = [];
			  _this.data.masters = [];
               data.data.forEach(function(v,i) {
  				  if(v.userType == 2) {
		               	v.position = "管理员";
		               	_this.data.managers.push(v);
	               } else if(v.userType == 1) {
		               v.position = "圈主";
		               _this.data.masters.push(v);
	               } 
               });
               fn(_this.data);
            }
        });
	},
	getFriend(param,fn,reFetch) {
		var _this = this;
		var param = param || {};

		if(this.cached && !reFetch) {
			fn(this.data);
			return this.data;
		}
		MmInterface.getFriend(param).then( (data)=>{
            if(data.code == "A00000") {
               data = data.data;
            	_this.friends = data.friends;
               fn(data);
            }
        });
	},

	/*任命管理员*/
	appoint(param,fn) {
		var _this = this;
        MmInterface.appoint(param).then( (data) => {
			fn(data);
        });
	},
	/*解聘管理员*/
	unsetManager(param,fn){
        MmInterface.deleteManager(param).then( (data) => {
			fn(data);
        });
	}
}