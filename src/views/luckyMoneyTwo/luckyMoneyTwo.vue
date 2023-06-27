<template>
  <div class="page-container">
    <van-button type="primary" size="large" @click="startRewardOverlay">展示红包遮罩</van-button>
    <van-field label="持续时长">
      <template #input>
        <van-stepper v-model="duration" input-width="30vw" min="5000" step="1000"/>
      </template>
    </van-field>
    <van-field label="生成速率">
      <template #input>
        <van-stepper v-model="generationRate" input-width="30vw" min="100" step="100"/>
      </template>
    </van-field>
    <van-field label="倒计时">
      <template #input>
        <van-stepper v-model="countdown" input-width="30vw" min="3000" step="1000"/>
      </template>
    </van-field>
    <van-button type="primary" size="large" @click="startLuckyMoneyActive">开启活动</van-button>
  </div>
  <!--  红包活动容器-->
  <div v-if="isShowLuckyMoneyMask" class="lucky-money-container" ref="luckyMoneyContainerRef"></div>
  <!--  奖品遮罩层-->
  <reward-mask ref="rewardMaskRef" :closeCallback="closeLuckyMoneyMask"></reward-mask>
  <!--  倒计时遮罩层-->
  <countdown-mask ref="countdownMaskRef" :countdown="countdown"
                  :countDownFinishCallback="countDownFinishCallback"></countdown-mask>
</template>
<script setup lang="ts">
import LuckyMoneyClass from './luckyMoneyClass'
import {onMounted, ref} from "vue";
import CountdownMask from "@/components/countdownMask.vue";
import RewardMask from "@/components/rewardMask.vue";

const luckyMoneyContainerRef = ref<HTMLImageElement>()
const rewardMaskRef = ref<InstanceType<typeof RewardMask>>()
//#region <创建红包相关>
// 持续时长
const duration = ref(5000)
// 红包生成速率
const generationRate = ref(200)
//#endregion

//#region <展示红包相关>
// 控制显示红包活动
const isShowLuckyMoneyMask = ref(false)

// 开启红包遮罩
function startLuckyMoneyMask() {
  isShowLuckyMoneyMask.value = true
}

// 关闭红包遮罩
function closeLuckyMoneyMask() {
  isShowLuckyMoneyMask.value = false
}

//#endregion

//#region <展示红包结束后奖品相关>

// 开启奖品遮罩层
function startRewardOverlay() {
  rewardMaskRef.value?.show()
}

//#endregion

//#region <倒计时相关>
const countdownMaskRef = ref<InstanceType<typeof CountdownMask>>()
// 倒计时时间 单位ms
const countdown = ref(4000)
// 倒计时结束回调
function countDownFinishCallback() {
  createLuckyMoneyInterval(duration.value, generationRate.value)
}
//开启倒计时遮罩层
function showCountdownMask() {
  countdownMaskRef.value?.show()
}

//#endregion
// 开启红包活动
function startLuckyMoneyActive() {
  showCountdownMask()
}

/**
 * 定时创建红包
 * @param duration 持续时长 单位ms
 * @param timeInterval 红包生成速率 单位ms
 */
function createLuckyMoneyInterval(duration: number, timeInterval: number) {
  // 打开红包遮罩
  startLuckyMoneyMask()
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
      // 红包活动结束，打开奖励遮罩
      startRewardOverlay()
    } else {
      // 创建红包
      luckyMoneyContainerRef.value && new LuckyMoneyClass({
        parent: luckyMoneyContainerRef.value,
      })
    }
  }, timeInterval);
}

onMounted(() => {
  // createLuckyMoneyInterval(5000, 200)
})
</script>

<style scoped lang="scss">
.page-container {
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
  background: linear-gradient(180deg, rgba(255, 215, 0, 1) 0%, rgba(255, 165, 0, 1) 100%);
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>
