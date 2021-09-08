<template>
  <view class="container">
	<view class="head-bg"></view>
	<view class="count-bg">您还有<text class="count">{{drawCount}}</text>次机会</view>
    <view class="lottery">
		<LotteryDraw  @get_winingIndex='gridStart' :grid_info_arr="list" @luck_draw_finish='luckDrawFinish'></LotteryDraw>
	</view>
	<button class="buy" @click="buy">{{buyTip}}</button>
  </view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
  import LotteryDraw from '../../components/SJ-LotteryDraw/SJ-LotteryDraw.vue';
  import {authMixin, commonMixin} from '@/common/mixin/mixin.js'
  export default {
    components: {
      LotteryDraw
    },
	mixins: [commonMixin],
    data () {
      return {
		  buyTip: '',
		  list: [],
		  drawCount: 0,
		  drawResult: {},
		  lottery_draw_param: {
			startIndex: 0, //开始抽奖位置，从0开始
			totalCount: 6, //一共要转的圈数
			winingIndex: 0, //中奖的位置，从0开始
			speed: 50 //抽奖动画的速度 [数字越大越慢,默认100]
		}
      }
    },
	onLoad() {
		this.getConfig()
	},
	onShow() {
		if(this.loginInfo.hasLogin){
			this.getCount()
		}
	},
    methods: {
		...mapActions('lottery', ['lotteryConfig', 'lotteryDraw', 'lotteryCount', 'lotteryBuyCount']),
		getCount(){
			this.lotteryCount().then(res =>{
				this.drawCount = res.data
			})
		},
      getConfig(){
		  let $this = this
		  this.lotteryConfig().then(res =>{
			let prizes = []
			for(let i = 0; i < res.data.prizes.length; i++){
				let prize = res.data.prizes[i]
				let item = {}
				if(prize.type == 0){
					item.text = prize.name
				} else {
					item.text = prize.num + prize.name
				}
				item.logo = prize.icon
				prizes.push(item)
			}
			$this.list = prizes
			$this.buyTip = '花' + res.data.buyPrice + res.data.buyCoin + '购买' + res.data.buyCount + '次抽奖'
		  })
	  },
	  buy(){
		  let $this = this
		  if(this.isLogin()){
			  uni.showModal({
			      title: '提示',
			      content: '是否确定购买?',
			      success: function (res) {
			          if (res.confirm) {
			              $this.lotteryBuyCount().then(res =>{
							  $this.drawCount = res.data
							  $this.$api.msg('购买成功')
						  })
			          }
			      }
			  });
		  }
	  },
	  gridStart (callback) {
		  let $this = this
		  if(this.isLogin()){
			  this.lotteryDraw().then(res =>{
				  this.lottery_draw_param.winingIndex = res.data.lotteryIndex;
				  //props修改在小程序和APP端不成功，所以在这里使用回调函数传参，
				  callback(this.lottery_draw_param);
				  this.drawResult = res.data
				  this.getCount()
			  })
			  
		  }
      },
	  luckDrawFinish(param){
		  if(this.drawResult.type == 0){
		  	this.$api.msg('抱歉,您没抽中奖品')
		  } else if(this.drawResult.type== 2){
		  	this.$api.msg('恭喜!您获得了' + this.drawResult.num + this.drawResult.name)
		  }
	  }
    }
  }
</script>

<style lang="less" scoped>
	page{
		width: 100%;
		height: 100%;
	}
	.container{
		position: absolute;
		width: 100%;
		height: 100%;
		background-size: 100% 100%;
		background-color: blue;
		background-image: url(http://cdn.choujiangle.cn/themes/marquee/choujiang_bg.jpg);
		padding-top: 100upx;
	}
	.count-bg{
		background-color: #ffffff;
		border-radius: 100upx;
		width: 350upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		margin: 0 auto;
		margin-bottom: 50upx;
		.count{
			color: #ff4a4c;
			font-size: 30upx;
		}
	}
	.head-bg{
		margin-top: 100upx;
		width: 332px;
		height: 153px;
		margin: 0 auto;
		background-size: 100% 100%;
		background-image: url(http://cdn.choujiangle.cn/themes/marquee/choujiang_text.png);
	}
	.lottery{
		width: 300px;
		height: 300px;
		margin: 0 auto;
	}
	.buy{
		background-color: rgb(0, 186, 255);
		font-size: 30upx;
		color: #ffffff;
		width: 300px;
		margin-top: 100upx;
	}
</style>