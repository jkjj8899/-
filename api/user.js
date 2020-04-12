import request from '@/utils/request'

// 注册
export function register(data) {
  return request({
    url: '/v1/register',
    method: 'POST',
    data: data
  })
}
