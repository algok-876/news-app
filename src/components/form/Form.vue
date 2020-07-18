<template>
  <div>
    <form class="r-form">
      <slot></slot>
    </form>
  </div>
</template>

<script>
export default {
  name: 'rForm',
  provide () {
    return {
      form: this
    }
  },
  props: {
    model: {
      required: true,
      type: Object,
      default: () => {}
    },
    rules: {
      required: true,
      type: Object,
      default: () => {}
    }
  },
  methods: {
    validate (cb) {
      // 1.遍历每个子组件，并执行子组件的validate方法
      const task = this.$children.filter(item => item.prop).map(item => item.validate())
      console.log(task)
      Promise.all(task).then(() => {
        // eslint-disable-next-line standard/no-callback-literal
        cb(true)
      }).catch(() => {
        // eslint-disable-next-line standard/no-callback-literal
        cb(false)
      })
    }
  }
}
</script>

<style>

</style>
