import Vue from 'vue'
import Vuex from 'vuex'


import user from './modules/user'
import otc from './modules/otc'
import common from './modules/common'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
	user: {
	  namespaced: true,
	  ...user
	},
	otc: {
	  namespaced: true,
	  ...otc
	},
	common: {
	  namespaced: true,
	  ...common
	}
  }
})

export default store
