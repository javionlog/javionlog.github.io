---
title: This
description: 一般来说，this 是在函数内部中使用，this 的指向是在函数调用时确定的，即和执行上下文有关。ES5 引入了 bind 方法来设置函数的 this 值，而不用考虑函数是如何被调用的。ES6 引入了箭头函数，箭头函数本身没有 this，箭头函数的 this 在声明时便确定，和普通变量一样来自作用域链，如果当前作用域没有就一层层往上找。
tags:
  - JavaScript
injectDocBefore: true
---

## 普通函数 this 指向分为 4 种情况

### 1、直接调用

```js
function foo() {
  return this.prop
}
// 直接调用，在浏览器环境 this 指向 window，严格模式下 this 指向 undefined
foo() // undefined
```

### 2、作为对象的属性调用

```js
const obj = {
  prop: 123,
  foo() {
    return this.prop
  }
}
// 作为对象的属性调用，this 指向这个对象
obj.foo() // 123
const bar = obj.foo
bar() // undefined
```

### 3、通过 bind 显式绑定后调用

```js
const obj = {
  prop: 123,
  foo() {
    return this.prop
  }
}

// 通过 bind 显式绑定后调用，this 指向绑定的对象
const bar = obj.foo.bind({ prop: 456 })
bar() // 456
```

### 4、通过 new 关键字调用

```js
const obj = {
  prop: 123,
  foo: function () {
    return { p: this.prop }
  }
}
// 通过 new 关键字调用，this 指向新对象
const bar = new obj.foo() // { p: undefined }
bar.p = 456 // bar -> { p: 456 }
```

### 5、箭头函数本身没有 this，来自于作用域链

```js
const obj = {
  prop: 123,
  foo: () => {
    return this.prop
  },
  bar() {
    return () => {
      return this.prop
    }
  }
}
// 箭头函数本身没有 this，来自于作用域链，当前作用域没有就一层层往上找
// 作用域是全局，所以 this 指向 undefined
obj.foo() // undefined

// 作用域是 bar 函数，此时 bar 函数的 this 指向 obj，所以 this 指向 obj
obj.bar()() // 123

// 作用域是 bar 函数，此时 bar 函数的 this 指向全局，所以 this 指向 undefined
const baz = obj.bar
baz()() // undefined，
```
