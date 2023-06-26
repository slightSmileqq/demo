<template>
  <div class="lucky-money-container" ref="luckyMoneyContainerRef">

  </div>
</template>
<script setup lang="tsx">
import LuckyMoneyClass from './luckyMoneyClass'
import {ComponentPublicInstance, onMounted, onUnmounted, ref} from "vue";

const luckyMoneyContainerRef = ref<ComponentPublicInstance>()
// 定时创建红包
/**
 * 创建红包定时器
 * @param duration 持续时长 单位ms
 * @param timeInterval 时间间隔 单位ms
 */
function createLuckyMoneyInterval(duration: number, timeInterval: number) {
  // 定时器存放变量
  let timer: number | null = null
  // 定时器开始时间
  const startTime = new Date().getTime()
  console.log('开始掉落红包')
  timer = setInterval(() => {
    // 获取当前时间戳
    const now = new Date().getTime()
    // 当前时间戳 - 定时器开始时间 > 持续时长
    if (now - startTime >= duration) {
      // 清除定时器
      clearInterval(timer)
      timer = null
      console.log('结束掉落红包')
    } else {
      // 创建红包
      luckyMoneyContainerRef.value && new LuckyMoneyClass({
        parent: luckyMoneyContainerRef.value,
      })
    }
  }, timeInterval);
}
onMounted(() => {
  createLuckyMoneyInterval(5000, 200)
})
</script>

<style scoped lang="scss">
.lucky-money-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
