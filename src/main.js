// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'

Vue.prototype.$http = Axios // http 请求包
Vue.config.productionTip = false

// 日期格式过滤器
Vue.filter('formatDate', function (str) {
  if (!str) return ''
  let lastReplyDate = new Date(str) // 最新回复时间
  let intervalTime = new Date().getTime() - lastReplyDate.getTime() // 时间差
  if (intervalTime < 0) {
    return ''
  } else if (intervalTime < 60000) {
    return parseInt(intervalTime / 1000) + ' 秒前'
  } else if (intervalTime >= 60000 && intervalTime < 3600000) {
    return parseInt(intervalTime / 60000) + ' 分钟前'
  } else if (intervalTime >= 3600000 && intervalTime < 86400000) {
    return parseInt(intervalTime / 3600000) + ' 小时前'
  } else if (intervalTime >= 86400000 && intervalTime < 2592000000) {
    return parseInt(intervalTime / 86400000) + 1 + ' 天前'
  } else if (intervalTime >= 2592000000 && intervalTime < 31104000000) {
    return parseInt(intervalTime / 2592000000) + ' 个月前'
  } else if (intervalTime >= 31104000000) {
    return parseInt(intervalTime / 31104000000) + ' 年前'
  }
})

// 标题类别过滤器
// tab: (分享/问答)share/ask----top,good 默认为false
// top: 置顶(true/false)------tab 默认为 share
// good: 精华(true/false)------tab 默认为 share
Vue.filter('formatType', function (item) {
  if (item.tab === 'share' && item.top === true && item.good === false) {
    return '置顶'
  } else if (item.tab === 'share' && item.top === false && item.good === false) {
    return '分享'
  } else if (item.tab === 'share' && item.top === false && item.good === true) {
    return '精华'
  } else if (item.tab === 'ask' && item.top === false && item.good === false) {
    return '问答'
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
