<template>
	<view class="container">
		<!-- 列表 -->
		<view class="coin-section m-t">
			<view class="s-row">
				<view class="col">
					<image :src="coin.icon" class="coinLogo"></image>
					<text class="coin">{{coin.symbol}}</text>
				</view>
				<view class="col r light" @click="navTo('/pages/public/coinList')">
					<text class="subtitle">选择币种</text>
					<uni-icons type="forward" size="20" class="arrow"></uni-icons>
				</view>
			</view>
			<view class="s-row qrcode">
				<tki-qrcode ref="qrcode" :size="400" :onval="true" cid="qrcode" :val="qrcode.val" />
				<view class="save" @click="save">保存二维码到相册</view>
				<text class="title">充币地址</text>
				<text class="address">{{deposit.address}}</text>
				<view class="copy" @click="paste">复制</view>
			</view>
			<view class="desc">
				<text>请勿向上述地址充值任何非 ERC20_ USDT资产，否则资产将不可找回。</text>
				<text>您充值至上述地址后，需要整个网络节点的确认，12次网络确认后到账，12次网络确认后可提币。</text>
				<text>最小充值金额：1 USDT，小于最小金额的充值将不会上账且无法退回。</text>
				<text>您的充值地址不会经常改变，可以重复充值；如有更改，我们会尽量通过网站公告或邮件通知您。</text>
				<text>请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import {commonMixin, authMixin} from '@/common/mixin/mixin.js'
	export default {
		components: {tkiQrcode},
		mixins: [commonMixin, authMixin],
		data() {
			return {
				coin: {},
				account: {},
				coins: [],
				deposit: {},
				qrcode: {
					val: ''
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
				this.loadData()
			})
		},
		methods: {
			...mapActions('common', ['coinList']),
			...mapActions('user', ['depositAddress']),
			async loadData(){
				this.depositAddress(this.coin.symbol).then(res =>{
					this.deposit = res.data
					this.qrcode.val = res.data.address
					console.log(this.qrcode.val)
					this.$refs.qrcode._makeCode()
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
			save(){
				this.$refs.qrcode._saveCode()
			},
			paste() {
				let $this = this
				uni.setClipboardData({
				    data: this.deposit.address,
				    success: function () {
				        $this.$api.msg('复制成功')
				    }
				});
			}
		}
	}
</script>

<style lang='scss' scoped>
	.container{
		padding: 20upx 20upx;
	}
	.coin-section{
		background: #fff;
		.s-row{
			background-color: $uni-color-subbg;
			display:flex;
			align-items:center;
			padding: 20upx 30upx 20upx 30upx;
			.col{
				font-size: $font-lg;
				color: $font-color-dark;
				flex:1;
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
		.qrcode{
			margin-top: 30upx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			padding: 50upx 0upx;
			.img{
				width: 380upx;
				height: 380upx;
			}
			.save{
				width: 350upx;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				font-size: $font-base;
				color: #256AC2;
				background-color: #E9F0F8;
				border: 1px solid #BDD5E8;
				margin: 20upx 0;
			}
			.title{
				color: $font-color-light;
				font-size: $font-sm;
				margin: 20upx 0;
			}
			.address{
				display: block;
				width: 580upx;
				word-wrap: break-word;
				font-size: $font-base;
				text-align: center;
			}
			.copy{
				margin: 30upx 0 0 0;
				background-color: #E7EBEE;
				padding: 10upx 30upx;
				font-size: $font-base;
				color: $font-color-light;
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
	
	
</style>
