import '@quasar/extras/material-icons/material-icons.css';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import { Dialog, Notify, Quasar } from 'quasar';
import 'quasar/src/css/index.sass';
import { createApp } from 'vue';

import App from 'src/App.vue';
import { prepare } from 'src/prepare';
import router from 'src/router';

(async () => {
  if (await prepare()) {
    const pinia = createPinia();
    pinia.use(piniaPluginPersistedState);

    const app = createApp(App);
    app.use(pinia);
    app.use(Quasar, {
      config: { dark: true },
      plugins: { Dialog, Notify },
    });
    app.use(router);
    app.mount('#__hotkinkyjo_tampered__');
  }
})();
