<template>
  <view class="container">
	<view class="head-bg"></view>
	<view class="count-bg">您还有<text class="count">{{drawCount}}</text>次机会</view>
    <view class="lottery">
		<LuckyGrid
		  ref="luckyGrid"
		  :rows="grid.rows"
		  :cols="grid.cols"
		  width="300px"
		  height="300px"
		  :blocks="grid.blocks"
		  :prizes="grid.prizes"
		  :button="grid.button"
		  :default-style="grid.defaultStyle"
		  @start="gridStart"
		  @end="gridEnd"
		/>
	</view>
	<button class="buy" @click="buy">{{buyTip}}</button>
  </view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
  import LuckyGrid from 'uni-luck-draw/lucky-grid' // 九宫格
  import {authMixin, commonMixin} from '@/common/mixin/mixin.js'
  export default {
    components: {
      LuckyGrid
    },
	mixins: [commonMixin],
    data () {
      return {
		  buyTip: '',
		  prizeData: [
            { x: 0, y: 0, fonts: [{ text: '', top: '60%' }], imgs: [{ src: null, width: '50%', top: '10%' }]},
            { x: 1, y: 0, fonts: [{ text: '', top: '60%' }], imgs: [{ src: null, width: '50%', top: '10%' }]},
            { x: 2, y: 0, fonts: [{ text: '', top: '60%' }], imgs: [{ src: null, width: '50%', top: '10%' }]},
			{ x: 2, y: 1, fonts: [{ text: '', top: '60%' }], imgs: [{ src: null, width: '50%', top: '10%' }] },
            { x: 2, y: 2, fonts: [{ text: '', top: '60%' }], imgs: [{ src: null, width: '50%', top: '10%' }] },
            { x: 1, y: 2, fonts: [{ text: '', top: '60%' }], imgs: [{ src: null, width: '50%', top: '10%' }] },
            { x: 0, y: 2, fonts: [{ text: '', top: '60%' }], imgs: [{ src: null, width: '50%', top: '10%' }] },
			{ x: 0, y: 1, fonts: [{ text: '', top: '60%' }], imgs: [{ src: null, width: '50%', top: '10%' }] }
          ],
		  drawCount: 0,
		  drawResult: {},
        grid: {
          rows: 3,
          cols: 3,
          blocks: [{ padding: '5px', background: '#ff4a4c', borderRadius: 10 }],
          prizes: [],
          button: { x: 1, y: 1, col: 1, background: '#ff4a4c', shadow: '0 5 1 #ff4a4c',imgs: [{
				src: 'http://cdn.choujiangle.cn/themes/marquee/lottery-btn.png',
				width: '90%',
				top: '5%'
			}],
		  },
		  defaultStyle: {
			borderRadius: 8,
			fontColor: '#DF424B',
			fontSize: '14px',
			fontStyle: 'sans-serif',
			textAlign: 'center',
			background: 'pink',
			shadow: '0 5 1 #ebf1f4'
		  }
        }
      }
    },
	onLoad() {
		this.getConfig()
	},
	onShow() {
		if(this.loginInfo.hasLogin){
			this.lotteryCount().then(res =>{
				console.log(res.data)
				this.drawCount = res.data
			})
		}
	},
    methods: {
		...mapActions('lottery', ['lotteryConfig', 'lotteryDraw', 'lotteryCount', 'lotteryBuyCount']),
      getConfig(){
		  let $this = this
		  this.lotteryConfig().then(res =>{
			let prizes = $this.prizeData
			for(let i = 0; i < prizes.length; i++){
				let prize = res.data.prizes[i]
				if(prize.type == 0){
					prizes[i].fonts[0].text = prize.name
				} else {
					prizes[i].fonts[0].text = prize.num + prize.name
				}
				prizes[i].imgs[0].src = prize.icon
			}
			$this.grid.prizes = prizes
			
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
	  gridStart () {
		  this.$refs.luckyGrid.play()
		  let $this = this
		  if(this.isLogin()){
			  this.lotteryDraw().then(res =>{
				  console.log(res)
				  this.$refs.luckyGrid.stop(res.data.lotteryIndex)
				  this.drawResult = res.data
			  })
			  
		  }
      },
      gridEnd (prize) {
        if(this.drawResult.type == 0){
        	this.$api.msg('抱歉,您没抽中奖品')
        } else if(this.drawResult.type== 2){
        	this.$api.msg('恭喜!您获得了' + this.drawResult.num + this.drawResult.name)
        }
      },
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
		margin-top: 50upx;
	}
</style>