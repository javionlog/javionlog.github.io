---
title: 双 Token 无感刷新
description: 如何实现双 Token 无感刷新
tags:
  - JavaScript
  - 面试
injectDocBefore: true
---

## 要求

在单点登录场景下，如何实现无感刷新，即用户无感知的刷新 Token，保证用户的操作不受影响。

## 实现

```js
// 创建 axios 实例
const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 是否正在刷新令牌的标记
let isRefreshing = false
// 重试队列
let queues = []

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  async error => {
    const { response, config } = error
    const refreshToken = localStorage.getItem('refreshToken')

    // 处理令牌刷新逻辑
    if (response.status === 401 && !config._retry && refreshToken) {
      if (isRefreshing) {
        // 将挂起的请求存储起来
        return new Promise(resolve => {
          queues.push(() => resolve(service(config)))
        })
      }

      config._retry = true
      isRefreshing = true

      try {
        // 发起刷新请求
        const { data } = await axios.post('/auth/refresh', { refreshToken })
        // 存储新令牌
        localStorage.setItem('token', data.token)
        localStorage.setItem('refreshToken', data.refreshToken)

        // 重新发送挂起的请求
        queues.forEach(cb => cb())
        queues = []
        return service(config)
      } catch (e) {
        // 刷新失败则跳转登录
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
        return Promise.reject(e)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  }
)

export default service
```
