
<script setup lang="ts" >

const refBg = ref(null)

onMounted(()=>{
    const {
        canvasDom,
        ctx
    } = initCanvas(window.innerWidth,window.innerHeight,refBg.value);
    drawBg(ctx,window.innerHeight)
})


function drawBg(ctx: CanvasRenderingContext2D | null,h: number){
    const img = new Image();
        img.src = randomImg();
        img.onload = ()=>{
        ctx?.drawImage(img,0,h-img.height);
    }
}

</script>

<template>
    <canvas class="canvas-bg" ref="refBg" ></canvas>
</template>
<style lang="scss" scoped >
  .canvas-bg{
    position: fixed;
    top: 0;
    left: 0;
    z-index: -2;
  }
</style>