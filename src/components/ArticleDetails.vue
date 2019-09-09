<template>
  <div style="margin-right:320px;">
     <!-- 数据未返回时,显示加载ing  -->
    <div class="loading" v-if='isLoading'>
        <img src="../assets/loading.gif" alt="">
    </div>
    <!-- topic_header -->
    <div class="topic_header" :data="detailList">
      <h2>{{detailList.title}}</h2>
      <p class="header_info">
        <span>• 发布于 {{detailList.create_at | formatDate}}</span>
        <span v-if="detailList.author">• 作者 {{detailList.author.loginname}}</span>
        <span>• {{detailList.visit_count}} 次浏览</span>
        <span>• 来自 {{detailList.tab === "share" ? "分享":"问答"}}</span>
      </p>
      <hr>
      <p v-html="detailList.content"></p>
    </div>
    <!-- remark -->
    <div class="remark" :data="detailList">
      <p style="background: #f6f6f6; padding: 12px 8px; font-size: 14px;">{{detailList.reply_count > 0 ? detailList.reply_count:''}} 回复</p>
      <ul>
        <li v-for="(item,index) in replies" :key="index" style="border-bottom: 1px solid #f0f0f0; padding-left:5px;">
          <p class="remark_info">
            <router-link
            :to="{name:'user-info',
            params:{loginname:item.author.loginname}}"
            style="position: relative; display: flex; align-items: flex-start;"
            >
              <!-- 评论，用户头像 -->
              <a href="#"><img :src="item.author.avatar_url" alt=""></a>&nbsp;
              <!-- 评论，用户名 -->
              <a href="#">
                <span style="font-size: 14px; color:385f8a;">{{item.author.loginname}}</span>&nbsp;&nbsp;
              </a>
            </router-link>
            <!-- 评论时间 -->
            <a href="#" class="time">
              <span>{{index+1}}楼•{{item.create_at | formatDate}}</span>
            </a>
            <!-- 点赞数 -->
            <span v-if='item.ups.length' style="position:absolute; right:0;">
              👍{{item.ups.length}}
            </span>
          </p>
          <p v-html="item.content"></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleDetails',
  data () {
    return {
      isLoading: false,
      detailList: {},
      replies: []
    }
  },
  methods: {
    getData () {
      this.$http.get('https://cnodejs.org/api/v1/topic/' + this.$route.params.id)
        .then(res => {
          this.detailList = res.data.data
          this.replies = res.data.data.replies
          this.isLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  beforeMount () {
    this.isLoading = true
    this.getData()
  }
}
</script>
<style>
@import url('../assets/markdown.css');
ul {
  list-style: none;
  padding-inline-start: 5px;
}
a {
  text-decoration: none;
  color: #333;
}
.remark_info img {
  width: 30px;
}
.loading {
  position: absolute;
  right: 50%;
  top: 50%;
}
.topic_header{
  margin-top: 10px;
  background: #fff;
  padding: 10px;
  color: #333;
}
.topic_header h2{
  color: rgb(51,51,51);
}
.header_info {
  font-size: 12px;
  color:#838383;
}
.remark{
  background: #fff;
}
.remark_info {
  position: relative;
  display: flex;
  align-items: flex-start;
}
.remark_info .time{
  display: inline-block;
  padding-top: 2px;
  font-size: 12px;
  color: blue;
}
.remark_info .time:hover {
  text-decoration:underline;
}
</style>
