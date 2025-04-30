<template>
  <v-container>
    <div v-if="loading" class="loading-overlay">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <v-row v-else-if="!loading">
      <v-col v-for="(item, index) in filterIDs" :key="index" cols="12" sm="6" md="4" lg="3">
        <v-card variant="outlined">
          <v-card-title>
            {{ this.resources[index].resource_name	 }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-if="!loading">
    <div>Next events for the team/resources</div>
    <v-row>
      <v-container v-for="(item, index) in timeslots.slice(0, 4)" :key="index" style="padding-bottom: 0px;">
        <v-card variant="outlined" v-if="this.timeslots[index].team_names && this.timeslots[index].upcoming">
          <v-card-title>
            {{ this.timeslots[index].time_from }} - {{ this.timeslots[index].time_to }} {{
              this.timeslots[index].description }}
            affected team: {{ this.timeslots[index].team_names.toString() }} upcoming: {{ this.timeslots[index].upcoming }}
          </v-card-title>
        </v-card>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import TeamPicture from '../Picture_Component.vue';

export default {
  components: {
    TeamPicture
  },
  data() {
    return {
      timeslots: [],
      resources: [],
      currentTime: "",
      loading: true,
      loadingcounter: 0,      
    };
  },
  props: {
    filterIDs: {
      type: Array,
      required: true,
    },
  },
  methods: {

    checkResourcesLoaded() {
      this.loadingcounter += 1;
      if (this.loadingcounter == 2) {
        this.loading = false;
      }
    },
    async getResources() {
      try {
        const response = await axios.get('http://localhost:5000/getResourceByResourceID?ids=' + this.filterIDs.toString());
        response.data.forEach((elem) => this.resources.push(elem))
        this.checkResourcesLoaded()
      }catch(error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
    },

    async getTimeslots() {
      try {
        const response = await axios.get('http://localhost:5000/getAllTeamsUsingResourceByID?ids=' + this.filterIDs.toString())
        response.data.forEach((elem) => this.timeslots.push(elem))
        this.checkResourcesLoaded();
      }catch(error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
      this.orderTimeSlotsBasedOnTime();
      this.orderTimeslotsBasedOnUpcoming();
    },

    checkTimeTableActive() {
      this.updateTime();
      for (let i = 0; i < this.timeslots.length; i++) {
        if (this.convertTimeToMinutes(this.timeslots[i].time_to) <= this.convertTimeToMinutes(this.currentTime)) {
          this.timeslots[i].upcoming = false;
        } else {
          this.timeslots[i].upcoming = true;
        }
      }
      this.orderTimeslotsBasedOnUpcoming();
    },

    scheduleNextCheckTimeTableActive() {
      const now = new Date();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const milliseconds = now.getMilliseconds();
      const millisUntilNext5 = ((5 - (minutes % 5)) * 60 - seconds) * 1000 - milliseconds;
      const millisUntilNext0 = ((10 - (minutes % 10)) * 60 - seconds) * 1000 - milliseconds;
      let millisUntilNextCheck;
      if (millisUntilNext5 < millisUntilNext0) {
        millisUntilNextCheck = millisUntilNext5;
      } else {
        millisUntilNextCheck = millisUntilNext0;
      }
      setTimeout(() => { this.checkTimeTableActive(); setInterval(this.checkTimeTableActive, 300000); }, millisUntilNextCheck + 5000);
    },

    convertTimeToMinutes(time) {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    },

    orderTimeSlotsBasedOnTime() {
      this.timeslots.sort((a, b) => this.convertTimeToMinutes(a.time_from) - this.convertTimeToMinutes(b.time_from));
    },

    orderTimeslotsBasedOnUpcoming() {
      let notUpcomingLength = 0;
      for (let i = 0; i < this.timeslots.length; i++) {
        if (this.timeslots[i].upcoming === false) {
          notUpcomingLength++;
        }
      }
      if (notUpcomingLength === this.timeslots.length) {
        return;
      }
      for (let x = 0; x < this.timeslots.length - notUpcomingLength; x++) {
        if (this.timeslots[x].upcoming === false) {
          let text = this.timeslots.splice(x, 1)[0];
          this.timeslots.push(text);
          x--;
        }
      }
    },
    updateTime() {
      function addZero(i) {
        if (i < 10) { i = "0" + i }
        return i;
      }
      const d = new Date();
      let h = addZero(d.getHours());
      let m = addZero(d.getMinutes());
      this.currentTime = h + ":" + m;
    },
  },
  async mounted() {
    await this.getResources();
    await this.getTimeslots();
    this.checkTimeTableActive();
    this.scheduleNextCheckTimeTableActive();
  }
};
</script>

<style scoped>
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 10;
}
</style>