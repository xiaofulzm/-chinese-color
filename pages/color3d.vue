<script setup>

    import { computed } from 'vue';

    import colors from "~/assets/colors.json";

    import { 
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    AxesHelper,
    MeshBasicMaterial,
    PlaneGeometry,
    Mesh,
    DoubleSide,
    InstancedMesh,
    Color,
    Matrix4,
    BufferGeometry,
    Vector3,
    AmbientLight,
    MeshPhongMaterial,
    IcosahedronGeometry,
    Vector2,
    Raycaster,
    SpriteMaterial,
    Sprite,
    CanvasTexture
    } from 'three';

    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

    import * as TWEEN from '@tweenjs/tween.js';

    definePageMeta({
        layout: "threeLayout",
    });

    const colorsArr =  computed(()=>{
        let arr = [];
        colors.forEach((c,ci)=>{
            arr.push(...c.colors)
        })
        return arr;
    })

    const containerRef = ref(null);

    let w = 0,h = 0;
    let camera,scene,renderer,controls;
    
    const raycaster = new Raycaster();

    onMounted(()=>{
        init();
        window.addEventListener('resize', onWindowResize);

        renderer.domElement.addEventListener('click', function (event) {
            // .offsetY、.offsetX以canvas画布左上角为坐标原点,单位px
            const px = event.offsetX;
            const py = event.offsetY;
            //屏幕坐标px、py转WebGL标准设备坐标x、y
            //width、height表示canvas画布宽高度
            const x = (px / window.innerWidth) * 2 - 1;
            const y = -(py / window.innerHeight) * 2 + 1;
            //创建一个射线投射器`Raycaster`
            //.setFromCamera()计算射线投射器`Raycaster`的射线属性.ray
            // 形象点说就是在点击位置创建一条射线，射线穿过的模型代表选中
            raycaster.setFromCamera(new Vector2(x, y), camera);
            //.intersectObjects([mesh1, mesh2, mesh3])对参数中的网格模型对象进行射线交叉计算
        
            const intersects = raycaster.intersectObjects(scene.children);
            if (intersects.length > 0) {
                const card = intersects[0].object;
                const {x,y,z} =  card.position;

                const pos = new Vector3();
                card.getWorldPosition(pos); //获取三维场景中某个对象世界坐标
                const pos2 = pos.clone().addScalar(10);

                new TWEEN.Tween({
                    // 相机开始坐标
                    x: camera.position.x,
                    y: camera.position.y,
                    z: camera.position.z,
                    // 相机开始指向的目标观察点
                    tx: controls.target.x,
                    ty: controls.target.y,
                    tz: controls.target.z,
                })
                .to({
                    // 相机结束坐标
                    x: pos2.x,
                    y: pos2.y,
                    z: pos2.z,
                    // 相机结束指向的目标观察点
                    tx: x,
                    ty: y,
                    tz: z,
                }, 2000)
                .onUpdate(function (obj) {
                    camera.position.set(obj.x, obj.y, obj.z);
                    // 动态计算相机视线
                    // camera.lookAt(obj.tx, obj.ty, obj.tz);
                    controls.target.set(obj.tx, obj.ty, obj.tz);
                    controls.update();//内部会执行.lookAt()
                })
                .start();
            }
        })
    })

    onUnmounted(()=>{
        window.removeEventListener('resize', onWindowResize);
    })
    


    function init(){
        

        w = window.innerWidth;
        h = window.innerHeight;

        // 实例化一个透视投影相机对象
        const fov = 75; // 视野
        const aspect = w/h;
        const near = 1; 
        const far = 6000; 
        camera = new PerspectiveCamera(fov, aspect, near, far );
        camera.position.set(0,0,50); 
        camera.lookAt(0,0,0);//指向mesh对应的位置 

        scene = new Scene();

        renderer = new WebGLRenderer({antialias:true});
        renderer.setSize(w,h); //  画布尺寸
        renderer.setPixelRatio(window.devicePixelRatio); // 像素比
        // this.renderer.setClearColor(0x444444, 1.0); // 背景色
        renderer.render(scene,camera);
        // 添加到页面
        containerRef.value.append(renderer.domElement)

        // AxesHelper：辅助观察的坐标系    
        const axesHelper = new AxesHelper(150);
        // scene.add(axesHelper);

        // 设置相机控件轨道控制器OrbitControls
        controls = new OrbitControls(camera,renderer.domElement);
        controls.addEventListener('change',()=>{ //相机位置与目标观察点距离
            renderer.render(scene,camera); //执行渲染操作

        });//监听鼠标、键盘事件

        colorMesh();
        render();
        console.log(scene);
    }
    function render(){
      requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
      TWEEN.update();
      renderer.render(scene,camera); //执行渲染操作
    }

    function onWindowResize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    async function colorMesh(){
        
        colorsArr.value.forEach((c,ci)=>{

                let x = Math.random()>0.5?-Math.random()*200:Math.random()*200,
                y = Math.random()>0.5?-Math.random()*200:Math.random()*200,
                z = Math.random()>0.5?-Math.random()*200:Math.random()*200;

                const canvas = createCanvas(c);//创建一个canvas画布
                const texture = new CanvasTexture(canvas);
                
                const spriteMaterial = new SpriteMaterial({
                    map: texture,
                });
                const sprite = new Sprite(spriteMaterial);
                sprite.name = c.name;
                // 控制精灵大小(sprite宽高比和canvas画布保持一致)
                const s = 0.05;//通过canvas宽高度缩放后，设置sprite.scale，避免图文宽高比变形
                const cx = canvas.width*s;
                const cy = canvas.height*s;
                sprite.scale.set(cx, cy, 1);
                sprite.position.set(x,y,z); //标签底部箭头和空对象标注点重合  
                scene.add(sprite); //tag会标注在空对象obj对应的位置
        })
        
    }

    function createCanvas(data) {
        
        const canvas = document.createElement("canvas");
        const dpr = window.devicePixelRatio || 1;
        const w= 60;
        const h = 228;
        canvas.width = w;
        canvas.height = h;

        const c = canvas.getContext('2d');
        c.scale(dpr,dpr);

        c.beginPath();
        c.fillStyle = data.hex;
        c.fillRect(0,0,w,h);
        c.closePath();

        c.beginPath();
        c.fillStyle = "#000000";
        c.font = "20px STKaiti,KaiTi,PMingLiU,DFKai-SB"; 
        const fontArr = data.name.split("");
       
        fontArr.forEach((text,i)=>{
            const textH =  fontArr.length >1?(30*(i+1))+(h/fontArr.length/2):(h/2);
            c.textAlign = 'center';
            c.fillText(text,(w/2)-10,(30*(i+1)));
        })
        c.closePath();

        return canvas;
    }

</script>

<template>
  <div class="box-3d" ref="containerRef"  >
  </div>
</template>
<style >
    .box-3d{
      overflow: hidden;
      background-color: #000000;
    }
    .box{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 100px;
      cursor:pointer;
    }
  .tag{
      color: #ffffff;
      font-size: 12px;
      writing-mode: vertical-rl;
      font-family: STKaiti, KaiTi, PMingLiU, DFKai-SB;
      font-size: 12px;
    }
</style>