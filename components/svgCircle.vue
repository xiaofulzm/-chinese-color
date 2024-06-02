<script setup lang="ts" >

const props = defineProps({
    w: { 
        type: Number,
        default: 80
    },
    toneName:{
      type:String,
      default:()=>''
    },
    cTone:{
      type:Number,
      default:()=>20
    },
    bgColor:{
      type:String,
      default:()=>'cyan'
    }
})

const cx = computed(()=> props.w/2);
const cy = computed(()=> props.w/2);
const r = computed(()=> (props.w/2 - 10));

const dasharray = computed(()=> {
    const per = props.cTone/100;
    const girth = Math.PI*r.value*2;
    const beg = girth*(per*360/360);
    return `${beg} ${girth}`
})

</script>

<template>
    <svg  :width="w+'px'" :height="w+'px'">
          <circle
              :cx="cx"
              :cy="cy"
              :r="r"
              fill-opacity="0"
              stroke-width="4"
              stroke="#eee"
          />
         <circle
          class="circle"
          :cx="cx"
          :cy="cy"
          :r="r"
          fill-opacity="0"
          stroke-width="4"
          :stroke="bgColor"
          stroke-opacity="0.5"
          :stroke-dasharray="dasharray"
          stroke-linecap="round"
          :transform="`rotate(-90 ${cx} ${cx})`"
      />
       <text :x="cx"  :y="cy" dy="5" :style="{fill:bgColor}" style="font-size: 18px;" text-anchor="middle"> {{toneName}}-{{cTone}}</text>
    </svg>
  </template>

<style lang="scss" scoped>
.circle{
  transition:stroke-dasharray 1s linear;
}
</style>