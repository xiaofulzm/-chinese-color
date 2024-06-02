<template>
    <div> 
      <div class="eave" ></div>
        <slot></slot>
      <CanvasBg></CanvasBg>
      <a class="icp" href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" >皖ICP备2024049550号</a>
    </div>
</template>
<style>
    .eave{
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 50px;
      background-image: url('~/assets/img/bambooLeaves.png');
      background-repeat: repeat-x;
    
    }
    .icp{
      display: inline-block;
      width: 100%;
      line-height: 36px;
      text-align: center;
      color: var(--fu-text-color);
    }
</style>