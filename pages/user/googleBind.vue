<template>
	<view class="container">
		<view class="row">
			<text class="m">在谷歌验证器中添加秘钥并备份</text>
			<text class="s">打开谷歌验证器,扫描下方二维码或手动输入下述秘钥添加验证令牌</text>
		</view>
		<view class="row center">
			<text class="s">请务必将下述秘钥备份保存</text>
			<tki-qrcode ref="qrcode" :size="300" :onval="true" cid="qrcode" :val="form.googleKey" />
		</view>
		<view class="row center">
			<text class="m">秘钥: {{form.googleKey}}</text>
			<text class="copy m" @click="paste">复制</text>
			<button class="btn" @click="bind">我已备份并添加到验证器</button>
		</view>
		
		<uni-valid-popup ref="validPopup" @ok="ok"></uni-valid-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import uniValidPopup from '@/components/uni-valid-popup.vue';
	import {authMixin, commonMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [authMixin, commonMixin],
		components: {tkiQrcode, uniValidPopup},
		data() {
			return {
				form: {
					googleKey: '',
					authCode: '',
					googleCode: ''
					
				}
			};
		},
		onLoad() {
			this.getGoogleKey().then(res =>{
				this.form.googleKey = res.msg;
			})
		},
		methods:{
			...mapActions('user', ['getGoogleKey', 'bindGoogle']),
			bind(){
				this.$refs.validPopup.open('mobile')
			},
			ok(data){
				if(data.type == 'mobile'){
					if(!data.code){
						this.$api.msg('请输入手机验证码')
						return;
					}
					this.form.authCode = data.token + ":" + data.code
					this.$refs.validPopup.open('google')
				} else {
					if(!data.code){
						this.$api.msg('请输入Google验证码')
						return;
					}
					this.form.googleCode = data.code
					this.bindGoogle(this.form).then(res =>{
						this.$api.msg('绑定Google验证成功')
						uni.navigateBack({})
					}).catch(error =>{
					})
				}
			},
			paste() {
				let $this = this
				uni.setClipboardData({
				    data: this.form.googleKey,
				    success: function () {
				        $this.$api.msg('复制成功')
				    }
				});
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
		padding: 30upx 30upx 0upx 30upx;
		margin-top: 20upx;
		.m{
			font-size: $font-lg;
		}
		.s{
			font-size: $font-md;
			display: block;
			padding-top: 20upx;
			padding-bottom: 30upx;
		}
		.copy{
			color: $font-color-blue;
			margin-left: 10upx;
		}
	}
	.center{
		text-align: center;
	}
	.btn{
		margin-top: 60upx;
		background-color: $uni-color-blue;
		color: #ffffff;
		font-size: $font-lg;
	}
</style>
