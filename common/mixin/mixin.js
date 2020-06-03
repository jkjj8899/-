import {
		mapState,
		mapActions
	} from 'vuex'

export const commonMixin = {
  computed:{
  	...mapState('user', ['loginInfo'])
  },
  data() {
    return { }
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
  onLoad() {
	  if(!this.loginInfo.hasLogin){
	  	uni.navigateTo({
	  		url: '/pages/public/login'
	  	})
	  }
  },
  methods: {
  }
}

