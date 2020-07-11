<template>
	<view class="container">
		<view class="logo">
			<image src="../../static/about_logo.png" mode="widthFix"></image>
		</view>
		<view class="list-cell b-b m-t"  hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">服务协议</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b"  hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">隐私条款</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b"  hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">法律声明</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">检查新版本</text>
			<text class="cell-tip">当前版本 1.0.0</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {commonMixin} from '@/common/mixin/mixin.js'
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
	.logo{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 60upx;
		padding-bottom: 60upx;
		image{
			width: 200upx;
		}
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:80upx;
		position:relative;
		background: #fff;
		justify-content: center;
		&.log-out-btn{
			margin-top: 40upx;
			.cell-tit{
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30upx;
		}
		&.m-t{
			margin-top: 16upx; 
		}
		.cell-more{
			align-self: baseline;
			font-size:$font-lg;
			color:$font-color-light;
			margin-left:10upx;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-md + 2upx;
			color: $font-color-dark;
			margin-right:10upx;
		}
		.cell-tip{
			font-size: $font-md;
			color: $font-color-light;
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
	}
</style>
