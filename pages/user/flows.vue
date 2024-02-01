<template>
	<view class="container">
		<u-empty :text="i18n.common.noData" :show="empty" mode="data" margin-top="200"></u-empty>
		<view class="list-item little-line" v-for="(item, i) in list" :key="i">
			<view class="title">
				<view class="tl">
					<text class="name">{{sence[item.transferType]}}</text>
				</view>
				<view class="tr">{{item.inOut == 'in' ? '+' : ''}}{{item.amount}} {{item.coin}}</view>
			</view>
			<view class="info">
				<text class="time status">{{i18n.account.flows.type}}: {{ i18n.account.flows[item.inOut]}}</text>
				<view class="time">{{item.ctime | moment('YYYY-MM-DD HH:mm:ss')}}</view>
			</view>
		</view>
		<u-loadmore v-if="!empty" :load-text="loadText" :status="loadingStatus" :margin-top="30"/>
		
		<u-popup v-model="show" mode="right">
			<view class="popup">
				<view class="item" @click="filter(item.key)" v-for="(item, index) in sheets" :key="index">{{item.text}}</view>
				<view class="item" @click="filter('')">{{i18n.withdraw.all}}</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {authMixin, commonMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [ authMixin, commonMixin],
		data() {
			return {
				list: [],
				empty: false,
				totalCount: 0,
				loadingStatus: 'loadmore',
				isLastPage: false,
				sence: {},
				query: {
					page: 1,
					limit: 20,
					status: 2,
					sence: '',
					coin: ''
				},
				sheets: [],
				show: false,
			};
		},
		onShow() {
			this.sence = this.i18n.account.flows.biz
			let sheets = []
			for(let key in this.sence){
				sheets.push({text: this.sence[key], key: key})
				console.log(key)
			}
			this.sheets = sheets;
		},
		onLoad(options){
			uni.setNavigationBarTitle({
				title: this.i18n.account.flows.title
			})
			this.query.coin = options.coin
			this.loadData();
			//uni.startPullDownRefresh();
		},
		onReachBottom(){
			if(!this.isLastPage){
				this.query.page += 1
				this.getOrderList()
			}
		},
		onPullDownRefresh() {
			this.list = []
			this.query.page = 1
			this.loadData();
		},
		onNavigationBarButtonTap() {
			this.show = true
		},
		methods: {
			...mapActions('account', ['accountFlows']),
			//请求数据
			loadData(){
				this.getOrderList()
			},
			filter(key){
				this.query.sence = key
				this.list = []
				this.query.page = 1
				this.show = false
				this.loadData();
			},
			getOrderList(){
				this.loadingStatus = 'loading'
				this.accountFlows(this.query).then(res =>{
					uni.stopPullDownRefresh();
					this.empty = res.total <= 0
					this.isLastPage = (this.query.page == res.pages)
					if(this.isLastPage){
						this.loadingStatus = 'nomore'
					} else {
						this.loadingStatus = 'loadmore'
					}
					if(this.empty){
						this.list = [];
					} else {
						this.list = this.list.concat(res.rows)
					}
				}).catch(error => {
					this.loadingStatus = 'more'
					uni.stopPullDownRefresh();
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	page{
		padding: 0;
		margin: 0;
	}
	.container{
		padding: 0;
		margin: 0;
	}
	.popup{
		width: 400upx;
		.item{
			width: 180upx;
			height: 80upx;
			line-height: 80upx;
			float: left;
			text-align: center;
			margin-left: 15upx;
			margin-top: 10upx;
			font-size: 24upx;
			border-radius: 8upx;
			background-color: rgba(41, 121, 255,0.9);
			color: #ffffff;
			word-break: break-word;
		}
	}
	.list-item{
		padding: 20upx 0;
		background: #ffffff;
		border-radius: 10upx;
		.title{
			padding: 0upx 20upx;
			height: 40upx;
			line-height: 40upx;
			display: flex;
			justify-content: space-between;
			.tl{
				display: flex;
				align-items: center;
				align-content: center;
				.name{
					font-size: $font-base;
				}
				.period{
					height: 40upx;
					line-height: 40upx;
					padding: 0upx 10upx;
					background-color: rgb(234, 242, 252);
					font-size: $font-sm;
					color: $font-color-blue;
					font-weight: normal;
					text-align: center;
				}
			}
			.tr{
				height: 40upx;
				line-height: 40upx;
				display: flex;
				align-items: center;
				
			}
			
		}
		.info{
			display: flex;
			justify-content: space-between;
			padding: 0upx 20upx 0upx 20upx;
			height: 50upx;
			line-height: 50upx;
			.time{
				font-size: $font-sm;
			}
		}
	}
</style>
