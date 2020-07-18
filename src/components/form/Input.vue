<template>
  <div class="input-wrapper">
    <input :type="type" :value="value" @input="handleInput" v-bind="$attrs" @focus="inputFocus" @blur="inputBlur" class="inputText">
    <span class="underline" :class="{'enter': inputActive}"></span>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'rInput',
  props: {
    value: {
      required: true,
      default: ''
    },
    type: {
      type: String,
      required: true,
      default: 'text'
    }
  },
  data () {
    return {
      inputActive: false
    }
  },
  methods: {
    inputFocus () {
      this.inputActive = true
      this.$parent.$emit('setActive', true)
    },
    inputBlur () {
      if (this.value.trim().length === 0) {
        this.inputActive = false
        this.$parent.$emit('setActive', false)
      }
    },
    handleInput (e) {
      this.$emit('input', e.target.value)
      // 通知父级组件开始校验
      this.$parent.$emit('validate')
    }
  }
}
</script>

<style>
.input-wrapper{
  position: relative;
}
.inputText{
  width: 100%;
  position: relative;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 0;
  background-color: transparent;
  border-bottom: 1px solid #e2e2e2;
  font-size: 16px;
  line-height: .9;
  box-sizing: border-box;
  color: rgb(107, 107, 107);
  color: #132c33;
}
.underline{
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  z-index: 1111;
  background-color: #74759b;
  transition: all .3s ease-out;
  transform: scaleX(0);
}
.inputText ~ label {
  display: inline-block;
  color: #1781b5;
  font-size: 20px;
  position: absolute;
  left: 10px;
  bottom: 5px;
  z-index: -1;
  transition: transform .3s ease-out;
}
.inputText ~ label.enter{
  transform: translate(-10px, -30px);
}
.underline.enter{
  transform: scale(1);
}
</style>
