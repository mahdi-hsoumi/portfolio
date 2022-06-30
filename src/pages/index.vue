<script setup>
import Header from "../components/Header.vue";
import Home from "../components/Home.vue";
import About from "../components/About.vue";
import Skills from "../components/Skills.vue";
import Experiences from "../components/Experiences.vue";
import Contact from "../components/Contact.vue";
import SillyBox from "../components/SillyBox.vue";
import Corners from "../components/Corners.vue";

import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <div class="w-screen h-screen overflow-hidden text-primary relative">
    <!-- <div class="w-20 absolute md:left-8 left-2 md:top-5 top-2">
      <img src="/logo.png" alt="" />
    </div> -->
    <Header class="z-20 animate__animated animate__slideInRight" />
    <Home
      v-if="route.hash === ''"
      id="#"
      class="z-10 animate__animated animate__bounce"
    />
    <About
      v-if="route.hash === '#about'"
      id="about"
      class="z-10 animate__animated animate__bounce"
    />
    <Skills
      v-if="route.hash === '#skills'"
      id="skills"
      class="z-10 animate__animated animate__bounce"
    />
    <Experiences
      v-if="route.hash === '#experiences'"
      id="experiences"
      class="z-10"
    />
    <Contact
      v-if="route.hash === '#contact'"
      id="contact"
      class="z-10 animate__animated animate__bounce"
    />
    <Corners style="z-index: -2" />

    <SillyBox />
  </div>
</template>
<style>
*,
*::before,
*::after {
  font-family: "Quicksand", sans-serif;
}
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f100;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #5ab5cc73;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #5ab6cc;
}
</style>
