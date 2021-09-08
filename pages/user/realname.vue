<template>
	<view class="container">
		<!-- <view class="header">
			<text class="title">实名认证</text>
			<text class="sub">为确保账户安全请先完成实名认证</text>
		</view> -->
		<view class="box">
			<image src="../../static/images/auth/icon-zheng.png" class="icon" mode="widthFix"></image>
			<view class="title">
				<text class="t">请上传身份证正反面图像</text>
				<text class="b">请确保照片的内容完整并清晰可见，仅支持jpg、png格式， 图片大小小于5M；</text>
			</view>
			<view class="reject" v-if="form.id && form.status == 2">审核拒绝: {{form.remark}}</view>
			<view class="photo">
				<view v-show="!form.frontPhoto" @click="handleUpload(0)">
					<image class="img" src="../../static/images/auth/auth-zhen.jpg"></image>
					<text class="tip">请上传身份证正面图像</text>
				</view>
				<view v-show="form.frontPhoto">
					<image class="img" :src="form.frontPhoto"></image>
				</view>
			</view>
			<view class="photo">
				<view v-show="!form.backPhoto" @click="handleUpload(1)">
					<image class="img" src="../../static/images/auth/auth-fan.jpg"></image>
					<text class="tip">请上传身份证反面图像</text>
				</view>
				<view v-show="form.backPhoto">
					<image class="img" :src="form.backPhoto"></image>
				</view>
			</view>
			<button class="btn disable" v-if="form.id && form.status == 0">审核中</button>
			<button class="btn" v-if="!form.id || form.status == 2" @click="submit">确认提交</button>
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
		mixins: [authMixin, commonMixin],
		data() {
			return {
				pos: 0,
				form: {
					frontPhoto: undefined,
					backPhoto: undefined
				}
			};
		},
		onLoad() {
		},
		onShow() {
			this.loadData()
		},
		methods:{
			...mapActions('user', ['getAuthInfo', 'authApply']),
			handleUpload(pos){
				this.pos = pos
				this.$upload(this.uploadSuccess, this.uploadProgress)
			},
			uploadSuccess(res){
				if(this.pos == 0){
					this.form.frontPhoto = res.url
				} else {
					this.form.backPhoto = res.url
				}
			},
			uploadProgress(res){
				console.log("上传进度:", res)
			},
			loadData(){
				this.getAuthInfo().then(res =>{
					if(res.data){
						this.form = res.data
						if(this.form.status == 2){
							this.form.frontPhoto = undefined
							this.form.backPhoto = undefined
						}
					}
				}).catch(error =>{
				})
			},
			submit(){
				let $this = this
				uni.showModal({
				    title: '提示',
				    content: '是否确认提交?',
				    success: function (res) {
				        if (res.confirm) {
				            $this.authApply($this.form).then(res =>{
				            	$this.loadData()
								$this.$api.msg('提交成功')
				            }).catch(error =>{
				            })
				        } else if (res.cancel) {
				        }
				    }
				});
			}
		}
	}
</script>

<style lang='scss' scoped>
	.container{
		position: fixed;
		width: 100%;
		height: 100%;
		background: url(../../static/images/auth/auth-bg.jpg);
		background-size: 100% 100%;
		padding: 80upx 30upx 30upx 30upx;
		overflow: auto;
	}
	.header{
		text-align: center;
		display: flex;
		flex-direction: column;
		color: #ffffff;
		.title{
			font-size: 36upx;
			padding: 10upx 0;
		}
	}
	.box{
		width: 100%;
		background: #ffffff;
		margin-top: 140upx;
		padding-bottom: 30upx;
		border-radius: 20upx;
		position: relative;
		.icon{
			position: absolute;
			width: 200upx;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		.title{
			padding-top: 100upx;
			padding-left: 30upx;
			padding-right: 30upx;
			text-align: center;
			display: flex;
			flex-direction: column;
			.t{
				color: #293f7f;
				font-size: 36upx;
				font-weight: 500;
			}
			.b{
				text-align: left;
				padding: 20upx 0;
			}
		}
		.photo{
			text-align: center;
			position: relative;
			margin-bottom: 30upx;
			.tip{
				display: block;
				position: absolute;
				left: 50%;
				bottom: 30upx;
				transform: translate(-50%, 0%);
			}
			.img{
				height: 390upx;
			}
		}
		.reject{
			padding: 20upx 30upx;
			color: red;
		}
		.btn{
			margin: 0upx 30upx;
			border: 0;
			border-radius: 50upx;
			background: #3c7bfb;
			color: #ffffff;
		}
		.disable{
			background: #999999;
		}
	}
</style>
