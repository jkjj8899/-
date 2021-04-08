import Vue from 'vue'
import store from './store'
import App from './App'
import global from './utils/global'
import {fixD} from './utils/utils'
import Json from './Json' //测试用数据

import uView from "uview-ui";
Vue.use(uView);

import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
Vue.use(require('vue-moment'));
/**
 *  因工具函数属于公司资产, 所以直接在Vue实例挂载几个常用的函数
 *  所有测试用数据均存放于根目录json.js
 *  
 *  css部分使用了App.vue下的全局样式和iconfont图标，有需要图标库的可以留言。
 *  示例使用了uni.scss下的变量, 除变量外已尽量移除特有语法,可直接替换为其他预处理器使用
 */
const navTo = (url)=>{
	uni.navigateTo({
		url: url
	})
}
const msg = (title, duration=1500, mask=false, icon='none', success)=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon,
		success
	});
}
const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 500)
	})
}

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

const upload = (successCallback, progressCallback)=>{
	uni.chooseImage({
		success: function (chooseImageRes) {
			const tempFilePaths = chooseImageRes.tempFilePaths;
			uni.showLoading({
			    title: '正在上传中...'
			});
			let token = uni.getStorageSync('token')
			const uploadTask = uni.uploadFile({
				url: global.REQUEST_URL + '/v1/common/upload', //仅为示例，非真实的接口地址
				filePath: tempFilePaths[0],
				name: 'file',
				header: {'Authorization': token},
				success: function (response) {
					uni.hideLoading()
					let res = JSON.parse(response.data)
					if(res.code === 200){
						uni.showToast({title: '上传成功', duration: 2000, icon: 'none'});
					} else {
						uni.showToast({title: res.msg, duration: 2000, icon: 'none'});
					}
					if(successCallback){
						successCallback(res)
					}
				},
				fail: function(error){
					uni.hideLoading()
					uni.showToast({title: '上传失败', duration: 2000, icon: 'none'});
				}
			});
		
			uploadTask.onProgressUpdate(function (res) {
				if(progressCallback){
					progressCallback(res)
				}
				//console.log('上传进度' + res.progress);
				//console.log('已经上传的数据长度' + res.totalBytesSent);
				//console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
			});
		}
	})
}


Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {msg, json, prePage, navTo};
Vue.prototype.$g = global;
Vue.prototype.$upload = upload;
Vue.prototype.$fixD = fixD;

Vue.filter('fixD', function (value, precision) {
  if (!value) return ''
  return fixD(value, precision)
})

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()