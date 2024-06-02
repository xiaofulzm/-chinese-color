
/**
 * @description 设置页面body背景色
 * @param colorArr  rgb数组
 */
export function setBg(colorArr: any[]){
    // document.body.style  = `background-color: rgb(${colorArr[0]},${colorArr[1]},${colorArr[2]});`;
    document.body.setAttribute('style',`background-color: rgb(${colorArr[0]},${colorArr[1]},${colorArr[2]});`)
}


/**
 * @description 随机图片
 */

export function getAssetsUrl(name: String) {return new URL(`../assets/${name}`, import.meta.url).href}

const imgList = [
    {
      url:"/img/pattern1.png"
    },
    {
      url: "img/pattern2.png"
    },
    {
        url: "img/pattern3.png"
    },
    {
        url: "img/pattern4.png"
    },
    {
        url:"img/pattern5.png"
    }
  ]
 
  let randomIndex   = Math.floor(Math.random() * imgList.length)
  export function randomImg():string{
    return imgList[randomIndex].url;
  }
   
/**
 * @description token本地存储
 */
const theme = 'FU-THEME';

export function setTheme(str:string) {
    if (process.client) {
        localStorage.setItem(theme,str);
    }else{
        return undefined
    }
}
export function getTheme() {
    if (process.client) {
        const localItem  = localStorage.getItem(theme);
        return localItem===''?localItem:'dark';
    } {
        return undefined
    }  
}
export function removeTheme() {
    if (process.client) {
        localStorage.removeItem(theme);
    }{
        return undefined
    }
}