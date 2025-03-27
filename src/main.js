import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/main.css';

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

// App erstellen und Plugins einbinden
const app = createApp(App);

app.use(vuetify);
app.use(router);


app.mount('#app');