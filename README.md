# mow-display
这是一个简单的日志输出库，现在支持最简单的模板输出，并且现在只支持node端的输出
# 快速使用
## 安装
### 使用**npm**
```bash
npm i mow-display
```
### 使用GitHub
```bash
git clone https://github.com/mowtwo/Display
```
## 使用案例
### 案例1
```JavaScript
const { Display } = require('mow-display')
const display = new Display() //默认使用一个字符串模板 {{content}}
/**
 * display方法有两种重载，支持直接传入一个替换content的字符串
 * 下面也可以写成：
 * display.display('hello world') 
 */
display.display({
    content: 'hello world'
}) 
//输出：hello world
```
### 案例2
```JavaScript
const { Display } = require('mow-display')
const display = new Display(`[mow-log]:{{content}}|\t{{date}}`) //自定义模板字符串
display.display({
    content: 'hello world',
    date: String(new Date)
}) //输出：[mow-log]:hello world|  Thu Dec 24 2020 10:54:27 GMT+0800 (China Standard Time)
```