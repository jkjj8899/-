import {
		mapState,
		mapActions
	} from 'vuex'

export const commonMixin = {
  computed:{
  	...mapState('user', ['loginInfo']),
	i18n() {
		return this.$t('message');
	}
  },
  data() {
    return {
		contentText: {
			contentdown: "上拉显示更多",
			contentrefresh: "正在加载...",
			contentnomore: "没有更多数据了"
		}
	}
  },
  filters: {
	  fixed(v, scale){
		  if(v){
			  if(!scale){
				  scale = 2
			  }
			  return parseFloat(v).toFixed(scale)
		  }
		  return v
	  }
  },
  onShow(){
	  this.contentText = {
		  contentdown: this.i18n.common.loadmoreText,
		  contentrefresh: this.i18n.common.loadingText,
		  contentnomore: this.i18n.common.nomoreText
	  }
  },
  methods: {
	  isLogin(){
		  if(!this.loginInfo.hasLogin){
		  	uni.navigateTo({
		  		url: '/pages/public/login'
		  	})
		  } else {
		  	return true
		  }
	  },
	  navTo(url, auth){
		  if(auth && !this.loginInfo.hasLogin){
			  uni.navigateTo({
			  	url: '/pages/public/login'
			  })
			  return
		  }
		  uni.navigateTo({
		  	url: url
		  })
	  }
  }
}

export const authMixin = {
  computed:{
  	...mapState('user', ['loginInfo'])
  },
  onShow() {
	  if(!this.loginInfo.hasLogin){
	  	uni.navigateTo({
	  		url: '/pages/public/login'
	  	})
	  }
  },
  methods: {
  }
}

