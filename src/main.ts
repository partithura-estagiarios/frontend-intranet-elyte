import { createApp } from "vue";
import { Quasar, Notify } from "quasar";
import "uno.css";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/mdi-v3/mdi-v3.css";
import "@quasar/extras/mdi-v4/mdi-v4.css";
import "@quasar/extras/mdi-v5/mdi-v5.css";
import "@quasar/extras/mdi-v6/mdi-v6.css";
import "@quasar/extras/mdi-v7/mdi-v7.css";

// Import Quasar css
import "quasar/src/css/index.sass";

// Import Quasar component
import "@quasar/quasar-ui-qcalendar/dist/index.css";

import { i18n, pinia, router, villus } from "./modules";
import App from "./App.vue";
import "./style.css";

createApp(App)
  .use(Quasar, {
    plugins: { Notify }, // import Quasar plugins and add here
  })
  .use(villus)
  .use(router)
  .use(pinia)
  .use(i18n)
  .mount("#app");
