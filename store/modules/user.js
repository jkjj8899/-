import { register } from '@/api/user'

const user = {
  state: {
  },

  mutations: {
  },

  actions: {
    // 登录
    register({ commit }, data) {
      return new Promise((resolve, reject) => {
        register(data).then(res => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
	
  }
}

export default user
