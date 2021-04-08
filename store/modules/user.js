import { USER_LOGIN, USER_LOGOUT, USER_UPDATE_PAY_PWD, USER_ENABLE_GOOGLE, USER_DISABLE_GOOGLE } from './../mutations_type'
import { register, login, updatePayPwd, updatePwd, encryptBookList, addEncryptBook, deleteEncryptBook, withdraw, depositAddress, withdrawList, withdrawConfig, depositList, invitRank, getGoogleKey, bindGoogle, unbindGoogle, signinDetail, signin } from '@/api/user'

const user = {
  state: {
	  loginInfo: {
		  nickname: null,
		  profile: null,
		  hasLogin: false,
		  isGoogle: false
	  }
  },

  mutations: {
	  [USER_LOGIN](state, payload) {
	  		if(payload.code == 200){
	  			state.loginInfo = payload.data
				state.loginInfo.hasLogin = true
	  			uni.setStorageSync('token', payload.data.token);
	  		}
	  },
	  [USER_LOGOUT](state, payload) {
	  		uni.setStorageSync('token', '');
			state.loginInfo = {
				  nickname: null,
				  profile: null,
				  hasLogin: false
			  }
	  },
	  [USER_UPDATE_PAY_PWD](state, payload) {
	  		if(payload.code == 200){
	  			state.loginInfo.isCapitalPasswd = true
	  			
	  		}
	  },
	  [USER_ENABLE_GOOGLE](state, payload) {
	  		if(payload.code == 200){
	  			state.loginInfo.isGoogle = true
	  		}
	  }
	  ,
	  [USER_DISABLE_GOOGLE](state, payload) {
	  		if(payload.code == 200){
	  			state.loginInfo.isGoogle = false
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
	},
	logout({ commit }){
		commit(USER_LOGOUT)
	},
	updatePwd({ commit }, data) {
	  return new Promise((resolve, reject) => {
	    updatePwd(data).then(res => {
	      resolve()
	    }).catch(error => {
	      reject(error)
	    })
	  })
	},
	updatePayPwd({ commit }, data) {
	  return new Promise((resolve, reject) => {
	    updatePayPwd(data).then(res => {
			commit(USER_UPDATE_PAY_PWD, res)
	      resolve()
	    }).catch(error => {
	      reject(error)
	    })
	  })
	},
	encryptBookList({ commit }, data) {
	  return new Promise((resolve, reject) => {
	    encryptBookList(data).then(res => {
	      resolve(res)
	    }).catch(error => {
	      reject(error)
	    })
	  })
	},
	addEncryptBook({ commit }, data) {
	  return new Promise((resolve, reject) => {
	    addEncryptBook(data).then(res => {
	      resolve(res)
	    }).catch(error => {
	      reject(error)
	    })
	  })
	},
	deleteEncryptBook({ commit }, id) {
	  return new Promise((resolve, reject) => {
	    deleteEncryptBook(id).then(res => {
	      resolve(res)
	    }).catch(error => {
	      reject(error)
	    })
	  })
	},
	withdraw({ commit }, data) {
	  return new Promise((resolve, reject) => {
	    withdraw(data).then(res => {
	      resolve(res)
	    }).catch(error => {
	      reject(error)
	    })
	  })
	},
	depositAddress({ commit }, coin) {
	  return new Promise((resolve, reject) => {
	    depositAddress(coin.coin, coin.chain).then(res => {
	      resolve(res)
	    }).catch(error => {
	      reject(error)
	    })
	  })
	},
	withdrawConfig({ commit }, coin) {
	  return new Promise((resolve, reject) => {
	    withdrawConfig(coin).then(res => {
	      resolve(res)
	    }).catch(error => {
	      reject(error)
	    })
	  })
	},
	withdrawList({ commit }, data) {
	  return new Promise((resolve, reject) => {
	    withdrawList(data).then(res => {
	      resolve(res)
	    }).catch(error => {
	      reject(error)
	    })
	  })
	},
	depositList({ commit }, data) {
	  return new Promise((resolve, reject) => {
	    depositList(data).then(res => {
	      resolve(res)
	    }).catch(error => {
	      reject(error)
	    })
	  })
	},
	invitRank({ commit }) {
	  return new Promise((resolve, reject) => {
	    invitRank().then(res => {
	      resolve(res)
	    }).catch(error => {
	      reject(error)
	    })
	  })
	},
	getGoogleKey({ commit }) {
	  return new Promise((resolve, reject) => {
	    getGoogleKey().then(res => {
	      resolve(res)
	    }).catch(error => {
	      reject(error)
	    })
	  })
	},
	bindGoogle({ commit }, data) {
	  return new Promise((resolve, reject) => {
	    bindGoogle(data).then(res => {
			commit(USER_ENABLE_GOOGLE, res)
	      resolve(res)
	    }).catch(error => {
	      reject(error)
	    })
	  })
	},
	unbindGoogle({ commit }, data) {
	  return new Promise((resolve, reject) => {
	    unbindGoogle(data).then(res => {
			commit(USER_DISABLE_GOOGLE, res)
	      resolve(res)
	    }).catch(error => {
	      reject(error)
	    })
	  })
	},
	signinDetail({ commit }) {
	  return new Promise((resolve, reject) => {
	    signinDetail().then(res => {
	      resolve(res)
	    }).catch(error => {
	      reject(error)
	    })
	  })
	},
	signin({ commit }) {
	  return new Promise((resolve, reject) => {
	    signin().then(res => {
	      resolve(res)
	    }).catch(error => {
	      reject(error)
	    })
	  })
	}
  }
}

export default user
