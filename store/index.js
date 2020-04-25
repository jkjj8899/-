import Vue from 'vue'
import Vuex from 'vuex'


import user from './modules/user'
import common from './modules/common'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
	user: {
	  namespaced: true,
	  ...user
	},
	common: {
	  namespaced: true,
	  ...common
	}
  }
})

export default store
