import { USER_LOGIN } from './../mutations_type'
import { register, login } from '@/api/user'

const user = {
  state: {
	  nickname: null
  },

  mutations: {
	  [USER_LOGIN](state, payload) {
	  		if(payload.code == 200){
	  			state.nickname = payload.nickname
	  			uni.setStorageSync('token', payload.token);
	  		}
	  }
  },

  actions: {
	  hasLogin(){
	  	const token = uni.getStorageSync('token');
	  	if(token != undefined && token != null && token != ''){
	  		return true;
	  	}
	  	return false;
	  },
    // 注册
    register({ commit }, data) {
      return new Promise((resolve, reject) => {
        register(data).then(res => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
	login({ commit }, data) {
	  return new Promise((resolve, reject) => {
	    login(data).then(res => {
			commit(USER_LOGIN, res)
	      resolve()
	    }).catch(error => {
	      reject(error)
	    })
	  })
	}
	
  }
}

export default user
