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

