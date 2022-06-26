<template>
  <div class="w-screen h-screen absolute left-0 top-0 select-none">
    <img
      class="rotate-180 w-[60%] sm:w-[40%] lg:w-[30%] absolute left-5 top-5 md:left-10 md:top-10 animate__animated animate__slideInLeft"
      src="../assets/images/box-art.png"
      alt=""
    />
    <img
      class="w-[60%] sm:w-[40%] lg:w-[30%] absolute right-5 bottom-5 md:right-10 md:bottom-10 animate__animated animate__slideInRight"
      src="../assets/images/box-art.png"
      alt=""
    />
  </div>
</template>

<script setup>
// import { ref, onMounted } from "vue";

// import * as THREE from "three";

// const webgl = ref(null);
// onMounted(() => {
//   let camera, scene, renderer;

//   init();
//   animate();

//   function init() {
//     camera = new THREE.PerspectiveCamera(
//       45,
//       window.innerWidth / window.innerHeight,
//       1,
//       1000
//     );
//     camera.position.z = 5;

//     scene = new THREE.Scene();

//     const geometry = new THREE.BoxGeometry(1, 1, 1);
//     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     material.wireframe = true;
//     const cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);

//     renderer = new THREE.WebGLRenderer({ canvas: webgl.value, alpha: true });
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.outputEncoding = THREE.sRGBEncoding;

//     window.addEventListener("resize", onWindowResize);
//   }

//   function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();

//     renderer.setSize(window.innerWidth, window.innerHeight);
//   }

//   //

//   function animate() {
//     requestAnimationFrame(animate);

//     render();
//   }

//   function render() {
//     // const time = Date.now() * 0.001;

//     // parent_node.rotation.z = time * 0.5;

//     renderer.render(scene, camera);
//   }
// });
</script>

<style></style>
