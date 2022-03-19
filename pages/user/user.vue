<template>  
    <view class="container">  
		
		<view class="user-section">
			<image mode="widthFix" class="bg" src="../../static/personal-bg.jpg"></image>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="'/static/missing-face.png'"></image>
				</view>
				<view class="info-box" @click="toLogin">
					<text class="username">{{loginInfo.mobile || i18n.my.login}}</text>
					<view class="tip">{{i18n.my.sentence}} FEXCOIN.COM</view>
				</view>
			</view>
		</view>
		
		<view 
			class="cover-container"
			:style="[{
				transform: coverTransform,
				transition: coverTransition
			}]"
		>
			<image class="arc" src="/static/arc.png"></image>
			
			<view class="order-section">
				<view class="order-item" @click="navTo('/pages/notice/notice')" hover-class="common-hover"  :hover-stay-time="50">
					<image class="icon" src="../../static/images/my/icon-notice.png"></image>
					<text>{{i18n.my.notice}}</text>
				</view>
				<view class="order-item" @click="navTo('/pages/lottery/index')" hover-class="common-hover"  :hover-stay-time="50">
					<image class="icon" src="../../static/images/my/icon-lottery.png"></image>
					<text>{{i18n.my.reward}}</text>
				</view>
				<view class="order-item" @click="navTo('/pages/user/signin')"  hover-class="common-hover" :hover-stay-time="50">
					<image class="icon" src="../../static/images/my/icon-sign.png"></image>
					<text>{{i18n.my.sign}}</text>
				</view>
				<view class="order-item" @click="navTo('/pages/user/invit')" hover-class="common-hover"  :hover-stay-time="50">
					<image class="icon" src="../../static/images/my/icon-recomment.png"></image>
					<text>{{i18n.my.recomment}}</text>
				</view>
			</view>
			<!-- 浏览历史 -->
			<view class="history-section icon">
				<list-cell image="/static/images/my/icon-safe.png" iconColor="#e07472" @eventClick="navTo('/pages/user/safe', true)" :title="i18n.my.accountsafe"></list-cell>
				<list-cell image="/static/images/my/icon-auth.png" iconColor="#4eb432" @eventClick="navTo('/pages/user/realname', true)" :tips="authStatusMap[authStatus]" :title="i18n.my.auth"></list-cell>
				<list-cell image="/static/images/my/icon-addr.png" iconColor="#4eb432" @eventClick="navTo('/pages/user/encrypAddress', true)" :title="i18n.my.addressBook"></list-cell>
				<list-cell image="/static/images/my/icon-payin.png" iconColor="#4eb432" @eventClick="navTo('/pages/user/payType', true)" :title="i18n.my.payin"></list-cell>
				<list-cell v-if="!isMer" image="/static/images/my/icon-merchat.png" iconColor="#9789f7" @eventClick="navTo('/pages/otc/merchant/apply', true)" :title="i18n.my.businessapply"></list-cell>
				<list-cell v-if="isMer" image="/static/images/my/icon-merchat.png" iconColor="#543632" @eventClick="navTo('/pages/otc/merchant/merchant', true)" :title="i18n.my.business"></list-cell>
				<list-cell image="/static/images/my/icon-help.png" iconColor="#ee883b" :title="i18n.my.help" @eventClick="navTo('/pages/set/help')"></list-cell>
				<!-- <list-cell icon="icon-pinglun-copy" iconColor="#54b4ef" title="问题反馈"></list-cell> -->
				<list-cell image="/static/images/my/icon-langule.png" iconColor="#e07472" @eventClick="changeLang" :title="i18n.my.lang" ></list-cell>
				<list-cell image="/static/images/my/icon-setting.png" iconColor="#e07472" :title="i18n.my.set" border="" @eventClick="navTo('/pages/set/set')"></list-cell>
			</view>
		</view>
			
		<u-action-sheet :cancel-text="i18n.common.cancel" :list="langList" @click="clickLang" v-model="showLang"></u-action-sheet>
    </view>  
</template>  
<script>  
	import listCell from '@/components/mix-list-cell';
    import {
    	mapState,
    	mapActions
    } from 'vuex'
	import {commonMixin} from '@/common/mixin/mixin.js'
	let startY = 0, moveY = 0, pageAtTop = true;
    export default {
		components: {
			listCell
		},
		mixins: [commonMixin],
		data(){
			return {
				userInfo: {},
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				isMer: false,
				authStatus: undefined,
				authStatusMap: {},
				showLang: false,
				langList: []
			}
		},
		onShow(){
			uni.setNavigationBarTitle({
				title: this.i18n.tabBar.me
			})
			this.authStatusMap = {
				'': this.i18n.audit.status.no,
				'0': this.i18n.audit.status.ing,
				'1': this.i18n.audit.status.pass,
				'2': this.i18n.audit.status.reject
			}
			if(this.loginInfo.hasLogin){
				this.isMerchant().then(res => {
					this.isMer = res.data
				})
				this.loadAuthInfo()
			}
			this.langList = [{
				text: this.i18n.common.lang.en,
				lang: 'en_US'
			}, {
				text: this.i18n.common.lang.zh,
				lang: 'zh_CN'
			}, {
				text: this.i18n.common.lang.hk,
				lang: 'zh_TW'
			}]
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/set/set');
			}else if(index === 1){
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		},
		// #endif
        computed: {
			...mapState('user', ['loginInfo'])
		},
        methods: {
			...mapActions('otc', ['isMerchant']),
			...mapActions('user', ['getAuthInfo']),
			toLogin(){
				if(!this.loginInfo.hasLogin){
					uni.navigateTo({
						url: '/pages/public/login'
					})
				}
			},
			loadAuthInfo(){
				this.getAuthInfo().then(res => {
					this.authStatus = res.data ? res.data.status + '' : '';
				})
			},
			changeLang(){
				this.showLang = true
			},
			clickLang(index){
				let lang = this.langList[index].lang
				uni.setStorageSync('language', lang);
				this._i18n.locale = lang;
				uni.setTabBarItem({
					index: 0,
					text: this.$t('message').tabBar.market
				})
				uni.setTabBarItem({
					index: 1,
					text: this.$t('message').tabBar.news
				})
				uni.setTabBarItem({
					index: 2,
					text: this.$t('message').tabBar.miner
				})
				uni.setTabBarItem({
					index: 3,
					text: this.$t('message').tabBar.wallet
				})
				uni.setTabBarItem({
					index: 4,
					text: this.$t('message').tabBar.me
				})
				this.authStatusMap = {
					'': this.i18n.audit.status.no,
					'0': this.i18n.audit.status.ing,
					'1': this.i18n.audit.status.pass,
					'2': this.i18n.audit.status.reject
				}
			},
        }  
    }  
</script>  
<style lang='scss' scoped>
	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;
	  background: #fff;
	  border-radius: 10upx;
	}
	page{
		// #ifdef H5
		padding-bottom: 200upx;
		// #endif
	}
	.container{
		width: 100%;
		height: 100%;
		background-color: $page-color-base;
	}
	.user-section{
		height: 510upx;
		padding: 100upx 30upx 0;
		position:relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}
	}
	.user-info-box{
		height: 180upx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		.portrait{
			width: 130upx;
			height: 130upx;
			border:5upx solid #fff;
			border-radius: 50%;
		}
		.username{
			font-size: $font-lg + 6upx;
			color: #ffffff;
			margin-left: 20upx;
		}
		.tip{
			font-size: $font-sm + 2upx;
			color: #ffffff;
			margin-left: 20upx;
		}
	}

	.vip-card-box{
		display:flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0,0,0,.7), rgba(0,0,0,.8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;
		.card-bg{
			position:absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}
		.b-btn{
			position: absolute;
			right: 20upx;
			top: 16upx;
			width: 132upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}
		.tit{
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;
			.yticon{
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}
		.e-b{
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}
	.cover-container{
		background: $page-color-base;
		margin-top: -150upx;
		padding: 0 30upx;
		position:relative;
		background: #f5f5f5;
		padding-bottom: 20upx;
		.arc{
			position:absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}
	.tj-sction{
		@extend %section;
		.tj-item{
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}
		.num{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}
	.order-section{
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;
		.order-item{
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-base;
			color: $font-color-dark;
		}
		.icon{
			width: 58upx;
			height: 58upx;
			margin-bottom: 10upx;
		}
	}
	.history-section{
		padding: 30upx 0 0;
		margin-top: 20upx;
		margin-bottom: 100upx;
		background: #fff;
		border-radius:10upx;
		.sec-header{
			display:flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;
			.yticon{
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}
		.h-list{
			white-space: nowrap;
			padding: 30upx 30upx 0;
			image{
				display:inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}
	
</style>