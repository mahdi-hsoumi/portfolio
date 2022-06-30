<template>
  <div class="flex flex-col justify-center items-center">
    <div class="absolute flex font-semibold">
      loading
      <div class="ml-2">...</div>
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

    <Model
      :experienceDetailsModel="experienceDetailsModel"
      :experienceData="experienceData"
      :experienceDetailsModelPage="experienceDetailsModelPage"
      @closeModel="
        () => {
          experienceDetailsModel = false;
          experienceData = null;
        }
      "
      @changePage="
        (page) => {
          experienceDetailsModelPage = page;
        }
      "
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { Color } from "three";
import Globe from "globe.gl";
import Model from "./model/Model.vue";

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
