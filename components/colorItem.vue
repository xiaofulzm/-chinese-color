<script setup lang="ts">

import { computed } from 'vue';
import { pinyin } from 'pinyin-pro';



const refBox = ref<HTMLElement | null >(null);

const props = defineProps({
  color: { type: Object, required: true },
  currentColor:Object
})
//  
const emit = defineEmits(['changeCurrentColor'])

// 计算值
const colorPinyin = computed(()=>{
    return pinyin(props.color.name,{ type: 'array' });
})

const colorName = computed(()=>{
    return props.color.name;
})

const colorLine = computed(()=>{
    return `rgba(${props.color.RGB[0]},${props.color.RGB[1]},${props.color.RGB[2]},.7)`;
})

// onMounted(()=>{
//     initPosition();
// })
 
// function initPosition(){
//     if(props.color.hex === props?.currentColor.hex){
      
//         emit('changeCurrentColor',{
//             color:props.color,
//         })
//     }
// }


function handleColor(e:Event){
    emit('changeCurrentColor',{
        color:props.color,
    })
}

</script>

<template>
    <li class="c-item" ref="refBox" @click="handleColor" :class="{ 'shadow': color.hex === props?.currentColor.hex }">
        <span class="color-line" :style="{ backgroundColor: colorLine }"></span>
        <p class="txt"><span class="txt-p" v-for="(p, i) of colorPinyin" :key="i">{{ p }} </span></p>
        <p class="txt"><span class="txt-n" v-for="(n, i) of colorName" :key="i">{{ n }}</span></p>
    </li>
</template>

<style lang="scss" scoped >
  .c-item{
      box-sizing: border-box;
      position: relative;
      margin-right: 16px;
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
      padding: 2px 0px 6px 10px;
      font-size: 26px;
      width: 200px;
      height: 48px;
      border-radius:4px;
      cursor: pointer;
      &:hover{
          .color-line{
            width: 200px;
          }
      }
      .color-line{
        position: absolute;
        top: 0;
        left: 0;
        width: 3px;
        height: 100%;
        z-index: -1;
        transition:  width .8s;
        border-radius:4px;

      }
      .txt{
         line-height: 16px;
         color:var(--fu-text-color);
         transition: color 1s;
        .txt-p{
          display: inline-block;
          width: 36px;
          text-align: center;
          font-size: 16px;
        }
        .txt-n{
          display: inline-block;
          width: 36px;
          text-align: center;
          font-size: 20px;
        }
      }
      .color-rgb{
        margin-top: 10px;
      }
      
  }
  .shadow{
    box-shadow: var(--fu-text-color) 0px 0px 4px;
  }

  @media screen and (max-width: 480px) {
      .c-item{
          margin-right: 0;
          justify-content: center;
          width: 170px;
          padding: 0;
          &:hover{
              .color-line{
                width: 170px;
              }
          }
          .color-line{
            width: 170px;
          }
          .txt{
            text-align: center;
            line-height: 20px;
            .txt-p{
              // width: 36px;

            }
            .txt-n{
              font-size: 16px;
              // width: 36px;

            }
          }
      }
  }

</style>