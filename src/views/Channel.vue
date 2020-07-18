<template>
  <div class="root">
    <h1 class="channel-title">{{channelName}}</h1>
    <loading v-if="isLoading">拼命加载中</loading>
    <news-list :newsData="newsInfo.contentlist" v-else></news-list>
    <pagination
      :currentPage="page"
      :pageSize="pageSize"
      :total="newsInfo.allNum"
      :panelNumber="panelNumber"
      @current-change="pageChange"
      style="margin-top: 25px"
    ></pagination>
  </div>
</template>

<script>
import NewsList from '../components/news/newsList'
import pagination from '../components/Pager'
import Loading from '../components/Loading'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      newsInfo: {},
      queryInfo: {
        channelId: '',
        maxResult: 20,
        needContent: '1',
        needHtml: '1',
        page: '1'
      },
      // 页码数据
      currentPage: +this.$route.query.page || 1,
      pageSize: 10,
      total: '',
      panelNumber: 20,
      isLoading: true
    }
  },
  mounted () {
    // 获取新闻列表
    this.getNewsList()
  },
  methods: {
    // 获取新闻列表
    async getNewsList () {
      this.isLoading = true
      const res = await this.$http.get('/newsList', {
        params: this.queryInfo
      })
      this.isLoading = false
      this.newsInfo = res.showapi_res_body.pagebean
    },
    pageChange (newId) {
      // 当点击页码时，跳转到对应的路由
      this.$router.push('?page=' + newId)
    }
  },
  computed: {
    ...mapState('channels', ['channelList']),
    page () {
      return +this.$route.query.page || 1
    },
    channelName () {
      // 根据频道id找到频道名称,一定要判断一下，因为计算属性会因为依赖项的改变重新计算，当数组length改变时会从从重新计算
      if (this.channelList.length > 0) {
        return this.channelList.find(item => {
          return item.channelId === this.$route.params.id
        }).name
      }
      return ''
    }
  },
  watch: {
    // 监听路由参数，如果不监听路由参数，无法及时更新数据
    '$route.params.id': {
      immediate: true,
      handler (newId) {
        this.queryInfo.channelId = newId
        this.getNewsList()
      }
    },
    '$route.query.page': {
      immediate: true,
      handler (newPage) {
        // 查询的页码数和当前页码组件的页码数全部来自路由参数
        this.queryInfo.page = newPage
        this.currentPage = newPage
        this.getNewsList()
      }
    }
  },
  components: {
    NewsList,
    pagination,
    Loading
  }
}
</script>

<style lang="scss" scoped>
.channel-title{
  padding-left: 20px;
  border-bottom: 1px solid #f1f1f1;
}
</style>
