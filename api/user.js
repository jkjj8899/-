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