<template>
  <header class="fixed md:right-10 right-5 md:top-10 top-5">
    <div class="logo"></div>
    <nav>
      <a
        :class="route.hash === '' ? 'text-secondary' : ''"
        class="px-2 hover:text-secondary"
        href="#"
        >Home</a
      >
      <a
        :class="route.hash === '#about' ? 'text-secondary' : ''"
        class="px-2 hover:text-secondary"
        href="#about"
        >About</a
      >
      <a
        :class="route.hash === '#skills' ? 'text-secondary' : ''"
        class="px-2 hover:text-secondary"
        href="#skills"
        >Skills</a
      >
      <a
        :class="route.hash === '#experiences' ? 'text-secondary' : ''"
        class="px-2 hover:text-secondary"
        href="#experiences"
        >Experiences</a
      >
      <a
        :class="route.hash === '#contact' ? 'text-secondary' : ''"
        class="px-2 hover:text-secondary"
        href="#contact"
        >Contact</a
      >
    </nav>
  </header>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style></style>
