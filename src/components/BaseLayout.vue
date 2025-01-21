<template>
  <v-app d-flex>
    <v-app-bar app color="#003866" height="100" flat>
      <v-container class="d-flex align-center" fluid>
        <v-row class="d-flex align-center">
          <v-col cols="auto">
            <v-toolbar-title>
              <router-link to="/" style="text-decoration: none;">
                <img src="/svgexport-1.svg" alt="logo" style="max-height: 70px;" />
              </router-link>
            </v-toolbar-title>
          </v-col>

          <v-col class="d-flex align-center" cols="auto">
            <router-link to="/create">
              <v-btn class="ml-10 text-h3 font-weight-bold" size="x-large" color="white">Create</v-btn>
            </router-link>
            <router-link to="/filter">
              <v-btn class="ml-10 text-h3 font-weight-bold" size="x-large" color="white">Filter</v-btn>
            </router-link>
          </v-col>
          
          <v-spacer></v-spacer>
          
          <v-col cols="auto">
            <router-link to="/logout">
              <v-btn class="text-h3 font-weight-bold" size="x-large" text to="/logout" color="white">Logout</v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app>
      <span>&copy; 2025 Worldskills</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "BaseLayout",
};
</script>
