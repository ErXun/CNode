<template>
  <div class="pagination">
      <button class="pageStyle" @click='clickPage'>首页</button>
      <button class="pageStyle" @click='clickPage'>上一页</button>
      <button v-if='judge' class="pageStyle">......</button>
      <button
        v-for="(page,index) in pageArray"
        :key="index"
        :class="[{clickStyle:page == currentPage},'pageStyle']"
        style="margin-left: 5px;"
        @click='clickPage(page)'
      >{{page}}
      </button>
      <button class="pageStyle" @click='clickPage'>下一页</button>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Pagination',
  data () {
    return {
      currentPage: 1,
      pageArray: [1, 2, 3, 4, 5, '......'],
      judge: false
    }
  },
  methods: {
    clickPage (page) {
      if (typeof page !== 'number') {
        switch (page.target.innerText) {
          case '上一页':
            $('button.clickStyle').prev().click()
            break
          case '下一页':
            $('button.clickStyle').next().click()
            break
          case '首页':
            this.pageArray = [1, 2, 3, 4, 5, '......']
            this.clickPage(1)
            break
          default:
            break
        }
        return
      }
      if (page === this.pageArray[4]) {
        this.pageArray.shift()
        this.pageArray.splice(4, 0, this.pageArray[3] + 1)
      } else if (page === this.pageArray[0] && this.pageArray[0] !== 1) {
        this.pageArray.splice(4, 1)
        this.pageArray.splice(0, 0, this.pageArray[0] - 1)
      }
      this.currentPage = page
      if (page > 4) {
        this.judge = true
      } else {
        this.judge = false
      }
      this.$emit('handle', this.currentPage)
    }
  }
}
</script>
<style scoped>
button {
    padding: 0;
    margin: 0;
    border: 1px solid transparent;    /*自定义边框*/
    outline: none;  /*消除默认点击蓝色边框效果 */
}
.pageStyle {
    display: inline-block;
    width: 60px;
    border-radius: 4px;
    padding: 10px 0px;
    background: #fff;
    border: 1px solid #ccc;
}
.clickStyle {
  color: #fff;
  background: rgb(30,30,30);
}
.pagination {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 10px;
}
</style>
