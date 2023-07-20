<template>
  <view class="container">
	<view class="tabs"><u-tabs-swiper activeColor="#ffffff" inactive-color="#ffffff" bg-color="#1866fe" ref="tabs" :current="current" :list="list" :is-scroll="false" @change="change"></u-tabs-swiper></view>
	<view class="header">
		<view class="bg"></view>
		<view class="box">
			<view class="profit">
				<view @click="toLogin" v-if="!loginInfo.hasLogin" class="login-btn">{{i18n.login.logining}}</view>
				<block v-if="loginInfo.hasLogin">
					<view class="l">
						<text class="title">{{i18n.miner.zsy}}</text>
						<view class="vol">{{profit.totalProfit}} {{query.catelog}}</view>
					</view>
					<view class="l">
						<text class="title">{{i18n.miner.zrsy}}</text>
						<view class="vol">{{profit.yestodayProfit}} {{query.catelog}}</view>
					</view>
				</block>
			</view>
		</view>
	</view>
	<view class="list">
		<u-empty v-if="empty" :text="i18n.common.noData" mode="list" margin-top="120"></u-empty>
		<view class="item" v-for="(item, index) in records">
			<view class="title">
				<view class="name">{{item.name}}</view>
				<view class="tags">
					<text class="i" v-for="(tag, i) in  splitTag(item.tags)">{{tag}}</text>
				</view>
			</view>
			<view class="params">
				<view class="row">
					<view class="col">
						<view class="label">{{i18n.miner.power}}</view>
						<view class="val">{{item.powerVol}}{{item.powerUnit}}</view>
					</view>
					<view class="col">
						<view class="label">{{i18n.miner.mfjsy}}/T</view>
						<view class="val">{{item.produceAmount}} {{item.produceCoin}}</view>
					</view>
				</view>
				<view class="row">
					<view class="col">
						<view class="label">{{i18n.miner.mintTime}}</view>
						<view class="val">{{item.effectiveTime | moment('YYYY-MM-DD')}}</view>
					</view>
					<view class="col">
						<view class="label">{{i18n.miner.lifeCycle}}</view>
						<view class="val">{{item.lifeCycle}}{{i18n.miner.day}}</view>
					</view>
				</view>
			</view>
			<view class="remain">
				<view class="progress"><u-line-progress height="20" activeColor="#1866fe" :show-percent="false" active-color="#2979ff" :percent="percent(item)"></u-line-progress></view>
				<view class="label">{{i18n.miner.remind}}: {{item.quantity}}</view>
			</view>
			<view class="buy">
				<view class="price">
					<text class="value">{{item.buyAmount}}</text>
					<text class="unit">{{item.buyCoin}}</text>
				</view>
				<view @click="buy(item)" class="btn">{{i18n.miner.buy}}</view>
			</view>
		</view>
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
    components: {
    },
	mixins: [commonMixin],
    data () {
      return {
		  current: 0,
		  list: [],
		  total: 0, //总价格
		  empty: false, //空白页现实  true|false
		  records: [],
		  catelogs: [],
		  query: {
		  	page: 1,
		  	limit: 10,
		  	catelog: undefined
		  },
		  totalCount: 0,
		  loadingStatus: 'more',
		  isLastPage: false,
		  profit: {
			  totalProfit: 0.00,
			  yestodayProfit: 0.00
		  }
      }
    },
	onLoad() {
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.i18n.miner.navTitle
		})
		this.records = []
		this.query.page = 1
		this.getMachineList()
	},
	onReachBottom(){
		if(!this.isLastPage){
			this.query.page += 1
			this.getMachineList()
		}
	},
	onPullDownRefresh() {
		this.records = []
		this.query.page = 1
		this.getMachineList();
	},
	onNavigationBarButtonTap(e) {
		const index = e.index;
		if (index === 0) {
			this.navTo('/pages/mining/my');
		}
	},
	computed: {
		...mapState('user', ['loginInfo'])
	},
    methods: {
		...mapActions('mining', ['machineList', 'machineProfit']),
		toLogin(){
			uni.navigateTo({
				url: '/pages/public/login'
			})
		},
		change(index){
			uni.showLoading({
				title: this.i18n.common.request
			})
			this.current = index
			this.reset()
			this.query.catelog = this.list[index].name
			this.getMachineList()
		},
		splitTag(tags){
			if(!tags){
				return [];
			}
			return JSON.parse(tags)
		},
		percent(item){
			return (1 - (item.quantity / item.totalQuantity).toFixed(2)) * 100
		},
		reset(){
			this.records = []
			this.query = {
			  	page: 1,
			  	limit: 10,
			  	catelog: undefined
			}
		},
		getMachineProfit(){
			if(this.loginInfo.hasLogin){
				this.machineProfit({catelog: this.query.catelog}).then(res =>{
					this.profit = res.data
				}).catch(error => {
				})
			}
		},
		getMachineList(){
			this.machineList(this.query).then(res =>{
				uni.stopPullDownRefresh();
				let catelogs = [];
				for(let i = 0; i < res.data.catelogs.length; i++){
					catelogs.push({name:res.data.catelogs[i]})
				}
				if(!this.query.catelog){
					this.query.catelog = catelogs[0].name
				}
				this.list = catelogs
				this.empty = res.data.dataTable.total <= 0
				this.isLastPage = (this.query.page == res.data.dataTable.pages)
				if(this.isLastPage){
					this.loadingStatus = 'noMore'
				} else {
					this.loadingStatus = 'more'
				}
				if(this.empty){
					this.records = [];
				} else {
					this.records = this.records.concat(res.data.dataTable.rows)
				}
				
				this.getMachineProfit()
				uni.hideLoading()
			}).catch(error => {
				this.loadingStatus = 'more'
				uni.stopPullDownRefresh();
				uni.hideLoading()
			})
		},
		buy(item){
			if(this.isLogin()){
				uni.navigateTo({
					url: '/pages/mining/detail?id='+item.id
				})
			}
		}
    }
  }
</script>

<style lang="less" scoped>
	page{
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
	}
	.container{
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
	}
	.tabs{
		position: fixed;
		width: 100%;
		left: 0;
		z-index: 999999;
	}
	.list{
		margin-top: 100rpx;
		padding: 30rpx 30rpx;
		.item{
			padding: 20rpx 20rpx ;
			background-color: #ffffff;
			border-radius: 20rpx;
			margin-bottom: 30rpx;
		}
		.buy{
			display: flex;
			justify-content: space-between;
			height: 100rpx;
			line-height: 100rpx;
			.price{
				color: #1866fe;
			}
			.price .value{
				font-size: 34rpx;
				font-weight: bold;
			}
			.price .unit{
				font-size: 26rpx;
				padding-left: 10rpx;
			}
			.btn{
				background-color: #1866fe;
				height: 60rpx;
				line-height: 60rpx;
				padding: 0 50rpx;
				color: #ffffff;
				border-radius: 50rpx;
				margin-top: 20rpx;
			}
		}
		.remain{
			position: relative;
			height: 100rpx;
			line-height: 100rpx;
			.progress{
				margin-right: 210rpx;
			}
			.label{
				width: 200rpx;
				text-align: right;
				position: absolute;
				top: 0;
				right: 0;
				font-size: 26rpx;
			}
		}
		.title{
			.name{
				font-size: 34rpx;
				font-weight: bold;
			}
			.tags{
				.i{
					background-color: #fedcd2;
					margin-right: 10rpx;
					font-size: 23rpx;
					padding: 4rpx 10rpx;
					border-radius: 8rpx;
					color: #ff6539;
				}
			}
		}
		.params .row{
			display: flex;
			padding: 20rpx 0 0 0;
			.col{
				width: 50%;
			}
			.col .label{
				font-size: 26rpx;
			}
			.col .val{
				font-weight: bold;
				padding-top: 10rpx;
			}
		}
	}
	.header{
		position: relative;
		.bg{
			width: 100%;
			height: 260rpx;
			background-color: #1866fe;
			border-bottom-left-radius: 40rpx;
			border-bottom-right-radius: 40rpx;
		}
		.box{
			position: absolute;
			width: 100%;
			top: 80rpx;
			left: 0;
			padding: 0 30rpx;
		}
		.profit{
			width: 100%;
			height: 240rpx;
			background-color: #ffffff;
			margin-top: 30rpx;
			padding-top: 60rpx;
			border-radius: 20rpx;
			display: flex;
			justify-content: space-between;
			text-align: center;
			.login-btn{
				margin: 20rpx auto;
				width: 200rpx;
				height: 70rpx;
				line-height: 70rpx;
				background-color: #1866fe;
				color: #ffffff;
				border-radius: 10rpx;
			}
			.l{
				width: 50%;
				.vol{
					padding: 30rpx 0;
					font-weight: bold;
				}
			}
		}
	}
</style>