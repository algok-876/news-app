<template>
  <div>
    <center>
      <Form class="login-container" :model="userInfo" :rules="rules" ref="loginForm" @submit.native.prevent="handleSubmit">
        <form-item prop="loginId" label="用户名">
          <Input type="text" v-model="userInfo.loginId" />
        </form-item>
        <form-item prop="loginPwd" label="密码">
          <Input type="password" v-model="userInfo.loginPwd" />
        </form-item>
        <submit-button style="margin-top:40px">{{loginInfo.isLoading ? 'Loading...': '登录'}}</submit-button>
      </Form>
    </center>
  </div>
</template>

<script>
import Form from '../components/form/Form'
import FormItem from '../components/form/FormItem'
import Input from '../components/form/Input'
import center from '../components/Center'
import SubmitButton from '../components/form/SubmitButton'
// import { userLogin } from '../service/userService'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      userInfo: {
        loginId: '',
        loginPwd: ''
      },
      rules: {
        loginId: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        loginPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    Input,
    center,
    FormItem,
    Form,
    SubmitButton
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          const res = await this.$store.dispatch('login/login', this.userInfo)
          if (res) {
            // 登录成功
            this.$router.push({ name: 'Index' })
          } else {
            // 登录失败
            const userExamples = this.$refs.regForm.$children.find(item => { return item.prop === 'loginId' })
            userExamples.validateState = 'error'
            userExamples.validateMessage = '用户或密码错误！'
          }
        } else {
          console.log('校验失败')
        }
      })
    }
  },
  computed: {
    ...mapState('login', ['loginInfo'])
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 320px;
}
</style>
