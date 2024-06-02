
<script setup lang="ts">


const emit = defineEmits(["close", "update:modelValue", "afterLeave", "afterEnd"]);

/** 当前组件节点 */
const el = ref<HTMLElement>();
/** 弹出框内容节点 */
const contentBox = ref<HTMLElement>();

const contentShow = ref(false);
const contentMove = ref(false);
const contentX = ref('')
const contentY = ref('') 

const props = defineProps({
    modelValue:{
       type:Boolean,
       default:false
     },
     origin:{ // 起始点
        type:Object,
        default:()=>{
          return {x:0,y:0}
        }
     },
     isAnimation:{
       type:Boolean,
       default:true
       
     }
})

watch(() => props.modelValue, function (val) {
  if (val) {
    setTimeout(() => {
        setTimeout(() => {
            contentShow.value = true;
            contentMove.value = true;
        },0);
    }, 0);
  } else {
    contentShow.value = false;
    setTimeout(() => {
        contentMove.value = false;
    },300);
  }
})


onMounted(function () {
  document.addEventListener("click", setContentPosition);
})

onUnmounted(function () {
  document.removeEventListener("click", setContentPosition);
})


function setContentPosition(e:MouseEvent){
       
       if(!props.modelValue || contentShow.value ) return;
        
       const clientWidth = el.value?.clientWidth || 0;
       const clientHeight = el.value?.clientHeight|| 0;;

       const centerX = clientWidth/2;
       const centerY = clientHeight/2;

       let pageX= 0;
       let pageY= 0;

       if(props.origin.x === 0 ){     // 没有初始位置, 就以鼠标点击的位置
           pageX= e.clientX - centerX;
           pageY= e.clientY - centerY;
       }else{
           pageX= props.origin.x - centerX;
           pageY= props.origin.y - centerY;
       }

       const x = `${pageX / clientWidth * 100}vw`;
       const y = `${pageY / clientHeight * 100}vh`;
       contentX.value = x;
       contentY.value = y;

       setVariable(x,y)
}

function setVariable(x: string | null,y: string | null) {
     const el = contentBox.value;
     if (el) {
       el.style.setProperty("--contentX", x);
       el.style.setProperty("--contentY", y);
     }
}

// 关闭
function close(e:MouseEvent){
    if ((e && e.target === el.value ) ) {
        emit("update:modelValue", false);
        emit("close");
    }
}

</script>

<template>
    <Teleport to="body">
        <transition name="fade">
                <div class="dialog" ref="el" v-show="modelValue" @click="close" >
                    <div 
                        ref="contentBox"
                        :class="[{'opened': contentShow},{ 'moving': contentMove }]"
                        :style="{ 'transform':(isAnimation?`translate3d(${contentX}, ${contentY}, 0) scale(0)`:'') }"
                    >
                        <slot></slot>
                    </div>
                </div>
        </transition>
    </Teleport>
</template>

<style lang="scss" scoped>
.dialog{
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center; // 让中间内容部分垂直居中
  justify-content: center; // 让中间内容部分水平居中
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,0.5);
  z-index: 99;
  .dialog-content{
      transform: translate3d(var(--contentX), var(--contentY), 0) scale(0);
  }
  .opened {
      // transition: transform .3s;
      transform: translate3d(0,0,0) scale(1) !important;
  }
  .moving {
      transition: transform .3s;
  }
}

.fade-enter-active, .fade-leave-active {
    transition: all .3s;
}
.fade-enter, .fade-leave-active {
    opacity: 0;
}

</style>