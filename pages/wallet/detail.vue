<template>
	<view class="container">
		<!-- 列表 -->
		<view class="coin-section m-t">
			<view class="block">
				<view class="s-row">
					<view class="col">
						<image src="https://s1.bqiapp.com/coin/20181030_72_webp/bitcoin_200_200.webp?v=67" class="coinLogo"></image>
						<text class="coin">BTC</text>
					</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-title">可用</view>
					<view class="col subtitle row-title">冻结</view>
					<view class="col r subtitle row-title">折合(CNY)</view>
				</view>
				<view class="s-row">
					<view class="col subtitle row-amount">0.025334</view>
					<view class="col subtitle row-amount">0.025334</view>
					<view class="col r subtitle row-amount">100.00</view>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="list">
			<!-- <empty></empty> -->
			<view class="coin-section">
				<view class="block">
					<view class="s-row">
						<view class="col">
							<text class="coin">提币</text>
						</view>
					</view>
					<view class="s-row">
						<view class="col subtitle row-title">数量</view>
						<view class="col subtitle row-title">状态</view>
						<view class="col r subtitle row-title">时间</view>
					</view>
					<view class="s-row">
						<view class="col subtitle row-amount">0.025334</view>
						<view class="col subtitle row-amount">已完成</view>
						<view class="col r subtitle row-amount">16:52 01/04</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {uniIcons} from '@dcloudio/uni-ui'
	import empty from '../../components/empty.vue'
	export default {
		components: {uniIcons, empty},
		data() {
			return {
				total: 0, //总价格
				empty: false, //空白页现实  true|false
				list: [],
			};
		},
		onLoad(){
			this.loadData();
		},
		watch:{
			//显示空白页
			list(e){
				let empty = e.length === 0 ? true: false;
				if(this.empty !== empty){
					this.empty = empty;
				}
			}
		},
		computed:{
			...mapState(['hasLogin'])
		},
		methods: {
			//请求数据
			async loadData(){
				/* let list = await this.$api.json('cartList'); 
				let cartList = list.map(item=>{
					item.checked = true;
					return item;
				}); */
			},
			navToLogin(){
				uni.navigateTo({
					url: '/pages/public/login'
				})
			}
		}
	}
</script>

<style lang='scss'>
	.container{
		padding: 0upx 0upx;
	}
	.coin-section{
		background: #fff;
		.block{
			padding: 20upx 0;
			.s-row{
				display:flex;
				align-items:center;
				padding: 10upx 30upx 0upx 30upx;
				.subtitle{
					padding: 4upx 0 10upx 0;
				}
				.col{
					font-size: $font-base;
					color: $font-color-dark;
					flex:1;
					.coin{
						font-weight: bold;
						font-size:  $font-md;
					}
				}
				.coinLogo {
				    width: 36upx;
					height: 36upx;
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
				.row-title{
					font-size: $font-base;
					font-weight: normal;
					color: $font-color-light;
				}
				.row-amount{
					font-size: $font-base;
					font-weight: normal;
					color: $font-color-dark;
				}
			}
		}
		
		
	}
	
	
</style>
