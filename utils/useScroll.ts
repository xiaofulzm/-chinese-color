

export function useScroll(cb?:Function){

    const scrollTop = ref(0)

    onMounted(()=>{
        window.addEventListener('scroll',scrollToTop )
    })

    onUnmounted(()=>{
        window.removeEventListener('scroll',scrollToTop)
    })
    
    const scrollToTop = _throttle(()=>{
        scrollTop.value = document.documentElement.scrollTop || document.body.scrollTop;
        cb&&cb();
    })

    return {
        scrollTop
    }

}