<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, index) in filterIDs" :key="index" cols="12" sm="6" md="4" lg="3">
        <v-card v-if="teamData[index]" variant="outlined">
          <v-card-title>
            Team data
          </v-card-title>
          <v-card-subtitle>
            name: {{ teamData[index].name }}
          </v-card-subtitle>
          <v-card-text>
            country: {{ teamData[index].country_name }} ({{ teamData[index].country_code }})
            <div v-if="participants">
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
        <v-card variant="outlined">
          <v-card-title>
            <strong>
              {{ this.timeslots[index].time_from }} - {{ this.timeslots[index].time_to }} {{ this.timeslots[index].type
              }}
            </strong>
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
      timeslots: [
        {
          name: "Morgen-Workout",
          description: "Frühsport-Session im Fitnessstudio",
          type: "Training",
          day: "Montag",
          time_from: "06:30",
          time_to: "07:30"
        },
        {
          name: "Mittagspause",
          description: "Gemeinsame Pause mit dem Team",
          type: "Pause",
          day: "Mittwoch",
          time_from: "12:00",
          time_to: "13:00"
        },
        {
          name: "Kundengespräch",
          description: "Wichtiges Meeting mit einem Kunden",
          type: "Meeting",
          day: "Donnerstag",
          time_from: "14:00",
          time_to: "15:00"
        },
        {
          name: "Team-Meeting",
          description: "Wöchentliches Stand-up-Meeting",
          type: "Meeting",
          day: "Dienstag",
          time_from: "10:00",
          time_to: "10:30"
        },
        {
          name: "Abend-Yoga",
          description: "Entspannende Yoga-Session",
          type: "Sport",
          day: "Freitag",
          time_from: "18:00",
          time_to: "19:00"
        }
      ],
      teamData: [],
      participants: [],
      timetableIDAndTeamID: []
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
      let allResponsesTeam = [];
      try {
        for (let i = 0; i < this.filterIDs.length; i++) {
          const response = await axios.get('http://localhost:5000/getRow?tablename=team&id=' + this.filterIDs[i]);
          allResponsesTeam.push(response.data);
        }
        this.teamData = allResponsesTeam.flat().map(({ flag, ...rest }) => rest);
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
        console.log("part", this.participants);
      } catch (error) {
        console.error("Fehler beim Abrufen der Teilnehmerdaten:", error);
      }
      this.restructureParticipants();
    },
    async getTimeTableIDs() {
      let allResponsesTimeslotIDAndTeamID = [];
      try {
        for (let i = 0; i < this.filterIDs.length; i++) {
          const response = await axios.get('http://localhost:5000/getCondition?table=timeslot_teams&condition=team_id=' + this.filterIDs[i]);
          allResponsesTimeslotIDAndTeamID.push(response.data);
        }
        this.timetableIDAndTeamID = allResponsesTimeslotIDAndTeamID.flat().map(({ flag, ...rest }) => rest);
      } catch (error) {
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