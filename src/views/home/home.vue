<template>
  <div class="home-container">
    <van-button type="primary" size="large" to="/luckyMoneyOne">方式一: 组件写法</van-button>
    <van-button type="primary" size="large" to="/luckyMoneyTwo">方式二: 类的写法</van-button>
  </div>
</template>
<script setup lang="ts">

</script>

<style scoped lang="scss">
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 20vh;
}

</style>
