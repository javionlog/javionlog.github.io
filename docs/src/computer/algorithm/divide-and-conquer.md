---
title: 分而治之
description: 分而治之是一种算法设计策略，它通过将一个大问题分解成多个小问题，递归地解决这些小问题，然后将它们的解合并来得到原问题的解。这种方法常用于排序、查找等问题。

tags:
  - 算法
injectDocBefore: true
---

## 归并排序

- 采用分治法，将数组分成两半，分别排序后再合并

### 实现

```js
const mergeSort = (list = []) => {
  if (list.length <= 1) {
    return list
  }

  // 分解：将数组分成两半
  const mid = Math.floor(list.length / 2)
  const left = mergeSort(list.slice(0, mid))
  const right = mergeSort(list.slice(mid))

  // 合并：合并已排序的左右两部分
  return merge(left, right)
}

const merge = (left, right) => {
  const result = []
  let i = 0
  let j = 0

  // 合并两个已排序的数组
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i])
      i++
    } else {
      result.push(right[j])
      j++
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j))
}
```
