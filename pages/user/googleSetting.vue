<template>
	<view class="container">
		<view class="row">
			<text @click="open">Android谷歌验证器下载</text>
			<button class="btn" @click="navTo('/pages/user/googleBind')">您暂未绑定,现在绑定</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {authMixin, commonMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [authMixin, commonMixin],
		data() {
			return {
				
			};
		},
		onLoad() {
			
		},
		methods:{
			open(){
				plus.runtime.openURL('https://fexcoin.oss-cn-shenzhen.aliyuncs.com/upload/apk/Gen_Signature_Android2.apk');
			}
		}
	}
</script>

<style lang='scss' scoped>
	page{
		background: $page-color-base;
	}
	.row{
		background: #ffffff;
		padding: 60upx 30upx;
		margin-top: 20upx;
		color: $font-color-blue;
		font-size: $font-md;
	}
	.btn{
		margin-top: 60upx;
		background-color: $uni-color-blue;
		color: #ffffff;
		font-size: $font-lg;
	}
</style>
