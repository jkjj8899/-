import request from '@/utils/request'

// 手机验证码
export function sendSms(data) {
  return request({
    url: '/v1/common/captcha/sms',
    method: 'POST',
    data: data
  })
}