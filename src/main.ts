import './assets/global.css'
import { createApp } from "vue";
import { createPinia } from 'pinia';
import router from './router'

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import App from "./App.vue";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App)
app.use(vuetify);
app.use(router);
app.use(createPinia());
app.mount("#app");
