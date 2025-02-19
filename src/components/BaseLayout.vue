<template>
  <v-app d-flex>
    <v-app-bar app color="#003866" height="80" flat>
      <v-container class="d-flex align-center" fluid>
        <v-row class="d-flex align-center flex-nowrap">
          <!-- Logo -->
          <v-col cols="auto" class="d-flex align-center">
            <v-toolbar-title>
              <router-link to="/" style="text-decoration: none;">
                <img src="/svgexport-1.svg" alt="logo" style="max-height: 70px; max-width: 150px;" />
              </router-link>
            </v-toolbar-title>
          </v-col>

          <!-- Buttons (dynamischer Abstand) -->
          <v-col class="d-flex align-center justify-start flex-wrap" cols="auto" style="gap: 10px;">
            <router-link to="/create">
              <v-btn class="text-h3 font-weight-bold" size="large" color="white">Edit</v-btn>
            </router-link>
            <router-link to="/filter">
              <v-btn class="text-h3 font-weight-bold" size="large" color="white">Filter</v-btn>
            </router-link>
            <router-link to="/table">
              <v-btn class="text-h3 font-weight-bold" size="large" color="white">Table</v-btn>
            </router-link>
          </v-col>

          <!-- Spacer (dynamischer Platz) -->
          <v-spacer></v-spacer>

          <!-- Logout -->
          <v-col cols="auto" class="d-flex align-center">
                <v-btn class="text-h3 font-weight-bold" size="large" text color="white" @click="logout">Logout</v-btn>
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
  methods: {
  logout() {
    localStorage.removeItem("auth");
    this.$router.push("/login");
  }
}
};
</script>
