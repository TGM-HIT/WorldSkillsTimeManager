import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Vuetify importieren
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as vuetifyplugin from './plugins/vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { VueReCaptcha } from "vue-recaptcha-v3";


// Vuetify erstellen
const vuetify = createVuetify({
  components,
  directives,
  vuetifyplugin,
});
<<<<<<< HEAD
=======
//vuetify.config.ignoredElements = ['v-treeview'];
>>>>>>> eace696e72f704bad69d3357fe50b91f48d1b6b8

// App erstellen und Plugins einbinden
const app = createApp(App);

app.use(vuetify);
app.use(router);

app.use(VueReCaptcha, {
  siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY, // Vite nutzt "VITE_" Präfix
});

app.mount('#app');