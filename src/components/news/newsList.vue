<template>
  <!-- 新闻列表 -->
  <div class="news-list-wrpper">
    <div class="news-list">
      <!-- 新闻项 -->
      <div class="news-item" v-for="(item, index) in newsData" :key="index">
        <div class="news-img" v-if="item.havePic">
          <a :href="item.link" target="_blank" :style="{backgroundImage: `url(${item.img})`}"></a>
        </div>
        <div class="words">
          <h2 class="news-title">{{item.title}}</h2>
          <div class="news-info">
            <span>{{item.channelName}}</span>
            <span>来源:{{item.source}}</span>
            <span>发布时间:{{item.pubDate}}</span>
          </div>
          <div class="news-des">{{item.desc}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    newsData: {
      required: true
    }
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.news-list {
  .news-item {
    display: flex;
    border-bottom: 1px solid #f1f1f1;
    padding: 20px;
    &:last-child {
      border: none;
    }
    .news-img {
      a {
        display: block;
        margin-right: 20px;
        width: 150px;
        height: 150px;
        box-sizing: border-box;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid #b1b1b1;
        background-size: cover;
        background-clip: content-box;
        background-position: center;
      }
    }
    .words {
      .news-title {
        margin-top: 0;
        margin-bottom: 5px;
        color: #0eb0c9;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
        font-size: 24px;
        color: #2e317c;
        font-size: 300;
        letter-spacing: 1px;
      }
      .news-info {
        span {
          display: inline-block;
          color: #979797;
          font-size: 16px;
          margin-right: 15px;
        }
      }
      .news-des {
        line-height: 1.6;
        margin-top: 20px;
      }
    }
  }
}
</style>
