<template>
	<view class="container">
		<view class="news-section m-t">
			<view class="block" v-for="(item, i) in list" :key="item.id">
				<view class="circle"></view>
				<view class="time">
					{{item.ctime | moment('HH:mm MM/DD')}}
					<text class="source">{{item.origin}}</text>
				</view>
				<text class="title">
				{{item.title}}
				</text>
				<view class="content">{{item.content}}</view>
			</view>
			<u-loadmore v-show="total > 10" :load-text="loadText" :status="loadingStatus" bg-color="#f8f8f8"/>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {uniIcons} from '@dcloudio/uni-ui'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from '../../components/empty.vue'
	import {commonMixin} from '@/common/mixin/mixin.js'
	export default {
		components: {
			uniIcons, uniLoadMore, empty
		},
		mixins: [commonMixin],
		data() {
			return {
				total: 0, //总价格
				empty: false, //空白页现实  true|false
				list: [],
				query: {
					page: 1,
					limit: 10,
					classfiy: 0
				},
				totalCount: 0,
				loadingStatus: 'loadmore',
				isLastPage: false
			};
		},
		onLoad(){
			//this.loadData();
			uni.startPullDownRefresh();
			uni.setNavigationBarTitle({
				title: this.i18n.tabBar.news
			})
		},
		onReachBottom(){
			if(!this.isLastPage){
				this.query.page += 1
				this.getNewsList()
			}
		},
		onPullDownRefresh() {
			this.list = []
			this.query.page = 1
			this.loadData();
		},
		methods: {
			...mapActions('cms', ['newsList']),
			//请求数据
			async loadData(){
				this.query.page = 1
				this.getNewsList()
			},
			getNewsList(){
				this.loadingStatus = 'loading'
				this.newsList(this.query).then(res =>{
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
					this.loadingStatus = 'loadmore'
					uni.stopPullDownRefresh();
				})
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
		padding: 0rpx 0rpx;
		height: 100%;
	}
	.news-section{
		.block{
			position: relative;
			word-wrap: break-word;
			margin: 0rpx 40rpx;
			border-left: 1px dashed $font-color-light;
			padding-left: 40rpx;
			.circle{
				position: absolute;
				width: 20rpx;
				height: 20rpx;
				border-radius: 100px;
				background-color: #1866fe;
				top: 12rpx;
				left: -11rpx;
			}
			.time{
				font-size: $font-base;
				.source{
					margin-left: 10rpx;
					color: $font-color-light;
				}
			}
			.title{
				display: block;
				font-size: $font-lg;
				font-weight: bold;
				padding: 16rpx 0rpx;
			}
			.content{
				font-size: $font-base;
				padding-bottom: 40rpx;
			}
		}
		
	}
	
	
</style>
