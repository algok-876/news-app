<template>
  <div>
    <center>
      <h1>鉴权中心</h1>
    </center>
  </div>
</template>

<script>
import Center from '../components/Center'
import { mapState } from 'vuex'
export default {
  components: {
    Center
  },
  computed: mapState('login', ['loginInfo']),
  methods: {
    handleLogin () {
      if (this.loginInfo.isLoading) {
        // eslint-disable-next-line no-useless-return
        return
      }
      // 是否登录了
      if (this.loginInfo.data) {
        if (this.$route.query.returnurl) {
          this.$router.push(this.$route.query.returnurl)
        } else {
          this.$router.push({ name: 'Personal' })
        }
      } else {
        this.$router.push({ name: 'Login' })
      }
    }
  },
  watch: {
    data: {
      immediate: true,
      handler () {
        this.handleLogin()
      }
    },
    isLoading: {
      immediate: true,
      handler () {
        this.handleLogin()
      }
    }
  }
}
</script>

<style>

</style>
