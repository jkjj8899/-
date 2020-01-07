<template>
	<view class="container">
		<view class="news-section m-t">
			<view class="block">
				<view class="circle"></view>
				<view class="time">
					20:00
					<text class="source">中国社会科学网</text>
				</view>
				<text class="title">
				重庆市渝中区：积极创建国家级区块链产业创新示范园区
				</text>
				<view class="content">
					今日重庆市渝中区第十八届人民代表大会第五次会议召开，在渝中区政府工作报告中，给今年渝中区块链产业发展定了个小目标。渝中将聚力打造以区块链为龙头的数字经济示范区，加快推动重庆市区块链产业创新基地扩容提质增效，积极创建国家级区块链产业创新示范园区。
				</view>
			</view>
			<view class="block">
				<view class="circle"></view>
				<view class="time">
					20:00
					<text class="source">中国社会科学网</text>
				</view>
				<text class="title">
				重庆市渝中区：积极创建国家级区块链产业创新示范园区
				</text>
				<view class="content">
					今日重庆市渝中区第十八届人民代表大会第五次会议召开，在渝中区政府工作报告中，给今年渝中区块链产业发展定了个小目标。渝中将聚力打造以区块链为龙头的数字经济示范区，加快推动重庆市区块链产业创新基地扩容提质增效，积极创建国家级区块链产业创新示范园区。
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
	export default {
		components: {
			uniIcons
		},
		data() {
			return {
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				list: [],
			};
		},
		onLoad(){
			this.list = [
				{title:'重庆市渝中区：积极创建国家级区块链产业创新示范园区',time:'2018-11-11',content:'今日重庆市渝中区第十八届人民代表大会第五次会议召开，在渝中区政府工作报告中，给今年渝中区块链产业发展定了个小目标。渝中将聚力打造以区块链为龙头的数字经济示范区，加快推动重庆市区块链产业创新基地扩容提质增效，积极创建国家级区块链产业创新示范园区。'},
				{title:'重庆市渝中区：积极创建国家级区块链产业创新示范园区',time:'2018-11-11',content:'今日重庆市渝中区第十八届人民代表大会第五次会议召开，在渝中区政府工作报告中，给今年渝中区块链产业发展定了个小目标。渝中将聚力打造以区块链为龙头的数字经济示范区，加快推动重庆市区块链产业创新基地扩容提质增效，积极创建国家级区块链产业创新示范园区。'},
				{title:'重庆市渝中区：积极创建国家级区块链产业创新示范园区',time:'2018-11-11',content:'今日重庆市渝中区第十八届人民代表大会第五次会议召开，在渝中区政府工作报告中，给今年渝中区块链产业发展定了个小目标。渝中将聚力打造以区块链为龙头的数字经济示范区，加快推动重庆市区块链产业创新基地扩容提质增效，积极创建国家级区块链产业创新示范园区。'},
				{title:'重庆市渝中区：积极创建国家级区块链产业创新示范园区',time:'2018-11-11',content:'今日重庆市渝中区第十八届人民代表大会第五次会议召开，在渝中区政府工作报告中，给今年渝中区块链产业发展定了个小目标。渝中将聚力打造以区块链为龙头的数字经济示范区，加快推动重庆市区块链产业创新基地扩容提质增效，积极创建国家级区块链产业创新示范园区。'}
			];
			this.loadData();
		},
		computed:{
			...mapState(['hasLogin'])
		},
		methods: {
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

<style lang='scss'>
	.container{
		padding: 0upx 0upx;
	}
	.news-section{
		.block{
			position: relative;
			word-wrap: break-word;
			margin: 0upx 40upx;
			border-left: 1px dashed $font-color-light;
			padding-left: 40upx;
			.circle{
				position: absolute;
				width: 20upx;
				height: 20upx;
				border-radius: 100px;
				background-color: $uni-text-color-grey;
				top: 12upx;
				left: -12upx;
			}
			.time{
				font-size: $font-base;
				.source{
					margin-left: 10upx;
					color: $font-color-light;
				}
			}
			.title{
				display: block;
				font-size: $font-lg;
				font-weight: bold;
				padding: 16upx 0upx;
			}
			.content{
				font-size: $font-base;
				padding-bottom: 40upx;
			}
		}
		
	}
	
	
</style>
