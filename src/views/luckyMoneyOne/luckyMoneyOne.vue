<template>
  <div class="page-container">
11111
  </div>
<!--  红包活动容器-->
  <div v-if="isShowLuckyMoneyActive" class="lucky-money-container" ref="luckyMoneyContainerRef"></div>
</template>
<script setup lang="ts">
import LuckyMoney from "@/views/luckyMoneyOne/components/luckyMoney.vue";
import {ref, h, render, onMounted} from "vue";

const luckyMoneyContainerRef = ref<HTMLImageElement>()
const isShowLuckyMoneyActive = ref(false)
// 开启红包活动
function startLuckyMoneyActive() {
  isShowLuckyMoneyActive.value = true
}
// 关闭红包活动
function closeLuckyMoneyActive() {
  isShowLuckyMoneyActive.value = false
}
// 创建红包
function createLuckyMoney() {
  /**
   * 为什么不直接使用render函数将虚拟dom渲染到luckyMoneyContainerRef中呢？
   * 因为render函数将虚拟dom渲染到容器dom的时候，会将容器中的所有内容清空，导致我们之前添加的红包都消失不见。
   * 下方是采用方式：先创建一个div容器，将虚拟dom渲染到这个div容器中，这个时候这个div容器实际上结构已经和真实dom一样了，
   * 然后再将这个div容器的第一个子元素（就是我们创建的红包）使用原生的方式添加到luckyMoneyContainerRef容器中，这样就避免了上述的问题。
   * */
      // 使用h函数创建虚拟dom，再使用render函数将虚拟dom渲染为真实dom，最后将真实dom添加到容器中
  const container: HTMLDivElement = document.createElement('div')
  render(h(LuckyMoney), container)
  const firstChild = container.firstElementChild
  firstChild && luckyMoneyContainerRef.value?.appendChild(firstChild)
}

// 定时创建红包
/**
 * 创建红包定时器
 * @param duration 持续时长 单位ms
 * @param timeInterval 时间间隔 单位ms
 */
function createLuckyMoneyInterval(duration: number, timeInterval: number) {
  // 红包活动开始
  startLuckyMoneyActive()
  // 定时器存放变量
  let timer: NodeJS.Timer | null = null
  // 定时器开始时间
  const startTime = new Date().getTime()
  console.log('开始掉落红包')
  timer = setInterval(() => {
    // 获取当前时间戳
    const now = new Date().getTime()
    // 当前时间戳 - 定时器开始时间 > 持续时长
    if (now - startTime >= duration) {
      // 清除定时器
      clearInterval(timer as NodeJS.Timer)
      timer = null
      console.log('结束掉落红包')
      // 红包活动结束
      closeLuckyMoneyActive()
    } else {
      // 创建红包
      createLuckyMoney()
    }
  }, timeInterval);
}

onMounted(() => {
  createLuckyMoneyInterval(5000, 200)
})
</script>

<style scoped lang="scss">
.page-container{
  width: 100vw;
  height: 100vh;
  background: #fff;
}
.lucky-money-container {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  /*红包雨背景颜色，渐变，微透明*/
  background: linear-gradient(180deg, rgba(255,215,0,0.1) 0%, rgba(255,165,0,0.3) 100%);
}
</style>
