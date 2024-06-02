<script setup>

const isHint = ref(false)

</script>

<template>
    <div class="hint-wrap" @click="()=>isHint = !isHint" >
      <svg t="1713251946909" class="hint-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6281" width="48" height="48">
        <path :fill="'var(--fu-text-color)'" d="M439.327448 917.258927c-24.148115 0-44.980558-8.657586-60.242879-25.036387-10.11075-10.838356-22.178156-30.269826-22.178156-61.207903 0-59.1878 37.622634-193.822468 71.207108-304.752134-15.71055 6.734701-32.817981 14.190868-48.63189 21.194711L202.435026 625.873859l130.162606-143.358772c39.674461-43.696247 75.555344-74.301734 109.694476-93.566397 36.571648-20.635959 68.2097-30.666888 96.721402-30.666888l1.030519 0 1.028472 0.052191c1.117504 0.056285 2.282082 0.089032 3.475315 0.125873 12.881996 0.393992 36.859211 1.126714 54.837516 20.518273 11.690811 12.60876 17.254793 29.243401 16.546632 49.458761-0.035817 8.786528-1.163555 24.879814-37.098676 145.172158-28.517842 95.774798-42.681079 150.884527-49.608171 182.556349 18.087805-7.987288 39.14641-17.637528 57.995591-26.560163l234.344267-110.922503L632.793788 796.406808c-52.719171 49.633755-90.968098 80.972987-116.930622 95.808569C486.372114 909.066968 461.33675 917.258927 439.327448 917.258927zM576.715965 318.54901c-25.343394 0-47.805019-9.523344-64.956453-27.539514-16.617243-17.431834-25.410935-40.629252-25.410935-67.065589 0-31.251224 10.825052-59.522437 31.303415-81.756877 21.342074-23.186161 48.606306-35.44698 78.837245-35.44698 25.580812 0 48.160123 9.268529 65.294161 26.801675 16.876152 17.309031 25.779343 40.011145 25.779343 65.685082 0 31.131491-10.834262 58.817345-32.202944 82.286975C627.487691 312.125409 597.208655 318.54901 576.715965 318.54901z" p-id="6282"></path>
      </svg>
      <FuDialog v-model="isHint" >
          <div class="hint-box" >
              <p class="hint-txt"  >
                  数据来源于豆瓣用户<a class="source" target="_blank" href="https://www.douban.com/people/67833849/?_i=3254945Xb0q4Jp" >禁代布丁</a>。
                  颜色分为八个大类：红,橙,黄,绿,青,蓝,紫,灰褐,共收录一千多个中国传统色颜色。色彩来历或解释，以及参考出处分别来源于:  
              </p>
              <p class="hint-txt-s" >1.《中国传统色》和《中国传统色:色彩通识100讲》</p>
              <p class="hint-txt-s" >2.《色谱》中科院科技情报编委会名词室. 科学出版社</p>
              <p class="hint-txt-s" >3. &nbsp;&nbsp;画师AJChan整理的《中国色彩图典》</p>
              <p class="hint-txt-s" >4. &nbsp;&nbsp;中国国家地理杂志《中华遗产》增刊《中国美色》</p>
              <p class="hint-txt-s" >5. &nbsp;&nbsp;黄仁达的《中国颜色》</p>
              <p class="hint-txt" >因为所有色值和解释都是数据源作者一个一个手打数字制表,错漏不可避免,请各位谨慎地带有批判精神地使用 ~ （ 有啥问题,不负责！）如果有什么关于传特颜色的资料也可以告诉ta！ </p>
              <p class="hint-txt-s" >( 部分字体可能会有偏差, 原因是使用的字体库中没有改字的字体 )</p>
              
            </div>
      </FuDialog>
    </div>
</template>
<style scoped lang="scss">
  .hint-wrap{
      position: fixed;
      top: 100px;
      right: 6vw;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background-color: var(--fu-bg-color);
      border-radius: 50%;
      transition: background-color 1s;
      cursor: pointer;
      .hint-svg{
        transform: scale(0.7);
      }
  }

  .hint-box{
    box-sizing: border-box;
    padding: 16px 12px 16px 10px;
    width: 600px;
    background-color: #ffffff;
    border-radius: 6px;
    .hint-txt{
      margin-top: 10px;
      line-height: 26px;
      font-size: 18px;
      text-indent: 2em;
      .source{
          font-size: 18px;
          color: #EE4866;
      }
    }
    .hint-txt-s{
      text-indent: 4em;
      line-height: 22px;
      font-size: 16px;
    }
  }

  @media screen and (max-width: 1200px) {
      .hint-wrap{
        right:6vw;
      }
      .hint-box{
        width: 400px;
        .hint-txt-s{
          text-indent:1em;
        }
      }
    }

    @media screen and (max-width: 480px) {
      .hint-wrap{
         top: 60px;
        right:var(--fu-mini-p-r);
      }
      .hint-box{
        width: 360px;
        .hint-txt-s{
          text-indent:1em;
        }
      }
    }
</style> 