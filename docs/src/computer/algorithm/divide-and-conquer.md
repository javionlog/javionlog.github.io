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

## 汉诺塔

- 给定三根柱子，记为 A、B 和 C 。起始状态下，柱子 A 上套着 n 个圆盘，它们从上到下按照从小到大的顺序排列。请把这 n 个圆盘移到柱子 C 上，并保持它们的原有顺序不变。在移动圆盘的过程中，需要遵守以下规则。

1. 圆盘只能从一根柱子顶部拿出，从另一根柱子顶部放入。
2. 每次只能移动一个圆盘。
3. 小圆盘必须时刻位于大圆盘之上。

### 实现

```js
const hanoi = (n, source, target, auxiliary, result = []) => {
  // 如果只有一个盘子，直接从源柱子移动到目标柱子
  if (n === 1) {
    result.push({ index: 1, from: source, to: target })
    return
  }

  // 将前 n - 1 个盘子从源柱子移动到辅助柱子
  hanoi(n - 1, source, auxiliary, target, result)

  // 将第 n 个盘子从源柱子移动到目标柱子
  result.push({ index: n, from: source, to: target })

  // 将 n-1 个盘子从辅助柱子移动到目标柱子
  hanoi(n - 1, auxiliary, target, source, result)
  return result
}

// 盘子的数量
const numDisks = 3

// 从 A 移动到 C，使用 B 作为辅助
console.log(hanoi(numDisks, 'A', 'C', 'B'))
```
