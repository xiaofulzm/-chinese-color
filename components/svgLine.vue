<script setup lang="ts" >

const props = defineProps({
    w: {
        type: Number,
        default: () => 240
    },
    y: {
        type: Number,
        default: () => 30
    },
    lineNum: {
        type: Number,
        default: () => 0
    },
    bgColor: {
        type: String,
        default: () => 'red'
    }
})


const dasharray = computed(()=> `${props.w} ${props.w}`);
const dashoffset = computed(()=> {
    let per = props.lineNum/255;
    return (props.w - props.w*per);
});


</script>


<template>
    <svg :width="w + 'px'" :height="y + 'px'">
        <text style="font-size: 18px;" :style="{ fill: bgColor }" :x="w / 2" :y="y / 2">{{ lineNum }}</text>
        <line x1="2" :y1="y - 2" :x2="w" :y2="y - 2" stroke="#eee" fill-opacity="0" stroke-width="2"> </line>
        <line class="line" x1="2" :y1="y - 2" :x2="w" :stroke-dasharray="dasharray" :stroke-dashoffset="dashoffset" :y2="y - 2"
            :stroke="bgColor" stroke-width="2"> </line>
    </svg>
</template>

  
<style lang="scss" scoped>
.line {
    transition: stroke-dashoffset 1s linear;
}
</style>