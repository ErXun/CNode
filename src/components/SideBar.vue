<template>
  <div class="sideBar">
    <div class="user" :data='userList'>
      <p class="topicStyle">作者</p>
      <p style="padding: 10px;">
        <router-link
        :to="{name: 'user-info',params:{
            loginname: userList.loginname
        }}"
        >
            <img :src="userList.avatar_url" alt="">
            <span style="display: inline-block; padding: 15px 0; vertical-align: top;">{{userList.loginname}}</span>
        </router-link>
      </p>
      <p style="font-size: 12px; padding: 10px;">积分 {{userList.score}}</p>
    </div>
    <div class="topics">
      <p class="topicStyle">作者其它话题</p>
      <ul>
          <li v-for="(item,index) in topicList" :key="index" style="padding: 10px;">
              <span>{{item.title}}</span>
          </li>
      </ul>
    </div>
    <!-- <div class="noReplyTopics">
      <p class="topicStyle">无人回复的话题</p>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'sidebar',
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
      this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(res => {
          this.userList = res.data.data
          this.topicList = res.data.data.recent_topics
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
img {
    width: 45px;
    border-radius: 3px;
}
.sideBar {
  float: right;
  width: 300px;
  /* margin-top: 0; */
}
.sideBar p {
  margin: 0;
  /* margin-bottom: 10px; */
}
.user,
.topics,
.noReplyTopics {
  background: #fff;
}
.topicStyle {
  background: #f6f6f6;
  padding: 12px 8px;
  font-size: 14px;
}
.topics,.noReplyTopics {
    margin-top: 15px;
    font-size: 14px;
    /* color: rgb(189,144,135); */
}
</style>
