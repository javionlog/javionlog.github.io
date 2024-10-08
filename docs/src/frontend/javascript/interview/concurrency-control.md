---
title: 并发控制
description: 假设有这么一个场景：现在有 30 个异步请求需要发送，但是由于某些原因，要求我们必须将同一时刻的并发请求数量控制在 3 个以内，并且还要尽可能快速的拿到响应结果。
tags:
  - JavaScript
  - 面试
  - 并发
injectDocBefore: true
---

## 要求

```js
function timeout(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

const superTask = new SuperTask()

function addTask(time, name) {
  superTask
    .add(() => timeout(time))
    .then(() => {
      console.log(`任务${name}完成`)
    })
}

addTask(10000, 1) // 10000ms 后输出：任务1完成
addTask(5000, 2) // 5000ms 后输出：任务2完成
addTask(3000, 3) // 8000ms 后输出：任务3完成
addTask(4000, 4) // 11000ms 后输出：任务4完成
addTask(5000, 5) // 15000ms 后输出：任务5完成
```

## 实现

### 方案1

```js
class SuperTask {
  constructor(limit = 2) {
    this.limit = limit
    this.tasks = []
    this.runningCount = 0
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push({ task, resolve, reject })
      this._run()
    })
  }

  _run() {
    while (this.runningCount < this.limit && this.tasks.length) {
      const { task, resolve, reject } = this.tasks.shift()
      this.runningCount += 1
      Promise.resolve(task())
        .then(resolve, reject)
        .finally(() => {
          this.runningCount -= 1
          this._run()
        })
    }
  }
}
```

### 方案2

```js
const concurrencyControl = (fns = [], limit = 2) => {
  const result = []
  const tasks = []
  let runningCount = 0
  const add = task => {
    return new Promise((resolve, reject) => {
      tasks.push({ task, resolve, reject })
      run()
    })
  }

  const run = () => {
    while (runningCount < limit && tasks.length) {
      const { task, resolve, reject } = tasks.shift()
      runningCount += 1
      Promise.resolve(task())
        .then(resolve, reject)
        .finally(() => {
          runningCount -= 1
          run()
        })
    }
  }

  for (const fn of fns) {
    result.push(add(fn))
  }

  return Promise.allSettled(result)
}
```
