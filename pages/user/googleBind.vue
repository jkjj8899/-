<template>
	<view class="container">
		<view class="row">
			<text class="m">在谷歌验证器中添加秘钥并备份</text>
			<text class="s">打开谷歌验证器,扫描下方二维码或手动输入下述秘钥添加验证令牌</text>
		</view>
		<view class="row center">
			<text class="s">请务必将下述秘钥备份保存</text>
			<tki-qrcode ref="qrcode" :size="300" :onval="true" cid="qrcode" :val="qrcode.val" />
		</view>
		<view class="row center">
			<text class="m">秘钥: FFSDFSFGSFGDGHSDGDGHS</text>
			<text class="copy m" @click="paste">复制</text>
			<button class="btn">我已备份并添加到验证器</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import {authMixin, commonMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [authMixin, commonMixin],
		components: {tkiQrcode},
		data() {
			return {
				qrcode: {
					val: 'FFSDFSFGSFGDGHSDGDGHS'
				}
			};
		},
		onLoad() {
			setTimeout(() =>{
				this.$refs.qrcode._makeCode()
			}, 3000)
		},
		methods:{
			paste() {
				let $this = this
				uni.setClipboardData({
				    data: this.qrcode.val,
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
