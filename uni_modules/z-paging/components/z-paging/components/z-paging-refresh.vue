<!-- z-paging -->
<!-- github地址:https://github.com/SmileZXLee/uni-z-paging -->
<!-- dcloud地址:https://ext.dcloud.net.cn/plugin?id=3935 -->
<!-- 反馈QQ群：790460711 -->

<!-- 下拉刷新view -->
<template>
	<view style="height: 100%;">
		<view
			:class="['zp-r-container',{'zp-r-container-padding':showUpdateTime}]"
			style="height: 100%;">
			<view class="zp-r-left">
				<image v-if="status!==2" :class="refresherLeftImageClass"
					:style="[{width: showUpdateTime?'36rpx':'30rpx',height: showUpdateTime?'36rpx':'30rpx','margin-right': showUpdateTime?'20rpx':'8rpx'},imgStyle]"
					:src="defaultThemeStyle==='white'?base64ArrowWhite:base64Arrow">
				</image>
				<!-- #ifndef APP-NVUE -->
				<image v-else class="zp-line-loading-image zp-r-left-image"
					:style="[{width: showUpdateTime?'36rpx':'30rpx',height: showUpdateTime?'36rpx':'30rpx','margin-right': showUpdateTime?'20rpx':'8rpx'},imgStyle]"
					:src="defaultThemeStyle==='white'?base64FlowerWhite:base64Flower">
				</image>
				<!-- #endif -->
				<!-- #ifdef APP-NVUE -->
				<view v-else :style="[{'margin-right':showUpdateTime?'18rpx':'12rpx'}]">
					<loading-indicator
						:class="systemInfo.platform==='ios'?'zp-loading-image-ios':'zp-loading-image-android'"
						:style="[{color:defaultThemeStyle==='white'?'white':'#777777'},imgStyle]" :animating="true">
					</loading-indicator>
				</view>
				<!-- #endif -->
			</view>
			<view class="zp-r-right">
				<text class="zp-r-right-text"
					:style="[refresherRightTextStyle,titleStyle]">{{refresherStatusTextMap[status]||defaultText}}
				</text>
				<text class="zp-r-right-text zp-r-right-time-text"
					:style="[refresherRightTextStyle,updateTimeStyle]"
					v-if="showUpdateTime&&refresherTimeText.length">{{refresherTimeText}}
				</text>
			</view>
		</view>
	</view>
</template>
<script>
	const systemInfo = uni.getSystemInfoSync();
	import zStatic from '../js/z-paging-static'
	import {
		getRefesrherFormatTimeByKey
	} from '../js/z-paging-utils'
	export default {
		name: 'z-paging-refresh',
		data() {
			return {
				systemInfo: systemInfo,
				base64Arrow: zStatic.base64Arrow,
				base64ArrowWhite: zStatic.base64ArrowWhite,
				base64Flower: zStatic.base64Flower,
				base64FlowerWhite: zStatic.base64FlowerWhite,
				refresherTimeText: '',
				leftImageLoaded: false
			};
		},
		props: {
			'status': {
				default: 0
			},
			'defaultThemeStyle': {},
			'defaultText': {},
			'pullingText': {},
			'refreshingText': {},
			'showUpdateTime': {
				default: false
			},
			'updateTimeKey': {},
			'imgStyle': {
				default: {}
			},
			'titleStyle': {
				default: {}
			},
			'updateTimeStyle': {
				default: {}
			},
		},
		computed: {
			refresherStatusTextMap() {
				this.updateTime(this.updateTimeKey);
				return {
					0: this.defaultText,
					1: this.pullingText,
					2: this.refreshingText
				};
			},
			refresherLeftImageClass() {
				let refresherLeftImageClass = '';
				if (this.status === 0) {
					if (this.leftImageLoaded) {
						refresherLeftImageClass = 'zp-r-left-image zp-r-arrow-down';
					} else {
						this.leftImageLoaded = true;
						refresherLeftImageClass =
							'zp-r-left-image zp-r-arrow-down-no-duration';
					}
				} else {
					refresherLeftImageClass = 'zp-r-left-image zp-r-arrow-top';
				}
				return refresherLeftImageClass;
			},
			refresherRightTextStyle() {
				let refresherRightTextStyle = {};
				let color = '#555555';
				if (this.defaultThemeStyle === 'white') {
					color = '#efefef';
				}
				// #ifdef APP-NVUE
				if (this.showUpdateTime) {
					refresherRightTextStyle = {
						'height': '40rpx',
						'line-height': '40rpx'
					};
				} else {
					refresherRightTextStyle = {
						'height': '80rpx',
						'line-height': '80rpx'
					};
				}
				// #endif
				refresherRightTextStyle['color'] = color;
				return refresherRightTextStyle;
			}
		},
		methods: {
			updateTime(updateTimeKey) {
				if (!updateTimeKey) {
					updateTimeKey = this.updateTimeKey;
				}
				if (this.showUpdateTime) {
					this.refresherTimeText = getRefesrherFormatTimeByKey(updateTimeKey);
				}
			}
		}
	}
</script>

<style>
	@import "../css/z-paging-static.css";

	.zp-r-container {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.zp-r-container-padding {
		/* #ifdef APP-NVUE */
		padding: 15rpx 0rpx;
		/* #endif */
	}

	.zp-r-left {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		overflow: hidden;
	}

	.zp-r-left-image {
		/* #ifndef APP-NVUE */
		transform: rotate(180deg);
		margin-top: 2rpx;
		/* #endif */
		/* #ifdef MP-ALIPAY */
		margin-top: 0rpx;
		/* #endif */
		/* #ifdef APP-NVUE */
		transition-duration: .2s;
		transition-property: transform;
		color: #666666;
		/* #endif */
	}

	.zp-r-arrow-top {
		/* #ifndef APP-NVUE */
		animation: refresher-arrow-top .2s linear;
		-webkit-animation: refresher-arrow-top .2s linear;
		animation-fill-mode: forwards;
		-webkit-animation-fill-mode: forwards;
		/* #endif */
		/* #ifdef APP-NVUE */
		transform: rotate(0deg);
		/* #endif */
	}

	.zp-r-arrow-down {
		/* #ifndef APP-NVUE */
		animation: refresher-arrow-down .2s linear;
		-webkit-animation: refresher-arrow-down .2s linear;
		animation-fill-mode: forwards;
		-webkit-animation-fill-mode: forwards;
		/* #endif */
		/* #ifdef APP-NVUE */
		transform: rotate(180deg);
		/* #endif */
	}

	.zp-r-arrow-down-no-duration {
		/* #ifndef APP-NVUE */
		animation: refresher-arrow-down 0s linear;
		-webkit-animation: refresher-arrow-down 0s linear;
		animation-fill-mode: forwards;
		-webkit-animation-fill-mode: forwards;
		/* #endif */
		/* #ifdef APP-NVUE */
		transform: rotate(180deg);
		/* #endif */
	}

	.zp-r-right {
		font-size: 27rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.zp-r-right-text {
		/* #ifdef APP-NVUE */
		font-size: 28rpx;
		/* #endif */
	}

	.zp-r-right-time-text {
		margin-top: 10rpx;
		font-size: 24rpx;
	}

	@keyframes refresher-arrow-top {
		0% {
			-webkit-transform: rotate(180deg);
			transform: rotate(180deg);
		}

		100% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
	}

	@keyframes refresher-arrow-down {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		100% {
			-webkit-transform: rotate(180deg);
			transform: rotate(180deg);
		}
	}
</style>
