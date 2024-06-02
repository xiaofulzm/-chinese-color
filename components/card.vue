
<script setup lang="ts" >

const theme = useTheme();

type CanvasPar = {
    canvasDom:HTMLCanvasElement | null
    ctx:CanvasRenderingContext2D | null
}

const imgSrc = ref('')
const canvasObj = reactive<CanvasPar>({
    canvasDom:null,
    ctx:null
});

const props = defineProps({
  currentColor:{ type: Object, required: true },
})

watch(()=>props.currentColor,()=>{
  drawCard(canvasObj.ctx,props.currentColor);
},{ deep: true })

watch(()=>theme,()=>{
  drawCard(canvasObj.ctx,props.currentColor);
},{ deep: true })

onMounted(()=>{
    const {
        canvasDom,
        ctx
    } = initCanvas(120,456);
    canvasObj.canvasDom= canvasDom
    canvasObj.ctx= ctx
    drawCard(ctx,props.currentColor);
    imgSrc.value = randomImg()
})

function handleDownload(){
    download(canvasObj.canvasDom,props.currentColor)
}

</script>

<template>
    <div class="card-wrap" >
      <div class="card card-box" >
          <span class="c-hex" >{{currentColor.hex}}</span>
          <h2 class="c-name" >{{currentColor.name}}</h2>
          <img class="c-img" :src="imgSrc"  />
      </div>
      <!-- <canvas class="card" ref="refCanvas" :width="w" :height="h"  ></canvas> -->
      <div class="download-svg"  @click="handleDownload" >
        <svgo-download class="d-svg" ></svgo-download>
       
      </div>
    </div>
</template>

<style lang="scss" scoped>
  .card-wrap{
    position: fixed;
    top: 380px;
    right: calc((100vw - 760px)/2);
    .card-box{
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 120px;
      height: 456px;
      border-radius: 6px;
      box-shadow: var(--fu-text-color) 0px 0px 4px;
      .c-hex{
        margin-top: 6px;
        width: 100%;
        font-size: 18px;
        font-family:lixunkejingdianxingshu,STKaiti,KaiTi,PMingLiU,DFKai-SB;
        text-align: center;
        color: var(--fu-text-color);
        transition: color 1s;
      }
      .c-name{
        margin-top: 20px;
        letter-spacing: 4px;
        writing-mode: vertical-lr;
        font-size: 38px;
        font-family:lixunkejingdianxingshu,STKaiti,KaiTi,PMingLiU,DFKai-SB;
        font-weight: normal;
        text-align: center;
        color: var(--fu-text-color);
        transition: color 1s;
      }
      .c-img{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
      }
    }
    .download-svg{
      position: absolute;
      right: 0;
      bottom: 6px;
    
      cursor: pointer;
      display: none;
      .d-svg{
        width: 1.5em;
        height: 1.5em;
        color: var(--fu-text-color);

       }
    }
    &:hover{
      .download-svg{
        
        display: block;
      }
    }
  }

  @media screen and (max-width: 1200px) {
      .card-wrap{
        .card{
          display: none;
        }
        .download-svg{
          position: fixed;
          top: 560px;
          right:var(--fu-small-p-r);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background-color: var(--fu-bg-color);
          border-radius: 50%;
          transition: background-color 1s;
          
        }
        &:hover{
          .download-svg{
            display: flex;
          }
        }
      }
      
  }
  @media screen and (max-width: 480px) {
      .card-wrap{
        .download-svg{
            top: 75vh;
            right:var(--fu-mini-p-r);
        }
      }
  }

</style>