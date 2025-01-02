---
title: 块级格式化上下文
description: BFC（Block Formatting Context，块级格式化上下文）是CSS 中的一个重要概念，它决定了元素如何布局以及如何与其他元素进行交互。BFC 是一个独立的渲染区域，内部的元素布局不会影响到外部元素，同时外部元素也不会影响到内部的布局。
tags:
  - CSS
injectDocBefore: true
---

## BFC 的特性

### 1. 内部元素垂直排列

BFC 内部的块级元素会按照垂直方向一个接一个地排列。

### 2. 外边距不折叠

BFC 内部的元素不会与外部元素的外边距发生折叠。

### 3. 包含浮动元素

BFC 可以包含浮动元素，避免父元素高度塌陷的问题。

### 4. 阻止元素被浮动元素覆盖

BFC 区域不会与浮动元素重叠，可以用来实现两栏布局等效果。

### 5. 独立渲染区域

BFC 内部的布局不会影响到外部元素，外部的布局也不会影响到内部。

## 如何创建 BFC

### 1. 根元素 (html)

根元素本身就是一个 BFC。

### 2. 浮动元素

设置 float 为 left 或 right。

### 3. 绝对定位元素

设置 position 为 absolute 或 fixed。

### 4. display 属性

设置 display 为以下值之一：

- inline-block
- table-cell
- table-caption
- flex
- inline-flex
- grid
- inline-grid
- flow-root

### 5. overflow 属性

设置 overflow 为 hidden、auto 或 scroll（只要不是 visible）。

### 6. contain 属性

设置 contain 为 layout、content 或 strict。

## BFC 的应用场景

### 1. 清除浮动

当父元素包含浮动子元素时，父元素的高度会塌陷。通过将父元素设置为 BFC，可以使其包含浮动元素，从而解决高度塌陷问题。

### 2. 防止外边距折叠

BFC 内部的元素不会与外部元素的外边距发生折叠。

### 3. 防止文字环绕

当元素浮动时，文字会环绕浮动元素。通过将文字容器设置为 BFC，可以防止文字环绕。

### 4. 解决浮动元素覆盖问题

当浮动元素与非浮动元素相邻时，浮动元素可能会覆盖非浮动元素。通过将非浮动元素设置为 BFC，可以避免被覆盖。
