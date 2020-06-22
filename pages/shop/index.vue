<template>
	<view class="content">
		<!-- <web-view  src="/hybrid/html/index.html"></web-view> -->
		<web-view  :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url : '',
				symbol: undefined
			}
		},
		onLoad(options) {
			this.url = `http://47.107.100.112/shop`
			
		},
		onShow() {
		},
		methods: {

		}
	}
</script>

<style>
</style>
