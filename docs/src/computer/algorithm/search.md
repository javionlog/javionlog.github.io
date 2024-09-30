---
title: 搜索
description: 搜索算法是用于在数据结构中查找特定元素或信息的算法。它们通过特定的策略和步骤来定位目标数据，常见的数据结构包括数组、链表、树和图等。搜索算法可以根据数据的组织方式和需求的不同分为多种类型，主要包括： 线性搜索、二分搜索、跳跃搜索、插值搜索、指数搜索、斐波那契搜索、深度优先搜索、广度优先搜索
tags:
  - 算法
injectDocBefore: true
---

## 线性搜索

- 原理：从数组的第一个元素开始，逐个比较每个元素与目标值，直到找到目标值或遍历完整个数组。
- 时间复杂度：
  - 最优 $O(1)$（目标值为第一个元素）
  - 平均 $O(n)$
  - 最坏 $O(n)$（目标值不在数组中）
- 空间复杂度：$O(1)$
- 优点：实现简单，适用于未排序数组
- 缺点：效率低，不适用大规模数据

### 实现

```js
const linearSearch = (list = [], target) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === target) {
      return i // 返回目标值的索引
    }
  }
  return -1 // 未找到目标值
}
```

## 二分搜索

- 原理：在已排序的数组中，通过不断将搜索范围减半，快速定位目标值。
- 时间复杂度：
  - 最优 $O(1)$（目标值为中间元素）
  - 平均 $O(\log n)$
  - 最坏 $O(\log n)$
- 空间复杂度：$O(1)$
- 优点：效率高，适用于大规模已排序数据
- 缺点：仅适用于已排序数组

### 实现

```js
const binarySearch = (list = [], target) => {
  let left = 0
  let right = list.length - 1
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (list[mid] === target) {
      return mid // 返回目标值的索引
    } else if (list[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return -1 // 未找到目标值
}
```

## 跳跃搜索

- 原理：在已排序数组中，先跳跃固定步长查找可能的区间，然后在该区间内进行线性搜索。
- 时间复杂度：
  - 最优 $O(\sqrt{n})$
  - 平均 $O(\sqrt{n})$
  - 最坏 $O(n)$
- 空间复杂度：$O(1)$
- 优点：比线性搜索快，适用于大规模已排序数据
- 缺点：仅适用于已排序数组，效率受步长的影响，选择不当的步长可能导致效率降低

### 实现

```js
const jumpSearch = (list = [], target) => {
  const len = list.length
  const jump = Math.floor(Math.sqrt(len))
  let prev = 0

  while (list[Math.min(jump, len) - 1] < target) {
    prev = jump
    jump += Math.floor(Math.sqrt(len))
    if (prev >= len) return -1
  }

  for (let i = prev; i < Math.min(jump, len); i++) {
    if (list[i] === target) {
      return i // 返回目标值的索引
    }
  }
  return -1 // 未找到目标值
}
```

## 插值搜索

- 原理：在已排序数组中，根据目标值与数组中最小值和最大值的关系，动态调整搜索位置。
- 时间复杂度：
  - 最优 $O(1)$（目标值为中间元素）
  - 平均 $O(\log \log n)$
  - 最坏 $O(n)$（数组元素分布不均匀）
- 空间复杂度：$O(1)$
- 优点：如果是均匀分布的已排序数据，效率高
- 缺点：仅适用于已排序数组，数据分布不均匀效率低

### 实现

```js
const interpolationSearch = (list = [], target) => {
  let low = 0
  let high = list.length - 1
  while (low <= high && target >= list[low] && target <= list[high]) {
    // 计算插值位置
    const pos = low + Math.floor(((high - low) / (list[high] - list[low])) * (target - list[low]))
    if (list[pos] === target) {
      return pos // 返回目标值的索引
    }
    if (list[pos] < target) {
      low = pos + 1
    } else {
      high = pos - 1
    }
  }
  return -1 // 未找到目标值
}
```

## 指数搜索

- 原理：先找到目标值可能存在的区间，然后在该区间内使用二分搜索。
- 时间复杂度：
  - 最优 $O(1)$
  - 平均 $O(\log n)$
  - 最坏 $O(\log n)$
- 空间复杂度：$O(1)$
- 优点：适用于大规模已排序数据
- 缺点：仅适用于已排序数组

### 实现

```js
const exponentialSearch = (list = [], target) => {
  if (list[0] === target) {
    return 0
  }
  let i = 1
  while (i < list.length && list[i] <= target) {
    i *= 2
  }
  return binarySearch(list.slice(Math.floor(i / 2), Math.min(i, list.length)), target)
}
```

## 斐波那契搜索

- 原理：使用斐波那契数列确定分割点，在已排序数组中进行搜索。
- 时间复杂度：
  - 最优 $O(1)$
  - 平均 $O(\log n)$
  - 最坏 $O(\log n)$
- 空间复杂度：$O(1)$
- 优点：适用于大规模已排序数据，避免了二分搜索的中间值计算
- 缺点：仅适用于已排序数组，实现相对复杂

### 实现

```js
const fibonacciSearch = (list = [], target) => {
  let fibM2 = 0
  let fibM1 = 1
  let fibM = fibM2 + fibM1
  const len = list.length

  while (fibM < len) {
    fibM2 = fibM1
    fibM1 = fibM
    fibM = fibM2 + fibM1
  }

  let offset = -1
  while (fibM > 1) {
    const i = Math.min(offset + fibM2, len - 1)
    if (list[i] < target) {
      fibM = fibM1
      fibM1 = fibM2
      fibM2 = fibM - fibM1
      offset = i
    } else if (list[i] > target) {
      fibM = fibM2
      fibM1 -= fibM2
      fibM2 = fibM - fibM1
    } else {
      return i // 返回目标值的索引
    }
  }
  if (fibM1 && list[offset + 1] === target) {
    return offset + 1 // 返回目标值的索引
  }
  return -1 // 未找到目标值
}
```

## 深度优先搜索

- 原理：从一个节点开始，尽可能深入每个分支，直到达到目标节点或没有更多节点可访问。
- 时间复杂度：$O(V + E)$（V为节点数，E为边数）
- 空间复杂度：$O(V)$
- 优点：能够找到所有可能的路径，常用于解决迷宫、拼图等问题
- 缺点：不保证找到最短路径，在有环的图中可能会陷入死循环

### 实现

```js
const depthFirstSearch = (graph, target) => {
  const stack = [] // 使用栈来存储待访问的节点
  const visited = new Set() // 用于记录已访问的节点

  // 从图的任意一个起始节点开始，这里假设从第一个节点开始
  const startNode = Object.keys(graph)[0]
  stack.push({ node: startNode, path: [startNode] }) // 将起始节点和路径压入栈中

  while (stack.length > 0) {
    const { node, path: currentPath } = stack.pop() // 从栈中弹出一个节点和当前路径
    if (!visited.has(node)) {
      visited.add(node) // 标记节点为已访问
      if (node === target) {
        return currentPath // 找到目标节点，返回路径
      }

      // 将邻居节点反向添加到栈中，以保持正确的遍历顺序
      for (const neighbor of graph[node].reverse()) {
        stack.push({ node: neighbor, path: [...currentPath, neighbor] }) // 更新路径
      }
    }
  }
  return null // 如果未找到目标节点，返回 null
}

const graph = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [],
  E: ['F'],
  F: []
}

depthFirstSearch(graph, 'D') // ['A', 'B', 'D']
```

## 广度优先搜索

- 原理：从一个节点开始，先访问所有相邻节点，然后逐层向外扩展，直到找到目标节点。
- 时间复杂度：$O(V + E)$（V为节点数，E为边数）
- 空间复杂度：$O(V)$
- 优点：能够找到最短路径
- 缺点：内存消耗高，不适用有权图

### 实现

```js
const breadthFirstSearch = (graph, target) => {
  const queue = [] // 使用队列来存储待访问的节点
  const visited = new Set() // 用于记录已访问的节点
  const pathMap = {} // 用于记录路径

  // 从图的任意一个起始节点开始，这里假设从第一个节点开始
  const startNode = Object.keys(graph)[0]
  queue.push(startNode) // 将起始节点加入队列
  visited.add(startNode) // 标记起始节点为已访问
  pathMap[startNode] = null // 起始节点的路径前驱为 null

  while (queue.length > 0) {
    const node = queue.shift() // 从队列中取出一个节点

    if (node === target) {
      // 找到目标节点，构建路径
      const path = []
      let currentNode = node
      while (currentNode !== null) {
        path.unshift(currentNode) // 将节点添加到路径的前面
        currentNode = pathMap[currentNode] // 追踪路径
      }
      return path // 返回路径
    }

    // 遍历邻居节点
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor) // 标记邻居节点为已访问
        queue.push(neighbor) // 将邻居节点加入队列
        pathMap[neighbor] = node // 记录路径
      }
    }
  }
  return null // 如果未找到目标节点，返回 null
}

const graph = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [],
  E: ['F'],
  F: []
}

breadthFirstSearch(graph, 'D') // ['A', 'B', 'D']
```
