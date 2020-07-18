<template>
  <div class="loading-wrapper">
    <div class="loading">
      <div class="chunk">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="text">
        <slot>加载中...</slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading-wrapper{
  width: 100%;
  display: flex;
  justify-content: center;
  .loading{
    .chunk{
      display: flex;
      justify-content: center;
    }
    span{
      display: inline-block;
      background-color: #475164;
      width: 6px;
      height: 25px;
      border-radius: 5px;
      margin: 0 2px;
      animation: load .8s ease infinite;
      &:nth-child(2) {
        animation-delay: .1s;
      }
      &:nth-child(3) {
        animation-delay: .2s;
      }
      &:nth-child(4) {
        animation-delay: .3s;
      }
      &:nth-child(5) {
        animation-delay: .4s;
      }
    }
    .text{
      margin-top: 20px;
      color: #0eb0c9;
    }
  }
}
@keyframes load{
  0%, 100%{
    transform: scaleY(1.5);
    background-color: #5dbe8a;
  }
  50% {
    transform: scaleY(1);
    background-color: #475164;
  }
}
</style>
