---
title: 贪心
description: 贪心算法（Greedy Algorithm）是一种算法设计策略，它在每一步选择中都采取当前状态下最优的选择，以期望通过局部最优解达到全局最优解（注意：局部最优解并不总是全局最优解）。贪心算法通常适用于那些具有最优子结构和贪心选择性质的问题。

tags:
  - 算法
injectDocBefore: true
---

## 硬币找零

- 给定 n 种硬币，第 i 种硬币的面值为 coins[i-1]，目标金额为 amount，每种硬币可以重复选取，问能够凑出目标金额的最少硬币数量。

### 实现 1（贪心算法）

```js
const coinChange = (coins, amount) => {
  // 按硬币面额从大到小排序
  coins.sort((a, b) => b - a)
  let count = 0
  for (const coin of coins) {
    // 当目标金额大于等于当前硬币面值时，尽量使用当前硬币
    while (amount >= coin) {
      amount -= coin
      count++
    }
    if (amount === 0) break
  }
  return amount === 0 ? count : -1
}
/**
 * 在本题中，贪心算法并不是最优解，比如
 * coins = [1, 20, 50]
 * amount = 60
 * 用贪心算法会得到 50 + 1 * 10 组合，共计 11 枚硬币
 * 但是最优解应该是 20 * 3 组合，共计 3 枚硬币
 */
```

### 实现 2（动态规划）

```js
const coinChange = (coins, amount) => {
  // 初始化 dp 数组，长度为 amount + 1，初始值为 Infinity
  let dp = Array.from({ length: amount + 1 }).fill(Infinity)
  // 金额为 0 时，所需硬币数为 0
  dp[0] = 0

  // 遍历所有金额，从 1 开始到 amount
  for (let i = 1; i <= amount; i++) {
    // 遍历所有硬币面额
    for (const coin of coins) {
      // 如果当前硬币面额小于等于当前金额
      if (coin <= i) {
        // 更新 dp[i] 的值为当前值与 dp[i - coin] + 1 的较小值
        dp[i] = Math.min(dp[i], dp[i - coin] + 1)
      }
    }
  }

  // 如果 dp[amount] 的值仍为 Infinity，说明没有硬币组合能组成总金额，返回 -1
  // 否则返回 dp[amount]
  return dp[amount] === Infinity ? -1 : dp[amount]
}
```

## 区间调度

- 给定一组区间，选择最大数量的互不重叠的区间。

### 实现

```js
const intervalScheduling = intervals => {
  // 按照结束时间从小到大排序
  intervals.sort((a, b) => a[1] - b[1])
  // 选择的区间数量
  let count = 0
  // 上一个选择的区间结束时间
  let lastEndTime = 0

  for (const interval of intervals) {
    if (interval[0] >= lastEndTime) {
      // 选择当前区间
      count++
      // 更新结束时间
      lastEndTime = interval[1]
    }
  }
  // 返回选择的区间数量
  return count
}
```

## 股票买卖

- 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。设计一个算法来计算你所能获取的最大利润。你可以进行多次买卖，但如果你已经持有股票，那么在卖出之前不能再买。

### 实现

```js
const maxProfit = prices => {
  // 存放利润
  let profit = 0
  for (let i = 1; i < prices.length; i++) {
    // 如有更高的利润就直接卖出
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1]
    }
  }

  return profit
}
```

## 分数背包

- 有 n 个物品和一个容量为 W 的背包，每个物品有重量 w 和价值 v 两种属性，要求选若干物品放入背包（可以选择物品的一部分）使背包中物品的总价值最大且背包中物品的总重量不超过背包的容量。

### 实现

```js
const fractionalKnapsack = (weights, values, capacity) => {
  // 计算物品的数量
  const n = weights.length

  // 总价值
  let totalValue = 0

  // 创建一个数组来存储物品的索引和它们的价值密度
  const items = []
  for (let i = 0; i < n; i++) {
    items.push({ index: i, value: values[i], weight: weights[i], density: values[i] / weights[i] })
  }

  // 按照价值密度从高到低排序
  items.sort((a, b) => b.density - a.density)

  for (let i = 0; i < n; i++) {
    const item = items[i]

    // 如果当前物品的重量小于等于剩余容量，放入背包
    if (item.weight <= capacity) {
      // 减去背包剩余容量
      capacity -= item.weight
      // 增加总价值
      totalValue += item.value
    } else {
      // 如果当前物品的重量大于剩余容量，放入部分物品
      totalValue += item.density * capacity // 只放入可以放下的部分
      // 背包已满，退出循环
      break
    }
  }

  // 返回最大总价值
  return totalValue
}
```

## 哈夫曼编码

- 霍夫曼编码是一种用于无损数据压缩的贪心算法。通过构建霍夫曼树，每次选择出现频率最低的两个节点合并，最后得到的霍夫曼树的带权路径长度（编码长度）最小。

### 实现

```js
class Node {
  constructor(char, freq) {
    this.char = char
    this.freq = freq
    this.left = null
    this.right = null
  }
}

const buildHuffmanTree = charFreq => {
  const nodes = Object.entries(charFreq).map(([char, freq]) => new Node(char, freq))
  while (nodes.length > 1) {
    // 按频率从小到大排序
    nodes.sort((a, b) => a.freq - b.freq)
    // 取出最小频率的节点
    const left = nodes.shift()
    // 取出第二小频率的节点
    const right = nodes.shift()
    // 创建新节点
    const newNode = new Node(null, left.freq + right.freq)
    newNode.left = left
    newNode.right = right
    // 将新节点加入队列
    nodes.push(newNode)
  }
  // 返回根节点
  return nodes[0]
}
```

## 最小生成树

- 给定一个无向图，找到一个最小生成树。

### 实现

```js
const prim = graph => {
  // 记录已访问的节点
  const visited = new Set()
  // 存储边
  const edges = []
  // 最小生成树的总成本
  let totalCost = 0

  // 从第一个节点开始
  visited.add(0)
  for (let i = 0; i < graph.length - 1; i++) {
    let minEdge = null
    // 查找最小边
    for (const u of visited) {
      for (let v = 0; v < graph.length; v++) {
        if (!visited.has(v) && graph[u][v] !== 0) {
          if (minEdge === null || graph[u][v] < minEdge[2]) {
            // 更新最小边
            minEdge = [u, v, graph[u][v]]
          }
        }
      }
    }
    if (minEdge) {
      // 添加新节点
      visited.add(minEdge[1])
      // 更新总成本
      totalCost += minEdge[2]
      // 存储边
      edges.push(minEdge)
    }
  }
  // 返回生成树的边和总成本
  return { edges, totalCost }
}
```
