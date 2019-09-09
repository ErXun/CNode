<template>
  <div class="header clearfix">
    <router-link :to="{name:'root'}">
      <img src="../assets/logo.png" alt="#">
    </router-link>
    <ul>
        <li>
          <router-link :to="{name:'root'}">
            <a href="#">首页</a>
          </router-link>
        </li>
        <li><a href="#">新手入门</a></li>
        <li><a href="#">API</a></li>
        <li><a href="#">关于</a></li>
        <li><a href="#">注册</a></li>
        <li><a href="#">登录</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped>
.header{
    height: 50px;
    background: rgb(68,68,68);
}
img{
    max-width: 130px;
    margin: 5px 0 5px 60px;
}
a{
    text-decoration: none;
    color: #ccc;
    font-size: 14px;
}
ul{
    float: right;
}
.clearfix:after{
    content: '';
    display: block;
    clear: both;
}
li{
    display: inline-block;
    padding-right: 30px;
}
</style>
