---
title: HTTP 缓存
description: HTTP 缓存是一种存储和重用之前获取的资源的机制，用于减少网络请求、降低延迟、节省带宽，提升网页加载速度。
tags:
  - 网络
injectDocBefore: true
---

## 缓存流程

```
┌─────────────────────────────────────────────────────────┐
│                    浏览器发起请求                          │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
            ┌─────────────────┐
            │ 检查强制缓存        │
            │ (Cache-Control)  │
            └────────┬─────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
    缓存有效                  缓存过期
         │                       │
         ▼                       ▼
    ┌─────────┐         ┌──────────────┐
    │ 200 OK  │         │ 发送请求到服务器 │
    │(from    │         │ 携带验证信息    │
    │ cache)  │         └────────┬───────┘
    └─────────┘                  │
                                 │
                    ┌────────────┴────────────┐
                    │                         │
              ETag/Last-Modified          无验证信息
                    │                         │
                    ▼                         ▼
            ┌──────────────┐           ┌──────────┐
            │ 服务器验证     │           │ 200 OK   │
            └──────┬───────┘           │ 返回新资源 │
                   │                   └──────────┘
        ┌──────────┴──────────┐
        │                     │
    资源未修改            资源已修改
        │                     │
        ▼                     ▼
   ┌─────────┐          ┌──────────┐
   │ 304     │          │ 200 OK   │
   │ Not     │          │ 返回新资源 │
   │Modified │          └──────────┘
   └─────────┘
```

## 缓存位置

```
1. Memory Cache (内存缓存)
   ├─ 速度最快
   ├─ 容量小
   └─ 关闭标签页即失效

2. Disk Cache (磁盘缓存)
   ├─ 速度较快
   ├─ 容量大
   └─ 持久化存储

3. Service Worker Cache
   ├─ 可编程控制
   ├─ 离线可用
   └─ PWA 应用

4. Push Cache (HTTP/2 推送缓存)
   ├─ 会话级别
   └─ 使用率低
```

## 缓存类型

### 强制缓存

不需要发送请求到服务端，直接读取浏览器本地缓存。强制缓存没有请求头只有响应头，响应状态码是 200 ，但是会带有备注（from cache / from disk），是否强制缓存由 Expires、Cache-Control 和 2 个 Header 属性共同来控制。

- #### Expires（HTTP/1.0，已过时）

Expires 的值是一个 HTTP 日期，在浏览器发起请求时，会根据客户端时间和 Expires 的值进行比较，如果客户端时间超过了 Expires 的值，缓存失效。由于依赖客户端时间，所以当客户端时间和服务器时间不一致的时候，会有缓存有效期不准的问题。

```
Expires: Wed, 21 Oct 2025 07:28:00 GMT
```

- #### Cache-Control（HTTP/1.1，优先级比 Expires 高）

为了解决 Expires 时间不一致问题，HTTP/1.1 新增了 Cache-Control，有如下值

```
// 1. max-age: 缓存有效期（秒）
Cache-Control: max-age=3600  // 缓存 1 小时

// 2. no-cache: 使用强制缓存，需要与服务器验证缓存是否失效
Cache-Control: no-cache

// 3. no-store: 禁止使用缓存（包括协商缓存）
Cache-Control: no-store

// 4. public: 可被任何缓存（CDN、代理）缓存
Cache-Control: public, max-age=31536000

// 5. private: 只能被浏览器缓存，不能被代理缓存
Cache-Control: private, max-age=3600

// 6. must-revalidate: 缓存过期后必须验证
Cache-Control: max-age=3600, must-revalidate

// 7. immutable: 资源永不改变（适合带哈希的静态资源）
Cache-Control: public, max-age=31536000, immutable

// 8. s-maxage: CDN/代理服务器的缓存时间
Cache-Control: public, max-age=3600, s-maxage=7200
```

#### Expires vs Cache-Control

```
// 如果同时存在，Cache-Control 优先级更高
Cache-Control: max-age=3600
Expires: Wed, 21 Oct 2025 07:28:00 GMT
// ↑ Cache-Control 生效

Expires 的问题：
1. 依赖客户端时间（可能不准确）
2. 需要服务器和客户端时间同步
3. 已被 Cache-Control 取代

```

### 协商缓存

当浏览器的强制缓存失效的时候或者请求头中设置了禁止强制缓存，并且在请求头中设置了 If-Modified-Since 或者 If-None-Match 的时候，会将这两个属性值发到服务端去验证是否命中协商缓存，如果命中了协商缓存，会返回 304 状态，加载浏览器缓存，并且响应头会设置 Last-Modified 或者 ETag 属性。

- #### Last-Modified / If-Modified-Since（HTTP/1.0）

Last-Modified / If-Modified-Since 的值代表的是文件的最后修改时间，第一次请求服务端会把资源的最后修改时间放到 Last-Modified 响应头中，第二次发起请求的时候，请求头会携带上一次响应头中的 Last-Modified 的时间，并放到 If-Modified-Since 请求头属性中，服务端根据文件最后一次修改时间和 If-Modified-Since 的值进行比较，如果相等，返回 304 ，并加载浏览器缓存。

```
Last-Modified: Fri, 27 Oct 2025 06:35:57 GMT
If-Modified-Since: Fri, 27 Oct 2025 06:35:57 GMT
```

- #### ETag / If-None-Match（HTTP/1.1）

ETag / If-None-Match 的值是一串 hash 码，代表的是一个资源的标识符，当服务端的文件变化的时候，它的 hash 码会随之改变，通过请求头中的 If-None-Match 和当前文件的 hash 值进行比较，如果相等则表示命中协商缓存。ETag 又有强弱校验之分，如果 hash 码是以 "W/" 开头的一串字符串，说明此时协商缓存的校验是弱校验的，只有服务器上的文件差异（根据 ETag 计算方式来决定）达到能够触发 hash 值后缀变化的时候，才会真正地请求资源，否则返回 304 并加载浏览器缓存。

```
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"
```

#### Last-Modified vs ETag：

```
Last-Modified 的问题：
1. 精度只到秒级（1 秒内多次修改检测不到）
2. 文件修改时间变了，但内容没变（触摸文件）
3. 某些服务器无法精确获取修改时间

ETag 的优势：
1. 基于内容哈希，更精确
2. 内容不变，ETag 不变
3. 可以自定义生成规则

优先级：ETag > Last-Modified
如果同时存在，服务器优先检查 ETag

```

## Nginx 配置

```
# nginx.conf

# 1. HTML 文件 - 不缓存
location ~* \.html$ {
    add_header Cache-Control "no-cache";
    # 注意 expires 指令，会同时转换成 http 的 Cache-Control 和 Expires 头
    expires 0;
}

# 2. 带哈希的静态资源 - 永久缓存
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    add_header Cache-Control "public, max-age=31536000, immutable";
    expires 1y;
}

# 3. API 接口 - 不缓存
location /api/ {
    add_header Cache-Control "no-store";
    proxy_pass http://backend;
}

# 4. 启用 ETag
etag on;

# 5. 启用 gzip 压缩
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

```
