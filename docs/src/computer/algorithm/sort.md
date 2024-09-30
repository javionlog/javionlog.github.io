---
title: 排序
description: 排序算法是计算机科学中的一种基础算法，用于将一组数据按照特定顺序（通常是升序或降序）进行排列。常见的排序算法有：冒泡排序、选择排序、插入排序、归并排序、快速排序、堆排序等
tags:
  - 算法
injectDocBefore: true
---

## 冒泡排序

- 原理：通过重复遍历数组，比较相邻元素并交换它们的位置，直到没有需要交换的元素为止
- 时间复杂度：
  - 最优 $O(n)$
  - 平均 $O(n^2)$
  - 最坏 $O(n^2)$
- 空间复杂度：$O(1)$（原地排序）
- 优点：实现简单，易于理解，不需要额外的存储空间
- 缺点：时间复杂度高，对于大规模数据效率很低

### 实现

```js
const bubbleSort = (list = []) => {
  const len = list.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i; j++) {
      if (list[j] > list[j + 1]) {
        ;[list[j], list[j + 1]] = [list[j + 1], list[j]] // 交换元素
      }
    }
  }
  return list
}
```

## 选择排序

- 原理：每次从未排序的部分中选择最小（或最大）元素，放到已排序部分的末尾
- 时间复杂度：
  - 最优 $O(n^2)$
  - 平均 $O(n^2)$
  - 最坏 $O(n^2)$
- 空间复杂度：$O(1)$（原地排序）
- 优点：实现简单，易于理解，不需要额外的存储空间
- 缺点：时间复杂度高，对于大规模数据效率很低

### 实现

```js
const selectionSort = (list = []) => {
  const len = list.length
  for (let i = 0; i < len; i++) {
    let minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (list[j] < list[minIndex]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      ;[list[i], list[minIndex]] = [list[minIndex], list[i]] // 交换元素
    }
  }
  return list
}
```

## 插入排序

- 原理：将待排序数组分为已排序和未排序两部分，逐步将未排序部分的元素插入到已排序部分中
- 时间复杂度：
  - 最优 $O(n)$（当数组几乎有序时）
  - 平均 $O(n^2)$
  - 最坏 $O(n^2)$
- 空间复杂度：$O(1)$（原地排序）
- 优点：实现简单，易于理解，不需要额外的存储空间
- 缺点：时间复杂度高，对于大规模数据效率很低

### 实现

```js
const insertionSort = (list = []) => {
  const len = list.length
  for (let i = 1; i < len; i++) {
    const key = list[i]
    let j = i - 1
    while (j >= 0 && list[j] > key) {
      list[j + 1] = list[j] // 将元素向右移动
      j--
    }
    list[j + 1] = key // 在正确的位置插入
  }
  return list
}
```

## 归并排序

- 原理：采用分治法，将数组分成两半，分别排序后再合并
- 时间复杂度：
  - 最优 $O(n \log n)$
  - 平均 $O(n \log n)$
  - 最坏 $O(n \log n)$
- 空间复杂度：$O(n)$（需要额外的空间）
- 优点：时间复杂度稳定，适合大规模数据和链表排序
- 缺点：需要额外的存储空间

### 实现

```js
const mergeSort = (list = []) => {
  if (list.length <= 1) {
    return list
  }

  const mid = Math.floor(list.length / 2)
  const left = mergeSort(list.slice(0, mid))
  const right = mergeSort(list.slice(mid))

  return merge(left, right)
}

const merge = (left, right) => {
  const result = []
  let i = 0
  let j = 0

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

## 快速排序

- 原理：通过选择一个“基准”元素，将数组分为小于和大于基准的两部分，递归地对这两部分进行排序
- 时间复杂度：
  - 最优 $O(n \log n)$
  - 平均 $O(n \log n)$
  - 最坏 $O(n^2)$（可以通过优化基准选择来减轻）
- 空间复杂度：$O(\log n)$（由于递归）
- 优点：在大多数情况下效率高，适合大规模数据集
- 缺点：最坏情况性能差

### 实现

```js
const quickSort = (list = []) => {
  if (list.length <= 1) {
    return list
  }

  const pivot = list[list.length - 1] // 选择最后一个元素作为基准
  const left = []
  const right = []

  for (let i = 0; i < list.length - 1; i++) {
    if (list[i] < pivot) {
      left.push(list[i])
    } else {
      right.push(list[i])
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)]
}
```

## 堆排序

- 原理：堆排序利用堆这种数据结构的特性，将待排序的数组构建成一个最大堆（或最小堆），然后逐步将堆顶元素（最大或最小）移到数组的末尾，最终得到有序数组
- 时间复杂度：
  - 最优 $(O(n \log n))$
  - 平均 $(O(n \log n))$
  - 最坏 $(O(n \log n))$
- 空间复杂度：$(O(1))$（原地排序）
- 优点：时间复杂度稳定，适用于大规模数据，且不需要额外的存储空间
- 缺点：实现相对复杂

### 实现

```js
const heapSort = (list = []) => {
  const len = list.length

  // 构建最大堆
  const buildMaxHeap = (arr, length, root) => {
    let largest = root
    const left = 2 * root + 1
    const right = 2 * root + 2

    if (left < length && arr[left] > arr[largest]) {
      largest = left
    }

    if (right < length && arr[right] > arr[largest]) {
      largest = right
    }

    if (largest !== root) {
      ;[arr[root], arr[largest]] = [arr[largest], arr[root]] // 交换
      buildMaxHeap(arr, length, largest)
    }
  }

  // 主函数
  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
    buildMaxHeap(list, len, i)
  }

  for (let i = len - 1; i > 0; i--) {
    ;[list[0], list[i]] = [list[i], list[0]] // 交换堆顶和当前最后元素
    buildMaxHeap(list, i, 0)
  }

  return list
}
```
