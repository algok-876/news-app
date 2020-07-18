<template>
  <div>
    <center>
      <Form class="login-container" :model="userInfo" :rules="rules" ref="regForm" @submit.native.prevent="handleSubmit">
        <form-item prop="loginId" label="用户名">
          <Input type="text" v-model="userInfo.loginId" />
        </form-item>
        <form-item prop="loginPwd" label="密码">
          <Input type="password" v-model="userInfo.loginPwd" />
        </form-item>
        <form-item prop="pwdAgain" label="确认密码">
          <Input type="password" v-model="userInfo.pwdAgain"/>
        </form-item>
        <form-item prop="nickname" label="昵称">
          <Input type="text" v-model="userInfo.nickname" />
        </form-item>
        <submit-button style="margin-top: 40px">注册</submit-button>
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
import { reg } from '../service/userService'
export default {
  data () {
    return {
      userInfo: {
        loginId: '',
        loginPwd: '',
        pwdAgain: '',
        nickname: ''
      },
      rules: {
        loginId: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        loginPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        pwdAgain: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur' }
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
      this.$refs.regForm.validate(valid => {
        if (valid) {
          if (this.userInfo.loginPwd !== this.userInfo.pwdAgain) {
            const pwdExamples = this.$refs.regForm.$children.find(item => { return item.prop === 'pwdAgain' })
            pwdExamples.validateState = 'error'
            pwdExamples.validateMessage = '两次密码不一致'
            return
          }
          reg(this.userInfo).then(res => {
            if (res.code === 0) {
              alert('注册成功')
              this.$router.push({ name: 'Login' })
            } else {
              const userExamples = this.$refs.regForm.$children.find(item => { return item.prop === 'loginId' })
              userExamples.validateState = 'error'
              userExamples.validateMessage = '用户已存在'
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 320px;
}
</style>
