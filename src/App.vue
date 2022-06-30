<script setup>
import { RouterView } from "vue-router";
import { useRoute } from "vue-router";
import SillyBox from "./components/SillyBox.vue";

const route = useRoute();
</script>

<template>
  <div class="drawer">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->

      <div class="w-full z-40 navbar absolute">
        <div class="flex-none lg:hidden">
          <label for="my-drawer-3" class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div class="flex-1 px-2 mx-2"></div>
        <div class="flex-none hidden lg:block">
          <ul class="menu menu-horizontal">
            <!-- Navbar menu content here -->
            <li>
              <a
                :class="route.hash === '' ? 'text-secondary' : ''"
                class="hover:text-secondary"
                href="#"
                >Home</a
              >
            </li>
            <li>
              <a
                :class="route.hash === '#about' ? 'text-secondary' : ''"
                class="hover:text-secondary"
                href="#about"
                >About</a
              >
            </li>
            <li>
              <a
                :class="route.hash === '#skills' ? 'text-secondary' : ''"
                class="hover:text-secondary"
                href="#skills"
                >Skills</a
              >
            </li>
            <li>
              <a
                :class="route.hash === '#experiences' ? 'text-secondary' : ''"
                class="hover:text-secondary"
                href="#experiences"
                >Experiences</a
              >
            </li>
            <li>
              <a
                :class="route.hash === '#contact' ? 'text-secondary' : ''"
                class="hover:text-secondary"
                href="#contact"
                >Contact</a
              >
            </li>
          </ul>
        </div>
      </div>
      <!-- Page content here -->

      <div class="text-primary w-screen h-screen overflow-hidden">
        <RouterView />
      </div>
    </div>
    <SillyBox />
    <div class="drawer-side w-full">
      <label for="my-drawer-3" class="drawer-overlay w-full"></label>
      <ul class="menu p-4 overflow-y-auto w-72 bg-base-100">
        <!-- Sidebar content here -->
        <li>
          <a
            :class="route.hash === '' ? 'text-secondary' : ''"
            class="hover:text-secondary md:text-lg font-semibold"
            href="#"
            >Home</a
          >
        </li>
        <li>
          <a
            :class="route.hash === '#about' ? 'text-secondary' : ''"
            class="hover:text-secondary md:text-lg font-semibold"
            href="#about"
            >About</a
          >
        </li>
        <li>
          <a
            :class="route.hash === '#skills' ? 'text-secondary' : ''"
            class="hover:text-secondary md:text-lg font-semibold"
            href="#skills"
            >Skills</a
          >
        </li>
        <li>
          <a
            :class="route.hash === '#experiences' ? 'text-secondary' : ''"
            class="hover:text-secondary md:text-lg font-semibold"
            href="#experiences"
            >Experiences</a
          >
        </li>
        <li>
          <a
            :class="route.hash === '#contact' ? 'text-secondary' : ''"
            class="hover:text-secondary md:text-lg font-semibold"
            href="#contact"
            >Contact</a
          >
        </li>
      </ul>
    </div>
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

a:hover,
a:active,
a:focus {
  background: none;
}
</style>
