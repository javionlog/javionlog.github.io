---
title: 队列
description: 队列是一种特殊的线性表，它的特点是，只能在表的一端进行删除操作，而在表的另一点进行插入操作。可以进行删除操作的端称为队首，而可以进行插入操作的端称为队尾。删除一个元素称为出队，插入一个元素称为入队。和栈一样，队列也是一种操作受限制的线性表。队列的特性：先进先出。
tags:
  - 数据结构
injectDocBefore: true
---

## 实现

```js
class Queue {
  constructor() {
    this.items = []
  }

  enqueue(item) {
    this.items.push(item)
  }

  dequeue() {
    return this.items.shift()
  }

  head() {
    return this.items[0]
  }

  tail() {
    return this.items[this.items.length - 1]
  }

  clear() {
    this.items = []
  }

  size() {
    return this.items.length
  }
}
```

## 应用

### 约瑟夫环

有 n 个人组成一个环，他们的编号为 0 ~ n - 1，数组 people 按升序记录编号。从 1 开始，他们轮流报数，每次喊到 k 的人出去，需要返回出组顺序。

**示例：**

- 输入：people = [0, 3, 1, 2, 4], k = 3
- 输出：[1, 0, 4, 3, 2]
- 解释：

1. 第一次，值为 1 的人喊 3，剩余 [0, 3, 2, 4], 从 2 继续开始。
2. 第二次，值为 0 的人喊 3，剩余 [3, 2, 4], 从 3 继续开始。
3. 第三次，值为 4 的人喊 3 ，剩余 [3, 2], 从 3 继续开始。
4. 第四次，值为 3 的人喊 3，剩余 [2], 从 2 继续开始。
5. 第五次，值为 2 的人喊 3，剩余 [2], 结果为 [1, 0, 4, 3, 2]。

```js
/**
 * 1. 将长度为 n 的数组入列
 * 2. 循环队列，依次出列数组中的数字，对当前出队的计数 +1
 * 3. 判断当前出队的计数是否能整除 k，是的话则放入结果数组，不是的话则放到入队
 * 4. 循环结束，返回结果数组
 */
const ring = (arr, k) => {
  const queue = [...arr]
  const result = []
  let count = 0
  while (queue.length) {
    const item = queue.shift()
    count += 1
    if (count % 3 !== 0) {
      queue.push(item)
    } else {
      result.push(item)
    }
  }
  return result
}
```

### 洋葱模型

洋葱模型的核心思想是将多个中间件层叠起来，形成一个类似洋葱的结构，外层的中间件可以在内层中间件执行之前和之后执行一些操作。

```js
function createApp() {
  const queue = []
  return {
    use(fn) {
      queue.push(fn)
    },
    run() {
      const next = index => {
        if (index >= queue.length) {
          return Promise.resolve()
        }
        const fn = queue[index]
        return Promise.resolve(fn(() => next(index + 1)))
      }
      return next(0)
    }
  }
}

const app = new createApp()
const middleware1 = async next => {
  console.log('Middleware 1 - Before')
  await next()
  console.log('Middleware 1 - After')
}

const middleware2 = async next => {
  console.log('Middleware 2 - Before')
  await next()
  console.log('Middleware 2 - After')
}

app.use(middleware1)
app.use(middleware2)

app.run().then(() => {
  console.log('All middleware executed')
})

// 输出
// Middleware 1 - Before
// Middleware 2 - Before
// Middleware 2 - After
// Middleware 1 - After
// All middleware executed
```
