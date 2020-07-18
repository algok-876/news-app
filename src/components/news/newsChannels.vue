<template>
  <div class="news-types">
    <ul class="types-list">
      <li
        class="item"
        v-for="(type) in showChaneels"
        :key="type.channelId"
        v-text="type.name"
        :class="{active: type.channelId === chooseId}"
        @click="switchTo(type.channelId)"
      ></li>
      <a href="javascript:;" @click="isCollapse = !isCollapse">{{isCollapse ? '展开' : '收起'}}</a>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      isCollapse: true,
      chooseId: null
    }
  },
  methods: {
    // 切换chooseId
    switchTo (id) {
      this.chooseId = id
      /* 我知道我被点击了，
      但是我不是到我要干嘛，
      这个时候就让该组件的使用者决定干嘛，
      我只负责触发事件（也就是向父组件暴露一个事件） */
      this.$emit('chooseIdChange', this.chooseId)
    }
  },
  computed: {
    // 分发数据
    ...mapState('channels', ['channelList']),
    // 根据展开和折叠返回不同个数的新闻频道数组
    showChaneels () {
      if (this.isCollapse) {
        return this.channelList.slice(0, 8)
      }
      return this.channelList
    }
  },
  watch: {
    // 监控vuex中channelList的变化，变化时默认选中第一个新闻频道
    channelList: {
      immediate: true,
      handler () {
        if (this.channelList.length > 0) {
          this.switchTo(this.channelList[0].channelId)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.news-types {
  margin: 10px 0;
  .types-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 10px 15px;
      font-size: 18px;
      font-weight: 200;
      letter-spacing: 1px;
      cursor: pointer;
      margin: 10px;
      transition: all 0.3s;
      box-sizing: border-box;
      &:last-child {
        margin-right: auto;
      }
      &:hover {
        background-color: cadetblue;
        color: #ffffff;
        border-color: cornsilk;
      }
      &.active {
        background-color: #000000;
        color: #ffffff;
        border-color: cornsilk;
      }
    }
    a {
      font-size: 16px;
      letter-spacing: 2px;
      color: darkorchid;
      align-content: center;
      display: flex;
      align-items: center;
      margin-right: auto;
      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
