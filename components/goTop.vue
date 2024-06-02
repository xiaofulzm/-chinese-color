

<script setup lang="ts" >

const isShow = ref(false)
const scrollTigger = ref(false)

const { scrollTop } = useScroll(() => {
  if (scrollTop.value > 2000) {
    isShow.value = true;
  } else {
    isShow.value = false;
  }
});

function backTop() {
  if (scrollTigger.value) return;
  let d = scrollTop.value;
  let step = d / 2000;
  scrollTigger.value = true;
  let timer = setInterval(() => {
    d -= step;
    step += 20;
    if (d <= 0) {
      scrollTigger.value = false;
      clearInterval(timer)
    }
    document.documentElement.scrollTop = document.body.scrollTop = d
  }, 20)
}


</script>

<template>
  <div class="top-wrap" v-show="isShow" @click="backTop">
    <SvgoTop class="top-svg"></SvgoTop>
  </div>
</template>

  
<style lang="scss" scoped>
.top-wrap {
  position: fixed;
  right: 10vw;
  bottom: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: var(--fu-bg-color);
  border-radius: 50%;
  transition: background-color 1s;
  cursor: pointer;
  .top-svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--fu-text-color);
  }
 
}

@media screen and (max-width: 1200px) {
  .top-wrap {
    right: 10vw;
  }
}

@media screen and (max-width: 480px) {
  .top-wrap {
    right: 1vw;
  }
}
</style>