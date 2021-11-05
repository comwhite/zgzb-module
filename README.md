# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## 分支说明

dev --- 开发环境主干
test --- 测试环境主干
pre --- 预生产主干
prod --- 生产环境主干
环境地址：
https://alpha.zgjys.com/ 测试
https://dcdnm.zgjys.com/ cdn 的生产环境
https://m.zgjys.com/ 生产环境
https://beta.zgjys.com/ 预生产
http://192.168.106.27/ 开发环境

```bash
# 新需求开始：
# git checkout origin/prod
# git checkout -b 分支名称 dev_20210317_addNewModules
# git push --set-upstream origin dev_20210317_addNewModules
# 开发完成后（优先 git merge origin/prod  将最新生产主干代码合并到当前分支 避免冲突）提交对应环境分支
```

## 代码风格统一

```javascript
/**
* 1、样式写法：class="order-list"
* 2、除index.vue外，所有.vue文件 采用大驼峰规则 例如Author.vue、HeaderNav.vue等
* 3、列表等大数据渲染的时候 如果没有需要改数据的需要，拿到数据返回的时候 请用Object.freeze 包裹一下哈，vue就不会去监听了
* 4、路由地址 统一不用大写字母
* 5、js内部单引号，html上双引号
*/

## husky+lint-staged 提交规范

```

提交示例 git commit -m 'fix: xxxx'

[
'bug', // 此项特别针对 bug 号，用于向测试反馈 bug 列表的 bug 修改情况
'feat', // 新功能（feature）
'fix', // 修补 bug
'docs', // 文档（documentation）
'style', // 格式（不影响代码运行的变动）
'refactor', // 重构（即不是新增功能，也不是修改 bug 的代码变动）
'test', // 增加测试
'chore', // 构建过程或辅助工具的变动
'revert', // feat(pencil): add ‘graphiteWidth’ option (撤销之前的 commit)
'merge' // 合并分支， 例如： merge（前端页面）： feature-xxxx 修改线程地址
]

```

## 移动端科普
```

https://zhuanlan.zhihu.com/p/353869773

```
## 页面路由状态
```

// 路由中添加
meta: {
title: '直播间',
pageStatus: 2
},
// 规则
['开发中', '待联调', '联调中', '联调完成', '已完成','','','','','下期'][status || 0]

```
// 安卓：状态栏原生接管、全屏
// ios: 全部h5接管、特殊页面不需要头部
// 微信+支付宝等：不展示头部

## 设备媒体查询
```

https://blog.csdn.net/qq_41631910/article/details/109365129

```

```
