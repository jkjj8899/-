<template>
	<view class="app">
		
	</view>
</template>

<script>

	export default {
		data() {
			return {
				payType: 1,
				orderInfo: {}
			};
		},
		computed: {
		
		},
		onLoad(options) {
			
		},

		methods: {
			//确认支付
			confirm: async function() {
				uni.redirectTo({
					url: '/pages/money/paySuccess'
				})
			},
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
	}


</style>
