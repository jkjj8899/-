<template>
	<view class="container">
		<!-- <view class="header">
			<text class="title">实名认证</text>
			<text class="sub">为确保账户安全请先完成实名认证</text>
		</view> -->
		<view class="box">
			<image src="../../static/images/auth/icon-zheng.png" class="icon" mode="widthFix"></image>
			<view class="title">
				<text class="t">请上传身份证正反面图像</text>
				<text class="b">请确保照片的内容完整并清晰可见，仅支持jpg、png格式， 图片大小小于5M；</text>
			</view>
			<view class="photo">
				<image src="../../static/images/auth/auth-zhen.jpg" mode="widthFix"></image>
				<text class="tip">请上传身份证正面图像</text>
			</view>
			<view class="photo">
				<image src="../../static/images/auth/auth-fan.jpg" mode="widthFix"></image>
				<text class="tip">请上传身份证反面图像</text>
			</view>
			<button class="btn">确认提交</button>
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
		mixins: [commonMixin],
		data() {
			return {
			};
		},
		onLoad() {
			
		},
		methods:{
			
		}
	}
</script>

<style lang='scss' scoped>
	.container{
		position: fixed;
		width: 100%;
		height: 100%;
		background: url(../../static/images/auth/auth-bg.jpg);
		background-size: 100% 100%;
		padding: 0 30upx 30upx 30upx;
		overflow: auto;
	}
	.header{
		text-align: center;
		display: flex;
		flex-direction: column;
		color: #ffffff;
		.title{
			font-size: 36upx;
			padding: 10upx 0;
		}
	}
	.box{
		width: 100%;
		background: #ffffff;
		margin-top: 140upx;
		padding-bottom: 30upx;
		border-radius: 20upx;
		position: relative;
		.icon{
			position: absolute;
			width: 200upx;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		.title{
			padding-top: 100upx;
			padding-left: 30upx;
			padding-right: 30upx;
			text-align: center;
			display: flex;
			flex-direction: column;
			.t{
				color: #293f7f;
				font-size: 36upx;
				font-weight: 500;
			}
			.b{
				text-align: left;
				padding: 20upx 0;
			}
		}
		.photo{
			text-align: center;
			position: relative;
			margin-bottom: 30upx;
			.tip{
				display: block;
				position: absolute;
				left: 50%;
				bottom: 30upx;
				transform: translate(-50%, 0%);
			}
		}
		.btn{
			margin: 0upx 30upx;
			border: 0;
			border-radius: 50upx;
			background: #3c7bfb;
			color: #ffffff;
		}
	}
</style>
