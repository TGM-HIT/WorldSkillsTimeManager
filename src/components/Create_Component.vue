<template>
    <v-app-bar app color="#C9D4E0" height="70" flat>
      <v-container class="d-flex justify-center align-center" fluid>
        <v-row class="d-flex justify-center align-center" dense>
          <v-col cols="auto" class="d-flex justify-center align-center">
            <router-link to="/create/Resource">
              <v-btn
                class="bg-accent font-weight-bold button-spacing"
                size="large"
                rounded="lg"
                color="white"
                :class="{ 'active-button': isActive('/create/Resource') }"
                @click="setActive('/create/Resource')"
              >
                Resource
              </v-btn>
            </router-link>
            <router-link to="/create/Timeslots">
              <v-btn
                class="bg-accent font-weight-bold button-spacing"
                size="large"
                rounded="lg"
                color="white"
                :class="{ 'active-button': isActive('/create/Timeslots') }"
                @click="setActive('/create/Timeslots')"
              >
                Timeslot
              </v-btn>
            </router-link>
            <router-link to="/create/Type">
              <v-btn
                class="bg-accent font-weight-bold button-spacing"
                size="large"
                rounded="lg"
                color="white"
                :class="{ 'active-button': isActive('/create/Type') }"
                @click="setActive('/create/Type')"
              >
                Type
              </v-btn>
            </router-link>
            <router-link to="/create/Group">
              <v-btn
                class="bg-accent font-weight-bold button-spacing"
                size="large"
                rounded="lg"
                color="white"
                :class="{ 'active-button': isActive('/create/Group') }"
                @click="setActive('/create/Group')"
              >
                Group
              </v-btn>
            </router-link>
            <router-link to="/create/Team">
              <v-btn
                class="bg-accent font-weight-bold button-spacing"
                size="large"
                rounded="lg"
                color="white"
                :class="{ 'active-button': isActive('/create/Team') }"
                @click="setActive('/create/Team')"
              >
                Team
              </v-btn>
            </router-link>
            <router-link to="/create/Soundeffect">
              <v-btn
                class="bg-accent font-weight-bold button-spacing"
                size="large"
                rounded="lg"
                color="white"
                :class="{ 'active-button': isActive('/create/Soundeffect') }"
                @click="setActive('/create/Soundeffect')"
              >
                Soundeffect
              </v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main class="pa-0">
      <router-view />
    </v-main>
    
</template>

<script>
export default {
  name: "Create_Component",
  methods: {
    setActive(route) {
      this.activeRoute = route; // Setze den aktiven Route-Pfad
    },
    isActive(route) {
      return this.activeRoute === route; // Überprüfe, ob Route aktiv ist
    },
  },
};
</script>

<style>
.bg-accent {
  background-color: #0E779F !important;
}
.button-spacing {
  margin: 0 10px;
}
.active-button {
  background-color: #003866 !important;
}
</style>
