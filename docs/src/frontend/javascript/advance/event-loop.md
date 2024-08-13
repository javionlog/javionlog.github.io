---
title: 事件循环
description: JavaScript 是单线程运行的，有一个基于事件循环的并发模型，事件循环是 JavaScript 引擎在等待任务，执行任务、进入休眠状态等待更多任务，这几个状态之间转换的无限循环。
tags:
  - JavaScript
injectDocBefore: true
---

## 什么是事件循环？

简单来说，事件循环就是 JavaScript 的运行机制。

```mermaid
flowchart LR
    E[事件循环] --> E
    执行栈 -- 遇到宏任务 --> 宏任务队列
    执行栈 -- 遇到微任务 --> 微任务队列
    执行栈 -- 同步代码执行完 --> 处理任务队列 -- 任务队列处理完 --> 执行栈
    subgraph 执行栈
       S[<div class="flex flex-col gap-2 p-4"><div class="border border-dashed border-warning px-2">Function</div><div class="border border-dashed border-warning px-2">Function</div><div class="border border-dashed border-warning px-2">Function</div></div>]
    end
    subgraph 宏任务队列
      T[<div class="flex gap-4 py-2"><div class="px-2 border border-dashed border-warning">setTimeout</div><div class="px-4 border border-dashed border-warning">xhr</div><div class="px-4 border border-dashed border-warning">event</div></div>]
    end
    subgraph 微任务队列
      M[<div class="flex gap-4 py-2"><div class="px-2 border border-dashed border-warning">Promise</div><div class="px-4 border border-dashed border-warning">MutationObserver</div></div>]
    end
    subgraph 处理任务队列
      N1[清空微任务队列] --> N2[取出一个宏任务执行]
    end
```

1. 执行全局 Script 代码，执行过程中遇到异步代码，会把异步代码放到宏任务队列或微任务队列
2. 全局 Script 代码执行完毕，执行栈清空
3. 依次把微任务队列的任务放到执行栈执行，直到清空微任务队列
4. 取出宏任务队列的第一个任务放到执行栈执行
5. 重复 3 和 4 步骤
6. 重复 3 和 4 步骤
7. ...不断循环

**注意：在 3 和 4 步骤之间浏览器会尝试进行页面的渲染，即在所有微任务执行完毕和第一个宏任务执行前**

## 示例

```js
console.log(1)

setTimeout(() => {
  console.log(2)
  Promise.resolve().then(() => {
    console.log(3)
  })
})

new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then(res => {
  console.log(res)
})

setTimeout(() => {
  console.log(6)
})

console.log(7)
```

输出结果

```js
1
4
7
5
2
3
6
```
