import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '@/store'

// 创建一个axios的实例，设置不同的baseURL
const request = axios.create({
  timeout: 5000,
  baseURL: 'http://ttapi.research.itcast.cn'
})
request.defaults.transformResponse = [function (data) {
  try {
    // data 数据可能不是标准的 JSON 格式字符串，否则会导致 JSONbig.parse(data) 转换失败报错
    return JSONbig.parse(data)
  } catch (err) {
    // 无法转换的数据直接原样返回
    return data
  }
}]
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (store.state.user) {
    // 如果有登录状态请求的时候，自动携带token
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
request.interceptors.response.use(function (response) {
  // console.log(response)
  // Do something with response data
  // 接口返回的数据中都有data，在此处统一返回接口返回的data
  // 如果接口返回的数据中没有data，此时返回axios响应对象的data属性
  return response.data.data || response.data
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default request
