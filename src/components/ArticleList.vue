<template>
  <div>
     <!-- 数据未返回时,显示加载ing  -->
    <div class="loading" v-if='isLoading'>
        <img src="../assets/loading.gif" alt="">
    </div>
    <div class="content">
      <ul>
        <li class="title">
          <span><a href="#">全部</a></span>
          <span><a href="#">精华</a></span>
          <span><a href="#">分享</a></span>
          <span><a href="#">问答</a></span>
          <span><a href="#">招聘</a></span>
          <span><a href="#">客户端测试</a></span>
        </li>
        <li v-for="(item,index) in dataList" :key="index" class="list">
          <!-- 头像 -->
          <router-link
          :to ="{name:'user-info',
          params:{loginname:item.author.loginname}}"
          >
             <span><a href="#"><img :src="item.author.avatar_url"></a></span>
          </router-link>
          <!-- 回复数和点击数 -->
         <p><span>{{item.reply_count}}</span><span style="color:#b9a3ad;">/</span><span style="font-size: 10px; color:#b9a3ad;">{{item.visit_count}}</span></p>
          <!-- 标题类别 -->
          <span :class="[{titleStyle:isTrue, titleNewStyle:(item.top == true || item.good == true)}]">{{item | formatType}}</span>&nbsp;&nbsp;
          <!-- 文章标题 -->
          <router-link
            :to="{name:'article-details',
            params:{
              id:item.id,
              name:item.author.loginname
            }
          }">
              <span><a href="#" class="articleTitle">{{item.title}}</a></span>
          </router-link>
          <!-- 时间 -->
          <span style="font-size: 12px; position:absolute; right:10px; color:#555;">{{item.last_reply_at | formatDate}}</span>
        </li>
        <li>
          <Pagination @handle="renderList" v-if='isappear'></Pagination>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Pagination from './Pagenation'
export default {
  name: 'ArticleList',
  components: {
    Pagination
  },
  data () {
    return {
      isLoading: false,
      isappear: false,
      url: 'https://cnodejs.org/api/v1/topics',
      dataList: [],
      lastReplyDate: '',
      isTrue: true,
      currentPage: 1
    }
  },
  methods: {
    getData () {
      this.$http.get(this.url, {
        params: {
          page: this.currentPage,
          limit: 20
        }
      })
        .then(res => {
          this.isappear = true
          this.dataList = res.data.data
          this.isLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    renderList (value) {
      this.currentPage = value
      this.getData()
      // alert(value)
    }
  },
  beforeMount () {
    this.isLoading = true
    this.getData() // 在页面加载之前获取数据
  }
}
</script>
<style scoped>
.loading {
  position: absolute;
  right: 50%;
  top: 50%;
}
.content{
    /* width: 910px; */
    background: #fff;
}
ul {
  list-style: none;
  padding-inline-start: 0px;
}

a{
  text-decoration: none;
  color: #333;
}
img {
  width: 30px;
}
.title {
  background: rgb(246,246,246);
  padding: 10px;
  font-size: 14px;
}
.title span {
  display: inline-block;
  margin-left: 25px;
  padding: 2px 5px;
  border-radius: 4px;
}
.title span a{
  color: rgb(128,189,1);
}
.title span a:hover{
  color: blue;
}
.title span:first-child {
  margin-left: 5px;
  background:rgb(128,189,1);
}
.title span:first-child a{
  color: #fff;
}
.titleStyle{
  background: rgb(229,229,229);
  padding: 3px;
  border-radius: 3px;
  color: rgb(153,153,153);
  font-size: 12px;
}
.titleNewStyle{
  background: rgb(128,189,1);
  color: #fff;
}
.list {
  position: relative;
  margin-left: 5px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(240,240,240);
}
.list:hover {
  background: rgb(246,246,246);
}
.list p {
  display: inline-block;
  width: 70px;
  font-size: 12px;
  text-align:center;
  color:#555;
}
.list .articleTitle:hover {
  text-decoration: underline;
}
</style>
