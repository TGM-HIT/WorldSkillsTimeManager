<template>
    <div style="margin-top: 0%;">
       <v-col cols="auto" class="d-flex align-center" style="margin-bottom: 0%;">
          <v-toolbar-title>
              <router-link to="/" style="text-decoration: none;">
                <div style="width: 6.5%;">
                  <img src="../assets/worldskillsblue.svg" alt="logo" style="max-height: 70px; max-width: 150px; text-align:center;" />
                </div>
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