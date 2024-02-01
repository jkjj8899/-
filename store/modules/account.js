import {
	accountList, 
	getAccount,
	accountFlows
} from '@/api/account'
import {} from './../mutations_type'


const account = {
	state: {

	},

	mutations: {

	},

	actions: {
		accountList({
			commit
		}) {
			return new Promise((resolve, reject) => {
				accountList().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		getAccount({
			commit
		}, coin) {
			return new Promise((resolve, reject) => {
				getAccount(coin).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		accountFlows({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				accountFlows(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default account
