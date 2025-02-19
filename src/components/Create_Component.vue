<template>
  <v-app-bar app color="#C9D4E0" height="80" flat>
    <v-container class="d-flex justify-center align-center" fluid>
      <v-row
        class="d-flex justify-center align-center flex-wrap"
        dense
      >
        <v-col
          cols="auto"
          class="d-flex justify-center align-center flex-wrap"
        >
          <router-link to="/create/Resource">
            <v-btn
              class="bg-accent font-weight-bold button-spacing"
              :size="buttonSize"
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
              :size="buttonSize"
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
              :size="buttonSize"
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
              :size="buttonSize"
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
              :size="buttonSize"
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
              :size="buttonSize"
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

  <v-main app class="pa-0">
    <router-view />
  </v-main>
</template>
<script>
export default {
  name: "Create_Component",
  data() {
    return {
      activeRoute: "",
      buttonSize: "large", // Standardgröße der Buttons
    };
  },
  methods: {
    setActive(route) {
      this.activeRoute = route;
    },
    isActive(route) {
      return this.activeRoute === route;
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize(); // Initiale Größenanpassung
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    setActive(route) {
      this.activeRoute = route;
    },
    isActive(route) {
      return this.activeRoute === route;
    },
    handleResize() {
      const width = window.innerWidth;
      if (width < 600) {
        this.buttonSize = "small";
      } else if (width < 960) {
        this.buttonSize = "medium";
      } else {
        this.buttonSize = "large";
      }
    },
  },
};
</script>
<style scoped>
.bg-accent {
  background-color: #0e779f !important;
}
.button-spacing {
  margin: 0 8px; /* Standardabstand */
}
.active-button {
  background-color: #003866 !important;
}

/* Für kleinere Bildschirme: Abstände reduzieren */
@media (max-width: 960px) {
  .button-spacing {
    margin: 0 5px;
  }
}

@media (max-width: 600px) {
  .button-spacing {
    margin: 0 2px;
  }
}
</style>
