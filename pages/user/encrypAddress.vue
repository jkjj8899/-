<template>  
    <view class="container">  
		<view class="addr-item">
			<view class="t">
				<text class="coin">ETH<text class="name">交易所ETH地址</text></text>
				<text class="del">删除</text>
			</view>
			<text>0x282eac8b325cca6227377329892983429</text>
		</view>
		<view class="addr-item">
			<view class="t">
				<text class="coin">ETH<text class="name">交易所ETH地址</text></text>
				<text class="del">删除</text>
			</view>
			<text>0x282eac8b325cca6227377329892983429</text>
		</view>
		<mpvue-picker
			:themeColor="themeColor"
			ref="mpvuePicker"
			:mode="mode"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirm"
			@onCancel="onCancel"
			:pickerValueArray="pickerValueArray"
		></mpvue-picker>
    </view>  
</template>  
<script>  
    import {  
        mapState 
    } from 'vuex';  
	import mpvuePicker from '../../components/mpvuePicker.vue'
	let startY = 0, moveY = 0, pageAtTop = true;
    export default {
		components: {
			mpvuePicker
		},
		data(){
			return {
				pickerValueArray: [
					{
						label: 'ETH',
						value: 110000
					},
					{
						label: 'USDT',
						value: 120000
					},
					{
						label: 'BTC',
						value: 440100
					}
				],
				themeColor: '#007AFF',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0]
			}
		},
		onLoad(){
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/user/updateEncrypAddress');
			}else if(index === 1){
				this.showSinglePicker()
			}
		},
		// #endif
        computed: {
			...mapState(['hasLogin','userInfo'])
		},
        methods: {
			navTo(url){
				uni.navigateTo({  
					url
				})  
			},
			showSinglePicker() {
				this.mode = 'selector';
				this.deepLength = 1;
				this.pickerValueDefault = [0];
				this.$refs.mpvuePicker.show();
			}
        }  
    }  
</script>  
<style lang='scss' scoped>
	page{
		background: $page-color-base;
	}
	.container{
		padding: 10upx 30upx;
		height: 100%;
	}
	.addr-item{
		font-size: $font-base;
		background: linear-gradient(right, #3783D9, #53A6EA);
		padding: 20upx 20upx;
		margin: 10upx 0;
		border-radius: 10upx;
		color: #fff;
		.t{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding-bottom: 20upx;
			.coin{
				font-weight: bold;
			}
			.name{
				margin-left: 20upx;
			}
		}
	}
</style>