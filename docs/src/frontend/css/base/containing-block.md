---
title: 包含块
description: 元素的尺寸及位置，常常会受它的包含块所影响。对于一些属性，例如 width, height, padding, margin，绝对定位元素的偏移值（比如 position 被设置为 absolute 或 fixed），当我们对其赋予百分比值时，这些值的计算值，就是通过元素的包含块计算得来。
tags:
  - CSS
injectDocBefore: true
---

## 包含块类型

### 根元素 (HTML 元素)

根元素（HTML 元素）所在的包含块，被称之为初始包含块（Initial Containing Block），大小等于视口（viewport）的大小，基点在视口的左上角。

### 非根元素

对于非根元素的包含块判定有几种情况，大致可以分为如下几种：

1. 如果元素的 positiion 是 relative 或 static ，那么包含块由离它最近的块容器的内容区域的边缘建立。

2. 如果元素使用了 absolute 定位，则包含块由它的最近的 position 的值不是 static （也就是值为fixed、absolute、relative 或 sticky）的祖先元素的内边距区的边缘组成。

3. 如果 position 属性是 fixed，那么包含块由视口建立。

---

#### 如果 position 属性是 absolute 或 fixed，包含块也可能是由满足以下条件的最近父级元素的内边距区的边缘组成的：

- transform 或 perspective 的值不是 none
- will-change 的值是 transform 或 perspective
- filter 的值不是 none 或 will-change 的值是 filter（只在 Firefox 下生效）
- contain 的值是 layout、paint、strict 或 content（例如：contain: paint;）
- backdrop-filter 的值不是 none（例如：backdrop-filter: blur(10px);）

### 示例

```html
<html>
  <head>
    <title>Illustration of containing blocks</title>
    <style>
      #div1 {
        position: absolute;
        left: 50px;
        top: 50px;
      }
      #em1 {
        position: absolute;
        left: 100px;
        top: 100px;
      }
    </style>
  </head>
  <body id="body">
    <div id="div1">
      <p id="p1">This is text in the first paragraph...</p>
      <p id="p2">
        This is text
        <em id="em1">
          in the
          <strong id="strong1">second</strong>
          paragraph.
        </em>
      </p>
    </div>
  </body>
</html>
```

### 结果

| 元素    | 包含块                                                           |
| ------- | ---------------------------------------------------------------- |
| html    | initial C.B. (UA-dependent)                                      |
| body    | html                                                             |
| div1    | initial C.B. (UA-dependent)                                      |
| p1      | div1                                                             |
| p2      | div1                                                             |
| em1     | div1（因为定位了，参阅非根元素包含块确定规则的第三条）           |
| strong1 | em1（因为 em1 变为了块容器，参阅非根元素包含块确定规则的第一条） |
