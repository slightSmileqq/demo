<template>
  <van-overlay :show="isShowMask" @click="close">
    <div class="wrapper">
      <div class="reward">
        <span class="reward-description">恭喜获得</span>
        <div>
          <span class="reward-amount">20.00</span>
          <span class="reward-amount-description">元</span>
        </div>
      </div>
    </div>
  </van-overlay>
</template>
<script setup lang="ts">
import {ref} from 'vue'

const props = defineProps({
  closeCallback: {
    type: Function,
    default: () => {
    }
  }
})

const isShowMask = ref(false)

// 开启奖品遮罩层
function show() {
  isShowMask.value = true
}

// 关闭奖品遮罩层
function close() {
  isShowMask.value = false
  props.closeCallback && props.closeCallback()
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
  align-items: center;
  justify-content: center;
  height: 100%;
  background-image: url('@/assets/images/reward.png');
  background-repeat: no-repeat;
  background-size: 70vw;
  /*位置居中*/
  background-position: center;
  .reward {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: translateY(-70px);
    .reward-description{
      /*恭喜获得红包字体描述文字*/
      font-size: 20px;
      color: #68150d;
      font-weight: bold;
    }
    .reward-amount{
      /*红包金额*/
      font-size: 45px;
      color: #ea482d;
      font-weight: bold;
    }
    .reward-amount-description{
      /*红包金额描述文字*/
      font-size: 20px;
      color: #F05A6B;
      font-weight: bold;
    }
  }
}


</style>
