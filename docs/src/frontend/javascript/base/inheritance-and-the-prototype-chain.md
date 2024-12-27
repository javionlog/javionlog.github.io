---
title: 继承与原型链
description: JavaScript 中的继承是通过原型链实现的，每个对象都有一个私有属性指向另一个名为原型的对象。原型对象也有一个自己的原型，层层向上直到一个对象的原型为 null。根据定义，null 没有原型，并作为这个原型链中的最后一个环节。
tags:
  - JavaScript
injectDocBefore: true
---

## 原型对象

除了箭头函数，每个函数都有一个属性 `prototype`，被称为原型对象，原型对象有个属性 `constructor`，`constructor` 会指向这个函数。如果一个函数被作为构造函数，通过这个构造函数创建出来的实例，那么这个实例有个私有属性（通过 `Obeject.getPrototypeOf(obj)` 获取）会指向构造函数的 `prototype`，实例的 `constructor` 属性指向构造函数。

```js
function Animal() {
  this.size = 'small'
}

const dog = new Animal()
console.log(Animal.prototype.constructor === Animal) // true
console.log(Object.getPrototypeOf(dog) === Animal.prototype) // true
console.log(dog.constructor === Animal) // true
```

![Prototype Chain](./prototype-chain.jpg)

## new 操作符做了哪些事

1. 创建一个新的空对象
2. 将空对象的私有属性（通过 `Obeject.getPrototypeOf(obj)` 获取）指向构造函数的原型
3. 把构造函数的 `this` 指向空对象
4. 对构造函数的返回值作判断，如果返回的是对象类型，就返回这个对象，否则返回空对象

```js
function MyNew(fn, ...args) {
  let obj = {}
  Obeject.setPrototypeOf(obj, fn.prototype)
  let result = fn.apply(obj, args)
  return typeof result === 'object' && result !== null ? result : obj
}
```

## 组合寄生式继承

在 `ES6` 之前，对象要实现继承是比较麻烦的，常见的有原型链继承、构造函数继承、组合继承、寄生式继承、组合寄生式继承，最好的是组合寄生式继承，没有前几个继承的缺点。

```js
function Animal(size) {
  this.size = size
}

Animal.prototype.run = function () {
  console.log('奔跑')
}

function Dog(size) {
  Animal.call(this, size)
}

Dog.prototype = Object.create(Animal.prototype, {
  // 如果不将 Dog.prototype.constructor 设置为 Dog
  // 它将采用 Animal（父类）的 prototype.constructor。
  constructor: {
    value: Dog,
    enumerable: false,
    writable: true,
    configurable: true
  }
})

Dog.prototype.eat = function () {
  console.log('吃饭')
}

const dog = new Dog('small')
dog.run()
dog.eat()
console.log(dog.size) // small
console.log(dog.constructor === Dog) // true
```

## `ES6 extends` 继承

`ES6` 后，`extends` 实现的继承其实是组合寄生式继承的语法糖，不过写起来更加简洁。

```js
class Animal {
  constructor(size) {
    this.size = size
  }

  run() {
    console.log('奔跑')
  }
}

class Dog extends Animal {
  constructor(size) {
    super(size)
  }

  eat() {
    console.log('吃饭')
  }
}

const dog = new Dog('small')
dog.run()
dog.eat()
console.log(dog.size) // small
console.log(dog.constructor === Dog) // true
```
