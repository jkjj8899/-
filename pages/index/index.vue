<template>
	<view class="container">	
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 背景色区域 -->
			<swiper class="carousel" circular @change="swiperChange">
				<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="navToDetailPage({title: '轮播广告'})">
					<image :src="item.src" />
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots">
				<text class="num">{{swiperCurrent+1}}</text>
				<text class="sign">/</text>
				<text class="num">{{swiperLength}}</text>
			</view>
		</view>
		<!-- 分类 -->
		<view class="cate-section">
			<!-- 文字滚动 -->
			<!-- <uni-notice-bar show-icon="true" scrollable="true" single="true" text="[单行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏"></uni-notice-bar>
			 -->
			<noticeSwiper :list="noticeList"></noticeSwiper>
		</view>
		<view class="menu">
			<view class="item exchange" @click="navTo('/pages/exchange/index')">
				<image src="../../static/exchange.png"></image>
				<text>快捷闪兑</text>
			</view>
			<view class="item" @click="navTo('/pages/otc/otc')">
				<image class="miner" src="../../static/miner.png"></image>
				<text>法币交易</text>
			</view>
		</view>
		<view class="advert">
			<image class="img" mode="widthFix" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582372405579&di=b193a859db3a7cc913a139412456100d&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F4df6596a536f191f0d0ccf715ad44d61912892257553b-XV0WLE_fw658"></image>
		</view>
		<!-- 市值排行 -->
		<view class="coin-section m-t">
			<view class="s-header">
				<view class="col">币种/流通市值</view>
				<view class="col r">全球指数</view>
				<view class="col r">24小时涨幅</view>
			</view>
			<view class="s-row little-line">
				<view class="col light">
					<image src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67" class="coinLogo"></image>
					BTC
					<view class="subtitle">9262.6亿</view>
				</view>
				<view class="col r light">
					55555
					<view class="subtitle">$9262.6</view>
				</view>
				<view class="col r"><uni-tag text="+5%" type="success"></uni-tag></view>
			</view>
			<view class="s-row little-line">
				<view class="col light">
					<image src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67" class="coinLogo"></image>
					BTC
					<view class="subtitle">9262.6亿</view>
				</view>
				<view class="col r light">
					55555
					<view class="subtitle">$9262.6</view>
				</view>
				<view class="col r"><uni-tag text="+5%" type="error"></uni-tag></view>
			</view>
			<view class="s-row little-line">
				<view class="col light">
					<image src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67" class="coinLogo"></image>
					BTC
					<view class="subtitle">9262.6亿</view>
				</view>
				<view class="col r light">
					55555
					<view class="subtitle">$9262.6</view>
				</view>
				<view class="col r"><uni-tag text="+5%" type="success"></uni-tag></view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {uniNoticeBar, uniTag} from '@dcloudio/uni-ui'
	import noticeSwiper from '../../components/noticeSwiper.vue'
	export default {
		components: {uniNoticeBar, uniTag, noticeSwiper},
		data() {
			return {
				noticeList: [],
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [],
				goodsList: []
			};
		},

		onLoad() {
			this.loadData();
			this.noticeList = ["国际站4月1日14:00开放MDC/USDT交易市场", "国际站4月2日10:00上线HKL", "关于国际站即将上线 GCCT（Global Cash Coin)"];
		},
		methods: {
			/**
			 * 请求静态数据只是为了代码不那么乱
			 * 分次请求未作整合
			 */
			async loadData() {
				let carouselList = await this.$api.json('carouselList');
				this.titleNViewBackground = carouselList[0].background;
				this.swiperLength = carouselList.length;
				this.carouselList = carouselList;
				
				let goodsList = await this.$api.json('goodsList');
				this.goodsList = goodsList || [];
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				this.titleNViewBackground = this.carouselList[index].background;
			},
			//详情页
			navTo(url) {
				uni.navigateTo({
					url: url
				})
			},
		},
		// #ifndef MP
		// 标题栏input搜索框点击
		onNavigationBarSearchInputClicked: async function(e) {
			this.$api.msg('点击了搜索框');
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.$api.msg('点击了扫描');
			} else if (index === 1) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		}
		// #endif
	}
</script>

<style lang="scss">
	/* #ifdef MP */
	page{
		.cate-section{
			position:relative;
			z-index:5;
			border-radius:16upx 16upx 0 0;
			margin-top:-20upx;
		}
		.carousel-section{
			background-color: #ffffff;
			padding: 0;
			.titleNview-placing {
				padding-top: 0;
				height: 0;
			}
			.carousel{
				.carousel-item{
					padding: 0;
				}
			}
			.swiper-dots{
				left:45upx;
				bottom:40upx;
			}
		}
	}
	/* #endif */
	
	
	page {
		background: #ffffff;
		padding-top: 50upx;
	}
	.m-t{
		margin-top: 16upx;
	}
	.advert{
		padding: 10upx 20upx;
		background: $uni-color-gap;
		.img{
			width: 100%;
			border-radius: 10upx;
		}
	}
	.menu{
		padding: 20upx 20upx;
		display: flex;
		justify-content: space-between;
		font-size: $font-base;
		font-weight: bold;
		background: $uni-color-gap;
		.item{
			width: 49%;
			height: 100upx;
			line-height: 100upx;
			background: #ffffff;
			align-items: center;
			text-align: center;
			vertical-align: middle;
		}
		image{
			vertical-align: middle;
			width: 40upx;
			height: 45upx;
			margin-right: 20upx;
		}
		.miner{
			width: 35upx;
			height: 35upx;
		}
	}
	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		padding-top: 10px;
		background: #ffffff;
		.titleNview-placing {
			height: var(--status-bar-height);
			padding-top: 44px;
			box-sizing: content-box;
		}

		.titleNview-background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 426upx;
			transition: .4s;
		}
	}
	.carousel {
		width: 100%;
		height: 350upx;

		.carousel-item {
			width: 100%;
			height: 100%;
			padding: 0 28upx;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
			border-radius: 10upx;
		}
	}
	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
		background-size: 100% 100%;

		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50px;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}

		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}
	/* 公告 */
	.cate-section {
		padding: 20upx 22upx 20upx 22upx;
		background: #fff;
	}
	/* 市值排行 */
	.coin-section{
		padding: 4upx 30upx 24upx;
		background: #fff;
		.s-header{
			display:flex;
			align-items:center;
			height: 30upx;
			line-height: 30upx;
			padding-top: 20upx;
			padding-bottom: 20upx;
			.col{
				font-size: $font-base;
				color: $font-color-light;
				flex:1;
			}
			.r{
				text-align: right;
			}
		}
		.s-row{
			display:flex;
			align-items:center;
			height: 120upx;
			.subtitle{
				font-size: $font-sm;
				font-weight: normal;
				color: $font-color-light;
				padding: 4upx 0 10upx 0;
			}
			.uni-tag--success {
			    color: #fff;
			    background-color: $uni-color-upper;
			    border-width: 0.5px;
			    border-style: solid;
			    border-color: $uni-color-upper;
				width: 160upx;
				float: right;
			}
			.uni-tag--error {
			    color: #fff;
			    background-color: $uni-color-lower;
			    border-width: 0.5px;
			    border-style: solid;
			    border-color: $uni-color-lower;
				width: 160upx;
				float: right;
			}
			.col{
				font-size: $font-base;
				color: $font-color-dark;
				flex:1;
			}
			.coinLogo {
			    width: 36upx;
				height: 36upx;
			    margin-right: 8px;
			    display: inline-block;
			    vertical-align: middle;
			    float: left;
			}
			.light{
				font-weight: bold;
				font-size: $font-lg;
				color: $font-color-dark;
			}
			.r{
				text-align: right;
			}
		}
	}
	
	.f-header{
		display:flex;
		align-items:center;
		height: 140upx;
		padding: 6upx 30upx 8upx;
		background: #fff;
		image{
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			margin-right: 20upx;
		}
		.tit-box{
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		.tit{
			font-size: $font-lg +2upx;
			color: #font-color-dark;
			line-height: 1.3;
		}
		.tit2{
			font-size: $font-sm;
			color: $font-color-light;
		}
		.icon-you{
			font-size: $font-lg +2upx;
			color: $font-color-light;
		}
	}
	/* 猜你喜欢 */
	.guess-section{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: #fff;
		.guess-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
		}
	}
	

</style>
