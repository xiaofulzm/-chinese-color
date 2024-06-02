<script setup lang="ts">

import colors from "~/assets/colors.json";

import { NScrollbar } from "naive-ui"


const colorIndex = ref(0)
const isExplain = ref(false); // 颜色解释
const isParameter = ref(false) // 颜色信息
const origin = ref({ x: 0, y: 0 })

let currentColor = ref<ColorItem>(colors[colorIndex.value]?.colors[0] as ColorItem)


onMounted(() => {
    useHead({
        title: `${currentColor.value?.name}-传统色`,
    })
    setBg(currentColor.value?.RGB);
})

const colorClassify = computed(() => {
    return colors.map(m => { return m?.subjectColor })
})

function changeCurrentColor(current: any) {
    useHead({
        title: `${current.color.name}-传统色`,
    })
    setBg(current.color.RGB);
    currentColor.value = current.color;
}

// 切换颜色类型
function handerClassify(i: number) {
    colorIndex.value = i;
    currentColor.value = colors[colorIndex.value]?.colors[0] as ColorItem ;
    setBg(currentColor.value.RGB);
}


</script>

<template>
    <div class="wrap">
        <div class="eave"></div>
        <div class="content">
            <div class="content-center">
                <ul class="c-list">
                    <ColorItem @changeCurrentColor="changeCurrentColor" v-for="(color, i) of colors[colorIndex]?.colors"
                        :key="i" :color="color" :currentColor="currentColor">
                    </ColorItem>
                </ul>
            </div>
        </div>
        <Tone class="tone-wrap" :currentColor="currentColor"></Tone>
        <Card :currentColor="currentColor"></Card>
        <Theme></Theme>
        <div class="parameter" @click="() => isParameter = !isParameter">
            <svgo-parameter class="p-svg"></svgo-parameter>
        </div>

        <div class="explain-icon" @click="() => { isExplain = !isExplain }">
            <svgo-explain class="p-svg"></svgo-explain>
        </div>

        <div class="color-3d" >
            <NuxtLink to="/color3d">3D</NuxtLink>
        </div>

        <ul class="classify">
            <li class="classify-txt" @click="handerClassify(i)" v-for="(c, i) of colorClassify" :key="i"
                :class="{ 'classify-show': i === colorIndex }">
                {{ c }}
            </li>
        </ul>
        <Hint></Hint>
        <GoTop></GoTop>

        <FuDialog v-model="isParameter" :origin="origin" :isAnimation="false">
            <Tone :currentColor="currentColor"></Tone>
        </FuDialog>

        <FuDialog v-model="isExplain">
            <div class="explain-box">
                <h5 class="e-name">{{ currentColor.name }}</h5>
                <div class="txt-scroll-box">
                    <n-scrollbar style="max-height: 300px">
                        <p class="e-txt" v-html="currentColor.explain"></p>
                    </n-scrollbar>
                </div>
            </div>
        </FuDialog>
    </div>
</template>


<style lang="scss" scoped > 
.wrap {
     display: flex;
     justify-content: center;
     width: 100%;

     .content {
         display: flex;
         margin-top: 68px;
         width: 1200px;

         .content-center {
             display: flex;
             align-items: center;
             justify-content: center;
             width: 800px;

             .c-list {
                 display: flex;
                 flex-wrap: wrap;
                 padding-bottom: 20px;
                 width: 660px;
             }
         }

     }
 }

 .classify {
     position: fixed;
     top: 50%;
     right: 6vw;
     transform: translateY(-50%);

     .classify-txt {
         margin-bottom: 10px;
         display: flex;
         align-items: center;
         justify-content: center;
         width: 36px;
         height: 36px;
         background-color: var(--fu-bg-color);
         border-radius: 50%;
         color: var(--fu-text-color);
         font-family: 'lixunkejingdianxingshu';
         font-size: 20px;
         transition: background-color color 1s;
         cursor: pointer;

         &:hover {
             box-shadow: var(--fu-text-color) 0px 0px 16px;
         }
     }

     .classify-show {
         box-shadow: var(--fu-text-color) 0px 0px 16px;
     }
 }

 .tone-wrap {
     position: fixed;
     top: 68px;
     right: calc((100vw - 1100px)/2);
 }

 .parameter {
     display: none;
     cursor: pointer;
 }

 .explain-icon {
     position: fixed;
     top: 440px;
     right: calc((100vw - 1000px)/2);
     display: flex;
     align-items: center;
     justify-content: center;
     width: 36px;
     height: 36px;
     background-color: var(--fu-bg-color);
     border-radius: 50%;
     transition: background-color 1s;

     .p-svg {
         width: 2em;
         height: 2em;
         color: var(--fu-text-color);
     }

     cursor: pointer;
 }


 .color-3d{
    position: fixed;
     top: 500px;
     right: calc((100vw - 1000px)/2);
     display: flex;
     align-items: center;
     justify-content: center;
     width: 36px;
     height: 36px;
     background-color: var(--fu-bg-color);
     border-radius: 50%;
     font-size: 16px;
     color: var(--fu-text-color);
     font-weight: 600;
     transition: background-color 1s;


 }

 .explain-box {
     box-sizing: border-box;
     padding: 16px;
     width: 600px;
     background-color: #ffffff;
     border-radius: 6px;

     .e-name {
         padding-bottom: 8px;
         font-size: 24px;
     }

     .txt-scroll-box {
         max-height: 300px;

         .e-txt {
             line-height: 26px;
             font-size: 18px;
             text-indent: 2em;
         }
     }
 }

 @media screen and (max-width: 1200px) {
     .wrap {
         .content {
             width: 100vw;
             justify-content: center;

             .content-center {
                 width: 76vw;

                 .c-list {
                     width: 86%;
                 }
             }
         }

         .tone-wrap {
             display: none;
         }

         .parameter,
         .explain-icon {
             position: fixed;
             top: 500px;
             right: var(--fu-small-p-r);
             display: flex;
             align-items: center;
             justify-content: center;
             width: 36px;
             height: 36px;
             background-color: var(--fu-bg-color);
             border-radius: 50%;
             transition: background-color 1s;

             .p-svg {
                 width: 2em;
                 height: 2em;
                 color: var(--fu-text-color);
             }
         }

         .color-3d{
            right: var(--fu-small-p-r);
            top: 620px;
            
         }
         .explain-icon {
             top: 440px;
         }
     }

     .explain-box {
         width: 400px;
         .txt-scroll-box {
             max-height: 600px;
         }
     }

 }

 @media screen and (max-width: 480px) {
     .wrap {
         .content {
             width: 100vw;
             justify-content: center;

             .content-center {
                 width: 100vw;

                 .c-list {
                     justify-content: space-between;
                     width: 92%;
                 }
             }
         }

         .classify {
             top: 14vh;
             right: var(--fu-mini-p-r);
             transform: translateY(0);
         }

         .explain-icon {
             top: 65vh;
             right: var(--fu-mini-p-r);
         }

         .parameter {
             top: 70vh;
             right: var(--fu-mini-p-r);
         }
         
        .color-3d{
            top: 80vh;
            right: var(--fu-mini-p-r);
        }
     }

     .explain-box {
         width: 360px;

         .txt-scroll-box {
             max-height: 600px;
         }
     }
     
 }
 </style>

