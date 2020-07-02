<template>
	<view class="container">
		<view class="row">
			<text @click="open">Android谷歌验证器下载</text>
			<button v-if="!loginInfo.isGoogle" class="btn" @click="navTo('/pages/user/googleBind')">您暂未绑定,现在绑定</button>
			<button v-if="loginInfo.isGoogle" class="btn" @click="unbind">您已绑定,取消绑定</button>
		</view>
		
		<uni-valid-popup ref="validPopup" @ok="ok"></uni-valid-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import uniValidPopup from '@/components/uni-valid-popup.vue';
	import {authMixin, commonMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [authMixin, commonMixin],
		components: {uniValidPopup},
		data() {
			return {
				form: {
					authCode: ''
				}
			};
		},
		onLoad() {
			
		},
		computed: {
			...mapState('user', ['loginInfo'])
		},
		methods:{
			...mapActions('user', ['unbindGoogle']),
			unbind(){
				this.$refs.validPopup.open('mobile')
			},
			ok(data){
				if(!data.code){
					this.$api.msg('请输入手机验证码')
					return;
				}
				this.form.authCode = data.token + ":" + data.code
				this.unbindGoogle(this.form).then(res =>{
					this.$api.msg('解绑Google验证成功')
				}).catch(error =>{
				})
			},
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
