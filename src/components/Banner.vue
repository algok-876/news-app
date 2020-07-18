<template>
  <div class="carousel-wrap" id="carousel"  @mouseover="stop" @mouseout="go">
    <transition-group tag="ul" class='slide-ul' name="list">
        <li v-for="(list,index) in banners" :key="index" v-show="index===currentIndex">
            <a :href="list.clickUrl" >
                <img :src="list.url">
            </a>
        </li>
    </transition-group>
    <div class="carousel-items">
        <span v-for="(item,index) in banners.length" :key="index" :class="{'active':index===currentIndex}" @click="change(index)"></span>
    </div>
</div>
</template>

<script>
export default {
  props: {
    banners: {
      type: Array, // 属性是数组
      required: true // 必须传递,
    }
  },
  data () {
    return {
      currentIndex: 0,
      timer: null,
      isNext: true
    }
  },
  created () {
    this.$nextTick(() => {
      this.timer = setInterval(() => {
        this.autoPlay()
      }, 4000)
    })
  },
  destroyed () {
    this.stop()
  },
  methods: {
    go () {
      this.timer = setInterval(() => {
        this.autoPlay()
      }, 4000)
    },
    stop () {
      clearInterval(this.timer)
      this.timer = null
    },
    change (index) {
      if (!this.isNext) return
      this.currentIndex = index
      this.isNext = false
      setTimeout(() => {
        this.isNext = true
      }, 1500)
    },
    autoPlay () {
      this.currentIndex++
      if (this.currentIndex > this.banners.length - 1) {
        this.currentIndex = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
 .carousel-wrap {
   height: 453px;
   width: 100%;
   overflow: hidden;
   background-color: #fff;
   position: relative;
   border-radius: 5px;
   .slide-ul {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    li {
      position: absolute;
      width: 100%;
      img {
        width: 100%;
        }
      }
    }
    .carousel-items {
      position: absolute;
      z-index: 10;
      right: 15px;
      bottom: 30px;
      margin: 0 auto;
      text-align: center;
      font-size: 0;
      span {
        position: relative;
        display: inline-block;
        height: 3px;
        padding: 5px 0;
        background-clip: content-box;
        width: 50px;
        margin: 0 3px;
        background-color: aqua;
        cursor: pointer;
        &::after{
          position: absolute;
          content: "";
          left: 0;
          top: 0;
          height: 3px;
          padding: 5px 0;
          width: 100%;
          transition: transform .3s ease-out;
          background-color: orange;
          transform: scaleX(0);
          background-clip: content-box;
          z-index: 66;
        }
        &.active {
          &::after{
            transform: scaleX(1);
          }
        }
      }
    }
}

.list-enter-to {
  transition: all .8s ease-out;
  transform: translateX(0);
}

.list-leave-active {
  transition: all .8s ease-out;
  transform: translateX(-100%)
}

.list-enter {
  transform: translateX(100%)
}

.list-leave {
  transform: translateX(0)
}
</style>
