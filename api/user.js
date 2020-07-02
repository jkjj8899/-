import request from '@/utils/request'

// 注册
export function register(data) {
  return request({
    url: '/v1/register',
    method: 'POST',
    data: data
  })
}
//登录
export function login(data) {
  return request({
    url: '/v1/login',
    method: 'POST',
    data: data
  })
}
//修改密码
export function updatePwd(data) {
  return request({
    url: '/v1/user/update/pwd',
    method: 'POST',
    data: data
  })
}
//修改资金密码
export function updatePayPwd(data) {
  return request({
    url: '/v1/user/update/payPwd',
    method: 'POST',
    data: data
  })
}
//查询加密地址簿列表
export function encryptBookList(data) {
  return request({
    url: '/v1/encrypt/book/list',
    method: 'GET',
    data: data
  })
}
//添加加密地址
export function addEncryptBook(data) {
  return request({
    url: '/v1/encrypt/book',
    method: 'POST',
    data: data
  })
}
//删除加密地址
export function deleteEncryptBook(id) {
  return request({
    url: `/v1/encrypt/book/${id}`,
    method: 'DELETE'
  })
}
//提币
export function withdraw(data) {
  return request({
    url: '/v1/withdraw',
    method: 'POST',
    data: data
  })
}
//提币列表
export function withdrawList(data) {
  return request({
    url: '/v1/withdraw/list',
    method: 'GET',
    data: data
  })
}
//充币
export function depositAddress(coin) {
  return request({
    url: `/v1/deposit/address/${coin}`,
    method: 'GET'
  })
}
//充币列表
export function depositList(data) {
  return request({
    url: '/v1/deposit/list',
    method: 'GET',
    data: data
  })
}
//邀请排行
export function invitRank() {
  return request({
    url: `/v1/user/invit/rank`,
    method: 'GET'
  })
}
//获取GoogleKey
export function getGoogleKey() {
  return request({
    url: `/v1/user/google/key`,
    method: 'GET'
  })
}
//绑定Google
export function bindGoogle(data) {
  return request({
    url: '/v1/user/bind/google',
    method: 'POST',
    data: data
  })
}
//解绑Google
export function unbindGoogle(data) {
  return request({
    url: '/v1/user/unbind/google',
    method: 'POST',
    data: data
  })
}