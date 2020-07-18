<template>
  <div>
    <banner :banners="banners"></banner>
    <news-channels @chooseIdChange='chooseIdChange'></news-channels>
    <loading v-if="isLoading">拼命加载中</loading>
    <transition name="fade" >
      <news-list :newsData="newsList.contentlist" v-show="isShowNewsList"></news-list>
    </transition>
    <pagination
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="newsList.allNum"
      :panelNumber="panelNumber"
      @current-change="pageChange"
      style="margin-top: 25px"
    ></pagination>
  </div>
</template>

<script>
import banner from '../components/Banner'
import newsChannels from '../components/news/newsChannels'
import newsList from '../components/news/newsList'
import loading from '../components/Loading'
import pagination from '../components/Pager'
export default {
  data () {
    return {
      banners: [
        { url: require('../assets/img/banner1.jpg'), link: 'http://www.baidu.com' },
        { url: require('../assets/img/banner2.jpg'), link: 'http://www.baidu.com' },
        { url: require('../assets/img/banner3.jpg'), link: 'http://www.baidu.com' }
      ],
      newsList: [],
      queryInfo: {
        channelId: '',
        maxResult: 20,
        needContent: '1',
        needHtml: '1',
        page: '1'
      },
      // 控制加载层的显示与隐藏
      isLoading: true,
      // 控制新闻列表的显示与隐藏
      isShowNewsList: false,
      // 页码数据
      currentPage: 1,
      pageSize: 10,
      total: '',
      panelNumber: 20
    }
  },
  methods: {
    chooseIdChange (newsId) {
      this.queryInfo.channelId = newsId
      this.getNewsList()
      this.isShowPag = true
      this.currentPage = 1
    },
    // 获取新闻列表
    async getNewsList () {
      this.isLoading = true
      this.isShowNewsList = false
      const res = await this.$http.get('/newsList', {
        params: this.queryInfo
      })
      this.isLoading = false
      this.isShowNewsList = true
      this.newsList = res.showapi_res_body.pagebean
    },
    // 改变页码
    pageChange (page) {
      this.currentPage = page
      this.queryInfo.page = page
      this.getNewsList()
    }
  },
  components: {
    banner,
    newsChannels,
    newsList,
    loading,
    pagination
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active{
  transition: all .4s;
  transform: translate(0, 0);
}
.fade-leave-to{
  transform: translate(-200%, 0);
  opacity: 0;
}
.fade-enter{
  transform: translate(100%, 0);
  opacity: 0;
}
</style>
