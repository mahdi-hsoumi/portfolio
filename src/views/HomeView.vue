<script>
import { Object3D, MathUtils, Plane, Raycaster, Vector3, Vector2 } from "three";
const { randFloat: rnd, randFloatSpread: rndFS } = MathUtils;

import {
  AmbientLight,
  Camera,
  PointLight,
  Renderer,
  Scene,
  InstancedMesh,
  BoxGeometry,
  StandardMaterial,
} from "troisjs";
import LiquidPlane from "troisjs/src/components/liquid/LiquidPlane.js";

export default {
  components: {
    AmbientLight,
    Camera,
    LiquidPlane,
    PointLight,
    Renderer,
    Scene,
    InstancedMesh,
    BoxGeometry,
    StandardMaterial,
  },
  setup() {
    const NUM_INSTANCES = 2000;
    const instances = [];
    const target = new Vector3();
    const dummyO = new Object3D();
    const dummyV = new Vector3();
    for (let i = 0; i < NUM_INSTANCES; i++) {
      instances.push({
        position: new Vector3(rndFS(1), rndFS(1), rndFS(1)),
        scale: rnd(0.2, 1),
        scaleZ: rnd(0.1, 1),
        velocity: new Vector3(rndFS(0.001), rndFS(0.001), rndFS(0.001)),
        attraction: 0.02 + rnd(-0.001, 0.001),
        vlimit: 0.25 + rnd(-0.1, 0.1),
      });
    }
    return {
      WIDTH: 30,
      HEIGHT: 15,
      NUM_INSTANCES,
      instances,
      target,
      dummyO,
      dummyV,
    };
  },
  data() {
    return {
      color: "#fff",
      metalness: 1,
      roughness: 0.7,
      light1Color: "#990000",
      light2Color: "#FF5B00",
      light3Color: "#D4D925",
      light4Color: "#FFEE63",
      mousePosition: null,
    };
  },
  mounted() {
    this.pointer = this.$refs.renderer.three.pointer;
    this.liquidEffect = this.$refs.liquid.liquidEffect;
    this.liquidEffect.addDrop(0, 0, 0.05, 0.05);
    // custom raycaster
    this.raycaster = new Raycaster();
    this.pointerPlane = new Plane(new Vector3(0, 0, 1), 0);
    this.pointerV3 = new Vector3();

    this.renderer = this.$refs.renderer;
    this.imesh = this.$refs.imesh.mesh;
    this.light = this.$refs.light.light;

    this.init();
    window.addEventListener("pointermove", (e) => {
      this.raycaster.setFromCamera(
        new Vector2(
          (e.clientX / window.innerWidth) * 2 - 1,
          -(e.clientY / window.innerHeight) * 2 + 1
        ),
        this.$refs.renderer.three.camera
      );
      this.mousePosition = new Vector3(
        e.clientX / window.innerWidth,
        -(e.clientY / window.innerHeight),
        0
      );
      this.raycaster.ray.intersectPlane(this.pointerPlane, this.pointerV3);
      const x = (2 * this.pointerV3.x) / this.WIDTH;
      const y = (2 * this.pointerV3.y) / this.HEIGHT;
      this.liquidEffect.addDrop(x, y, 0.05, 0.005);
    });
  },

  methods: {
    onPointerMove() {
      // this.raycaster.setFromCamera(
      //   this.pointer.positionN,
      //   this.$refs.renderer.three.camera
      // );
      // this.raycaster.ray.intersectPlane(this.pointerPlane, this.pointerV3);
      // const x = (2 * this.pointerV3.x) / this.WIDTH;
      // const y = (2 * this.pointerV3.y) / this.HEIGHT;
      // this.liquidEffect.addDrop(x, y, 0.025, 0.005);
    },
    init() {
      // init instanced mesh matrix
      for (let i = 0; i < this.NUM_INSTANCES; i++) {
        const { position, scale, scaleZ } = this.instances[i];
        this.dummyO.position.copy(position);
        this.dummyO.scale.set(scale, scale, scaleZ);
        this.dummyO.updateMatrix();
        this.imesh.setMatrixAt(i, this.dummyO.matrix);
      }
      this.imesh.instanceMatrix.needsUpdate = true;
      // animate
      this.renderer.onBeforeRender(this.animate);
    },
    animate() {
      const { pointer } = this.renderer.three;
      this.target.copy(pointer.positionV3);
      this.light.position.copy(this.target);
      for (let i = 0; i < this.NUM_INSTANCES; i++) {
        const { position, scale, scaleZ, velocity, attraction, vlimit } =
          this.instances[i];
        this.dummyV
          .copy(this.target)
          .sub(position)
          .normalize()
          .multiplyScalar(attraction);
        velocity.add(this.dummyV).clampScalar(-vlimit, vlimit);
        position.add(velocity);
        this.dummyO.position.copy(position);
        this.dummyO.scale.set(scale, scale, scaleZ);
        this.dummyO.lookAt(this.dummyV.copy(position).add(velocity));
        this.dummyO.updateMatrix();
        this.imesh.setMatrixAt(i, this.dummyO.matrix);
      }
      this.imesh.instanceMatrix.needsUpdate = true;
    },
  },
};
</script>

<template>
  <div class="home-container">
    <div class="main">
      <div class="logo">
        <div class="outline"></div>
        <div class="logo-3d">
          <span style="--i: 1"></span>
          <span style="--i: 2"></span>
          <span style="--i: 3"></span>
          <span style="--i: 4"></span>
          <span style="--i: 5"></span>
          <span style="--i: 6"></span>
        </div>
      </div>
      <div class="my-name">
        <h1>Mahdi Hsoumi</h1>
        <h3>Front End Dev</h3>
      </div>
      <nav class="nav-bar">
        <span> Work </span>
        <span> About </span>
        <span> Contact </span>
      </nav>
      <nav class="social-media">
        <img src="../assets/icons/GitHub.png" />
        <img style="height: 36px" src="../assets/icons/codewars.png" />
        <img src="../assets/icons/LinkedIn.png" />
      </nav>
    </div>
    <Renderer
      ref="renderer"
      antialias
      :pointer="{ onMove: onPointerMove }"
      resize
    >
      <Camera :position="{ x: 0, y: 0, z: 15 }" />
      <Scene ref="scene">
        <AmbientLight />
        <PointLight :color="light1Color" :position="{ x: 50, y: 50, z: 50 }" />
        <PointLight :color="light2Color" :position="{ x: -50, y: 50, z: 50 }" />
        <PointLight
          :color="light3Color"
          :position="{ x: -50, y: -50, z: 50 }"
        />
        <PointLight :color="light4Color" :position="{ x: 50, y: -50, z: 50 }" />
        <PointLight ref="light" color="#0060ff" :intensity="0.5" />

        <InstancedMesh ref="imesh" :count="NUM_INSTANCES">
          <BoxGeometry :width="0.1" :height="0.1" :depth="0.5" />
          <StandardMaterial
            :props="{
              transparent: true,
              opacity: 0.9,
              metalness: 0.8,
              roughness: 0.5,
            }"
          />
        </InstancedMesh>

        <LiquidPlane
          ref="liquid"
          :width="WIDTH"
          :height="HEIGHT"
          :width-segments="512"
          :height-segments="512"
          :color="color"
          :metalness="metalness"
          :roughness="roughness"
        />
      </Scene>
    </Renderer>
  </div>
</template>

<style lang="scss">
.tp-dfwv {
  margin-top: var(--header-height);
  /* left: 8px;
  right: auto!important; */
}
@media (min-width: 720px) {
  .tp-dfwv {
    margin-left: 16.4rem;
  }
}
@media (min-width: 960px) {
  .tp-dfwv {
    margin-left: 20rem;
  }
}

.home-container {
  position: absolute;
  position: relative;
  top: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.main {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 5px;
  .logo {
    z-index: 1;
    position: absolute;
    left: 40px;
    top: 40px;
    .outline {
      // background: linear-gradient(
      //   90deg,
      //   #0060ff 0%,
      //   #ff6000 75%,
      //   transparent 100%
      // );
      // height: 120px;
      // width: 120px;
      // border-radius: 50%;
      // position: relative;
      // animation: rotation 2s infinite linear;
      // &::after {
      //   content: " ";
      //   position: absolute;
      //   z-index: 2;
      //   top: 5px;
      //   left: 5px;
      //   background: black;
      //   border-radius: 50%;
      //   display: block;
      //   height: 110px;
      //   width: 110px;
      // }
      // @keyframes rotation {
      //   0% {
      //     transform: rotate(0);
      //   }
      //   100% {
      //     transform: rotate(360deg);
      //   }
      // }
    }
    .logo-3d {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      transform-style: preserve-3d;
      transform: perspective(500px) rotateX(135deg);
      transition: 0.5s;
      &:hover {
        width: 80px;
      }
      span {
        position: absolute;
        display: block;
        border: 5px solid #990000;
        border-radius: 50%;
        animation: animate 6s ease-in-out infinite;
        box-shadow: 0 5px 0 #ff5b00, inset 0 5px 0 #d4d925;
        animation-delay: calc(-1s * var(--i));

        @keyframes animate {
          0% {
            transform: translateZ(-15px);
            height: 100%;
            width: 100%;
          }
          25% {
            transform: translateZ(15px);
            height: 100%;
            width: 100%;
          }
          50% {
            transform: translateZ(15px);
            height: 15%;
            width: 15%;
          }
          75% {
            transform: translateZ(-15px);
            height: 15%;
            width: 15%;
          }
          100% {
            transform: translateZ(-15px);
            height: 100%;
            width: 100%;
          }
        }
      }
    }
  }

  .my-name {
    color: #000;
    z-index: 1;
    font-size: 64px;
    font-weight: 900;
    text-align: center;
    @media screen and (max-width: 1024px) {
      font-size: 32px;
    }
    @media screen and (max-width: 600px) {
      font-size: 24px;
    }
  }
  .nav-bar {
    color: #000;
    font-size: 24px;
    position: absolute;
    right: 0;

    top: 20px;
    display: flex;
    text-align: right;
    @media screen and (max-width: 600px) {
      font-size: 18px;
    }
    span {
      z-index: 1;
      margin: 20px;
      cursor: pointer;
      transition: all 0.5s;
      &:hover {
        letter-spacing: 10px;
        font-size: 32px;
      }
    }
  }
  .social-media {
    color: #000;
    font-size: 24px;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    img {
      z-index: 1;
      margin: 20px;
      height: 32px;
      cursor: pointer;

      transition: all 0.5s;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
}
</style>
