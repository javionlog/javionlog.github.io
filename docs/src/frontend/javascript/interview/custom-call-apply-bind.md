---
title: 手写 call、apply、bind
description: 手写 call、apply、bind
tags:
  - JavaScript
  - 面试
  - 并发
injectDocBefore: true
---

### 手写 call

```js
Function.prototype.myCall = function (ctx, ...args) {
  // 重写上下文
  ctx = ctx === null || ctx === undefined ? globalThis : Object(ctx)
  const fn = this
  // 使用 symbol 防止和其他属性重复
  const key = Symbol()
  ctx[key] = fn
  // 通过对象属性方式调用函数，使得被调用函数的 this 指向 ctx
  const result = ctx[key](...args)
  Reflect.deleteProperty(ctx, key)
  return result
}
```

### 手写 apply

```js
// apply 和 call 的区别在于 args 是一个数组
Function.prototype.myApply = function (ctx, args = []) {
  // 重写上下文
  ctx = ctx === null || ctx === undefined ? globalThis : Object(ctx)
  const fn = this
  // 使用 symbol 防止和其他属性重复
  const key = Symbol()
  ctx[key] = fn
  // 通过对象属性方式调用函数，使得被调用函数的 this 指向 ctx
  const result = ctx[key](...args)
  Reflect.deleteProperty(ctx, key)
  return result
}
```

### 手写 bind

```js
Function.prototype.myBind = function (ctx, ...args) {
  const fn = this
  return function (...restArgs) {
    const newArgs = [...args, ...restArgs]
    // 如果通过 new 方式来调用
    if (new.target) {
      return new fn(...newArgs)
    }
    return fn.apply(ctx, newArgs)
  }
}
```
