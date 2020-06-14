import Vue from 'vue'
import Vuex from 'vuex'


import user from './modules/user'
import otc from './modules/otc'
import common from './modules/common'
import exchange from './modules/exchange'
import account from './modules/account'
import cms from './modules/cms'
import websocket from './modules/websocket'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
	websocket: websocket,
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
	},
	exchange: {
	  namespaced: true,
	  ...exchange
	},
	account: {
	  namespaced: true,
	  ...account
	},
	cms: {
	  namespaced: true,
	  ...cms
	}
  }
})

export default store
