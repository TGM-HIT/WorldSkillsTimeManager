/**
 * plugins/vuetify.js
 *
 * Vuetify 3 configuration file
 */

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Composables
import { createVuetify } from 'vuetify';

export default createVuetify({
 defaults:{

 },
  theme: {
    defaultTheme: 'light', // Setzt das Standard-Theme auf "light"
    themes: {
      light: {
        colors: {
          primary: '#003866', // Deine primäre Farbe
          secondary: '#C9D4E0', // Deine sekundäre Farbe
          accent: '#0E779F', // Akzentfarbe
          background: '#fbfbfe', // Hintergrundfarbe
          text: '#003866', // Textfarbe
        },
      },
      dark: {
        colors: {
          primary: '#003866',
          secondary: '#C9D4E0',
          accent: '#0E779F',
          background: '#121212', // Standard dunkler Hintergrund
          text: '#ffffff', // Weißer Text für dunkles Theme
        },
      },
    },
  },
});
