<template>
	<view class="container">	
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 背景色区域 -->
			<swiper class="carousel" circular @change="swiperChange" autoplay="true">
				<swiper-item @click="open(item)" v-for="(item, index) in carousels" :key="index" class="carousel-item">
					<image :src="item.url" />
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots">
				<text class="num">{{swiperCurrent+1}}</text>
				<text class="sign">/</text>
				<text class="num">{{swiperLength}}</text>
			</view>
		</view>
		<view class="cate-section">
			<noticeSwiper :list="notices"></noticeSwiper>
		</view>
		<scroll-view class="scroll-view-market" scroll-x="true">
			<view class="market-item" v-for="(item, i) in topSymbols" :key="item.symbol" @click="navToKline(item)">
				<view class="item">
					<view class="t">{{item.title}}<text :class="topMakretMap[item.symbol].change | formatChangeCls">{{topMakretMap[item.symbol].change | formatChange}}</text></view>
					<text class="c" :class="topMakretMap[item.symbol].change | formatChangeCls">{{topMakretMap[item.symbol] ? topMakretMap[item.symbol].close : '0.00'}}</text>
					<text class="b">≈ {{topMakretMap[item.symbol].cny}} CNY</text>
				</view>
			</view>
		</scroll-view>
		<view class="line"></view>
		<view class="otc">
			<view class="fiat" @click="navTo('/pages/otc/otc')">
				<image src="../../static/icon-fiat.png" mode="widthFix"></image>
				<view class="label">
					<text>{{ i18n.index.otc.title }}</text>
					<text class="sub">{{ i18n.index.otc.support }}ETH、USDT</text>
				</view>
			</view>
			<view @click="navTo('/pages/otc/otc')" class="r" style="padding-right: 30rpx;">
				<image src="../../static/images/home/icon-otc-r.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="menu">
			<view class="fiat" @click="navTo('/pages/prediction/prediction')">
				<image src="../../static/icon-prediction.png" mode="widthFix"></image>
				<view class="label">
					<text>{{ i18n.index.prediction.title }}</text>
					<text class="sub">Prediction Market</text>
				</view>
			</view>
			<view class="ex">
				<view class="item exchange" @click="navTo('/pages/exchange/index', true)">
					<image src="../../static/images/home/home-ex-icon.png"></image>
					<text>{{ i18n.index.exchange.title }}</text>
				</view>
				<view class="item shop" @click="navTo('/pages/finance/deposit')">
					<image class="miner" src="../../static/images/home/home-stacking-icon.png"></image>
					<text>{{ i18n.index.stacking.title }}</text>
				</view>
			</view>
		</view>
		<view class="advert">
			<uni-swiper-dot :current="current" :mode="mode">
			    <swiper class="swiper-box" autoplay="true">
			        <swiper-item @click="open(item)" v-for="(item, index) in ads" :key="index" class="swiper-item">
			        	<image :src="item.url" mode="widthFix"/>
			        </swiper-item>
			    </swiper>
			</uni-swiper-dot>
		</view>
		<!-- 市值排行 -->
		<view class="coin-section m-t">
			<view class="s-header">
				<view class="col">{{ i18n.index.market.title1 }}</view>
				<view class="col r">{{ i18n.index.market.title2 }}</view>
				<view class="col r">24{{ i18n.index.market.title3 }}</view>
			</view>
			<view class="s-row little-line"  @click="navTo(`/pages/market/index?code=${item.symbolCode}`)" v-for="(item, i) in markets" :key="item.symbol">
				<view class="col light">
					<image :src="item.icon" class="coinLogo"></image>
					{{item.symbol}}
					<view class="subtitle">{{item.marketcap | formatMarketcap}}</view>
				</view>
				<view class="col r light">
					{{item.priceCny}}
					<view class="subtitle">${{item.priceUsd}}</view>
				</view>
				<view class="col r"><uni-tag :text="item.changePercent | formatChange" :type="item.changePercent >= 0 ? 'success' : 'error'"></uni-tag></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {formatUnit} from '../../utils/number'
	import {uniNoticeBar, uniTag, uniSwiperDot} from '@dcloudio/uni-ui'
	import noticeSwiper from '../../components/noticeSwiper.vue'
	import {commonMixin} from '@/common/mixin/mixin.js'
	export default {
		components: {uniNoticeBar, uniTag, noticeSwiper, uniSwiperDot},
		mixins: [commonMixin],
		data() {
			return {
				markets: [],
				notices: [],
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				carousels: [],
				ads: [],
				current: 0,
				mode: 'round' ,
				marketTimer: null,
				topSymbols: [
					{symbol: 'btcusdt', title: 'BTC/USDT'},
					{symbol: 'ethusdt', title: 'ETH/USDT'},
					{symbol: 'dotusdt', title: 'DOT/USDT'}
				],
				topMakretMap: {
					'btcusdt': {},
					'ethusdt': {},
					'dotusdt': {}
				}
			};
		},
		filters:{
			formatChange(v){
				return (v > 0 ? '+' : '') + parseFloat(v).toFixed(2) + '%'
			},
			formatChangeCls(v){
				if(v == 0){
					return ''
				} else if(v > 0){
					return 'upper-text'
				} else {
					return 'lower-text'
				}
			},
			formatMarketcap(v){
				return formatUnit(v);
			}
		},
		onShow() {
			this.getMaketList()
			this.marketTimer =setInterval(() =>{
				this.getMaketList()
			}, 3000)
			setTimeout(() =>{
				this.loadTopMarket()
			}, 500)
			this.swiperCurrent = 0;
			this.swiperLength = 0;
			this.carousels = [];
			this.ads = [];
			this.notices = [];
			this.loadData();
		},
		onPullDownRefresh() {
			this.loadData()
			this.getMaketList()
		},
		onLoad() {
		},
		onHide() {
			if(this.marketTimer){
				clearInterval(this.marketTimer)
			}
			
			let ch = `market.overviewv2`
			let data = {
			  "unsub": ch,
			  "id": Date.now() + ""
			}
			this.$store.dispatch('WEBSOCKET_SEND', JSON.stringify(data))
			uni.$off(ch, (res) => {})
		},
		onUnload() {
		},
		methods: {
			...mapActions('common', ['marketList', 'adList', 'noticeList']),
			loadTopMarket(){
				let $this = this
				let ch = `market.overviewv2`
				let params = {
				  "sub": ch
				}
				this.$store.dispatch('WEBSOCKET_SEND', JSON.stringify(params))
				uni.$on("sub."+ch, (res) => {
					let map = res.data.data
					for(let i = 0; i < 3; i++){
						let symbol = this.topSymbols[i].symbol
						if(map[symbol]){
							let item = map[symbol]
							let tick = {
								open: item.o,
								close: item.c,
								low: item.l,
								high: item.h,
								vol: item.v,
								amount: item.a
							}
							tick.change = parseFloat((tick.close - tick.open) / tick.open * 100).toFixed(2);
							tick.cny = parseFloat(tick.close * 6.4).toFixed(2)
							$this.topMakretMap[symbol] = tick
						}
					}
					
				})
			},
			async loadData() {
				this.adList().then(res =>{
					let casrousels = res.data.casrousels
					this.swiperLength = casrousels.length
					this.carousels = casrousels
					this.ads = res.data.ads
					
					uni.stopPullDownRefresh()
				})
				this.noticeList().then(res =>{
					this.notices = res.rows
				})
			},
			getMaketList(){
				this.marketList().then(res =>{
					this.markets = res.data
				})
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
			},
			navToKline(item){
				uni.navigateTo({
					url: `/pages/public/kline?symbol=${item.symbol}`
				})
			},
			open(item){
				if(item.link){
					if(item.link.indexOf('http://') < 0 && item.link.indexOf('https://') < 0){
						uni.navigateTo({
							url: item.link
						})
					} else {
						uni.navigateTo({
							url: `/pages/public/web?url=${item.link}`
						})
					}
				}
			}
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
	page {
		background: #ffffff;
		padding-top: 50rpx;
	}
	.container{
		// #ifdef H5
		padding-bottom: 100rpx;
		// #endif
	}
	.m-t{
		margin-top: 16rpx;
	}
	.advert{
		padding: 0;
		.swiper-box{
			width: 100%;
			height: 230rpx;
		}
		.swiper-item{
			padding: 0;
			image{
				width: 100%;
			}
		}
	}
	.scroll-view-market {
		width: 100%;
	}
	.market-item {
		display: inline-block;
		width: 33%;
		.item{
			padding: 30rpx 0 30rpx 0;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			text-align: center;
			.t{
				font-weight: bold;
				font-size: $font-sm;
			}
			.c{
				padding: 10rpx 0 10rpx 0;
				font-size: $font-xl;
				font-weight: bold;
			}
			.b{
				font-size: $font-sm;
				color: $font-color-disabled;
			}
		}
	}
	.otc{
		padding: 0rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: $font-base;
		font-weight: bold;
		background: #ffffff;
		image{
			width: 100rpx;
		}
		.fiat{
			display: flex;
			flex-direction: row;
			flex: 1;
			align-items: center;
			background: #ffffff;
			padding-left: 30rpx;
			margin-right: 10rpx;
			padding: 20rpx 30rpx;
			.label{
				display: flex;
				flex-direction: column;
				padding-left: 20rpx;
			}
			.sub{
				font-size: $font-sm;
				font-weight: normal;
			}
			text{
				font-size: $font-md;
			}
		}
	}
	.menu{
		padding: 20rpx 0rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: $font-base;
		font-weight: bold;
		background: $uni-color-gap;
		.fiat{
			display: flex;
			flex-direction: row;
			flex: 1;
			align-items: center;
			background: #ffffff;
			padding-left: 30rpx;
			margin-right: 10rpx;
			.label{
				display: flex;
				flex-direction: column;
				padding-left: 20rpx;
			}
			.sub{
				font-size: $font-sm;
				font-weight: normal;
			}
			image{
				width: 100rpx;
			}
			text{
				font-size: $font-md;
			}
		}
		.ex{
			display: flex;
			flex-direction: column;
			flex: 1;
			.item{
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				background: #ffffff;
				align-items: center;
				text-align: center;
				vertical-align: middle;
			}
			.shop{
				margin-top: 10rpx;
			}
			image{
				vertical-align: middle;
				width: 50rpx;
				height: 55rpx;
				margin-right: 20rpx;
			}
			.miner{
				width: 45rpx;
				height: 45rpx;
			}
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
			height: 426rpx;
			transition: .4s;
		}
	}
	.carousel {
		width: 100%;
		height: 350rpx;

		.carousel-item {
			width: 100%;
			height: 100%;
			padding: 0 28rpx;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
			border-radius: 10rpx;
		}
	}
	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60rpx;
		bottom: 15rpx;
		width: 72rpx;
		height: 36rpx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
		background-size: 100% 100%;

		.num {
			width: 36rpx;
			height: 36rpx;
			border-radius: 50px;
			font-size: 24rpx;
			color: #fff;
			text-align: center;
			line-height: 36rpx;
		}

		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36rpx;
			font-size: 12rpx;
			color: #fff;
			transform: translateX(-50%);
		}
	}
	/* 公告 */
	.cate-section {
		padding: 20rpx 22rpx 20rpx 22rpx;
		background: #fff;
	}
	/* 市值排行 */
	.coin-section{
		padding: 4rpx 30rpx 24rpx;
		background: #fff;
		.s-header{
			display:flex;
			align-items:center;
			height: 30rpx;
			line-height: 30rpx;
			padding-top: 30rpx;
			padding-bottom: 30rpx;
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
			height: 120rpx;
			.subtitle{
				font-size: $font-sm;
				font-weight: normal;
				color: $font-color-light;
				padding: 4rpx 0 10rpx 0;
			}
			.uni-tag--success {
			    color: #fff;
			    background-color: $uni-color-upper;
			    border-width: 0.5px;
			    border-style: solid;
			    border-color: $uni-color-upper;
				width: 160rpx;
				float: right;
			}
			.uni-tag--error {
			    color: #fff;
			    background-color: $uni-color-lower;
			    border-width: 0.5px;
			    border-style: solid;
			    border-color: $uni-color-lower;
				width: 160rpx;
				float: right;
			}
			.col{
				font-size: $font-base;
				color: $font-color-dark;
				flex:1;
			}
			.coinLogo {
			    width: 36rpx;
				height: 36rpx;
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

</style>
