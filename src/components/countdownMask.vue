<template>
  <van-overlay :show="isShowMask" @click="close">
    <div class="wrapper" @click.stop>
      <van-count-down v-if="isShowMask" :time="countdown" @finish="countDownFinish">
        <template #default="{seconds}">
          <span class="countdown-time">{{ seconds }}</span>
        </template>
      </van-count-down>
    </div>
  </van-overlay>
</template>
<script setup lang="ts">
import {ref} from 'vue'

const props = defineProps({
  countdown: {
    type: Number,
    required: true
  },
  countDownFinishCallback: {
    type: Function,
    default: () => {}
  }
})

const isShowMask = ref(false)

// 开启遮罩层
function show() {
  isShowMask.value = true
}

// 关闭遮罩层
function close() {
  isShowMask.value = false
}

// 倒计时结束
function countDownFinish() {
  close()
  props.countDownFinishCallback && props.countDownFinishCallback()
}

// 对外暴露的方法
defineExpose({
  show,
  close
})

</script>


<style scoped lang="scss">
.wrapper {
  display: flex;
  //flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.countdown-time {
  font-size: 80px;
  /*活动倒计时字体渐变色*/
  background: -webkit-linear-gradient(0deg, #FFD700, #FFA500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

</style>
