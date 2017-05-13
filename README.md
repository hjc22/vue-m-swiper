
[![NPM](https://nodei.co/npm/vue-feedback.png)](https://github.com/hjc22/vue-m-swiper)

[![npm](https://img.shields.io/npm/dm/vue-m-swiper.svg)]()


# vue-m-swiper

> Vue v2.0 移动端无缝轮播图组件

精巧的移动端轮播图组件，支持无限和有限的滚动方式，支持自动播放等特性

## 安装步骤

``` bash
# 安装 npm 模块
npm install vue-m-swiper --save

#组件内直接引入
import { mSwiper } from 'vue-m-swiper'
组件使用：1.components:{ mSwiper:mSwiper };2.<m-swiper />

# 或者 Vue.use()全局安装
import mSwiper from 'vue-m-swiper'
Vue.use(mSwiper)


```

# 参数配置

属性名 | 作用 | 类型 | 默认值
--------- | -------------
loop | 是否开启无限循环切换 | Boolean | true
data | 图片数组对象 | Array | 无([{ img:xxxx },{ img:xxxx }])
auto | 自动播放时间（单位：ms）和是否开启自动（只在loop为true的情况下有效） | Number | 0
initIndex | 初始化默认展示第几页 | Number | 0
