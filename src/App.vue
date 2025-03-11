<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import BaseLayout from "./components/BaseLayout.vue";

export default {
  name: "App",
  components: {
    BaseLayout,
  },
};
</script>
<style>
body {
  background-color: #fbfbfe; /* Hintergrundfarbe */
  color: #003866; /* Standard-Textfarbe */
}
</style>
