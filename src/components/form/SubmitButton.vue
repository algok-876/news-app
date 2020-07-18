<template>
  <button type="submit" @click="addRadius" class="effectBtn">
    <slot></slot>
    <span v-if="isShowSpan" :style="{position: 'absolute', left: `${spanX}px`, top: `${spanY}px`}"></span>
  </button>
</template>

<script>
export default {
  data () {
    return {
      spanX: '',
      spanY: '',
      isShowSpan: false,
      time: 1000,
      isActive: true
    }
  },
  methods: {
    addRadius (e) {
      this.$emit('click')
      if (!this.isActive) return
      this.isActive = false
      this.isShowSpan = true
      this.spanX = e.offsetX
      this.spanY = e.offsetY
      setTimeout(() => {
        this.isShowSpan = false
      }, this.time)
      setTimeout(() => {
        this.isActive = true
      }, 1500)
    }
  }
}
</script>

<style>
.effectBtn{
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  border: none;
  outline: none;
  padding: 12px 36px;
  background: linear-gradient(90deg, #0162c8, #55e7fc);
  margin: 10px 0;
  border-radius: 50px;
  color: #ffffff;
  font-size: 18px;
  text-transform: uppercase;
  overflow: hidden;
  cursor: pointer;
}
.effectBtn span{
  background-color: #ffffff;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  animation: animate 1s linear infinite;
  z-index: 999;
}
@keyframes animate {
  from {
      width: 0;
      height: 0;
      opacity: .5;
  }
  to {
      width: 500px;
      height: 500px;
      opacity: 0;
  }
}
</style>
