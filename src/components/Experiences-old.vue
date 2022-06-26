<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center">
    <canvas class="fullscreen-canvas" ref="webgl"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import ThreeGlobe from "three-globe";
import {
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  Color,
  PointLight,
  Vector2,
  Raycaster,
  WebGLRenderer,
  Scene,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import countries from "../assets/countries.json";

const travelHistory = {
  type: "FlightsCollection",
  flights: [
    {
      type: "flight",
      order: 1,
      status: true,
      startLat: 36.8065,
      startLng: 10.1815,
      endLat: 48.8566,
      endLng: 2.3522,
      arcAlt: 0.05,
    },
    {
      type: "flight",
      order: 2,
      status: true,
      startLat: 48.8566,
      startLng: 2.3522,
      endLat: 45.630001,
      endLng: -73.519997,
      arcAlt: 0.2,
    },
    {
      type: "flight",
      order: 3,
      status: true,
      startLat: 45.630001,
      startLng: -73.519997,
      endLat: 41.0536,
      endLng: 28.982,
      arcAlt: 0.2,
    },
    {
      type: "flight",
      order: 4,
      status: true,
      startLat: 41.0536,
      startLng: 28.982,
      endLat: 39.9184,
      endLng: 29.2205,
      arcAlt: 0.08,
    },
  ],
};
const airportHistory = {
  type: "AirportsCollection",
  airports: [
    {
      text: "TUN",
      size: 1.0,
      country: "Tunisia",
      city: "HsTech",
      lat: "36.8065",
      lng: "10.1815",
    },
    {
      text: "FR",
      size: 1.0,
      country: "France",
      city: "Pertimm",
      lat: "48.8566",
      lng: "2.3522",
    },
    {
      text: "CA",
      size: 1.0,
      country: "Canada",
      city: "Altadata",
      lat: "45.630001",
      lng: "-73.519997",
    },
    {
      text: "TR",
      size: 1.0,
      country: "Turkey Sisli",
      city: "Endless Abroad",
      lat: "41.0536",
      lng: "28.982",
    },
    {
      text: "TR",
      size: 1.0,
      country: "Turkey Kartal",
      city: "Bixos",
      lat: "39.9184",
      lng: "29.2205",
    },
  ],
};
const webgl = ref(null);
onMounted(() => {
  var renderer, camera, scene, controls;
  var Globe;

  init();
  initGlobe();
  onWindowResize();
  animate();
  // SECTION Initializing core ThreeJS elements
  function init() {
    // Initialize renderer
    renderer = new WebGLRenderer({
      canvas: webgl.value,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Initialize scene, light
    scene = new Scene();
    scene.add(new AmbientLight(0xbbbbbb, 0.3));

    // Initialize camera, light
    camera = new PerspectiveCamera();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    var dLight = new DirectionalLight(0xffffff, 0.8);
    dLight.position.set(-800, 2000, 400);
    camera.add(dLight);

    var dLight1 = new DirectionalLight(0x7982f6, 1);
    dLight1.position.set(-200, 500, 200);
    camera.add(dLight1);

    var dLight2 = new PointLight(0x8566cc, 0.5);
    dLight2.position.set(-200, 500, 200);
    camera.add(dLight2);

    camera.position.z = 250;
    camera.position.x = 0;
    camera.position.y = 0;

    scene.add(camera);

    // Initialize controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dynamicDampingFactor = 0.01;
    controls.enablePan = false;
    controls.minDistance = 200;
    controls.maxDistance = 500;
    controls.rotateSpeed = 0.8;
    controls.zoomSpeed = 1;
    controls.autoRotate = false;

    controls.minPolarAngle = Math.PI / 3.5;
    controls.maxPolarAngle = Math.PI - Math.PI / 3;

    window.addEventListener("resize", onWindowResize, false);
    const raycaster = new Raycaster();
    const pointer = new Vector2();

    function onMouseMove(event) {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(scene.children);
      for (let i = 0; i < intersects.length; i++) {
        console.log("Globe :>> ", Globe);
        if (Globe) {
          const { lat, lng, altitude } = Globe.toGeoCoords({
            x: intersects[i].point.x,
            y: intersects[i].point.y,
            z: intersects[i].point.z,
          });
          console.log("altitude :>> ", altitude);
          console.log("lat :>> ", lat);
          console.log("lng :>> ", lng);
          if (
            lat > 30.307556 &&
            lat < 37.349994 &&
            lng > 7.524482 &&
            lng < 11.488787
          ) {
            console.log("tunisia");
          }
        }
      }
    }
    document.addEventListener("mousemove", onMouseMove);
  }
  // SECTION Globe
  function initGlobe() {
    // Initialize the Globe
    Globe = new ThreeGlobe({
      waitForGlobeReady: true,
      animateIn: true,
    })
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(true)
      .atmosphereColor("#5ab6cc")
      .atmosphereAltitude(0.25)
      .hexPolygonColor((e) => {
        if (["FRN", "TUN", "TUR", "CAN"].includes(e.properties.ISO_A3)) {
          return "#193042";
        } else return "#1930425f";
      });

    // NOTE Arc animations are followed after the globe enters the scene
    setTimeout(() => {
      Globe.arcsData(travelHistory.flights)
        .arcColor((e) => {
          return e.status ? "#9cff00" : "#FF4000";
        })
        .arcAltitude((e) => {
          return e.arcAlt;
        })
        .arcStroke((e) => {
          return e.status ? 0.5 : 0.3;
        })
        .arcDashLength(0.9)
        .arcDashGap(4)
        .arcDashAnimateTime(1000)
        .arcsTransitionDuration(1000)
        .arcDashInitialGap((e) => e.order * 1)
        .labelsData(airportHistory.airports)
        .labelColor(() => "rgba(255,255,255, 1)")
        .labelDotOrientation((e) => {
          return e.text === "ALA" ? "top" : "right";
        })
        .labelDotRadius(0.3)
        .labelSize((e) => e.size)
        .labelText("city")
        .labelResolution(6)
        .labelAltitude(0.01)
        .pointsData(airportHistory.airports)
        .pointColor(() => "#ffffff")
        .pointsMerge(true)
        .pointAltitude(0.07)
        .pointRadius(0.05);
    }, 1000);

    Globe.rotateX(Math.PI / 6);
    Globe.rotateY(-Math.PI / 8);
    const globeMaterial = Globe.globeMaterial();
    globeMaterial.color = new Color(0x5ab6cc);
    globeMaterial.emissive = new Color(0x220038);
    globeMaterial.emissiveIntensity = 0.1;
    globeMaterial.shininess = 0.7;

    // NOTE Cool stuff
    // globeMaterial.wireframe = true;

    scene.add(Globe);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
});
</script>

<style lang="scss"></style>
