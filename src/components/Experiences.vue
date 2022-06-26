<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center">
    <div class="absolute flex font-semibold">
      loading
      <div
        class="ml-2 animate__animated animate__infinite infinite animate__jello tracking-widest"
      >
        ...
      </div>
    </div>
    <div ref="webgl"></div>
    <div
      class="absolute text-white rounded-sm px-6 py-1 bg-[#1930424f] backdrop-blur-md"
      ref="experienceModel"
      v-show="experienceData && !experienceDetailsModel"
    >
      <span class="whitespace-nowrap">
        {{ experienceData ? experienceData.title : "" }}
      </span>
      <br />
      at
      <span class="whitespace-nowrap">
        {{ experienceData ? experienceData.city : "" }}
      </span>
      <button
        @click="experienceDetailsModel = true"
        class="mx-2 text-[#F7ACCF] underline underline-offset-2"
      >
        Details
      </button>
      <br />
    </div>

    <div
      v-if="experienceDetailsModel && experienceData"
      class="z-30 absolute h-screen w-screen text-white rounded-md bg-[#1930424f] backdrop-blur-md overflow-x-hidden overflow-y-auto"
    >
      <div class="w-[100%] min-h-[100%] relative p-5 md:p-10">
        <!-- Header -->
        <div class="text-primary absolute right-5 top-5">
          <span
            @click="
              experienceDetailsModel = false;
              experienceData = null;
            "
            class="font-bold leading-none cursor-pointer"
            >X</span
          >
        </div>
        <div class="md:flex md:justify-between justify-center font-semibold">
          <div class="md:mr-10 m-2">
            <p>
              {{ experienceData ? experienceData.title : "" }}
            </p>
            <div class="flex items-center">
              {{ experienceData ? experienceData.city : "" }}
              <a target="_blank" :href="experienceData.link">
                <img :src="experienceData.logo" class="ml-2 w-5" />
              </a>
            </div>
          </div>
          <div class="md:text-right m-2">
            <p class="tracking-widest">
              {{ experienceData ? experienceData.date : "" }}
            </p>
            <p>
              {{ experienceData ? experienceData.country : "" }}
            </p>
          </div>
        </div>
        <!-- Page 1 -->
        <div
          v-if="experienceDetailsModelPage === 1"
          class="flex flex-col items-center w-[100%] mt-5 animate__animated animate__slideInLeft"
        >
          <div class="flex flex-wrap max-w-[800px]">
            <span
              v-for="technology in experienceData.technologies"
              :key="technology"
              class="m-2 p-2 rounded-md bg-[#5ab6cc]"
            >
              {{ technology }}
            </span>
          </div>

          <div class="max-w-[800px] mt-10">
            <div>
              <p
                v-for="achievement in experienceData.achievements"
                :key="achievement"
                class="m-2"
              >
                - {{ achievement }}
              </p>
            </div>
          </div>
        </div>
        <div
          v-if="experienceDetailsModelPage === 1"
          @click="experienceDetailsModelPage = 2"
          class="fixed top-[50%] right-0 cursor-pointer"
        >
          <p
            class="flex items-center relative animate__wobble animate__animated animate__infinite infinite"
          >
            <span class="pr-8 invisible md:visible"> Projects </span>
            <span class="text-7xl absolute right-0">></span>
          </p>
        </div>
        <!-- Page 2 -->
        <div
          v-else
          class="flex flex-col items-center w-[100%] animate__animated animate__slideInRight"
        >
          <div class="max-w-[800px] mt-5">
            <div v-for="project in experienceData.projects" :key="project">
              <img :src="project.img" class="w-full rounded-md my-5" alt="" />
              <a
                :href="project.url"
                target="_blank"
                class="text-center underline underline-offset-1 text-2xl font-semibold mb-5"
              >
                {{ project.title }}
              </a>
              <p class="mb-5">{{ project.description }}</p>

              <div>
                <span
                  v-for="technology in project.technologies"
                  :key="technology"
                  class="m-2 p-2 rounded-md bg-[#5ab6cc]"
                >
                  {{ technology }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="experienceDetailsModelPage === 2"
          @click="experienceDetailsModelPage = 1"
          class="fixed top-[50%] left-0 cursor-pointer"
        >
          <p
            class="flex items-center relative animate__wobble animate__animated animate__infinite infinite"
          >
            <span class="text-7xl absolute left-0"> {{ "<" }} </span>
            <span class="pl-8 invisible md:visible"> Details </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { Color } from "three";
import Globe from "globe.gl";

import countries from "../assets/countries.json";
import airportHistory from "../assets/airportHistory";
import travelHistory from "../assets/travelHistory";

const webgl = ref(null);
const experienceModel = ref(null);
const experienceDetailsModel = ref(false);
const experienceDetailsModelPage = ref(1);

const experienceData = ref(null);

onMounted(() => {
  const myGlobe = Globe({
    rendererConfig: {
      alpha: true,
      antialias: true,
    },
  })
    .backgroundColor("#00000000")
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
    })
    .arcsData(travelHistory.flights)
    .arcColor(() => {
      return "#193042";
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
    .labelColor(() => "#F7ACCF")
    .labelDotOrientation((e) => {
      return e.text === "ALA" ? "top" : "right";
    })
    .labelDotRadius(0.9)
    .labelSize(() => 1)
    .labelAltitude(100)
    .labelText("city")
    .labelResolution(6)
    .labelAltitude(0.01)
    .onLabelHover((label) => {
      // getScreenCoords
      if (label) {
        const { x, y } = myGlobe.getScreenCoords(label.lat, label.lng);
        console.log("x,y :>> ", x, y);
        if (window.innerWidth - x < 100) {
          experienceModel.value.style.left = `auto`;
          experienceModel.value.style.right = `${30}px`;
        } else {
          experienceModel.value.style.right = `auto`;
          experienceModel.value.style.left = `${x}px`;
        }
        experienceModel.value.style.top = `${y - 15}px`;

        experienceData.value = label;
      } else {
        if (!experienceDetailsModel.value) {
          experienceData.value = null;
        }
      }
    })(webgl.value);

  const globeMaterial = myGlobe.globeMaterial();
  globeMaterial.color = new Color(0x5ab6cc);
  globeMaterial.emissive = new Color(0x220038);
  globeMaterial.emissiveIntensity = 0.1;
  globeMaterial.shininess = 0.7;
  if (window.innerWidth < 900)
    myGlobe.pointOfView({ lat: 36.8065, lng: 10.1815, altitude: 2 });
  else myGlobe.pointOfView({ lat: 36.8065, lng: 10.1815, altitude: 1.5 });
});
</script>

<style lang="scss"></style>
