import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Vuetify importieren
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as vuetifyplugin from './plugins/vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';


// Vuetify erstellen
const vuetify = createVuetify({
  components,
  directives,
  vuetifyplugin,
});
vuetify.config.ignoredElements = ['v-treeview'];

// App erstellen und Plugins einbinden
const app = createApp(App);

app.use(router);
app.use(vuetify);

app.mount('#app');