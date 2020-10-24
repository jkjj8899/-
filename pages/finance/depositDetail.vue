<template>
	<view class="container">
		<view class="ing-box">
			<view class="list-item">
				<view class="title little-line">
					<view class="tl">
						<text class="name">{{item.productName}}</text>
						<view class="tags">
							<view class="item">{{item.tags}}</view>
						</view>
					</view>
					<view class="tr">
						<view class="period">第{{item.number}}期</view>
					</view>
				</view>
				<view class="info">
					<view class="col">
						<text class="sub">年化收益率</text>
						<text class="rate t">{{item.profitRate * 100}}%</text>
					</view>
					<view class="col">
						<text class="sub">年化收益率</text>
						<text class="period t">{{item.period}}天</text>
					</view>
					<view class="col">
						<text class="t"></text>
					</view>
				</view>
				<view class="amount">
					<view class="row">
						<view class="tt">起投数量</view>
						<text>{{item.minAmount}} USDT</text>
					</view>
					<view class="row">
						<view class="tt">剩余可投数量</view>
						<text>{{item.totalAmount - item.buyAmount}} USDT</text>
					</view>
				</view>
			</view>
		</view>
		<view class="timeline">
			<view class="title little-line">时间轴</view>
			<view class="time">
				<view class="row">
					<view class="text">购买</view>
					<view class="text">开启收益时间</view>
					<view class="text r">收益结算时间</view>
				</view>
				<view class="row line">
					<view class="text"><view class="circle"></view></view>
					<view class="text"><view class="circle"></view></view>
					<view class="text"><view class="circle"></view></view>
				</view>
				<view class="row between">
					<view class="text">{{item.buyTime | moment('MM-DD HH:mm:ss')}}</view>
					<view class="text">{{item.lockTime | moment('MM-DD HH:mm:ss')}}</view>
					<view class="text r">{{item.settleTime | moment('MM-DD HH:mm:ss')}}</view>
				</view>
			</view>
		</view>
		<view class="timeline">
			<view class="title little-line">规则说明</view>
			<view class="content">
				<view class="row">
					<view class="question">
						<view class="q">Q</view>
						<view class="t">什么是存币理财？</view>
					</view>
					<view class="question">
						<view class="a">A</view>
						<view class="c">存币理财是FEXCOIN平台推出的数字资产固定周期理财产品,每个理财产品项目锁定一定周期和不同的预期年化收益,你可以自由选择认购数量,购买后将进行锁定,由约定时间开始计算收益,到期后本金和收益将自动转入账户,获取本息收益。</view>
					</view>
				</view>
				<view class="row">
					<view class="question">
						<view class="q">Q</view>
						<view class="t">如果参与？</view>
					</view>
					<view class="question">
						<view class="a">A</view>
						<view class="c">登录FEXCOIN平台点击存币理财,依据您自身的情况选择需要的产品,输入币数量,点击立即存入,即可参与理财计划。</view>
					</view>
				</view>
				<view class="row">
					<view class="question">
						<view class="q">Q</view>
						<view class="t">锁定期未结束可以提前解锁吗？</view>
					</view>
					<view class="question">
						<view class="a">A</view>
						<view class="c">理财计划暂时不支持提前解锁,必须等锁定期结束后才会自动解锁,后续我们将会推出活期理财。</view>
					</view>
				</view>
				<view class="row">
					<view class="question">
						<view class="q">Q</view>
						<view class="t">如何获得收益？</view>
					</view>
					<view class="question">
						<view class="a">A</view>
						<view class="c">在锁定期结束后,点击存币理财中的领取收益按钮,您的本金和利息立即发放到您的帐户中,可以在我的资产中查看。</view>
					</view>
				</view>
				<view class="row">
					<view class="question">
						<view class="q">Q</view>
						<view class="t">资金用途？</view>
					</view>
					<view class="question">
						<view class="a">A</view>
						<view class="c">FEXCOIN平台推出的数字资产固定周期理财产品。资金主要用于数字资产的质押的放贷,资金用途透明。</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bt">
			<button disabled="true" v-if="item.status == 2">已完成</button>
			<button disabled="true" v-if="item.status == 1">锁定期</button>
			<button type="primary" v-if="item.status == 0" @click="handleBuy">立即存入</button>
		</view>
		<u-modal title="认购数量" v-model="showBuy" @confirm="confirm" ref="uModal" :show-cancel-button="true" :async-close="true">
			<view style="margin: 20upx 30upx;"><u-input v-model="amount" placeholder="输入认购数量" type="number" :border="false" /></view>
		</u-modal>
		<uni-valid-popup ref="validPopup" @ok="ok"></uni-valid-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import uniValidPopup from '@/components/uni-valid-popup.vue';
	import {authMixin, commonMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [commonMixin],
		components: {uniValidPopup},
		data() {
			return {
				ingList: [],
				historyList: [],
				id: undefined,
				amount: null,
				item: {},
				showBuy: false,
				statusMap: {
					0: '认购中',
					1: '锁定期',
					2: '已完成',
					3: '暂停'
				},
				data: {
					totalUsdAmount: 0,
					totalCnyAmount: 0,
					
				}
			};
		},
		onLoad(options){
			this.id = options.id
			this.loadData();
			//uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			this.loadData();
		},
		methods: {
			...mapActions('finance', ['productDetail', 'productBuy']),
			//请求数据
			loadData(){
				this.productDetail(this.id).then(res =>{
					this.item = res.data;
					uni.stopPullDownRefresh();
				}).catch(error =>{
					
				})
			},
			handleBuy(){
				this.amount = undefined
				this.showBuy = true
			},
			confirm(){
				if(!this.amount){
					this.$api.msg('请输入认购数量')
					this.$refs.uModal.clearLoading()
					return;
				}
				if(this.amount <= 0){
					this.$api.msg('认购数量输入错误')
					this.$refs.uModal.clearLoading()
					return;
				}
				this.$refs.validPopup.open('capitalPasswd')
				this.showBuy = false
			},
			ok(data){
				if(!data.code){
					this.$api.msg('请输入资金密码')
					return;
				}
				let form = {id: this.id, amount: this.amount, capitalPasswd: data.code}
				console.log(form)
				this.productBuy(form).then(res =>{
					this.$refs.validPopup.close()
					this.loadData()
					this.$api.msg('认购成功')
				}).catch(error => {
					this.$refs.validPopup.enable()
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	page{
		padding: 0;
		margin: 0;
		background: #EEF2F5;
	}
	.container{
		padding: 0;
		margin:0;
	}
	.no-data{
		background: #ffffff;
		height: 180upx;
		line-height: 180upx;
		text-align: center;
		border: 10upx;
	}
	.bt{
		position: fixed;
		bottom: 0;
		padding: 20upx 20upx;
		width: 100%;
		background: #ffffff;
	}
	.content{
		padding: 10upx 20upx 180upx 20upx;
		.row{
			padding-top: 10upx;
			padding-bottom: 10upx;
			.question{
				display: flex;
				margin-top: 10upx;
			}
			.q{
				height: 40upx;
				line-height: 40upx;
				padding: 0upx 10upx;
				color: #ffffff;
				text-align: center;
				background-color: #5E7EEE;
				border-radius: 6upx;
				margin-right: 15upx;
			}
			.a{
				height: 40upx;
				line-height: 40upx;
				padding: 0upx 8upx;
				border: 1upx solid #5E7EEE;
				color: #5E7EEE;
				margin-right: 15upx;
			}
			.t{
				font-size: $font-md;
				font-weight: bold;
			}
		}
	}
	.timeline{
		margin-top: 20upx;
		background-color: #ffffff;
		.title{
			height: 100upx;
			line-height: 100upx;
			padding-left: 20upx;
			font-size: $font-lg;
		}
		.time{
			padding: 30upx 30upx;
			.row{
				display: flex;
				justify-content: space-between;
				.text{
					display: block;
					width: 33%;
					text-align: center;
					position: relative;
				}
			}
			.line{
				height: 4upx;
				background-color: #5E7EEE;
				margin: 30upx 0;
				.circle{
					top: -8upx;
					left: 45%;
					position: absolute;
					z-index: 99;
					width: 20upx;
					height: 20upx;
					background-color: #ffffff;
					border-radius: 50upx;
					border: 2upx solid #5E7EEE;
				}
			}
		}
	}
	.list-item{
		background: #ffffff;
		border-radius: 10upx;
		padding-top: 20upx;
		.title{
			padding-left: 20upx;
			padding-right: 20upx;
			height: 100upx;
			line-height: 100upx;
			display: flex;
			justify-content: space-between;
			.tl{
				display: flex;
				.name{
					font-size: $font-md;
					font-weight: bold;
				}
				.tags {
					height: 100upx;
					line-height: 100upx;
					display: flex;
					align-items: center;
					.item{
						font-size: $font-sm;
						font-weight: normal;
						height: 50upx;
						line-height: 50upx;
						padding-left: 10upx;
						padding-right: 10upx;
						background-color: rgb(234, 242, 252);
						margin-left: 20upx;
						color: #3B414E;
					}
				}
			}
			.tr{
				height: 100upx;
				line-height: 100upx;
				display: flex;
				align-items: center;
				.period{
					background-color: rgb(234, 242, 252);
					font-size: $font-base;
					color: $font-color-blue;
					font-weight: normal;
					text-align: center;
					width: 150upx;
					height: 60upx;
					line-height: 60upx;
					border-radius: 50upx;
				}
			}
			
		}
		.info{
			display: flex;
			justify-content: space-between;
			padding: 30upx 20upx;
			.col{
				display: flex;
				flex-direction: column;
				.t{
					display: block;
					height: 70upx;
					line-height: 70upx;
				}
				.rate{
					font-size: $font-xxl;
					color: $font-color-red;
				}
				.period{
					font-size: $font-xxl;
				}
			}
		}
		.amount{
			padding: 0upx 20upx 30upx 20upx;
			.row{
				display: flex;
				align-items: center;
				.tt{
					width: 200upx;
				}
			}
		}
	}
</style>
