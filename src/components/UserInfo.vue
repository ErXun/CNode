<template>
  <div>
      <!-- 数据未返回时,显示加载ing  -->
      <div class="loading" v-if='isLoading'>
          <img src="../assets/loading.gif" alt="">
      </div>
      <!-- 用户信息 -->
      <div class="page" :data='userList'>
          <router-link :to="{name:'root'}">
            <p class="pStyle">主页/</p>
          </router-link>
          <p style="display:flex;align-items:flex-start;">
            <img :src="userList.avatar_url" alt="" style="width: 40px;">&nbsp;&nbsp;
            <span>{{userList.loginname}}</span>
          </p>
          <p>{{userList.score}} 积分</p>
          <div style="color:#778077">
              <p>注册时间 {{userList.create_at | formatDate}}</p>
          </div>
      </div>
      <!-- 最近创建的话题 -->
      <div class="recent_topics">
        <p class="topicStyle">最近创建的话题</p>
        <ul>
            <li v-for="(item,index) in topicList" :key="index" class="topic_list">
                <!-- 头像 -->
                 <router-link
                 :to ="{name:'user-info',
                 params:{loginname:item.author.loginname}}"
                >
                    <span><a href="#"><img :src='item.author.avatar_url' alt=""></a></span>
                </router-link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <!-- 标题 -->
                <router-link
                    :to="{name:'article-details',
                    params:{id:item.id}}"
                    style="color: rgb(0,168,227);"
                >
                    {{item.title}}
                </router-link>
                <span style="font-size: 12px; position:absolute; right:10px; color:#555;">{{item.last_reply_at | formatDate}}</span>
            </li>
        </ul>
      </div>
      <!-- 最近参与的话题 -->
      <div class="recent_replies">
        <p class="topicStyle">最近参与的话题</p>
        <ul>
            <li v-for="(item,index) in replyList" :key="index" class="reply_list">
                <!-- 头像 -->
                 <router-link
                 :to ="{name:'user-info',
                 params:{loginname:item.author.loginname}}"
                >
                 <span><a href="#"><img :src='item.author.avatar_url' alt=""></a></span>
                </router-link>&nbsp;&nbsp;&nbsp;&nbsp;
                <!-- 标题 -->
                <router-link
                    :to="{name:'article-details',
                    params:{id:item.id}}"
                    style="color: rgb(0,168,227);"
                >
                    {{item.title}}
                </router-link>
                <span style="font-size: 12px; position:absolute; right:10px; color:#555;">{{item.last_reply_at | formatDate}}</span>
            </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data () {
    return {
      isLoading: false,
      userList: {},
      topicList: [],
      replyList: []
    }
  },
  methods: {
    getData () {
      // this.$http.get('https://cnodejs.org/api/v1/user/' + this.$route.params.loginname)
      this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.loginname}`)
        .then(res => {
          this.userList = res.data.data
          this.topicList = res.data.data.recent_topics
          this.replyList = res.data.data.recent_replies
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
<style scoped>
.loading {
  position: absolute;
  right: 50%;
  top: 50%;
}
a {
    text-decoration: none;
}
ul {
    list-style: none;
    padding-inline-start: 5px;
}
.page {
    padding-left: 10px;
    background: #fff;
}
.page .pStyle {
    background: #f6f6f6;
    padding: 12px 10px;
    margin-left: -10px;
    font-size: 14px;
    color:rgb(128,189,1);
}
.topicStyle {
  background: #f6f6f6;
  padding: 12px 8px;
  font-size: 14px;
  color:rgb(128,189,1);
}
.recent_topics,.recent_replies {
    background: #fff;
}
img {
  width: 30px;
}
.topic_list,.reply_list{
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px 5px;
    border-bottom: 1px solid rgb(240,240,240);
}
</style>
