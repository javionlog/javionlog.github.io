---
title: 大整数求和
description: 请实现一个对 2 个整数求和的函数，支持 2 个整数都大于 Number.MAX_SAFE_INTEGER (即 2^53 - 1，9007199254740991) 的情况
tags:
  - JavaScript
  - 面试
  - 并发
injectDocBefore: true
---

## 要求

```js
function sumBigInteger(num1, num2) {}

sumBigInteger('123', '456') // "579"
sumBigInteger('123', '-456') // "-333"
sumBigInteger('-123', '456') // "333"
sumBigInteger('-123', '-456') // "-579"
```

## 实现

```js
function sumBigInteger(num1, num2) {
  // 辅助函数：判断数字是正数还是负数
  function isNegative(num) {
    return num[0] === '-'
  }

  // 辅助函数：去掉前面零
  function removeLeadingZeros(num) {
    return num.replace(/^0+/, '') || '0'
  }

  // 辅助函数：执行加法
  function sumPositive(num1, num2) {
    let result = ''
    let carry = 0
    const maxLen = num1.length > num2.length ? num1.length : num2.length
    const n1 = num1.padStart(maxLen, '0')
    const n2 = num2.padStart(maxLen, '0')

    for (let i = maxLen - 1; i >= 0; i--) {
      const digit1 = Number(n1[i])
      const digit2 = Number(n2[i])
      const sum = digit1 + digit2 + carry
      carry = Math.floor(sum / 10)
      result = (sum % 10) + result
    }

    if (carry > 0) {
      result = carry + result
    }
    return result
  }

  // 辅助函数：执行减法
  function subtractPositive(num1, num2) {
    // 确保 num1 是较大的数
    if (Number(num1) < Number(num2)) {
      return `-${subtractPositive(num2, num1)}`
    }

    let result = ''
    let borrow = 0
    const maxLen = num1.length
    const n1 = num1.padStart(maxLen, '0')
    const n2 = num2.padStart(maxLen, '0')

    for (let i = maxLen - 1; i >= 0; i--) {
      const digit1 = Number(n1[i])
      const digit2 = Number(n2[i])
      let sub = digit1 - digit2 - borrow

      if (sub < 0) {
        sub += 10
        borrow = 1
      } else {
        borrow = 0
      }

      result = sub + result
    }

    return removeLeadingZeros(result)
  }

  // 处理负数情况
  if (isNegative(num1) && isNegative(num2)) {
    return '-' + sumPositive(num1.slice(1), num2.slice(1))
  } else if (isNegative(num1)) {
    return subtractPositive(num2, num1.slice(1))
  } else if (isNegative(num2)) {
    return subtractPositive(num1, num2.slice(1))
  } else {
    return sumPositive(num1, num2)
  }
}
```
