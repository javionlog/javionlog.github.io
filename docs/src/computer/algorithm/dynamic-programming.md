---
title: 动态规划
description: 动态规划（Dynamic Programming，DP）是一种优化算法，用于解决具有重叠子问题和最优子结构性质的问题。它通过将大问题分解为小问题，并保存小问题的解，以避免重复计算，从而提高效率。动态规划通常用于求解最优化问题，如最短路径、背包问题等。

tags:
  - 算法
injectDocBefore: true
---

## 斐波那契数列

- 斐波那契数列（Fibonacci sequence），又称黄金分割数列，因数学家莱昂纳多·斐波那契（Leonardo Fibonacci）以兔子繁殖为例子而引入，故又称“兔子数列”，其数值为：1、1、2、3、5、8、13、21、34...
- 在数学上，这一数列以如下递推的方法定义：F(0)=0，F(1)=1, F(n)=F(n - 1)+F(n - 2)（n ≥ 2，n ∈ N）

### 实现

```js
const fibonacci = n => {
  // 初始化动态规划数组，dp[i] 表示斐波那契数列的第 i 项
  const dp = [0, 1]

  // 从第 2 项开始计算，直到第 n 项
  for (let i = 2; i <= n; i++) {
    // 当前项等于前两项之和
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  // 返回第n项的值
  return dp[n]
}
```

## 最长公共子序列长度

- 给定两个字符串 text1 和 text2，返回这两个字符串的最长公共子序列的长度。如果不存在公共子序列，返回 0 。

- 一个字符串的子序列是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

- 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。两个字符串的公共子序列是这两个字符串所共同拥有的子序列。

### 实现

```js
const longestCommonSubsequence = (text1, text2) => {
  const m = text1.length
  const n = text2.length
  // 初始化动态规划二维数组，dp[i][j] 表示 text1 前 i 个字符和 text2 前 j 个字符的最长公共子序列长度
  const dp = Array.from({ length: m + 1 }, () => Array.from({ length: n + 1 }).fill(0))

  // 遍历两个字符串
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // 如果当前字符相等，则最长公共子序列长度加1
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        // 否则，取前一个状态的最大值
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }
  // 返回最长公共子序列的长度
  return dp[m][n]
}
```

## 最长递增子序列

- 给定一个整数数组 nums ，找到其中最长严格递增子序列的长度。

- 子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3, 6, 2, 7] 是数组 [0, 3, 1, 6, 2, 2, 7] 的子序列。

### 实现

```js
const longestIncreasingSubsequence = nums => {
  if (nums.length === 0) {
    return 0
  }

  // dp 数组用来保存当前找到的递增子序列的末尾元素
  const dp = []

  for (const num of nums) {
    let left = 0
    let right = dp.length

    // 使用二分查找找到当前数字在 dp 数组中的位置
    while (left < right) {
      const mid = Math.floor((left + right) / 2)
      if (dp[mid] < num) {
        left = mid + 1
      } else {
        right = mid
      }
    }

    // 如果 left 等于 dp 的长度，说明当前数字大于所有 dp 中的元素，添加到 dp 中
    if (left === dp.length) {
      dp.push(num)
    } else {
      // 否则，更新 dp 中找到的位置
      dp[left] = num
    }
  }

  // dp 的长度即为最长递增子序列的长度
  return dp.length
}
```

## 爬楼梯

- 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次可以爬 1 或 2 个台阶。有多少种不同的方法可以爬到楼顶？

### 实现 1（动态规划）

```js
const climbStairs = n => {
  // 如果只有一阶台阶，只有一种方式
  if (n === 1) {
    return 1
  }

  // 如果有两阶台阶，有两种方式
  if (n === 2) {
    return 2
  }

  // 创建一个数组来存储每一级台阶的方式数量
  const dp = Array.from({ length: n + 1 })
  // 到达第 1 阶的方式
  dp[1] = 1
  // 到达第 2 阶的方式
  dp[2] = 2

  // 从第 3 阶开始计算到达每一阶的方式
  for (let i = 3; i <= n; i++) {
    // 根据递推关系计算方式
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  // 返回到达第 n 阶的方式
  return dp[n]
}
```

### 实现 2（迭代）

```js
const climbStairs = n => {
  // 如果只有一阶台阶，只有一种方式
  if (n === 1) {
    return 1
  }

  // 到达第 1 阶的方式
  let first = 1
  // 到达第 2 阶的方式
  let second = 2

  // 从第 3 阶开始计算到达每一阶的方式
  for (let i = 3; i <= n; i++) {
    // 当前阶的方式是前两阶方式的和
    const current = first + second
    // 更新 first 为第二阶的方式
    first = second
    // 更新 second 为当前的方式
    second = current
  }

  // 返回到达第 n 阶的方式
  return second
}
```

## 0-1背包问题

- 有 n 个物品和一个容量为 W 的背包，每个物品有重量 w 和价值 v 两种属性，要求选若干物品放入背包使背包中物品的总价值最大且背包中物品的总重量不超过背包的容量。

### 实现 1（二维数组）

```js
const knapsack = (weights, values, capacity) => {
  const n = weights.length
  // 初始化动态规划二维数组，dp[i][w] 表示前 i 个物品在容量为 w 时的最大价值
  const dp = Array.from({ length: n + 1 }, () => Array.from({ length: capacity + 1 }).fill(0))

  // 遍历物品和容量
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      // 如果当前物品重量小于等于背包容量，则考虑放入当前物品
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1])
      } else {
        // 否则，不放入当前物品
        dp[i][w] = dp[i - 1][w]
      }
    }
  }

  // 返回背包能装的最大价值
  return dp[n][capacity]
}
```

### 实现 2（一维数组）

```js
const knapsack = (weights, values, capacity) => {
  const n = weights.length
  // 初始化 dp 数组
  const dp = Array.from({ length: capacity + 1 }).fill(0)

  // 遍历每个物品
  for (let i = 0; i < n; i++) {
    // 从后往前遍历背包容量
    for (let j = capacity; j >= weights[i]; j--) {
      // 选和不选物品 i 这两种方案的较大值
      dp[j] = Math.max(dp[j], dp[j - weights[i]] + values[i])
    }
  }

  // 返回最大价值
  return dp[capacity]
}
```

## 完全背包

- 有 n 个物品和一个容量为 W 的背包，每个物品有重量 w 和价值 v 两种属性，要求选若干物品放入背包（可以重复选择物品）使背包中物品的总价值最大且背包中物品的总重量不超过背包的容量。

### 实现 1（二维数组）

```js
function knapsackComplete(weights, values, capacity) {
  const n = weights.length
  // 初始化动态规划二维数组，dp[i][w] 表示前 i 个物品在容量为 w 时的最大价值
  const dp = Array.from({ length: n + 1 }, () => Array.from({ length: capacity + 1 }).fill(0))

  // 遍历物品和容量
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        // 如果当前物品重量小于等于背包容量，则考虑放入当前物品
        dp[i][w] = Math.max(dp[i - 1][w], dp[i][w - weights[i - 1]] + values[i - 1])
      } else {
        // 否则，不放入当前物品
        dp[i][w] = dp[i - 1][w]
      }
    }
  }
  return dp[n][capacity]
}
```

### 实现 2（一维数组）

```js
function knapsackComplete(weights, values, capacity) {
  const n = weights.length
  // 初始化 dp 数组
  const dp = Array.from({ length: capacity + 1 }).fill(0)

  // 遍历每个物品
  for (let i = 1; i <= n; i++) {
    // 从后往前遍历背包容量
    for (let j = capacity; j >= 1; j--) {
      if (weights[i - 1] <= j) {
        // 选和不选物品 i 这两种方案的较大值
        dp[j] = Math.max(dp[j], dp[j - weights[i - 1]] + values[i - 1])
      }
    }
  }
  return dp[capacity]
}
```
