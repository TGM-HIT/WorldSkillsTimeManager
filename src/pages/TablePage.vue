<template>
  <v-container class="d-flex align-center" fluid>
    <v-row class="d-flex align-center">
      <router-link to="/" style="text-decoration: none;">
        <img src="../assets/worldskillsblue.svg" alt="logo" style="max-height: 10%; max-width: 100%;" />
      </router-link>
      <v-spacer></v-spacer>
      <v-card-title style="color: #003866;" class="text-h3 text-center">Timetable Day {{ selectedDay }}</v-card-title>
      <v-spacer></v-spacer>
      <v-card rounded="lg" variant="none" class="text-center text-h3" style="color: #003866;width: 15%; height: 100%;">
        {{ currentTime }}
      </v-card>
    </v-row>
  </v-container>

  <v-container class="align-center" fluid style="height: 75%" width="100%" id="timetable">
    <v-row>
      <v-btn
        v-for="day in tournamentDays"
        :key="day.tournamentDayName"
        @click="selectDay(day.tournamentDayName)"
        class="ma-2"
      >
        {{ day.tournamentDayName }}
      </v-btn>
    </v-row>
    <Table_Component :selectedDay="selectedDay" />
  </v-container>
</template>

<script>
import Table_Component from "@/components/Table_Component.vue";
import axios from 'axios';

export default {
  components: {
    Table_Component,
  },
  data() {
    return {
      currentTime: "",
      tournamentDays: [],
      selectedDay: "",
    };
  },
  async mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
    await this.loadTournamentDays();
    if (this.tournamentDays.length > 0) {
      this.selectDay(this.tournamentDays[0].tournamentDayName);
    }
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

    generatePDF() {
      const element = document.getElementById('timetable');
      html2pdf().from(element).save();
    },

    async loadTournamentDays() {
      try {
        const response = await axios.get('configTable/configDates.json');
        this.tournamentDays = response.data;
      } catch (error) {
        console.error("Error while reading the JSON-File:", error);
      }
    },
    selectDay(day) {
      this.selectedDay = day;
    },
  },
};
</script>
