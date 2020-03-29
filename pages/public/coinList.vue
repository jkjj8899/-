<template>
	<view class="container">
		<uni-indexed-list :options="list" :show-select="false" @click="change"/>
	</view>
</template>

<script>
	import uniIndexedList from '../../components/uni-indexed-list/uni-indexed-list.vue'
	import {  
	    mapMutations  
	} from 'vuex';
	export default {
		components: {
			uniIndexedList
		},
		data() {
			return {
				list:  [{
					"letter": "A",
					"data": [
						"AAA",
						"ATC"
					]
				},{
					"letter": "B",
					"data": [
						"BTC",
						"BBB"
					]
				}]
			};
		},
		methods:{
			...mapMutations(['logout']),
			change(e){
				let a = JSON.stringify(e)
				this.$api.msg(e.item.name);
				uni.$emit('selectCoin',{coin: e})
				uni.navigateBack({ })
			}
		}
	}
</script>

<style lang='scss' scoped>
	
</style>
