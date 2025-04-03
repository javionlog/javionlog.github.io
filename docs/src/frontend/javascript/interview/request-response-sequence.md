---
title: 请求和响应的顺序一致性
description: 如何保证请求和响应的顺序一致
tags:
  - JavaScript
  - 面试
injectDocBefore: true
---

## 要求

在前端的交互中，用户快速切换分页或者标签，接口最后响应的数据不是用户最后一次点击发送请求时的响应数据，从而导致最终渲染的内容不是用户想要的，即请求和响应的顺序不一致，如何避免这个问题？

## 实现

### 方案1，全屏 loading 状态

```js
// 在每个请求前设置一个全屏 loading 状态，在请求结束后才取消 loading 状态
let loading = false

const handlePagination = async page => {
  loading = true
  try {
    const result = await fetch(`/api/data?page=${page}`)
  } finally {
    loading = false
  }
}
```

### 方案2，使用 AbortController 取消未完成请求

```js
function createRequestSequencer() {
  let abortController = null

  return async (url, options = {}) => {
    // 取消之前的请求
    if (abortController) {
      abortController.abort()
    }

    // 创建新的中止控制器
    abortController = new AbortController()

    try {
      const response = await fetch(url, {
        ...options,
        signal: abortController.signal
      }).then(res => res.json())

      return response
    } catch (error) {
      // 只抛出非主动取消的错误
      if (error.name !== 'AbortError') {
        throw error
      }
    }
  }
}

// 使用示例
const sequencer = createRequestSequencer()

async function handlePagination(page) {
  const result = await sequencer(`/api/data?page=${page}`)
}
```

### 方案3，使用请求标识符

```js
function createRequestSequencer() {
  let lastId = 0
  return async promise => {
    const currentId = ++lastId
    try {
      const result = await promise()
      if (currentId === lastId) {
        return result
      }
    } catch (error) {
      // 只抛出非主动取消的错误
      if (currentId === lastId) {
        throw error
      }
    }
    return Promise.resolve()
  }
}

// 使用示例
const sequencer = createRequestSequencer()

async function handlePagination(page) {
  const getPage = fetch(`/api/data?page=${page}`).then(res => res.json())
  const result = await sequencer(getPage)
}
```
