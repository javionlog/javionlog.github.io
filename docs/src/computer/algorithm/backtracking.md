---
title: 回溯
description: 回溯算法（Backtracking）是一种算法设计策略，用于解决组合问题、排列问题和其他具有选择性质的问题。它通过构建一个解的候选集，并在发现当前候选解不满足条件时，及时回退到上一个状态，继续寻找其他可能的解。回溯算法通常用于解决问题的所有可能解并寻找最优解。

tags:
  - 算法
injectDocBefore: true
---

## 全排列

- 给定一个整数数组，其中不包含重复元素，返回所有可能的排列。

### 实现

```js
const permute = nums => {
  // 存储所有排列结果
  const results = []

  const backtrack = path => {
    // 如果路径的长度等于输入数组的长度，说明找到一个排列
    if (path.length === nums.length) {
      // 将当前路径复制到结果中
      results.push([...path])
      return
    }

    for (let i = 0; i < nums.length; i++) {
      // 如果当前元素已经在路径中，跳过
      if (path.includes(nums[i])) {
        continue
      }
      // 将当前元素加入路径
      path.push(nums[i])
      // 递归调用
      backtrack(path)
      // 回溯，移除最后一个元素
      path.pop()
    }
  }

  // 从空路径开始
  backtrack([])

  // 返回所有排列
  return results
}
```

## 子集

- 给定一个整数数组，其中不包含重复元素，返回所有可能的子集。

### 实现

```js
const subsets = nums => {
  // 存储所有子集
  const results = []

  const backtrack = (start, path) => {
    // 将当前路径复制到结果中
    results.push([...path])

    for (let i = start; i < nums.length; i++) {
      // 将当前数字加入路径
      path.push(nums[i])
      // 递归调用，开始下一个数字
      backtrack(i + 1, path)
      // 回溯，移除最后一个数字
      path.pop()
    }
  }

  // 从索引 0 开始
  backtrack(0, [])

  // 返回所有子集
  return results
}
```

## 子集和

- 给定一个正整数数组 nums 和一个目标正整数 target ，请找出所有可能的组合，使得组合中的元素和等于 target 。给定数组无重复元素，每个元素可以被选取多次。请以列表形式返回这些组合，列表中不应包含重复组合。

### 实现

```js
const combinationSum = (nums, target) => {
  // 存储所有组合结果
  const results = []

  const backtrack = (currentCombination, currentSum, start) => {
    // 如果当前和等于目标值，保存当前组合
    if (currentSum === target) {
      // 将当前组合复制到结果中
      results.push([...currentCombination])
      return
    }

    // 如果当前和超过目标值，结束当前路径
    if (currentSum > target) {
      return
    }

    // 遍历数组中的每个元素
    for (let i = start; i < nums.length; i++) {
      // 选择当前元素
      currentCombination.push(nums[i])
      // 递归调用，允许选择同一元素
      backtrack(currentCombination, currentSum + nums[i], i)
      // 回溯，移除最后一个元素
      currentCombination.pop()
    }
  }

  // 从空组合、当前和为 0 和索引 0 开始
  backtrack([], 0, 0)

  // 返回所有组合
  return results
}
```

## N皇后

- 根据国际象棋的规则，皇后可以攻击与同处一行、一列或一条对角线上的棋子。给定 n 个皇后和一个 n x n 大小的棋盘，寻找使得所有皇后之间无法相互攻击的摆放方案。

### 实现

```js
const solveNQueens = n => {
  // 存储所有解
  const results = []
  // 初始化棋盘
  const board = Array.from({ length: n }, () => Array.from({ length: n }).fill('.'))

  const isSafe = (row, col) => {
    // 检查列和两个对角线是否安全
    for (let i = 0; i < row; i++) {
      // 检查列
      if (board[i][col] === 'Q') {
        return false
      }
      // 检查左对角线
      if (col - (row - i) >= 0 && board[i][col - (row - i)] === 'Q') {
        return false
      }
      // 检查右对角线
      if (col + (row - i) < n && board[i][col + (row - i)] === 'Q') {
        return false
      }
    }
    // 安全
    return true
  }

  const backtrack = row => {
    // 如果所有皇后都放置成功，保存解
    if (row === n) {
      results.push(board.map(r => r.join('')))
      return
    }

    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        // 放置皇后
        board[row][col] = 'Q'
        // 递归放置下一个皇后
        backtrack(row + 1)
        // 回溯，移除皇后
        board[row][col] = '.'
      }
    }
  }

  // 从第一行开始
  backtrack(0)

  // 返回所有解
  return results
}
```

## 迷宫

- 给定一个迷宫，找到从起点到终点的路径。

### 实现

```js
const solveMaze = maze => {
  // 存储所有路径
  const results = []
  const rows = maze.length
  const cols = maze[0].length

  const backtrack = (x, y, path) => {
    // 如果到达终点，保存路径
    if (x === rows - 1 && y === cols - 1) {
      results.push([...path])
      return
    }

    // 定义四个方向
    const directions = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1]
    ]
    for (const [dx, dy] of directions) {
      const newX = x + dx
      const newY = y + dy
      // 判断新位置是否在迷宫内且未走过
      if (newX >= 0 && newX < rows && newY >= 0 && newY < cols && maze[newX][newY] === 0) {
        // 标记为已走过
        maze[newX][newY] = 1
        // 加入路径
        path.push([newX, newY])
        // 递归调用
        backtrack(newX, newY, path)
        // 回溯，移除最后一个位置
        path.pop()
        // 恢复为未走过
        maze[newX][newY] = 0
      }
    }
  }

  // 标记起点为已走过
  maze[0][0] = 1

  // 从起点开始
  backtrack(0, 0, [[0, 0]])

  // 返回所有路径
  return results
}

// 迷宫矩阵（0 表示可走，1 表示障碍）
const maze = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0]
]

console.log(solveMaze(maze))
```
