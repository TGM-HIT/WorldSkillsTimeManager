<template>
  <v-app-bar app color="#C9D4E0" height="80" flat>
    <v-container class="d-flex justify-center align-center" fluid>
      <v-row class="d-flex justify-center align-center flex-wrap" dense>
        <v-col cols="auto" class="d-flex justify-center align-center flex-wrap">
          <router-link v-for="(item, index) in menuItems" :key="index" :to="item.route">
            <v-btn class="bg-accent font-weight-bold" :style="buttonStyle" :size="buttonSize" rounded="lg" color="white"
              :class="{ 'active-button': isActive(item.route) }" @click="setActive(item.route)">
              {{ item.label }}
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
      buttonSize: "large",
      buttonStyle: {},
      menuItems: [
        { label: "Timeslot", route: "/edit/Timeslot" },
        { label: "Resource", route: "/edit/Resource" },
        { label: "Type", route: "/edit/TimeslotType" },
        { label: "Participant", route: "/edit/Participant" },
        { label: "Team", route: "/edit/Team" },
        { label: "Group", route: "/edit/Groups" },
        { label: "Soundeffect", route: "/edit/Soundeffect" },
      ],
    };
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
      if (width < 750) {
        this.buttonSize = "small";
        this.buttonStyle = { margin: "0 2px", padding: "4px 8px" };
      } else if (width < 960) {
        this.buttonSize = "medium";
        this.buttonStyle = { margin: "0 5px", padding: "6px 12px" };
      } else {
        this.buttonSize = "large";
        this.buttonStyle = { margin: "0 8px", padding: "8px 16px" };
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
.bg-accent {
  background-color: #0e779f !important;
}

.active-button {
  background-color: #003866 !important;
}
</style>