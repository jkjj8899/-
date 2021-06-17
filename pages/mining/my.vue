<template>
  <view class="container">
	<view class="tabs"><u-tabs-swiper activeColor="#ffffff" inactive-color="#ffffff" bg-color="#ff724a" ref="tabs" :current="current" :list="list" :is-scroll="false" @change="change"></u-tabs-swiper></view>
	<view class="header">
		<view class="bg"></view>
		<view class="box">
			<view class="profit">
				<view class="l">
					<text class="title">总收益</text>
					<view class="vol">{{profit.totalProfit}} {{query.catelog}}</view>
					<!--<text>≈￥1000000</text>-->
				</view>
				<view class="l">
					<text class="title">昨日收益</text>
					<view class="vol">{{profit.yestodayProfit}} {{query.catelog}}</view>
					<!--<text>≈￥1000000</text>-->
				</view>
			</view>
		</view>
	</view>
	<view class="list">
		<u-empty v-if="empty" text="暂无数据" mode="list" margin-top="120"></u-empty>
		<view class="item" v-for="(item, index) in records">
			<view class="title">
				<view class="name">{{item.machineName}}</view>
				<view @click="navTo('/pages/mining/profit?id='+item.id)" class="search">查看收益<u-icon name="arrow-right" size="20"></u-icon></view>
			</view>
			<view class="params">
				<view class="row">
					<view class="col">
						<view class="label">开挖时间</view>
						<view class="val">{{item.effectiveTime | moment('YYYY-MM-DD')}}</view>
					</view>
					<view class="col">
						<view class="label">预计每日净收益</view>
						<view class="val">{{item.produceAmount}} {{item.produceCoin}}</view>
					</view>
				</view>
				<view class="row">
					<view class="col">
						<view class="label">过期时间</view>
						<view class="val">{{item.expireTime | moment('YYYY-MM-DD')}}</view>
					</view>
					<view class="col">
						<view class="label">矿机状态</view>
						<view class="val">{{statusMap[item.status]}}</view>
					</view>
				</view>
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
	mixins: [commonMixin, authMixin],
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
		  statusMap: {
			  0: '待生产',
			  1: '产矿中',
			  2: '已失效'
		  },
		  profit: {
			  totalProfit: 0.00,
			  yestodayProfit: 0.00
		  }
      }
    },
	onLoad() {
	},
	onShow() {
		this.reset()
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
    methods: {
		...mapActions('mining', ['machineMy', 'machineProfit']),
		change(index){
			uni.showLoading({
				title: "正在加载..."
			})
			this.current = index
			this.reset()
			this.query.catelog = this.list[index].name
			this.getMachineList()
		},
		reset(){
			this.records = []
			this.query = {
			  	page: 1,
			  	limit: 10,
			  	catalog: undefined
			}
		},
		getMachineProfit(){
			this.machineProfit({catelog: this.query.catelog}).then(res =>{
				this.profit = res.data
			}).catch(error => {
			})
		},
		getMachineList(){
			this.machineMy(this.query).then(res =>{
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
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		background-color: #f7f7f7;
	}
	.tabs{
		position: fixed;
		width: 100%;
		left: 0;
		z-index: 999999;
	}
	.list{
		margin-top: 100upx;
		padding: 30upx 30upx;
		.item{
			padding: 20upx 20upx ;
			background-color: #ffffff;
			border-radius: 20upx;
			margin-bottom: 30upx;
		}
		.title{
			display: flex;
			justify-content: space-between;
			.name{
				font-size: 34upx;
				font-weight: bold;
			}
			.search{
				font-size: 24upx;
				padding-top: 8upx;
			}
		}
		.params .row{
			display: flex;
			padding: 20upx 0 0 0;
			.col{
				width: 50%;
			}
			.col .label{
				font-size: 26upx;
			}
			.col .val{
				font-weight: bold;
				padding-top: 10upx;
			}
		}
	}
	.header{
		position: relative;
		.bg{
			width: 100%;
			height: 260upx;
			background-color: #ff724a;
			border-bottom-left-radius: 40upx;
			border-bottom-right-radius: 40upx;
		}
		.box{
			position: absolute;
			width: 100%;
			top: 80upx;
			left: 0;
			padding: 0 30upx;
		}
		.profit{
			width: 100%;
			height: 240upx;
			background-color: #ffffff;
			margin-top: 30upx;
			padding-top: 60upx;
			border-radius: 20upx;
			display: flex;
			justify-content: space-between;
			text-align: center;
			.l{
				width: 50%;
				.vol{
					padding: 30upx 0;
					font-weight: bold;
				}
			}
		}
	}
</style>