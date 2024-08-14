---
title: 栈
description: 栈是一种特殊的线性表。它的特点是，只能在表的一端操作。可以操作的端称为栈顶，不可以操作的另一端称为栈底。栈的特性：先进后出。
tags:
  - 数据结构
injectDocBefore: true
---

## 实现

```js
class Stack {
  constructor() {
    this.items = []
  }

  push(item) {
    this.items.push(item)
  }

  pop() {
    return this.items.pop()
  }

  top() {
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

### 有效的括号

[20. 有效的括号](https://leetcode.cn/problems/valid-parentheses/)

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。
3. 每个右括号都有一个对应的相同类型的左括号。

**示例 1：**

- **输入：s = "()"**
- **输出：true**

**示例 2：**

- **输入：s = "()[]{}"**
- **输出：true**

**示例 3：**

- **输入：s = "(]"**
- **输出：false**

```js
/**
 * 1. 如果字符串的长度为奇数，返回 false
 * 2. 遍历整个字符串
 * 3. 遇到左括号入栈，遇到右括号则取出栈顶的左括号与之比较，
 *    如果类型不相同或者栈中没有左括号则返回 false，
 *    如果类型相同则栈顶的左括号出栈
 * 4. 遍历结束后，如果栈中没有左括号说明所有左括号已经闭合，返回 true，否则返回 false
 */

const isValid = str => {
  if (typeof str !== 'string') {
    return false
  }
  const len = str.length
  if (len % 2 !== 0) {
    return false
  }
  const brackets = new Map([
    [')', '('],
    [']', '['],
    ['}', '{']
  ])
  const stack = []
  for (const ch of str) {
    if (brackets.has(ch)) {
      if (stack.length === 0 || stack[stack.length - 1] !== brackets.get(ch)) {
        return false
      }
      stack.pop()
    } else {
      stack.push(ch)
    }
  }
  return stack.length === 0
}
```
