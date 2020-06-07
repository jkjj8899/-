<template>
	<view class="container">
		<view class="head-wrapper">
			<view class="status" v-if="order.status == 0">
				<view class="s">
					<text class="iconfont s0"></text>
					<text class="v">请付款</text>
				</view>
				<view v-if="side == 'BUY'">请在<text class="t">14:00</text>内付款给卖家</view>
				<view v-if="side == 'SELL'">等待对方付款,可以 14:00 后提交申诉</view>
			</view>
			<view class="status" v-if="order.status == 1">
				<view class="s">
					<text class="iconfont s0"></text>
					<text class="v">已付款</text>
				</view>
				<view v-if="side == 'BUY'">商家未放币,您可进行申诉</view>
				<view v-if="side == 'SELL'">对方向你支付了 {{order.totalPrice}}</view>
			</view>
			<view class="status" v-if="order.status == 2">
				<view class="s">
					<text class="v">已完成</text>
				</view>
				您的订单已完成
			</view>
			<view class="status" v-if="order.status == 3">
				<view class="s">
					<text class="v">交易取消</text>
				</view>
				订单取消无法查看支付信息
			</view>
			<view class="status" v-if="order.status == 4">
				<view class="s">
					<text class="v">申诉中</text>
				</view>
				订单正在申诉中
			</view>
			<view class="concat" v-if="order.status == 0 || order.status == 1">
				<text class="iconfont icon-telephone"></text>
				<view>电话</view>
			</view>
		</view>
		<view class="amount-wrapper">
			<text class="total">订单金额: ￥{{order.totalPrice}}</text>
			<view class="info">
				<view class="price">
					<view><text class="label">单价</text><text class="num">￥{{order.price}}</text></view>
					<view><text class="label">数量</text><text class="num">{{order.volume}} {{order.coin}}</text></view>
				</view>
				<view class="coin">
					<image :src="coinMap[order.coin].icon" class="coinLogo"></image>
					<view>{{order.coin}}</view>
				</view>
			</view>
		</view>
		
		<view class="line"></view>
		<view class="transfer-info">
			<view class="list">
				<view class="item little-line">
					<view class="left">订单号</view>
					<view class="right">{{order.number}}</view>
				</view>
				<view class="item">
					<view class="left">下单时间</view>
					<view class="right">{{order.ctime | moment('YYYY-MM-DD HH:mm:ss')}}</view>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view v-if="side == 'BUY' && order.status != 3" class="secrity-tip little-line">请使用本人{{currentPay.name}}向以下帐号自行转账</view>
		<!-- 列表 -->
		<view v-if="order.status != 3" class="transfer-info">
			<view class="list">
				<view class="item little-line">
					<view class="left">{{currentPay.name}}</view>
					<view class="right"><text v-if="side == 'BUY' && order.status == 0" class="change" @click="changePay()">切换支付方式</text></view>
				</view>
				<view class="item little-line">
					<view class="left">收款人</view>
					<view class="right">{{account.username}}</view>
				</view>
				<view class="item little-line">
					<view class="left">{{currentPay.name}}账号</view>
					<view class="right">{{account.accountNo}}</view>
				</view>
				<view v-show="currentPay.code == 'UnionPay'" class="item little-line">
					<view class="left">开户银行</view>
					<view class="right">{{account.bankName}}</view>
				</view>
				<view v-show="currentPay.code == 'UnionPay'" class="item">
					<view class="left">开户支行</view>
					<view class="right">{{account.subBranch}}</view>
				</view>
				<view v-show="currentPay.code == 'UnionPay'" class="item">
					<view class="left">开户支行</view>
					<view class="right">{{account.subBranch}}</view>
				</view>
			</view>
		</view>
		<view class="footer" v-if="side == 'BUY' && order.status == 0">
			<view class="safe-tip">
				在转账过程中请勿备注BTC、USDT、交易所等信息,防止汇款被拦截、银行卡被冻结等问题
			</view>
			<view class="btns">
				<button @click="cancel" class="cancel">取消订单</button>
				<button @click="pay" class="pay">我已付款成功</button>
			</view>
		</view>
		<view class="footer" v-if="side == 'BUY' && order.status == 1">
			<view class="btns">
				<button class="pay">申诉</button>
			</view>
		</view>
		<view class="footer" v-if="side == 'SELL' && order.status == 1">
			<view class="btns">
				<button class="pay">申诉</button>
				<button @click="complete" class="pay">确认收款并放行</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import {commonMixin, authMixin} from '@/common/mixin/mixin.js'
	import {uniIcons,uniList,uniListItem} from '@dcloudio/uni-ui'
	export default {
		components: {uniIcons,uniList,uniListItem},
		mixins: [commonMixin, authMixin],
		data() {
			return {
				id: undefined,
				order: {
					totalPrice: 0,
					number: '',
					coin:  ''
				},
				nickname: undefined,
				side: undefined,
				merchantPays: undefined,
				payment: undefined,
				payCodes: [],
				payLabels: [],
				currentPay: {
					code: undefined,
					name: undefined
				},
				account: {}
			};
		},
		onLoad(options){
			this.currencyList().then(res => {
				this.payment = res.data.payment
				this.id = options.id
				this.loadData();
			})
			
		},
		computed: {
			...mapState('common', ['coinMap'])
		},
		methods: {
			...mapActions('common', ['currencyList']),
			...mapActions('otc', ['getOrder', 'cancelOrder', 'payOrder', 'completeOrder']),
			cancel(){
				let $this = this;
				uni.showModal({
				    title: '提示',
				    content: '是否确认取消订单?',
				    success: function (res) {
				        if (res.confirm) {
							uni.showLoading({})
							$this.cancelOrder($this.id).then(res =>{
								$this.loadData()
								uni.hideLoading()
								$this.$api.msg('取消成功', 1000, false, 'none', function() {})
							}).catch(error =>{
								uni.hideLoading()
							})
				        }
				    }
				});
				
			},
			pay(){
				let $this = this;
				uni.showModal({
				    title: '提示',
				    content: '是否确认已付款?',
				    success: function (res) {
				        if (res.confirm) {
							uni.showLoading({})
							$this.payOrder({id: $this.id, payment: $this.currentPay.code}).then(res =>{
								$this.loadData()
								uni.hideLoading()
								$this.$api.msg('标记付款成功', 1000, false, 'none', function() {})
							}).catch(error =>{
								uni.hideLoading()
							})
				        }
				    }
				});
			},
			complete(){
				let $this = this;
				uni.showModal({
				    title: '提示',
				    content: '是否确认放币?',
				    success: function (res) {
				        if (res.confirm) {
							uni.showLoading({})
							$this.completeOrder($this.id).then(res =>{
								$this.loadData()
								uni.hideLoading()
								$this.$api.msg('放币成功', 1000, false, 'none', function() {})
							}).catch(error =>{
								uni.hideLoading()
							})
				        }
				    }
				});
			},
			changePay(){
				let $this = this
				uni.showActionSheet({
					itemList: this.payLabels,
					success: function (res) {
						$this.currentPay = {
							code: $this.payCodes[res.tapIndex],
							name: $this.payLabels[res.tapIndex]
						}
						$this.account = JSON.parse($this.merchantPays[$this.currentPay.code].account)
					}
				})
			},
			async loadData(){
				this.getOrder(this.id).then(res =>{
					this.order = res.data.order
					this.nickname = res.data.nickname
					this.side = res.data.side
					this.merchantPays = res.data.payments
					for(let key in this.merchantPays){
						for(let i = 0; i < this.payment.length; i++){
							if(key === this.payment[i].code){
								this.payCodes.push(key)
								this.payLabels.push(this.payment[i].name)
							}
						}
					}
					this.currentPay = {
						code: this.payCodes[0],
						name: this.payLabels[0]
					}
					this.account = JSON.parse(this.merchantPays[this.currentPay.code].account)
				}).catch(error =>{
					
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	@font-face {
	  font-family: 'iconfont';
	  src: url('../../../static/font/otc-detail.ttf') format('truetype');
	}
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 70upx;
	  color: #ffffff;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	.s0:before {
	  content: "\e6db";
	}
	.s1:before {
	  content: "\e69b";
	}
	.s2:before {
	  content: "\e6e6";
	}
	.s3:before {
	  content: "\e698";
	}
	.s4:before {
	  content: "\e69e";
	}
	
	.icon-telephone:before {
	  content: "\e6a2";
	}
	.icon-message:before {
	  content: "\e6df";
	}
	.container{
		padding: 0upx 0upx 240upx 0upx;
	}
	.head-wrapper{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background: #0952C3;
		font-size: $font-base;
		padding: 160upx 30upx 40upx 30upx;
		color: $font-color-light;
		.status{
			font-size: $font-sm;
			.s{
				display: flex;
				flex-direction: row;
				align-items: center;
				.v{
					font-size: $font-xl;
					color: #ffffff;
				}
			}
			.t{
				color: #ffffff;
			}
		}
		.concat{
			font-size: $font-sm;
		}
		
	}
	.secrity-tip{
		padding: 20upx 30upx;
		font-size: $font-sm;
	}
	.amount-wrapper{
		padding: 30upx 30upx 30upx 30upx;
		.total{
			display: block;
			color: $font-color-blue;
			padding: 20upx 0 20upx 0;
			font-weight: bold;
			font-size: $font-lg;
		}
		.info{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.price{
				font-size: $font-base;
				view{
					padding-top: 10upx;
					padding-bottom: 10upx;
				}
				.label{
					color: $font-color-light;
					padding-right: 30upx;
				}
			}
			.coin{
				font-size: $font-base;
				text-align: center;
				image{
					width: 56upx;
					height: 56upx;
				}
			}
		}
	}
	.transfer-info{
		padding: 0upx 30upx;
		.change{
			color: $font-color-blue;
		}
	}
	.list{
		.item{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 30upx 0 30upx 0;
			.left{
				font-size: $font-base;
			}
			.right{
				font-size: $font-base;
			}
		}
	}
	.footer{
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		width: 100%;
		.safe-tip{
			font-size: $font-sm;
			color: $font-color-blue;
			background: $uni-color-tip;
			padding: 20upx 30upx;
		}
		.btns{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 20upx 30upx;
			.cancel{
				width: 35%;
				font-size: $font-base;
			}
			.pay{
				width: 55%;
				border: 0px;
				border-radius: 0;
				background-color: $uni-color-blue;
				color: #ffffff;
				font-size: $font-base;
			}
		}
	}	
	
	
</style>
