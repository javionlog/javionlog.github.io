---
title: 闭包
description: 闭包是一个函数以及声明该函数的词法（词法指的是，词法作用域根据变量的声明位置来确定该变量在何处可用）作用域的引用（引用指的是，函数需要调用且函数有引用的变量才能形成闭包，没调用或函数没有引用的变量是不会形成闭包）的组合。该函数的词法作用域只能是函数作用域，而不能是全局作用域，也就是说在函数内部声明的函数才可能是闭包，在全局声明的函数不是闭包。
tags:
  - JavaScript
injectDocBefore: true
---

## 什么是闭包？

闭包的一种常见定义是：有权访问另外一个函数作用域中变量的函数。

这种说法是不对的，**闭包是一个函数以及声明该函数的词法作用域的引用的组合**，单单一个函数不能称之为闭包。

### 示例 1

```js
const foo = () => {
  const num = 123
  return () => {
    return num
  }
}
foo(123)(456) // 123
```

示例 1 中，`foo` 函数中的匿名函数和变量 `num` 组成了闭包，因为匿名函数引用了另外一个函数 `foo` 作用域中的变量 `num`

### 示例 2

```js
const foo = num => {
  return () => {
    return num
  }
}
foo(123)(456) // 123
```

示例 2 中，同示例 1，匿名函数和变量 `num` 组成了闭包

### 示例 3

```js
const foo = num => {
  return num => {
    return num
  }
}
foo(123)(456) // 456
```

示例 3 中，`foo` 函数中的匿名函数没有引用 `foo` 函数作用域的变量，不存在闭包

### 示例 4

```js
const foo = () => {
  const num = 123
  function bar() {
    return num
  }
  return num
}
foo(123) // 123
```

示例 4 中，`bar` 函数没有调用，不存在闭包

### 示例 5

```js
const foo = fn => {
  const num = 123
  fn(num)
  return num
}
foo(num => {
  num += 1
}) // 123
```

示例 5 中，`foo` 函数中的 `fn` 函数虽然看似引用了 `num` 变量且也调用了，但实际上 `num` 是在调用时作为参数传递的，并没有被函数引用，所以不存在闭包

### 示例 6

```js
const foo = fn => {
  const num = 123
  setTimeout(() => {
    fn(num)
  }, 1000)
  return num
}
foo(num => {
  num += 1
}) // 123
```

示例 6 中，`foo` 函数中 `fn` 函数引用了 `num` 变量且被定时器调用，`fn` 函数和变量 `num` 形成了闭包

### 示例 7

```js
const bar = fn => {
  fn()
}
const foo = fn => {
  const num = 123
  bar(() => {
    fn(num)
  })
  return num
}
foo(num => {
  num += 1
}) // 123
```

示例 7 中，同示例 6，`fn` 函数和变量 `num` 组成了闭包

## 闭包的应用场景

1. 可以从函数外部访问函数内部的变量，达到变量私有化

```js
const foo = () => {
  const num = 123
  return () => {
    return num
  }
}
foo()()
```

2. 让变量始终保存在内存中，达到记忆功能

```js
const foo = () => {
  let num = 123
  return () => {
    return num++
  }
}
const add = foo()
add() // 123
add() // 124
add() // 125
```

## 使用闭包的注意点

1. 如果使用闭包函数来修改函数内部的变量，需要谨慎
2. 闭包函数引用的变量会保存在内存中，需要注意内存泄漏
