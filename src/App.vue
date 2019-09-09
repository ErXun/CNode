<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <router-view name="sidebar"></router-view>
      <router-view name='main' :key='$route.path'></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import ArticleList from './components/ArticleList'
export default {
  name: 'App',
  components: {
    Header,
    ArticleList
  }
  // computed: {
  //   key () {
  //     return this.$route.path + Math.random() // 防止URL地址栏更新，但页面未跳转(注：引用相同组件，会导致组件无法更新)
  //   }
  // }
}
</script>

<style>
#app {
  background: #e1e1e1;
}
.main {
  width: 80%;
  margin: 0 auto;
}
.main:after {
  content: '';
  display: block;
  clear: both;
}
</style>
