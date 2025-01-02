---
title: 函数节流
description: 函数节流是指当一个事件被触发时，节流函数会立即执行目标函数，并在接下来的时间间隔内忽略后续的触发。只有在时间间隔结束后，下一次触发事件才会再次执行目标函数。
tags:
  - JavaScript
  - 面试
injectDocBefore: true
---

## 要求

```js
const throttle = (fn, delay) => {}

const handleScroll = throttle(() => {
  // 用户滚动页面时每隔 1s 才会执行
  console.log('Scroll event triggered')
}, 1000)

// 假设这是一个滚动事件处理
window.addEventListener('scroll', handleScroll)
```

## 实现

### 方案1，使用定时器

```js
const throttle = (fn, limit) => {
  let timerId = null
  return function (...args) {
    if (!timerId) {
      timerId = setTimeout(() => {
        fn.apply(this, args)
        timerId = null
      }, limit)
    }
  }
}
```

### 方案2，使用时间戳

```js
const throttle = (fn, limit) => {
  let lastTime = 0
  return function (...args) {
    if (!lastTime || Date.now() - lastTime >= limit) {
      fn.apply(this, args)
      lastTime = Date.now()
    }
  }
}
```
