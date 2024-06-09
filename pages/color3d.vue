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
    CanvasTexture,
    Group,
    Float32BufferAttribute,
    PointsMaterial,
    Points,
    SphereGeometry,
    LineBasicMaterial,
    LineLoop
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
    let cardGroup,starGroup;
    
    const raycaster = new Raycaster();

    onMounted(()=>{
        useHead({
            title: `传统色-3D`,
        })

        init();
        window.addEventListener('resize', onWindowResize);

        renderer.domElement.addEventListener('click', focusCard)
    })

    onUnmounted(()=>{
        window.removeEventListener('resize', onWindowResize);
    })
    
    // 聚焦场景卡片
    function focusCard (event){

            const px = event.offsetX;
            const py = event.offsetY;
  
            const x = (px / window.innerWidth) * 2 - 1;
            const y = -(py / window.innerHeight) * 2 + 1;
        
            raycaster.setFromCamera(new Vector2(x, y), camera);
        
            const intersects = raycaster.intersectObjects(cardGroup.children);
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
                    controls.target.set(obj.tx, obj.ty, obj.tz);
                    controls.update();//内部会执行.lookAt()
                })
                .start();
            }
    }


    // 初始化
    function init(){

        cardGroup = new Group();
        starGroup = new Group();
        

        w = window.innerWidth;
        h = window.innerHeight;

        // 实例化一个透视投影相机对象
        const fov = 75; // 视野
        const aspect = w/h;
        const near = 1; 
        const far = 6000; 
        camera = new PerspectiveCamera(fov, aspect, near, far );
        camera.position.set(0,0,180); 
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
        controls.enablePan = false; 
        controls.enableZoom = false;
        controls.enableRotate = false;
    

        controls.addEventListener('change',()=>{ //相机位置与目标观察点距离
            renderer.render(scene,camera); //执行渲染操作

        });//监听鼠标、键盘事件

        colorMesh();
        createStar();

        render();
    }
    function render(){
      requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
      TWEEN.update();
      renderer.render(scene,camera); //执行渲染操作
    }

    // 监听浏览器窗口
    function onWindowResize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // 生成卡片场景
    async function colorMesh(){
        
        colorsArr.value.forEach((c,ci)=>{

                let x = Math.random()>0.5?-Math.random()*200:Math.random()*200,
                    y = Math.random()>0.5?-Math.random()*200:Math.random()*200,
                    z = Math.random()>0.5?-Math.random()*200:Math.random()*200;

                const canvas = createCanvas(c);//创建一个canvas画布
                const texture = new CanvasTexture(canvas);
                
                const spriteMaterial = new SpriteMaterial({
                    map: texture,
                    opacity:0,
                    transparent:true
                });
                const sprite = new Sprite(spriteMaterial);
                sprite.name = c.name;
                // 控制精灵大小(sprite宽高比和canvas画布保持一致)
                const s = 0.05;//通过canvas宽高度缩放后，设置sprite.scale，避免图文宽高比变形
                const cx = canvas.width*s;
                const cy = canvas.height*s;
                sprite.scale.set(cx, cy, 1);
                sprite.position.set(x,y,z); //标签底部箭头和空对象标注点重合  
                cardGroup.add(sprite); 
                
        })
        scene.add(cardGroup); 

        // console.log(cardGroup);
        
        cardGroup.children.forEach((card,i)=>{
            // console.log(i,(parseInt(i/100)/2*1000));
            // new TWEEN.Tween({
            //         // 相机开始坐标
            //         x: card.position.x,
            //         y: card.position.y,
            //         z: card.position.z,
            //     })
            //     .to({
            //         // 相机结束坐标
            //         x: Math.random()>0.5?-Math.random()*200:Math.random()*200,
            //         y: Math.random()>0.5?-Math.random()*200:Math.random()*200,
            //         z: Math.random()>0.5?-Math.random()*200:Math.random()*200,
            //     }, 5000)
            //     .delay((parseInt(i/100)/2*1000))
            //     .onUpdate(function (obj) {
            //         card.position.set(obj.x, obj.y, obj.z)
            //     })
            //     .start();
             new TWEEN.Tween({
                    // 相机开始坐标
                    o:0,
                })
                .to({
                    // 相机结束坐标
                    o:1
                },3000)
                .delay((parseInt(i/100)/2*1000))
                .onUpdate(function (obj) {
                    card.material.opacity = obj.o;
                    // card.position.set(obj.x, obj.y, obj.z)
                })
                .start()
            
        })

        setTimeout(()=>{
            // console.log('执行');
            new TWEEN.Tween({
                ry:0,
            })
            .to({
                ry:Math.PI*2,
            },5000)
            .onUpdate(function (obj) {
                cardGroup.rotation.y = obj.ry;
            })
            .onComplete(()=>{
                controls.enableZoom = true;
                controls.enableRotate = true;
                controls.minDistance = -250;
                controls.maxDistance = 250;

            })
            .start()
        },8000)

    }
   
    // 根据颜色生成卡片贴图
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


    function createStar(){

        const geometry = new SphereGeometry( 400,50, 26 );

        const roundPoint  = geometry.attributes.position.array;
      
        const roundGeometry = new BufferGeometry();
        var vertices = [];
        for (let i = 0; i < roundPoint.length; i+=3) {

            const x = roundPoint[i]+Math.random()*30;
            const y = roundPoint[i+1]+Math.random()*30;
            const z = roundPoint[i+2];
            
            vertices.push(x, y, z);
        }
  
        roundGeometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));

        // 创建粒子的材质
        const material = new PointsMaterial({
            size: 1,
            color: 0xffffff
        });

        // 使用几何体和材质创建粒子系统
        const particles = new Points(roundGeometry, material);
        starGroup.add(particles)
        scene.add(starGroup)

        // const radius = 6371;

        // const r = radius, starsGeometry = [ new BufferGeometry(), new BufferGeometry() ];

        // const vertices1 = [];
        // const vertices2 = [];

        // const vertex = new Vector3();

        // for ( let i = 0; i < 250; i ++ ) {

        //     vertex.x = Math.random() * 2 - 1;
        //     vertex.y = Math.random() * 2 - 1;
        //     vertex.z = Math.random() * 2 - 1;
        //     vertex.multiplyScalar( r );

        //     vertices1.push( vertex.x, vertex.y, vertex.z );

        // }

        // for ( let i = 0; i < 1500; i ++ ) {

        //     vertex.x = Math.random() * 2 - 1;
        //     vertex.y = Math.random() * 2 - 1;
        //     vertex.z = Math.random() * 2 - 1;
        //     vertex.multiplyScalar( r );

        //     vertices2.push( vertex.x, vertex.y, vertex.z );

        // }

        // starsGeometry[ 0 ].setAttribute( 'position', new Float32BufferAttribute( vertices1, 3 ) );
        // starsGeometry[ 1 ].setAttribute( 'position', new Float32BufferAttribute( vertices2, 3 ) );

        // const starsMaterials = [
        //     new PointsMaterial( { color: 0x9c9c9c, size: 2, sizeAttenuation: false } ),
        //     new PointsMaterial( { color: 0x9c9c9c, size: 1, sizeAttenuation: false } ),
        //     new PointsMaterial( { color: 0x7c7c7c, size: 2, sizeAttenuation: false } ),
        //     new PointsMaterial( { color: 0x838383, size: 1, sizeAttenuation: false } ),
        //     new PointsMaterial( { color: 0x5a5a5a, size: 2, sizeAttenuation: false } ),
        //     new PointsMaterial( { color: 0x5a5a5a, size: 1, sizeAttenuation: false } )
        // ];

        // for ( let i = 0; i < 30; i ++ ) {

        //     const stars = new Points( starsGeometry[ i % 2 ], starsMaterials[ i % 6 ] );

        //     stars.rotation.x = Math.random() * 6;
        //     stars.rotation.y = Math.random() * 6;
        //     stars.rotation.z = Math.random() * 6;
        //     stars.scale.setScalar( i * 10 );

        //     stars.matrixAutoUpdate = false;
        //     stars.updateMatrix();

        //     starGroup.add( stars );

        // }

        // console.log(starGroup);
        // scene.add(starGroup)

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