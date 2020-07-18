<template>
  <header class="header">
    <div class="container h-wrapper">
      <div class="logo">
        <router-link to="/">
          <img src="../assets/img/logo.png" alt="">
        </router-link>
      </div>
      <nav class="nav">
        <router-link :to="{name: 'Index'}">首页</router-link>
        <router-link :to="{name: 'Channel', params: {id: `${item.channelId}`}}" v-for="(item, index) in channelList.slice(0, 5)" :key="index">{{item.name}}</router-link>
      </nav>
      <div class="login-reg">
        <span v-if="loginInfo.isLoading">Loading...</span>
        <template v-if="loginInfo.data">
          <router-link :to="{ name: 'Personal' }">{{loginInfo.data.nickname}}</router-link>
          <a @click.prevent="haneldeLoginOut">退出登录</a>
        </template>
        <template v-else>
          <router-link :to="{ name: 'Login' }">登录</router-link>
          <router-link :to="{ name: 'Reg' }">注册</router-link>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      channel: []
    }
  },
  mounted () {
  },
  methods: {
    async getnewsChaneels () {
      const res = await this.$http.get('/channelList')
      this.channel = res.showapi_res_body.channelList.slice(0, 5)
    },
    haneldeLoginOut () {
      this.$store.dispatch('login/loginOut')
      this.$router.push({ name: 'Login' })
    }
  },
  computed: {
    // 分发state
    ...mapState('channels', ['channelList']),
    ...mapState('login', ['loginInfo'])
  }
}
</script>

<style lang="scss" scoped>
.header{
  width: 100%;
  background-color: #000;
  margin-bottom: 40px;
  .logo{
    box-sizing: border-box;
    width: 60px;
    img{
      width: 100%;
    }
  }
  .h-wrapper{
    display: flex;
    justify-content: space-between;
    align-content: center;
    a{
      display: inline-block;
      color: #ffffff;
      text-decoration: none;
    }
    .nav{
      margin-right: auto;
      margin-left: 40px;
      a{
        font-size: 17px;
        padding: 20px 10px;
        margin-right: 20px;
        position: relative;
        &:last-child{
          margin: 0;
          padding: 20px 10px;
        }
        &::after{
          content: "";
          position: absolute;
          z-index: 111;
          bottom: 0;
          left: 0;
          width:100%;
          height: 4px;
          background-color: #2177b8;
          transform: scaleX(0);
          transition: transform .4s;
        }
        &:hover &::after{
          transform: scaleX(1);
        }
      }
    }
    .login-reg{
      color: #ffffff;
      display: flex;
      align-items: center;
      a{
        cursor: pointer;
        font-size: 16px;
        &:nth-child(1){
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
