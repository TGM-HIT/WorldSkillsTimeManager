<template>
  <v-container class="d-flex align-center" fluid>
    <v-row class="d-flex align-center">
      <router-link to="/" style="text-decoration: none;">
        <img src="../assets/worldskillsblue.svg" alt="logo" style="max-height: 10%; max-width: 100%;" />
      </router-link>
      <v-spacer></v-spacer>
      <v-card-title style="color: #003866;" class="text-h3 text-center">Timetable Day</v-card-title>
      <v-spacer></v-spacer>
      <v-card rounded="lg" variant="none" class="text-center text-h3" style="color: #003866;width: 15%; height: 100%;">
        {{ currentTime }}
      </v-card>
    </v-row>
  </v-container>

  <v-container class="align-center" fluid style="height: 75%" width="100%">
    <Table_Component />
  </v-container>
  <v-container class="mt-12">
  <v-row>

  </v-row>
  </v-container>
</template>

<script>
import Table_Component from "@/components/Table_Component.vue";

export default {

  data() {
    return {
      currentTime: "",
      name: "TablePage",
      components: {
        Table_Component,
      },
    };
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime() {
      function addZero(i) {
        if (i < 10) { i = "0" + i }
        return i;
      }
      const d = new Date();
      let h = addZero(d.getHours());
      let m = addZero(d.getMinutes());
      let s = addZero(d.getSeconds());
      this.currentTime = h + ":" + m + ":" + s;
    },
  }
};
</script>
