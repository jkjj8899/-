<template>  
    <view class="container">  
		<view class="pay-group">
			<view class="header">
				<text class="title">银行卡<text class="count">共0个</text></text>
				<text class="add" @click="navTo('/pages/user/updatePayType')">添加</text>
			</view>
			<view class="empty">
				暂无银行卡
			</view>
		</view>
		<view class="pay-group">
			<view class="header">
				<text class="title">支付宝<text class="count">共1个</text></text>
				<text class="add">添加</text>
			</view>
			<view class="item">
				<view class="name">
					<text class="a">隔壁老王</text>
					<text class="b">aaaa@bb.com</text>
				</view>
				<view class="qrcode">
					<image src="../../static/icon-qrcode.png"></image>
				</view>
			</view>
		</view>
    </view>  
</template>  
<script>  
    import {  
        mapState 
    } from 'vuex';  
	let startY = 0, moveY = 0, pageAtTop = true;
    export default {
		data(){
			return {
			}
		},
		onLoad(){
		},
        computed: {
			...mapState(['hasLogin','userInfo'])
		},
        methods: {
			navTo(url){
				uni.navigateTo({  
					url
				})  
			}
        }  
    }  
</script>  
<style lang='scss' scoped>
	page{
		background: $page-color-base;
	}
	.container{
		padding: 30upx 30upx;
		height: 100%;
	}
	.pay-group{
		width: 100%;
		.header{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.title{
				font-size: $font-md;
			}
			.count{
				margin-left: 20upx;
				font-size: $font-sm;
				color: $font-color-light;
			}
			.add{
				font-size: $font-md;
				color: $font-color-spec;
			}
		}
		.empty{
			margin: 20upx 0upx;
			width: 100%;
			height: 180upx;
			line-height: 180upx;
			background: $uni-color-subbg;
			border-radius: 20upx;
			text-align: center;
			font-size: $font-md;
		}
		.item{
			margin: 20upx 0upx;
			padding: 30upx 30upx;
			width: 100%;
			height: 180upx;
			background: linear-gradient(right, #3783D9, #53A6EA);
			border-radius: 20upx;
			text-align: left;
			font-size: $font-md;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.name{
				display: flex;
				flex-direction: column;
				color: #fff;
				.b{
					font-size: $font-xl;
					padding-top: 10upx;
				}
			}
			.qrcode{
				background: #fff;
				padding: 10upx 10upx;
				width: 84upx;
				height: 84upx;
			}
			image{
				width: 64upx;
				height: 64upx;
			}
		}
	}
</style>