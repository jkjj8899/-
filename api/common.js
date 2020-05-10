import request from '@/utils/request'

// 币种列表
export function coinList(data) {
  return request({
    url: '/v1/coin/list',
    method: 'GET'
  })
}

// 手机验证码
export function sendSms(data) {
  return request({
    url: '/v1/common/captcha/sms',
    method: 'POST',
    data: data
  })
}