import { createApp } from "vue";
import { createPinia } from "pinia";

import { TroisJSVuePlugin } from "troisjs";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(TroisJSVuePlugin);
app.use(createPinia());
app.use(router);

app.mount("#app");
