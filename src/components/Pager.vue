<template>
  <div class="pagination-wrpper">
    <span class="page-total">第{{currentPage}}页/共{{ pageNumber }}页</span>
    <button class="btn" :disabled="currentPage === 1" @click="handleChange(1)" title="首页">
      <i class="iconfont icon-diyiyeshouyeshangyishou" style="font-size: 28px"></i>
    </button>
    <button class="btn" :disabled="currentPage === 1" @click="handleChange(currentPage - 1)">
      <i class="iconfont icon-shangyiye"></i>
    </button>
    <ul class="number-page-list">
      <li v-for="number in numbers" :key="number" :class="{active: number === currentPage}" @click="handleChange(number)">
        {{number}}
      </li>
    </ul>
    <button class="btn" :disabled="currentPage === pageNumber" @click="handleChange(currentPage + 1)">
      <i class="iconfont icon-xiayiye"></i>
    </button>
    <button class="btn" :disabled="currentPage === pageNumber" @click="handleChange(pageNumber)" title="尾页">
      <i class="iconfont icon-zuihouyiyemoyexiayishou" style="font-size: 28px"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    // 一行显示多少页数
    pageSize: {
      required: true
    },
    // 总数目
    total: {
      required: true
    },
    // 当前页
    currentPage: {
      required: true
    },
    panelNumber: {
      required: true
    }
  },
  data () {
    return {
      numberArr: []
    }
  },
  methods: {
    handleChange (newPage) {
      console.log(newPage)
      newPage = newPage < 1 ? '1' : newPage
      newPage = newPage > this.pageNumber ? this.pageNumber : newPage
      if (newPage === this.currentPage) return
      this.$emit('current-change', newPage)
    }
  },
  created () {
    console.log(this.pageNumber)
  },
  computed: {
    minNumber () {
      let n = this.currentPage - this.pageSize / 2
      n = n < 1 ? 1 : n
      return n
    },
    maxNumber () {
      let n = this.minNumber + this.pageSize - 1
      n = n > this.pageNumber ? this.pageNumber : n
      return n
    },
    pageNumber () {
      return Math.ceil(parseInt(this.total) / this.panelNumber)
    },
    numbers () {
      const arr = []
      for (let i = this.minNumber; i <= this.maxNumber; i++) {
        arr.push(i)
      }
      return arr
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin pageination{
  text-align: center;
  width: 35px;
  height: 35px;
  line-height: 35px;
  color: #606266;
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
  margin: 0 5px;
  background-color: #f4f4f5;
  &:hover{
    color: #409eff;
  }
}
.pagination-wrpper{
  display: flex;
  justify-content: center;
  align-items: center;
  .page-total{
    color: #606266;
  }
  .btn {
    outline: none;
    border: none;
    @include pageination();
    &:disabled{
      color: #c0c4cc;
      cursor:not-allowed;
    }
  }
  .number-page-list{
    margin:0;
    padding: 0;
    list-style: none;
    display: flex;
    li{
      @include pageination();
      &.active{
        background-color: #409eff;
        color: #ffffff;
      }
    }
  }
}
</style>
