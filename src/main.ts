import { createApp } from "vue";
import { Quasar, Notify } from "quasar";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import "uno.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/mdi-v3/mdi-v3.css";
import "@quasar/extras/mdi-v4/mdi-v4.css";
import "@quasar/extras/mdi-v5/mdi-v5.css";
import "@quasar/extras/mdi-v6/mdi-v6.css";
import "@quasar/extras/mdi-v7/mdi-v7.css";
import "quasar/src/css/index.sass";
import "@quasar/quasar-ui-qcalendar/dist/index.css";
import "./style.css";

import { i18n, router, villus } from "./modules";
import App from "./App.vue";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App)
  .use(pinia)
  .use(Quasar, {
    plugins: { Notify },
  })
  .use(villus)
  .use(router)
  .use(i18n)
  .mount("#app");
