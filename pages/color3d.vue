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
    IcosahedronGeometry
    } from 'three';

    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
    let camera,scene,renderer,mesh;
  
    onMounted(()=>{
        init();
        window.addEventListener('resize', onWindowResize);
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
        scene.add( new AmbientLight( 0xffffff ) );

        renderer = new WebGLRenderer({antialias:true});
        renderer.setSize(w,h); //  画布尺寸
        renderer.setPixelRatio(window.devicePixelRatio); // 像素比
        // this.renderer.setClearColor(0x444444, 1.0); // 背景色
       renderer.render(scene,camera);
        // 添加到页面
        containerRef.value.append(renderer.domElement);

            // AxesHelper：辅助观察的坐标系
        const axesHelper = new AxesHelper(150);
        scene.add(axesHelper);

        // 设置相机控件轨道控制器OrbitControls
        const controls = new OrbitControls(camera,renderer.domElement);
        controls.addEventListener('change',()=>{ //相机位置与目标观察点距离
            renderer.render(scene,camera); //执行渲染操作
        });//监听鼠标、键盘事件

        colorMesh();

        render();

    }
    function render(){
      renderer.render(scene,camera); //执行渲染操作
      requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
    }

    function onWindowResize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    async function colorMesh(){
        
        const color = new Color();
        const matrix = new Matrix4(); // 四维矩阵

        const geometry = new PlaneGeometry(10,30)
        const material = new MeshBasicMaterial({
                color: 0xffffff,
                side: DoubleSide
        });
        
        mesh = new InstancedMesh(geometry,material,colorsArr.value.length);

        colorsArr.value.forEach((c,ci)=>{
                matrix.setPosition(
                    Math.random()>0.5?-Math.random()*400:Math.random()*600,
                    Math.random()>0.5?-Math.random()*400:Math.random()*600,
                    Math.random()>0.5?-Math.random()*400:Math.random()*600
                )
                color.setStyle(c.hex)
                mesh.setMatrixAt(ci,matrix); // 单个设置位置, 颜色
                mesh.setColorAt(ci,color);
        })
        scene.add(mesh);

    }

</script>

<template>
  <div class="box-3d" ref="containerRef"  >
  </div>
</template>
<style lang="scss">
    .box-3d{
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
     
    }
</style>