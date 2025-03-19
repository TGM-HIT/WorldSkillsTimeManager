<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(item, index) in filterIDs" :key="index" 
        cols="12" sm="6" md="4" lg="3">
        <v-card v-if="teamData[index]" variant="outlined">
          <v-card-title>
            Team data
          </v-card-title>
          <v-card-subtitle>
            name: {{ teamData[index].name }}
          </v-card-subtitle>
          <v-card-text>
            country: {{ teamData[index].country_name }}  ({{ teamData[index].country_code }})
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <div>Next events for the team/teams</div>
    <v-row>
      <v-container v-for="(item, index) in timeslots" :key="index" >
        <v-card variant="outlined">
          <v-card-title>
            <strong>
              {{ this.timeslots[index].time_from }} - {{ this.timeslots[index].time_to }} {{ this.timeslots[index].type }}
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
      teamData: []
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
    async getValues() {
      let allResponses = [];
      try {
        if (this.filterIDs.length === 1) {
          const response = await axios.get('http://localhost:5000/getRow?tablename=team&id=' + this.filterIDs[0]);
          allResponses.push(response.data);
        } else {
          for (let i = 0; i < this.filterIDs.length; i++) {
            const response = await axios.get('http://localhost:5000/getRow?tablename=team&id=' + this.filterIDs[i]);
            allResponses.push(response.data);
          }
        }
        this.teamData = allResponses.flat().map(({ flag, ...rest }) => rest);
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
    }
  },
  mounted() {
    this.getValues();
  }
};
</script>