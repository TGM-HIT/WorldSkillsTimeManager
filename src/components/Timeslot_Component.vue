<template>
  <v-card
    class="mx-auto mt-10 " 
    rounded="xl"
    flat
    color="black"
    variant="outlined"
    height="20%"
    width="40%"
  >
    <v-container fluid>
      <v-row class="text-h5 font-weight-bold d-flex justify-center align-center" style="color: #003866;">
        Create Timeslot
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Name</v-container>
        </v-col>
        <v-col>
          <v-text-field class="ml-n16" rounded="lg" variant="outlined" v-model="timeslot.name"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Description</v-container>
        </v-col>
        <v-col>
          <v-text-field class="ml-n16" rounded="lg" variant="outlined" v-model="timeslot.description"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Type</v-container>
        </v-col>
        <v-col>
          <v-autocomplete class="ml-n16" rounded="lg" variant="outlined" v-model="timeslot.type"></v-autocomplete>
        </v-col>
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5" style="color: #003866;">Day</v-container>
        </v-col>
        <v-col>
          <v-text-field class="ml-n16" rounded="lg" variant="outlined" v-model="timeslot.day"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-n8 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">From</v-container>
        </v-col>
        <v-col>
          <v-text-field rounded="lg" variant="outlined" type="time" v-model="timeslot.time_from"></v-text-field>
        </v-col>
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">To</v-container>
        </v-col>
        <v-col>
          <v-text-field rounded="lg" variant="outlined" type="time" v-model="timeslot.time_to"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Resource</v-container>
        </v-col>
        <v-col>
          <v-autocomplete class="ml-n16" rounded="lg" variant="outlined" multiple v-model="timeslot.resources"></v-autocomplete>
        </v-col>
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Affected</v-container>
        </v-col>
        <v-col>
          <v-autocomplete class="ml-n16" rounded="lg" variant="outlined" multiple v-model="timeslot.affected"></v-autocomplete>
        </v-col>
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Soundeffect</v-container>
        </v-col>
        <v-col>
          <v-autocomplete class="ml-n16" rounded="lg" variant="outlined" multiple v-model="timeslot.soundeffect"></v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col></v-col>
        <v-col class="d-flex justify-end mt-4 pt-0">
          <v-btn class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866" @click="createTimeslot">
            Create
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      timeslot: {
        name: '',
        description: '',
        type: '',
        day: '',
        time_from: '',
        time_to: '',
        resources: [],
        affected: [],
        soundeffect: []
      }
    };
  },
  methods: {
    async createTimeslot() {
      try {
        const response = await axios.post('http://localhost:5000/setTimeslot', this.timeslot);
        console.log('Erfolgreich hinzugefügt:', response.data);
        alert('Timeslot wurde erfolgreich erstellt!');
        this.resetForm();
      } catch (error) {
        console.error('Fehler beim Hinzufügen des Timeslots:', error.response?.data || error.message);
        alert('Fehler beim Erstellen des Timeslots!');
      }
    },
    resetForm() {
      this.timeslot = {
        name: '',
        description: '',
        type: '',
        day: '',
        time_from: '',
        time_to: '',
        resources: [],
        affected: [],
        soundeffect: []
      };
    }
  }
};
</script>
