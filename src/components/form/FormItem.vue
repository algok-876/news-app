<template>
  <div class="r-form-item">
    <label class="r-label" :class="{enter: labelActive}">{{label}}</label>
    <div class="form-item-content">
      <slot></slot>
      <transition name="errortext">
        <div class="form-item-error" v-if="validateState === 'error'">{{validateMessage}}</div>
      </transition>
    </div>
  </div>
</template>

<script>
import Schema from 'async-validator'
export default {
  name: 'rFormItem',
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    // 起到一个键的作用，方便后期获取对应的值和校验规则
    prop: {
      type: String
    }
  },
  mounted () {
    // 监听到validate事件
    this.$on('validate', this.validate)
    this.$on('setActive', value => {
      this.labelActive = value
    })
  },
  data () {
    return {
      validateState: '',
      validateMessage: '',
      labelActive: false
    }
  },
  methods: {
    validate () {
      // 校验方法
      // 1.拿到对应的表单值
      const value = this.form.model[this.prop]
      const rule = this.form.rules[this.prop]
      // 参数为校验规则键值对
      const schema = new Schema({ [this.prop]: rule })
      // 开始验证，第一个参数为数据源
      return schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.validateState = 'error'
          this.validateMessage = errors[0].message
        } else {
          this.validateState = ''
          this.validateMessage = ''
        }
      })
    }
  }
}
</script>

<style scoped>
.r-form-item{
  position: relative;
  margin-top: 50px;
}
.r-label{
  display: inline-block;
  color: #1781b5;
  font-size: 16px;
  position: absolute;
  left: 10px;
  top: 3px;
  z-index: -1;
  transition: transform .3s ease-out;
}
.r-label.enter{
  transform: translate(-10px, -120%);
}
.form-item-error{
  font-size: 12px;
  color: #f56c6c;
  text-align: right;
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
}
.errortext-enter-active, .errortext-leave-active{
  transition: all .4s;
}
.errortext-enter{
  transform: translateX(-60px);
  opacity: 0;
}
.errortext-enter-to{
  transform: translateX(0);
  opacity: 1;
}
.errortext-leave{
  transform: translateY(0);
  opacity: 1;
}
.errortext-leave-to{
  transform: translateY(10px);
  opacity: 0;
}
</style>
