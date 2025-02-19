<template>
    <div>
       <v-col cols="auto" class="d-flex align-center">
            <v-toolbar-title>
              <router-link to="/" style="text-decoration: none;">
                <img src="../assets/logo.svg" alt="logo" style="max-height: 70px; max-width: 150px;" />
              </router-link>
            </v-toolbar-title>
          </v-col>
      <Home />
    </div>
  </template>
  
  <script>
  import Home from '@/components/Home.vue';
  
  export default {
    name: "Table",
    components: {
      Home,
    },
  };
  </script>