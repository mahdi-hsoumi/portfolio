<template>
  <div
    v-if="experienceDetailsModel && experienceData"
    class="z-30 absolute text-white bg-[#1930426f] backdrop-blur-xl overflow-x-hidden overflow-y-auto"
  >
    <div class="w-[100%] min-h-[100%] relative p-5 md:p-10">
      <!-- Header -->
      <div class="text-primary absolute right-5 top-5">
        <span
          @click="close()"
          class="font-extrabold leading-none cursor-pointer text-xl"
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
        class="flex flex-col items-center w-[100%] mt-5"
      >
        <div class="max-w-[800px] mt-10">
          <div>
            <div class="flex items-center mb-2">
              <div class="bg-primary w-6 h-10 ml-2 mr-4"></div>
              <p class="text-3xl font-bold">Achievements :</p>
            </div>
            <p
              v-for="achievement in experienceData.achievements"
              :key="achievement"
              class="m-2"
            >
              - {{ achievement }}
            </p>
          </div>
          <div class="flex items-center mt-12 mb-2">
            <div class="bg-primary w-6 h-10 ml-2 mr-4"></div>
            <p class="text-3xl font-bold">Skills :</p>
          </div>
          <div class="flex flex-wrap max-w-[800px]">
            <span
              v-for="technology in experienceData.technologies"
              :key="technology"
              class="m-2 py-2 px-6 rounded-md bg-secondary"
            >
              {{ technology }}
            </span>
          </div>
        </div>
      </div>
      <div
        v-if="experienceDetailsModelPage === 1"
        @click="changePage(2)"
        class="fixed top-[50%] right-0 cursor-pointer"
      >
        <p class="flex items-center relative">
          <span class="pr-8 invisible md:visible"> Projects </span>
          <span class="text-7xl absolute right-0">></span>
        </p>
      </div>
      <!-- Page 2 -->
      <div v-else class="flex flex-col items-center w-[100%]">
        <div class="max-w-[800px] w-[100%] mt-5">
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

            <div class="flex flex-wrap">
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
        @click="changePage(1)"
        class="fixed top-[50%] left-0 cursor-pointer"
      >
        <p class="flex items-center relative">
          <span class="text-7xl absolute left-0"> {{ "<" }} </span>
          <span class="pl-8 invisible md:visible"> Details </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  experienceDetailsModel: Boolean,
  experienceData: Object,
  experienceDetailsModelPage: Object,
});

const emit = defineEmits(["closeModel", "changePage"]);
const close = () => {
  emit("closeModel");
};

const changePage = (page) => {
  emit("changePage", page);
};
</script>

<style lang="scss" scoped></style>
