import { sendSms } from '@/api/common'

const common = {
  state: {
  },

  mutations: {
  },

  actions: {
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
