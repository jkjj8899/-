<template>
	<view class="content">
		<view style="padding: 200upx 0;" v-if="records.length <= 0">
			<u-empty text="暂无记录" mode="list"></u-empty>
		</view>
		<view class="row" v-for="(item, i) in records">
			<view class="title">下注记录</view>
			<view class="table">
				<view class="item">
					<text>RoundID:</text>
					<text>#{{item.round.id}}</text>
				</view>
				<view class="item">
					<text>下注方向:</text>
					<text>看{{positionMap[item.position]}}</text>
				</view>
				<view class="item">
					<text>下注数量:</text>
					<text>{{item.amount}}</text>
				</view>
				<view class="item">
					<text>预测奖励:</text>
					<text>{{item.rewardAmount}}</text>
				</view>
			</view>
			<view class="title">回合记录</view>
			<view class="table">
				<view class="item">
					<text>总奖池:</text>
					<text>{{item.round.bullAmount + item.round.bearAmount}}</text>
				</view>
				<view class="item">
					<text>多头:</text>
					<text>{{item.round | setPayout('bull')}}x | {{item.round.bullAmount}}</text>
				</view>
				<view class="item">
					<text>空头:</text>
					<text>{{item.round | setPayout('bear')}}x | {{item.round.bearAmount}}</text>
				</view>
				<view class="item">
					<text>锁定价格:</text>
					<text>{{item.round.lockPrice}}</text>
				</view>
				<view class="item">
					<text>结束价格:</text>
					<text>{{item.round.closePrice}}</text>
				</view>
			</view>
		</view>
		<u-loadmore :status="status" />
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {authMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [authMixin],
		data() {
			return {
				pageForm: {
					page: 1,
					limit: 10
				},
				positionMap: {
					'bull': '涨',
					'bear': '跌'
				},
				records: [],
				isLastPage: false,
				status: 'loadmore',
			}
		},
		filters: {
			setPayout(item, position){
				let total = item.bullAmount + item.bearAmount
				if(position == 'bull'){
					return item.bullAmount == 0 ? 0.00 : (total / item.bullAmount).toFixed(2)
				} else {
					return item.bearAmount == 0 ? 0.00 : (total / item.bearAmount).toFixed(2)
				}
			}
		},
		onShow() {
			this.getHistory()
		},
		onReachBottom(){
			if(!this.isLastPage){
				this.pageForm.page += 1
				this.getHistory()
			}
		},
		onPullDownRefresh() {
			this.records = []
			this.pageForm.page = 1
			this.getHistory();
		},
		methods: {
			...mapActions('prediction', ['predictionHistory']),
			getHistory(){
				this.status = 'loading'
				this.predictionHistory(this.pageForm).then(res =>{
					this.records = this.records.concat(res.data.records)
					this.isLastPage = (this.pageForm.page == res.data.pages)
					if(this.isLastPage){
						this.status = 'nomore'
					} else {
						this.status = 'loadmore'
					}
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	.content{
		width: 100%;
		height: 100%;
		padding: 0upx 20upx;
	}
	.row{
		padding: 20upx 30upx;
		border: 1upx solid #EEF2F5;
		border-radius: 20upx;
		margin-bottom: 20upx;
		.title{
			font-weight: bold;
			font-size: 30upx;
			border-bottom: 1upx solid #EEF2F5;
			padding: 10upx 0;
		}
		.table .item{
			display: flex;
			justify-content: space-between;
			padding: 10upx 0;
		}
	}
</style>
