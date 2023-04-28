import { createPinia, setActivePinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

export const pinia = createPinia();

pinia.use(piniaPluginPersistedState);
setActivePinia(pinia);
