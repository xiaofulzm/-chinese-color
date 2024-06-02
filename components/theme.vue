
<script setup lang="ts" >

const theme = useTheme();

onMounted(()=>{
    document.documentElement.setAttribute("class",theme.value);
})

function handleTheme(themeType:string) {
    document.documentElement.setAttribute("class",themeType);
    setTheme(themeType)
    theme.value = themeType
}

</script>

<template>
    <div class="theme-wrap" >
        <svgo-light @click="handleTheme('')" v-show="theme==='dark'" class="theme-svg" ></svgo-light>
        <svgo-dark  @click="handleTheme('dark')" v-show="theme == '' || theme == undefined"  class="theme-svg" ></svgo-dark>
    </div>
  </template>

<style lang="scss" scoped>
    .theme-wrap{
      position: fixed;
      top: 380px;
      right: calc((100vw - 1000px)/2);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background-color: var(--fu-bg-color);
      border-radius: 50%;
      transition: background-color 1s;
      cursor: pointer;
      .txt{
        color: var(--fu-text-color);
        font-family:'lixunkejingdianxingshu';
        font-size: 20px;
        transition: color 1s;
      }
      .theme-svg{
        // transform: scale(0.8);
        width: 1.5em;
        height: 1.5em;
        color: var(--fu-text-color);
      }

    }

    @media screen and (max-width: 1200px) {
      .theme-wrap{
        right:var(--fu-small-p-r);
      }
    }

    @media screen and (max-width: 480px) {
      .theme-wrap{
        top: 60vh;
        right:var(--fu-mini-p-r);
      }
    }
  
</style>