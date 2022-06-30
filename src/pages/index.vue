<script setup>
import Home from "../components/Home.vue";
import About from "../components/About.vue";
import Skills from "../components/Skills.vue";
import Experiences from "../components/Experiences.vue";
import Contact from "../components/Contact.vue";
import Corners from "../components/Corners.vue";

import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <Home v-if="route.hash === ''" id="#" class="w-full h-full" />
  <About v-if="route.hash === '#about'" id="about" class="w-full h-full" />
  <Skills v-if="route.hash === '#skills'" id="skills" class="w-full h-full" />
  <Experiences
    v-if="route.hash === '#experiences'"
    id="experiences"
    class="w-full h-full"
  />
  <Contact
    v-if="route.hash === '#contact'"
    id="contact"
    class="w-full h-full"
  />
  <Corners style="z-index: -2" />
</template>
