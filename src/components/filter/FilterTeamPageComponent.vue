<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, index) in filterIDs" :key="index" cols="12" sm="6" md="4" lg="3">
        <v-card v-if="teamData[index]" variant="outlined">
          <v-card-title>
            Team {{ this.teamData[index].id }}
          </v-card-title>
          <v-card-subtitle>
            name: {{ teamData[index].name }}
          </v-card-subtitle>
          <v-card-text>
            country: {{ teamData[index].country_name }} ({{ teamData[index].country_code }})
            <div v-if="this.participants[index]">
              participants: {{ participants[index].toString() }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <div>Next events for the team/teams</div>
    <v-row>
      <v-container v-for="(item, index) in timeslots" :key="index">
        <v-card variant="outlined"  v-if="this.timeslots[index].team_IDs">
          <v-card-title>
              {{ this.timeslots[index].time_from }} - {{ this.timeslots[index].time_to }} {{ this.timeslots[index].type}} affected team: {{ this.timeslots[index].team_IDs.toString() }}
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
      teamData: [],
      participants: [],
      timeTableIDAndTeamID: [],
      newArrayLength: [],
    };
  },
  computed: {
    sortedTimeslots() {
      return this.timeslots.sort((a, b) => a.time_from.localeCompare(b.time_from));
    }
  },
  props: {
    filterIDs: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async getTeams() {
      try {
        for (let i = 0; i < this.filterIDs.length; i++) {
          const response = await axios.get('http://localhost:5000/getRow?tablename=team&id=' + this.filterIDs[i]);
          response.data.forEach((elem) => this.teamData.push(elem))
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
    },


    async getParticipants() {
      try {
        for (let i = 0; i < this.filterIDs.length; i++) {
          const response = await axios.get('http://localhost:5000/getCondition?table=participant&condition=team_id=' + this.filterIDs[i]);
          response.data.forEach((elem) => this.participants.push(elem))
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Teilnehmerdaten:", error);
      }
      this.restructureParticipants();
    },


    async getTimeTableIDs() {
      try {
        for (let i = 0; i < this.filterIDs.length; i++) {
          const response = await axios.get('http://localhost:5000/getCondition?table=timeslot_teams&condition=team_id=' + this.filterIDs[i]);
          response.data.forEach((elem) => this.timeTableIDAndTeamID.push(elem)) 
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
      this.restructureTimeTableIDAndTeamID();
    },


    async restructureTimeTableIDAndTeamID() {
      for(let i = 0; i < this.timeTableIDAndTeamID.length; i++) {
        if(!this.newArrayLength.includes(this.timeTableIDAndTeamID[i].timeslot_id)) {
          this.newArrayLength.push(this.timeTableIDAndTeamID[i].timeslot_id);
        }
      }
      await this.getTimeSlotsFromIDs();
      for(let i = 0; i < this.timeTableIDAndTeamID.length ; i++) {
        let timeslotID = this.timeTableIDAndTeamID[i].timeslot_id;
        let teamID = this.timeTableIDAndTeamID[i].team_id;
        for(let x = 0; x < this.timeslots.length; x++) {
          if(this.timeslots[x].id === timeslotID) {
            if(this.timeslots[x].team_IDs) {
              this.timeslots[x].team_IDs.push(teamID)
            }else {
              this.timeslots[x].team_IDs = [teamID]
            }
          }
        }
      }
      console.log("timeTableIDAndTeamID", this.timeTableIDAndTeamID)
      console.log("timeslots", this.timeslots)
    },

    async getTimeSlotsFromIDs() {
      try{
        for(let i = 0; i < this.newArrayLength.length; i++) {
          const response = await axios.get('http://localhost:5000/getRow?tablename=timeslot&id=' + this.newArrayLength[i]);
          response.data.forEach((elem) => this.timeslots.push(elem))
        }
      }catch(error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
    },


    restructureParticipants() {
      let participantsOrdered = new Array;
      for (let i = 0; i < this.teamData.length; i++) {
        participantsOrdered.push(new Array);
        for (let x = 0; x < this.participants.length; x++) {
          if (this.participants[x].team_id == this.filterIDs[i]) {
            let name = this.participants[x].first_name + " " + this.participants[x].last_name
            participantsOrdered[i].push(name)
          }
        }
      }
      this.participants = participantsOrdered;
    },
    async fetchTimeslotsForTeam() {

    }
  },
  async mounted() {
    await this.getTeams();
    await this.getParticipants();
    await this.getTimeTableIDs();
  }
};
</script>