<template>
	<view class="container">
		<!-- 列表 -->
		<view class="coin-section m-t">
			<view class="s-row">
				<view class="col">
					<image :src="coin.icon" mode="widthFix" class="icon"></image>
					<text class="coin">{{coin.symbol}}</text>
				</view>
				<view class="col r light" @click="navTo('/pages/public/coinList')">
					<text class="subtitle">选择币种</text>
					<uni-icons type="forward" size="20" class="arrow"></uni-icons>
				</view>
			</view>
			<view class="form">
				<text class="label">提币地址</text>
				<view class="input little-line">
					<input type="text" v-model="form.address" placeholder="输入或长按粘贴地址" class="address"/>
				</view>
				<text class="label">数量</text>
				<view class="input little-line">
					<input type="number" v-model="form.amount" :placeholder="`最小提币数量${coin.minWithdraw}`" class="address"/>
					<view class="all" @click="all">全部</view>
				</view>
				<view class="balance">可用 {{account.normalBalance}} ETH</view>
				<text class="label">手续费 {{coin.withdrawFee}} {{coin.symbol}}</text>
			</view>
			<button class="submit" @click="handleSubmit">确认</button>
			<view class="desc">
				<text>最小提币数量为：2 USDT (ERC20)。</text>
				<text>为保障资金安全，当您账户安全策略变更、密码修改、我们会对提币进行人工审核，请耐心等待工作人员电话或邮件联系。</text>
				<text>请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</text>
			</view>
		</view>
		<uni-valid-popup ref="validPopup" @ok="ok"></uni-valid-popup>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import uniValidPopup from '@/components/uni-valid-popup.vue';
	import {uniIcons} from '@dcloudio/uni-ui'
	import {commonMixin} from '@/common/mixin/mixin.js'
	export default {
		components: {uniIcons, uniValidPopup},
		mixins: [commonMixin],
		data() {
			return {
				coin: {},
				account: {},
				coins: [],
				form: {
					symbol: undefined,
					amount: undefined,
					address: undefined,
					authCode: ''
				}
			};
		},
		onUnload(){
			uni.$off('selectCoin', this.selectCoin)
		},
		onLoad(){
			uni.$on('selectCoin', this.selectCoin)
			this.coinList().then(res =>{
				this.coins = res.data
				this.coin = res.data[0]
			})
			this.loadData()
		},
		methods: {
			...mapActions('common', ['coinList']),
			...mapActions('account', ['getAccount']),
			...mapActions('user', ['withdraw']),
			//请求数据
			async loadData(){
				this.getAccount(this.coin.symbol).then(res =>{
					this.account = res.data
				})
			},
			selectCoin(data){
				for(let i = 0; i < this.coins.length; i++){
					let item = this.coins[i]
					if(item.symbol === data.coin.item.name){
						this.coin = item;
						break;
					}
				}
				this.loadData()
			},
			handleSubmit(){
				this.form.symbol = this.coin.symbol
				if(!this.form.symbol){
					this.$api.msg('请选择币种')
					return;
				}
				if(!this.form.address){
					this.$api.msg('请输入提币地址')
					return;
				}
				if(!this.form.amount){
					this.$api.msg('请输入数量')
					return;
				}
				this.$refs.validPopup.open('mobile')
				
			},
			ok(data){
				if(!data.code){
					this.$api.msg('请输入验证码')
					return;
				}
				this.form.authCode = data.token + ':' + data.code
				console.log(this.form.authCode)
				uni.showLoading();
				this.withdraw(this.form).then(res =>{
					uni.hideLoading()
					this.$api.msg('提币成功', 1000, false, 'none', function() {})
				}).catch(error => {
					uni.hideLoading()
				})
			},
			all(){
				this.form.amount = this.account.normalBalance
			}
		}
	}
</script>

<style lang='scss' scoped>
	.container{
		padding: $page-row-spacing;
	}
	.coin-section{
		background: #fff;
		.s-row{
			background-color: $uni-color-subbg;
			display:flex;
			align-items:center;
			padding: 20upx 10upx 20upx 10upx;
			.col{
				font-size: $font-lg;
				color: $font-color-dark;
				flex:1;
				.icon{
					width: 60upx;
					height: 60upx;
					vertical-align: middle;
					margin-right: 10upx;
				}
				.coin{
					font-weight: 400;
					vertical-align: middle;
				}
				.subtitle{
					font-size: $font-sm;
					font-weight: 400;
				}
			}
			.coinLogo {
			    width: 46upx;
				height: 46upx;
			    margin-right: 8px;
			    display: inline-block;
			    vertical-align: middle;
			    float: left;
			}
			.light{
				font-weight: 100;
				font-size: $font-lg;
				color: $font-color-dark;
			}
			.r{
				text-align: right;
			}
			.arrow{
				vertical-align: middle;
			}
		}
		.form{
			padding: 10upx 0;
			display: flex;
			flex-direction: column;
			.label{
				margin-top: 30upx;
				color: $font-color-dark;
				font-size: $font-sm;
			}
			.balance{
				margin-top: 10upx;
				color: $font-color-light;
				font-size: $font-sm;
			}
			.input{
				padding: 10upx 0;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				.all{
					flex: 0.5;
					text-align: right;
					font-size: $font-base;
					color: $font-color-dark;
					font-weight: bold;
				}
			}
			input{
				color: $font-color-light;
				font-size: $font-base;
			}
		}
		.desc{
			margin-top: 30upx;
			margin-bottom: 20upx;
			font-size: $font-base;
			color: $font-color-light;
			display: flex;
			flex-direction: column;
		}
	}
	.submit{
		margin: 60upx 0upx;
		background: $uni-color-blue;
		color: #fff;
		font-size: $font-md;
	}
	
</style>
