[vue] 从 0 到 1 自己构架一个 vue 项目，说说有哪些步骤、哪些重要插件、目录结构你会怎么组织要看是 vue.js 还是

vue cli 项目，如果是 vue.js 可以按照普通 web 项目流程开发，只在代码架构上变为数据和模型分离的模式即可。
如果是 vue cli 项目，不仅要分离数据和模型，还要理解 vue router, vuex 等组件，并且对于组件化的概念要更加透彻，由其是单页面应用，每个子页面如何组件化是必须在项目伊始就想清楚的。

vue cli 项目目录：pages、servers、config（项目的配置非 cli 的）、utils、doc(必要的文档记录)

vue-cli 实际上已经很成熟了，目录除了脚手架默认的，
1、一般会额外创建 views，components，api，utils，stores 等；
2、下载重要插件，比如 axios，dayjs（moment 太大），其他的会根据项目需求补充；
3、封装 axios，统一 api 调用风格和基本配置；
4、如果有国际化需求，配置国际化；
5、开发，测试和正式环境配置，一般不同环境 API 接口基础路径会不一样；

我来简单说一下我的见解吧，有些简单浅显（小学语文真的没学好），目的在于提供一个思路供大家参考。

项目类型
前端的项目目前来看主要分为小程序开发，H5 页面开发、PC 官网、后台管理系统开发、Native 开发。不同的项目所涉及的知识点和环境不太一样，但是很多方面是相通的。

      小程序
      由于框架限定在 Vue，所以这里指的是使用 mpvue、WePY 来开发小程序项目。

      H5 页面
      这里主要是指微信页面、Webview 中的 H5 页面开发

      PC 官网
      为什么单独划出来是因为官方的开发主要是用来展示企业信息、产品，对交互、体验有一定的要求，会有一些炫酷的动画效果。还有就是官网有可能需要采用 SSR（比如 Vue 的 Nuxt.js）来做，来确定良好的 SEO。

      后台管理系统
      后台管理系统主要功能在于数据的配置、权限的控制、数据报表的展示、日志功能等。通常又叫 CMS，OA。

      Native 开发
      这个通常就是指用前端技术去开 PC 应用、APP 应用，比如 Weex, Electron。

      通吃型
      比如 uni-app， 可以一套代码编译成不同的平台源码。

      不同的项目类型决定了其能够使用的生态、目录结构、特定的上下文。这里就以后台管理系统为例来说一下如何基于 Vue 来搭建一个项目。

项目目录划分
视图页面放在 pags 或者 views 中
静态文件放在 static 中
资源文件放在 assets 中
样式文件放在 styles 中
辅助库放在 utils 中
配置文件可以放在 config 或者 constants 中
vuex 的文件放在 stores 中，至于 getters, actions, mutation, modules 可以参考 vuex 的文档
路由文件放在 routes 中
所有组件放在 components 中
共享代码也可以使用 shared 作为目录
布局组件可以放在 layouts 目录中
项目用到的库
下面这些库可以在所有项目中使用

      UI框架: Element, iView, vue-strap等
      注：UI风格目前有Bookstrap、Antd和Google Materials三种风格，在项目搭建时这也是一个很重要的技术选型。

      日期: moment, dayjs

      URL解析: query-string, path-to-reqexp

      实用方法: lodash

      Cookie: js-cookie

      混淆ID: hashids

      图表: echarts

      Ajax: axios, isomorphic-fetch, vue-apollo

      拖拽: Vue.Draggable

      Meta修改: vue-meta

      注：这些只是我能想到的
