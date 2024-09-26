---
title: 树
description: 树是一种层次结构的数据结构，由有限个节点组成。把它叫做“树”是因为它看起来像一棵倒挂的树，也就是说它是根朝上，而叶朝下的。
tags:
  - 数据结构
injectDocBefore: true
---

## 分类

### 无序树

树中任意节点的子节点没有特定的顺序，子节点的排列顺序不影响树的结构和性质。如 N 叉树就是无序树

### 有序树

树中任意节点的子节点有特定的顺序，这意味着每个节点的子节点可以被视为一个有序列表。如二叉树就是有序树

### 二叉树

每个节点最多含有 2 个子节点的树

### 完全二叉树

除最后一层外，每个节点都含有 2 个子节点，且所有叶子节点左对齐，中间不能有空缺的树

### 满二叉树（又称完美二叉树）

除叶子节点外，每个节点都含有 2 个子节点的树

## 实现

### 满二叉树

```js
class Node {
  constructor(data) {
    this.data = data
    this.left = null
    this.right = null
  }
}

const nA = new Node('A')
const nB = new Node('B')
const nC = new Node('C')
const nD = new Node('D')
const nE = new Node('E')
const nF = new Node('F')
const nG = new Node('G')

nA.left = nB
nA.right = nC
nB.left = nD
nB.right = nE
nC.left = nF
nC.right = nG
```

```mermaid
flowchart TD
  A[A] --> B[B]
  A --> C[C]
  B --> D[D]
  B --> E[E]
  C --> F[F]
  C --> G[G]
```

## 遍历

### 深度优先遍历

- 先序遍历（又称先根遍历），顺序为 ABDECFG (根->左->右)

```mermaid
flowchart TD
  A[A<br/>①] --> B[B<br/>②]
  A --> C[C<br/>⑤]
  B --> D[D<br/>③]
  B --> E[E<br/>④]
  C --> F[F<br/>⑥]
  C --> G[G<br/>⑦]
```

- 中序遍历（又称中根遍历），顺序为 DBEAFCG（左-根-右）

```mermaid
flowchart TD
  A[A<br/>④] --> B[B<br/>②]
  A --> C[C<br/>⑥]
  B --> D[D<br/>①]
  B --> E[E<br/>③]
  C --> F[F<br/>⑤]
  C --> G[G<br/>⑦]
```

- 后序遍历（又称后根遍历），顺序为 DEBFGCA（左-右-根）

```mermaid
flowchart TD
  A[A<br/>⑦] --> B[B<br/>③]
  A --> C[C<br/>⑥]
  B --> D[D<br/>①]
  B --> E[E<br/>②]
  C --> F[F<br/>④]
  C --> G[G<br/>⑤]
```

### 广度优先遍历

- 层序遍历，顺序为 ABCDEFG

```mermaid
flowchart TD
  A[A<br/>①] --> B[B<br/>②]
  A --> C[C<br/>③]
  B --> D[D<br/>④]
  B --> E[E<br/>⑤]
  C --> F[F<br/>⑥]
  C --> G[G<br/>⑦]
```
