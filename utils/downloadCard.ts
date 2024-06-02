

const cardFont = (size:number=16)=>`${size}px lixunkejingdianxingshu,STKaiti,KaiTi,PMingLiU,DFKai-SB`;

import { getAssetsUrl } from "./index";

// 下载卡片
export function initCanvas(w:number=0,h:number=0,dom:HTMLCanvasElement | null = null,){

    let canvasDom:HTMLCanvasElement;
    if(dom){
        canvasDom = dom;
    }else{
        canvasDom = document.createElement('canvas');
    }

    const dpr = window.devicePixelRatio || 1;
    canvasDom.style.width = `${w}px`;
    canvasDom.style.height = `${h}px`;
  
    canvasDom.width = w * dpr;
    canvasDom.height = h * dpr;
  
    const ctx = canvasDom.getContext('2d');
    ctx?.scale(dpr,dpr);
    return {
        canvasDom,
        ctx
    };
}

function canvasBg(ctx: any,w: number,h: number){
    const img = new Image();
    img.src = '/img/bg.png';
    img.onload = ()=>{
        ctx.drawImage(img,0,0);
        ctx.drawImage(img,0,img.height);
    }
}

function  initImage(ctx: any,w: number,h: number){
    const img = new Image();
    img.src = randomImg();
    img.onload = ()=>{
      const ratio = Math.min(w / img.width, h / img.height);
      const scaledWidth = img.width * ratio;
      const scaledHeight = img.height * ratio;
      const x = 0;
      const y = h-scaledHeight;

      ctx.drawImage(img,x,y, scaledWidth, scaledHeight);
    }
}

export async function drawCard(ctx:any,currentColor:ColorItem){

    const theme = useTheme();
    
    const w = ctx?.canvas.style.width.replace("px","");
    const h = ctx?.canvas.style.height.replace("px","");

    ctx.clearRect(0,0,w,h);
    initImage(ctx, w, h);
    canvasBg(ctx, w, h)

    ctx.beginPath();
    ctx.fillStyle = currentColor?.hex;
    ctx.fillRect(0,0,w,h);
    ctx.closePath();

    ctx.beginPath();
    ctx.font = cardFont(18);  
    ctx.fillStyle = theme.value === 'dark'?'#000000':"#ffffff";
    ctx.textAlign = 'center';
    ctx.fillText(currentColor?.hex,w/2,20);
    ctx.font = cardFont(36); 
    currentColor?.name.split("").forEach((text: String,i: number)=>{
        ctx.textAlign = 'center';
        ctx.fillText(text,w/2,(30+50*(i+1)));
    })
    ctx.closePath();
}

export function download(canvasDom:any,currentColor:ColorItem){
    // console.log(canvasDom,'canvasDom');
    // console.log(currentColor,'currentColor');
    
    // const canvas = this.canvasDom;
    // 将canvas转换成base64de url
    let url = canvasDom.toDataURL("image/png");
    // 把Canvas转换为图片
    // Img.src = url;
    // 将base64 转换为文件对象
    let arr = url.split(",")
    let mime = arr[0].match(/:(.*?);/)[1] // 得到文件类型
    let bstr = atob(arr[1]) // 解码base64
    let n = bstr.length
    let u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    // 通过以下方式将以上变量生成文件对象, 三个参数分别为件内容、文件名、文件类型
    let file = new File([u8arr],currentColor?.name,{type:mime});
    // 将文件对象通过a标签下载
    let aDom =  document.createElement("a");
    aDom.download = file.name;  // 设置文件名
    let href = URL.createObjectURL(file); // 将file对象转成 UTF-16 字符串
    aDom.href = href;
    // console.log(href)
    document.body.appendChild(aDom); 
    aDom.click();
    document.body.removeChild(aDom);
    URL.revokeObjectURL(href); // 释放刚才生成的 UTF-16字符串  
  }