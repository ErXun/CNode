import Vue from 'vue'
import Router from 'vue-router'
import ArticleList from '../components/ArticleList'
import ArticleDetails from '../components/ArticleDetails'
import UserInfo from '../components/UserInfo'
import SideBar from '../components/SideBar'
Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'root',
      path: '/',
      components: {
        main: ArticleList
      }
    },
    {
      name: 'article-details',
      path: '/article-details/:id&author=:name',
      components: {
        main: ArticleDetails,
        sidebar: SideBar
      }
    },
    {
      name: 'user-info',
      path: '/user-info/:loginname',
      components: {
        main: UserInfo
      }
    }
  ]
})
