<template>
  <v-container>
    <div v-if="loading" class="loading-overlay">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <v-row v-else-if="!loading">
      <v-col v-for="(item, index) in filterIDs" :key="index" cols="12" sm="6" md="4" lg="3">
        <v-card v-if="teams[index]" variant="outlined">
          <v-card-title>
            Team {{ this.teams[index].id }} {{  }} {{ this.teams[index].country_code }}
          </v-card-title>
          <v-card-text>
            <div v-if="this.teams[index].participants">
              participants: {{ this.teams[index].participants.toString() }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-if="!loading">
    <div>Next events for the team/teams</div>
    <v-row>
      <v-container v-for="(item, index) in timeslots.slice(0, 4)" :key="index" style="padding-bottom: 0px;">
        <v-card variant="outlined" v-if="this.timeslots[index].teamIDs && this.timeslots[index].upcoming">
          <v-card-title>
            {{ this.timeslots[index].time_from }} - {{ this.timeslots[index].time_to }} {{
              this.timeslots[index].description }}
            affected team: {{ this.timeslots[index].teamIDs.toString() }} upcoming: {{ this.timeslots[index].upcoming }}
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
      teams: [],
      participants: [],
      timeTableIDAndTeamID: [],
      newArrayLength: [],
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

    checkTeamsLoaded() {
      this.loadingcounter += 1;
      if (this.loadingcounter == 2) {
        this.loading = false;
      }
    },
    async getTeams() {
      try {
        const response = await axios.get('http://localhost:5000/getTeamInfoByID?ids=' + this.filterIDs.toString());
        response.data.forEach((elem) => this.teams.push(elem))
        this.checkTeamsLoaded()
      }catch(error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
    },
    // async getTeams() {
    //   try {
    //     for (let i = 0; i < this.filterIDs.length; i++) {
    //       const response = await axios.get('http://localhost:5000/getRow?tablename=team&id=' + this.filterIDs[i]);
    //       response.data.forEach((elem) => this.teams.push(elem))
    //     }
    //     this.checkTeamsLoaded();
    //   } catch (error) {
    //     console.error("Fehler beim Abrufen der Daten:", error);
    //   }
    // },

    // async getParticipants() {
    //   try {
    //     for (let i = 0; i < this.filterIDs.length; i++) {
    //       const response = await axios.get('http://localhost:5000/getCondition?table=participant&condition=team_id=' + this.filterIDs[i]);
    //       response.data.forEach((elem) => this.participants.push(elem))
    //     }
    //     this.checkTeamsLoaded();
    //   } catch (error) {
    //     console.error("Fehler beim Abrufen der Teilnehmerdaten:", error);
    //   }
    //   this.restructureParticipants();
    // },

    // async getTimeTableIDs() {
    //   try {
    //     for (let i = 0; i < this.filterIDs.length; i++) {
    //       const response = await axios.get('http://localhost:5000/getCondition?table=timeslot_teams&condition=team_id=' + this.filterIDs[i]);
    //       response.data.forEach((elem) => this.timeTableIDAndTeamID.push(elem))
    //     }
    //     this.checkTeamsLoaded();
    //   } catch (error) {
    //     console.error("Fehler beim Abrufen der Daten:", error);
    //   }
    //   await this.getTimeSlotsFromIDs();
    //   this.orderTimeSlotsBasedOnTime();
    //   this.orderTimeslotsBasedOnUpcoming();
    // },

    async getTimeslots() {
      try {
        const response = await axios.get('http://localhost:5000/getAllTimeslotsByTeamID?ids=' + this.filterIDs.toString())
        response.data.forEach((elem) => this.timeslots.push(elem))
        this.checkTeamsLoaded();
      }catch(error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
      this.orderTimeSlotsBasedOnTime();
      this.orderTimeslotsBasedOnUpcoming();
    },

    // async restructureTimeTableIDAndTeamID() {
    //   for (let i = 0; i < this.timeTableIDAndTeamID.length; i++) {
    //     if (!this.newArrayLength.includes(this.timeTableIDAndTeamID[i].timeslot_id)) {
    //       this.newArrayLength.push(this.timeTableIDAndTeamID[i].timeslot_id);
    //     }
    //   }
    //   await this.getTimeSlotsFromIDs();
    //   for (let i = 0; i < this.timeTableIDAndTeamID.length; i++) {
    //     let timeslotID = this.timeTableIDAndTeamID[i].timeslot_id;
    //     let teamID = this.timeTableIDAndTeamID[i].team_id;
    //     for (let x = 0; x < this.timeslots.length; x++) {
    //       if (this.timeslots[x].id === timeslotID) {
    //         if (this.timeslots[x].team_IDs) {
    //           this.timeslots[x].team_IDs.push(teamID)
    //         } else {
    //           this.timeslots[x].team_IDs = [teamID]
    //         }
    //       }
    //     }
    //   }
    // },

    // async getTimeSlotsFromIDs() {
    //   for (let i = 0; i < this.timeTableIDAndTeamID.length; i++) {
    //     if (!this.newArrayLength.includes(this.timeTableIDAndTeamID[i].timeslot_id)) {
    //       this.newArrayLength.push(this.timeTableIDAndTeamID[i].timeslot_id);
    //     }
    //   }
    //   try {
    //     for (let i = 0; i < this.newArrayLength.length; i++) {
    //       const response = await axios.get('http://localhost:5000/getTimeslot?id=' + this.newArrayLength[i]);
    //       response.data.forEach((elem) => this.timeslots.push(elem))
    //     }
    //   } catch (error) {
    //     console.error("Fehler beim Abrufen der Daten:", error);
    //   }
    // },

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

    // restructureParticipants() {
    //   let participantsOrdered = new Array;
    //   for (let i = 0; i < this.teams.length; i++) {
    //     participantsOrdered.push(new Array);
    //     for (let x = 0; x < this.participants.length; x++) {
    //       if (this.participants[x].team_id == this.filterIDs[i]) {
    //         let name = this.participants[x].first_name + " " + this.participants[x].last_name
    //         participantsOrdered[i].push(name)
    //       }
    //     }
    //   }
    //   this.participants = participantsOrdered;
    // },

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
    await this.getTeams();
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