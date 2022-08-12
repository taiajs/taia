# 开发日志

## 2022 年 08 月 12 日 04:51:30

### 待解决问题

`pnpm i @txpjs/qa -w -D`报错`EISDIR: illegal operation on a directory, read` 解决: bin 目录里面试 index.js、package 配置如下会报错。

```json
{
  "bin": {
    "qa": "./bin"
  }
}
```

bin 目录文件改成 qa.js，package 配置改成如下就解决了。

```json
{
  "bin": {
    "qa": "./bin/qa.js"
  }
}
```

### 完成了什么

1. [*] lint 包 config 层
2. [] lint 包 lint 层
3. [] lint 包 cli 层
   1. [] 一键安装配置化
   2. [] verifyCommit（待验证）
