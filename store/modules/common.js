import { sendSms, coinList } from '@/api/common'
import { COMMON_COIN_LIST } from './../mutations_type'


const common = {
  state: {
	  coins: null
  },

  mutations: {
	  [COMMON_COIN_LIST](state, payload) {
	  		if(payload.code == 200){
	  			state.coins = payload.data
	  		}
	  }
  },

  actions: {
	  coinList({ commit }) {
	    return new Promise((resolve, reject) => {
	      coinList().then(res => {
	        resolve(res)
	      }).catch(error => {
	        reject(error)
	      })
	    })
	  },
    // 手机验证码发送
    sendSms({ commit }, data) {
      return new Promise((resolve, reject) => {
        sendSms(data).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
	
  }
}

export default common
