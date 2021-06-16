<template>
  <view class="container">
	<view class="header">
		<view class="bg"></view>
		<view class="box">
			<view class="name">{{machine.name}}</view>
			<view class="tags">
				<text class="i" v-for="(tag, i) in  splitTag(machine.tags)">{{tag}}</text>
			</view>
			<view class="profit">
				<view class="l">
					<view class="vol">{{machine.buyAmount}} <text class="unit">{{machine.buyCoin}}</text></view>
					<text>算力价格</text>
				</view>
				<view class="l">
					<view class="vol">{{machine.fee * 100}}%</view>
					<text>管理费</text>
				</view>
			</view>
		</view>
	</view>
	<view class="list">
		<view class="item">
			<view class="params">
				<view class="row">
					<view class="label">算力</view>
					<view class="val">{{machine.powerVol}}{{machine.powerUnit}}</view>
				</view>
				<view class="row">
					<view class="label">预计每日净收益</view>
					<view class="val">{{machine.produceAmount}}{{machine.produceCoin}}</view>
				</view>
				<view class="row">
					<view class="label">开挖时间</view>
					<view class="val">{{machine.effectiveTime | moment('YYYY-MM-DD')}}</view>
				</view>
				<view class="row">
					<view class="label">挖矿周期</view>
					<view class="val">{{machine.lifeCycle}}天</view>
				</view>
				<view class="row">
					<view class="label">购买数量</view>
					<view class="val">
						<u-number-box v-model="form.quantity" :min="1" :max="machine.quantity"></u-number-box>
					</view>
				</view>
			</view>
		</view>
		<view class="item">
			<view class="tip">-- 更多详情 --</view>
			<view class="intro">{{machine.intro ? machine.intro : ""}}</view>
		</view>
	</view>
	<view class="buy">
		<view class="price">总计: <text class="b">{{machine.buyAmount * form.quantity}}</text></view>
		<view class="btn" @click="buy">立即买入</view>
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
		  machine: {},
		  form: {
			  machineId: undefined,
			  quantity: 1
		  }
      }
    },
	onLoad(options) {
		this.form.machineId = options.id
		this.getMachineDetail()
	},
	onShow() {
		
	},
    methods: {
		...mapActions('mining', ['machineDetail', 'machineBuy']),
		splitTag(tags){
			if(tags){
				return JSON.parse(tags)
			}
			return []
		},
		buy(){
			let _this = this
			uni.showModal({
			    title: '提示',
			    content: '是否确认购买?',
			    success: function (res) {
			        if (res.confirm) {
			            uni.showLoading({
			            	mask: true,
			            	title: '购买中'
			            })
			            _this.machineBuy(_this.form).then(res =>{
			            	_this.$api.msg('购买成功')
			            	uni.hideLoading()
			            }).catch(error => {
			            	uni.hideLoading()
			            })
			        } else if (res.cancel) {
			        }
			    }
			});
		},
		getMachineDetail(){
			this.machineDetail({id: this.form.machineId}).then(res =>{
				this.machine = res.data
				uni.hideLoading()
			}).catch(error => {
				uni.hideLoading()
			})
		},
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
		margin: 0;
		padding: 0;
		background-color: #f7f7f7;
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
		.tip{
			text-align: center;
			font-size: 26upx;
		}
		.intro{
			font-size: 24upx;
		}
		.params .row{
			padding: 20upx 0 0 0;
			display: flex;
			justify-content: space-between;
			.label{
				font-size: 26upx;
			}
			.val{
				font-weight: bold;
				padding-top: 10upx;
			}
		}
	}
	.buy{
		position: fixed;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: space-between;
		height: 100upx;
		line-height: 100upx;
		background-color: #ffffff;
		padding: 0 30upx;
		.price{
			color: #ff724a;
		}
		.price .b{
			font-size: 34upx;
			font-weight: bold;
			margin-left: 10upx;
		}
		.btn{
			background-color: #ff724a;
			height: 60upx;
			line-height: 60upx;
			padding: 0 50upx;
			color: #ffffff;
			border-radius: 50upx;
			margin-top: 20upx;
		}
	}
	.header{
		position: relative;
		.bg{
			width: 100%;
			height: 230upx;
			background-color: #ff724a;
			border-bottom-left-radius: 40upx;
			border-bottom-right-radius: 40upx;
		}
		.box{
			position: absolute;
			width: 100%;
			top: 0upx;
			left: 0;
			padding: 0 30upx;
			.name{
				font-size: 40upx;
				font-weight: bold;
				color: #ffffff;
			}
			.tags .i{
				background-color: #fedcd2;
				margin-right: 10upx;
				font-size: 23upx;
				padding: 4upx 10upx;
				border-radius: 8upx;
				color: #ff6539;
			}
		}
		.profit{
			width: 100%;
			height: 200upx;
			background-color: #ffffff;
			margin-top: 30upx;
			padding-top: 50upx;
			border-radius: 20upx;
			display: flex;
			justify-content: space-between;
			text-align: center;
			.l{
				width: 50%;
				.vol{
					padding: 10upx 0;
					font-size: 32upx;
					font-weight: bold;
					color: #ff6539;
				}
				.vol .unit{
					font-size: 24upx;
					font-weight: normal;
					margin-left: 10upx;
				}
			}
		}
	}
</style>