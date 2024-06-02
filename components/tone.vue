<script setup lang="ts" >

const props = defineProps({
    currentColor:{ // 当前选中的颜色
      type:Object,
      default:()=>{},
    }
})

const cmyk = computed(()=> {
    const arr = [
           {
             name:"C",
             color:"Cyan",
             num:0
           },
           {
             name:"M",
             color:"magenta",
             num:0
           },
           {
             name:"Y",
             color:"yellow",
             num:0
           },
           {
             name:"K",
             color:"black",
             num:0
           },

         ]
        
        return arr.map((item,i)=>{
            item.num = props.currentColor.CMYK[i];
            return item;
        })
});

const rgb = computed(()=> {
    const arr = [
           {
             name:"R",
             color:"red",
             num:0
           },
           {
             name:"G",
             color:"green",
             num:0
           },
           {
             name:"B",
             color:"blue",
             num:0
           },
         ]
         return arr.map((item,i)=>{
            item.num = props.currentColor.RGB[i];
            return item;
        })
});


</script>

<template>
    <div class="tone">
      <!-- <h6>{{currentColor.name}}</h6> -->
      <div class="circle" >
          <SvgCircle  
              v-for="(n,i) of cmyk" :key="i"
              :cTone="n.num" 
              :bgColor="n.color"
              :toneName="n.name"
          ></SvgCircle>
      </div>
      <ul>
        <li
          class="line" 
          v-for="(n,i) of rgb" :key="i"
        >
          <span class="rgb-name" >{{n.name}}:</span>
          <SvgLine :lineNum="n.num"  :bgColor="n.color" ></SvgLine>
        </li>
      </ul>
      <p class="hex-wrap" >
        <span class="hex" >HEX:</span>
        {{currentColor.hex.toUpperCase()}}
      </p>
    </div>
  </template>

<style lang="scss" scoped>
  .tone{
    padding: 16px;
    border-radius: 6px;
    background-color: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(6px);

    .circle{
      display: flex;
      justify-content: space-between;
    }
    .line{
      margin-top: 10px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      .rgb-name{
        margin-right: 12px;
        font-size: 22px;
        color:var(--fu-text-color);
        transition: color 1s;
      }
    }
    .hex-wrap{
      margin-top: 16px;
      display: flex;
      align-items: center;
      font-size: 22px;
      color:var(--fu-text-color);
      transition: color 1s;
      font-family:STKaiti,KaiTi,PMingLiU,DFKai-SB;
      .hex{
        margin-right: 12px;
        font-size: 22px;
      }
    }
  }
</style>
