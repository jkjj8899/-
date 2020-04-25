<template>
	<view class="container">
		<view class="exchange-box">
			<view class="coin little-line">
				<view class="base item" @click="changeCoin()">
					<image src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67" class="coinLogo"></image>
					<text class="name">BTC</text>
					<image src="../../static/tri.png" class="tri"></image>
				</view>
				<view class="quote item">
					<image src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67" class="coinLogo"></image>
					<text class="name">ETH</text>
					<image src="../../static/tri.png" class="tri"></image>
				</view>
				<view class="transform"><image src="../../static/exc.png" class="exc"></image></view>
			</view>
			<view class="amount little-line">
				<input type="number" placeholder="转出数量" class="out"/>
				<input type="number" placeholder="收到数量" class="in"/>
			</view>
			<view class="params">
				<view class="rate">余额: 10000 BTC</view>
				<view class="fee">手续费:0.1%</view>
			</view>
			<view class="rate-amount">汇率: 1BTC = 0.00001ETH</view>
		</view>
		<button type="primary" @click="submit" class="btn">闪电兑换</button>
		
		
		<view class="record">
			<view class="tip">兑换记录</view>
			<view class="title">
				<view class="col">数量</view>
				<view class="col">状态</view>
				<view class="col r">时间</view>
			</view>
			<scroll-view class="uni-list" :enableBackToTop="enableBackToTop" :scroll-y="scrollY" @scrolltolower="loadMore">
				<view class="uni-row little-line" v-for="item in records" :key="item">
					<view class="col">100</view>
					<view class="col">已完成</view>
					<view class="col r">16:52 01/04</view>
				</view>
			</scroll-view>
		</view>
		<uni-popup ref="popup" type="top">
			<view class="coin-box">
				<picker-view :indicator-style="indicatorStyle">
					<picker-view-column>
						<view class="item">
							<image src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67" class="coinLogo"></image>
							<text class="name">BTC</text>
						</view>
						<view class="item">
							<image src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67" class="coinLogo"></image>
							<text class="name">BTC</text>
						</view>
						<view class="item">
							<image src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67" class="coinLogo"></image>
							<text class="name">BTC</text>
						</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item">
							<image src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67" class="coinLogo"></image>
							<text class="name">ETH</text>
						</view>
						<view class="item">
							<image src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67" class="coinLogo"></image>
							<text class="name">ETH</text>
						</view>
						<view class="item">
							<image src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67" class="coinLogo"></image>
							<text class="name">ETH</text>
						</view>
					</picker-view-column>
				</picker-view>
			</view>
		</uni-popup>
		
		<uni-valid-popup ref="validPopup" type="mobile" @ok="ok"></uni-valid-popup>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {uniIcons, uniPopup, uniSearchBar} from '@dcloudio/uni-ui'
	import uniList from '@/components/uni-list.vue';
	import uniCell from '@/components/uni-cell.vue';
	import uniRefresh from '@/components/uni-refresh.vue';
	import uniLoadMore from '@/components/uni-load-more.vue';
	import empty from '../../components/empty.vue'
	import uniValidPopup from '@/components/uni-valid-popup.vue';
	export default {
		components: {uniIcons, uniPopup, uniSearchBar, empty, uniList, uniCell, uniRefresh, uniLoadMore, uniValidPopup},
		data() {
			return {
				bottom: 0,
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				scrollY: true,
				enableBackToTop: true,
				records: [1,2,3,4,5,6,7,8,9,0,10,11,12,13,14,15,16,17,18,19],
				indicatorStyle: 'height:90upx; line-height:90upx;'
			};
		},
		
		onLoad(){
			this.loadData();
		},
		computed:{
			...mapState(['hasLogin'])
		},
		methods: {
			submit(){
				this.$refs.validPopup.open()
			},
			ok(data){
				console.log(data)
			},
			changeCoin(){
				this.$refs.popup.open()
			},
			loadMore(){
				this.$refs.popup.open()
			},
			//请求数据
			async loadData(){
				let list = await this.$api.json('cartList'); 
				let cartList = list.map(item=>{
					item.checked = true;
					return item;
				});
			},
			navToDetail(){
				uni.navigateTo({
					url: '/pages/wallet/detail'
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	
	page{
		overflow: hidden;
	}
	.container{
		width: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		z-index: 1;
	}
	.coin-box{
		background: #ffffff;
		picker-view {
		    width: 100%;
		    height: 400upx;
		}
		.item{
			height: 90upx;
			line-height: 90upx;
			text-align: center;
			.coinLogo {
			    width: 34upx;
				height: 34upx;
			    margin-right: 10px;
				vertical-align: middle;
			}
			.name{
				font-size: $font-base;
				vertical-align: middle;
			}
		}
	}
	.record{
		background: #ffffff;
		flex: 1;
		.tip{
			font-weight: bold;
			font-size:  $font-md;
			padding-left: 20upx;
		}
		.r{
			text-align: right;
		}
		.title{
			display: flex;
			flex-direction: row;
			padding: 6upx 20upx;
			.col{
				flex: 1;
				font-size: $font-base;
				color: $font-color-light;
			}
		}
		.uni-list{
			flex: 1;
			display: flex;
			position: absolute;
			top: 580upx;
			bottom: 0upx;
			flex-direction: column;
			.uni-row{
				display: flex;
				flex-direction: row;
				margin: 0upx 20upx;
				height: 80upx;
				line-height: 80upx;
				.col{
					flex: 1;
					font-size: $font-base;
				}
			}
		}
	}
	.btn{
		margin: 20upx 20upx;
	}
	.exchange-box{
		background: #ffffff;
		border-radius: 10upx;
		.params{
			display: flex;
			padding: 20upx 30upx 10upx 30upx;
			font-size: $font-base;
			view{
				flex: 1;
			}
			.fee{
				text-align: right;
			}
		}
		.rate-amount{
			padding: 0upx 30upx 30upx 30upx;
			font-size: $font-base;
		}
		.amount{
			display: flex;
			height: 120upx;
			line-height: 120upx;
			padding-top: 40upx;
			padding-left: 30upx;
			padding-right: 30upx;
			.out{
				width: 50%;
				font-size: $font-base;
			}
			.in{
				width: 50%;
				text-align: right;
				font-size: $font-base;
			}
		}
		.coin{
			position: relative;
			display: flex;
			height: 120upx;
			line-height: 120upx;
			.transform{
				width: 68upx;
				height: 68upx;
				position: absolute;
				left: 50%;
				top: 110upx;
				transform: translate(-50%, -50%);
				background: #ffffff;
				z-index: 99;
			}
			.exc{
				width: 68upx;
				height: 68upx;
			}
			.item{
				flex: 1;
				text-align: center;
				.name{
					font-weight: 500;
				}
			}
			.coinLogo {
			    width: 42upx;
				height: 42upx;
			    margin-right: 8px;
			    display: inline-block;
			    vertical-align: middle;
			}
			text{
				padding-top: 12upx;
			    vertical-align: middle;
			}
			.tri{
				width: 32upx;
				height: 32upx;
			    display: inline-block;
			    vertical-align: middle;
				margin-left: 8upx;
			}
		}
	}
	
	
</style>
