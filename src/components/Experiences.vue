<template>
  <div
    class="relative w-screen h-screen flex flex-col justify-center items-center"
  >
    <div ref="webgl"></div>
    <div
      class="absolute text-white rounded-sm px-6 py-1 bg-[#1930424f] backdrop-blur-md"
      ref="experienceModel"
      v-show="experienceDate && !experienceDetailsModel"
    >
      <span class="whitespace-nowrap">
        {{ experienceDate ? experienceDate.title : "" }}
      </span>
      <br />
      at
      <span class="whitespace-nowrap">
        {{ experienceDate ? experienceDate.city : "" }}
      </span>
      <button
        @click="experienceDetailsModel = true"
        class="mx-2 text-secondary underline underline-offset-2"
      >
        Details
      </button>
      <br />
    </div>

    <div
      v-if="experienceDetailsModel && experienceDate"
      class="absolute lg:md:max-w-2xl h-[80%] md:max-w-xl w-11/12 text-white rounded-sm bg-[#1930424f] backdrop-blur-md overflow-x-hidden overflow-y-auto"
    >
      <div class="w-[100%] h-[100%] relative p-5 md:p-10">
        <!-- Header -->
        <div class="text-white w-full flex justify-end pb-5">
          <span
            @click="
              experienceDetailsModel = false;
              experienceDate = null;
            "
            class="font-bold leading-none cursor-pointer"
            >X</span
          >
        </div>
        <div class="md:flex md:justify-between justify-center font-semibold">
          <div class="md:mr-10 m-2">
            <p>
              {{ experienceDate ? experienceDate.title : "" }}
            </p>
            <div class="flex items-center">
              {{ experienceDate ? experienceDate.city : "" }}
              <a target="_blank" :href="experienceDate.link">
                <img :src="experienceDate.logo" class="ml-2 w-5" />
              </a>
            </div>
          </div>
          <div class="md:text-right m-2">
            <p class="tracking-widest">
              {{ experienceDate ? experienceDate.date : "" }}
            </p>
            <p>
              {{ experienceDate ? experienceDate.country : "" }}
            </p>
          </div>
        </div>
        <!-- Page 1 -->
        <div
          v-if="experienceDetailsPage === 1"
          class="flex flex-wrap animate__animated animate__slideInRight"
        >
          <span
            v-for="technology in experienceDate.technologies"
            :key="technology"
            class="m-2 p-2 rounded-md bg-[#5ab6cc]"
          >
            {{ technology }}
          </span>
        </div>
        <!-- Page 2 -->
        <div v-else class="animate__animated animate__slideInRight">
          <div>
            <p
              v-for="achievement in experienceDate.achievements"
              :key="achievement"
              class="m-2"
            >
              - {{ achievement }}
            </p>
          </div>
        </div>
        <div
          class="text-white w-full flex justify-end pb-5"
          @click="experienceDetailsPage = experienceDetailsPage === 1 ? 2 : 1"
        >
          <span class="font-bold leading-none cursor-pointer"
            >page {{ experienceDetailsPage }}</span
          >
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
const experienceDetailsPage = ref(1);
const experienceDate = ref(null);

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
    .labelDotRadius(0.9)
    .labelSize((e) => e.size)
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

        experienceDate.value = label;
      } else {
        if (!experienceDetailsModel.value) {
          experienceDate.value = null;
        }
      }
    })(webgl.value);

  const globeMaterial = myGlobe.globeMaterial();
  globeMaterial.color = new Color(0x5ab6cc);
  globeMaterial.emissive = new Color(0x220038);
  globeMaterial.emissiveIntensity = 0.1;
  globeMaterial.shininess = 0.7;

  myGlobe.pointOfView({ lat: 36.8065, lng: 10.1815, altitude: 1.5 });
});
</script>

<style lang="scss"></style>
