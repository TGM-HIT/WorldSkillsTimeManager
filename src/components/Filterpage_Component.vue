<template>
  <v-app-bar app color="#003866" height="80" flat>
    <v-container class="d-flex align-center" fluid>
      <v-row class="d-flex align-center flex-nowrap">
        <v-col cols="auto" class="d-flex align-center">
          <v-toolbar-title class="text-center">
            <v-card-title class="text-h4">{{ currentTime }}</v-card-title>
          </v-toolbar-title>
        </v-col>

        <v-spacer></v-spacer>

        <v-col cols="auto" class="d-flex align-center justify-center">
          <v-card-title class="text-h4 text-center">{{ pageName }}</v-card-title>
        </v-col>

        <v-spacer></v-spacer>

        <v-col cols="auto" class="d-flex align-center">
          <router-link to="/" style="text-decoration: none;">
            <img src="/svgexport-1.svg" alt="logo" style="max-height: 70px; max-width: 150px;" />
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      currentTime: "",
      pageName: "",
      filterArray: [],
    };
  },
  created() {
    this.updateParams();
  },
  watch: {
    "$route.query": {
      handler() {
        this.updateParams();
      },
      deep: true,
    },
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
    },
    updateParams() {
      this.pageName = this.$route.query.tablename || "";
      const filterParam = this.$route.query.filter;
      this.filterArray = Array.isArray(filterParam) ? filterParam : filterParam ? [filterParam] : [];
    },
  }
};
</script>