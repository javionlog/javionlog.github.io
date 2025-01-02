---
title: 函数防抖
description: 函数防抖是指当一个事件被触发时，防抖函数会延迟执行目标函数。如果在延迟时间内再次触发该事件，之前的定时器会被清除，并重新设置一个新的定时器。只有在事件停止触发一段时间后，目标函数才会被执行。
tags:
  - JavaScript
  - 面试
injectDocBefore: true
---

## 要求

```js
const debounce = (fn, delay) => {}

const handleInput = debounce(() => {
  // 用户停止输入再等待 1s 才会执行
  console.log('Input changed')
}, 1000)

// 假设这是一个输入框的事件处理
document.getElementById('input').addEventListener('input', handleInput)
```

## 实现

```js
const debounce = (fn, delay) => {
  let timerId = null
  return function (...args) {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
```
