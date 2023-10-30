<template>
	<view class="notice-item">
		<view class="title">{{info.noticeTitle}}</view>
		<text class="time">{{info.createTime | moment('YYYY-MM-DD HH:mm:ss')}}</text>
		<view class="content" v-html="info.noticeContent"></view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {commonMixin} from '@/common/mixin/mixin.js'
	export default {
		mixins: [commonMixin],
		data() {
			return {
				id: 1,
				info: {}
			}
		},
		onLoad(options){
			uni.setNavigationBarTitle({
				title: this.i18n.notice.detail
			})
			this.id = options.id
			this.getNoticeDetail()
		},
		methods: {
			...mapActions('common', ['noticeDetail']),
			getNoticeDetail(){
				this.noticeDetail({id: this.id}).then(res =>{
					this.info = res.data
				}).catch(error =>{
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	.notice-item {
		display: flex;
		flex-direction: column;
		padding: 20upx 20upx;
	}

	.time {
		height: 80upx;
		font-size: 26upx;
		color: #7d7d7d;
		padding-top: 10upx;
	}

	.content {
		width: 710upx;
		background-color: #fff;
		border-radius: 4upx;
		font-weight: bold;
	}

	.title {
		font-size: 40upx;
		font-weight: bold;
		color: #303133;
	}


</style>
