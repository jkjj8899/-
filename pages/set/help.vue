<template>
	<view class="app">
		<view class="bg">
			<image src="../../static/help_bg.jpg" mode="widthFix"></image>
		</view>
		<view class="title little-line">
			常见问题
		</view>
		<view class="list">
			<view class="row little-line">
				<view class="left">
					<image src="../../static/icon-help-safe.png" mode="widthFix"></image>
					<text class="label">帐号相关</text>
				</view>
				<view class="right">
					<view class="col">
						<view class="circle"></view>
						<text>忘记密码</text>
					</view>
					<view class="col">
						<view class="circle"></view>
						<text>如何绑定谷歌验证器</text>
					</view>
					<view class="col">
						<view class="circle"></view>
						<text>如何实名认证</text>
					</view>
				</view>
			</view>
			<view class="row little-line">
				<view class="left">
					<image src="../../static/icon-help-ex.png" mode="widthFix"></image>
					<text class="label">闪电兑换</text>
				</view>
				<view class="right">
					<view class="col">
						<view class="circle"></view>
						<text>如何兑换</text>
					</view>
					<view class="col">
						<view class="circle"></view>
						<text>兑换手续费</text>
					</view>
				</view>
			</view>
			<view class="row little-line">
				<view class="left">
					<image src="../../static/icon-help-fiat.png" mode="widthFix"></image>
					<text class="label">法币交易</text>
				</view>
				<view class="right">
					<view class="col">
						<view class="circle"></view>
						<text>如何购买USDT</text>
					</view>
					<view class="col">
						<view class="circle"></view>
						<text>如何卖USDT</text>
					</view>
					<view class="col">
						<view class="circle"></view>
						<text>如何成为承兑商</text>
					</view>
				</view>
			</view>
			<view class="row little-line">
				<view class="left">
					<image src="../../static/icon-help-wc.png" mode="widthFix"></image>
					<text class="label">充提相关</text>
				</view>
				<view class="right">
					<view class="col">
						<view class="circle"></view>
						<text>如何充币</text>
					</view>
					<view class="col">
						<view class="circle"></view>
						<text>如何提币</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				payType: 1,
				orderInfo: {}
			};
		},
		computed: {
		
		},
		onLoad(options) {
			
		},

		methods: {
			//确认支付
			confirm: async function() {
				uni.redirectTo({
					url: '/pages/money/paySuccess'
				})
			},
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
		font-size: $font-lg - 2upx;
	}
	.bg{
		background-color: #466EE8;
		padding-top: 100upx;
		width: 100%;
		image{
			width: 100%;
		}
	}
	.title{
		padding: $page-row-spacing;
	}
	.list{
		.row{
			display: flex;
			flex-direction: row;
			padding: 60upx 0;
		}
		.left{
			display: flex;
			flex-direction: column;
			flex: 1;
			padding-left: $page-row-spacing;
			align-content: center;
			justify-content:center;
			image{
				width: 80upx;
				height: 80upx;
				margin-left: 28upx;
			}
		}
		.right{
			flex: 2;
			justify-content:center;
			.col{
				display: flex;
				flex-direction: row;
				align-items: center;
				align-content: center;
				padding: 10upx 0;
			}
			.circle{
				width: 20upx;
				height: 20upx;
				background: #d8d8d8;
				border-radius: 50%;
				margin-right: 16upx;
			}
		}
	}
</style>
