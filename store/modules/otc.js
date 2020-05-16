import {
	payInfoList, 
	addPayInfo, 
	getPayInfo, 
	updatePayInfo, 
	activePayInfo,
	deletePayInfo
} from '@/api/otc'
import {} from './../mutations_type'


const otc = {
	state: {

	},

	mutations: {

	},

	actions: {
		payInfoList({
			commit
		}) {
			return new Promise((resolve, reject) => {
				payInfoList().then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		getPayInfo({
			commit
		}, id) {
			return new Promise((resolve, reject) => {
				getPayInfo(id).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		addPayInfo({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				addPayInfo(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		updatePayInfo({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				updatePayInfo(data).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		activePayInfo({
			commit
		}, id) {
			return new Promise((resolve, reject) => {
				activePayInfo(id).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		deletePayInfo({
			commit
		}, id) {
			return new Promise((resolve, reject) => {
				deletePayInfo(id).then(res => {
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default otc
