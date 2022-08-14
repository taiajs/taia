# 开发日志

## roadmap

1. [*] lint 包 config 层
2. [] lint 包 lint 层
3. [] lint 包 cli 层
   1. [] 一键安装配置化
   2. [*] verifyCommit

## 2022 年 08 月 12 日 23:40:50

### 完成的事情

解决昨天的问题，完成验证功能目前需要做的是把命令和包收敛到 qa 包里面，看看行不行。应该还有包管理版本问题，不知道嵌套能不能行。

## 2022 年 08 月 12 日 04:51:30

### 待解决问题

#### `pnpm i @txpjs/qa -w -D`报错`EISDIR: illegal operation on a directory, read` 解决: bin 目录里面试 index.js、package 配置如下会报错。

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

lint 包 config 层
