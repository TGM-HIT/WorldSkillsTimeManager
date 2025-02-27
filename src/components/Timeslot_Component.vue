<template>
  <v-card
    class="mx-auto mt-10"
    rounded="xl"
    flat
    color="black"
    variant="outlined"
    height="30%"
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
          <v-autocomplete
            class="ml-n16"
            rounded="lg"
            variant="outlined"
            v-model="timeslot.type"
            :items="types"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5" style="color: #003866;">Day</v-container>
        </v-col>
        <v-col>
          <v-text-field class="ml-n16" rounded="lg" variant="outlined" v-model="timeslot.day" type="date"></v-text-field>
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
          <v-autocomplete
            class="ml-n16"
            rounded="lg"
            variant="outlined"
            v-model="timeslot.resources"
            multiple
            :items="resources"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Affected Teams</v-container>
        </v-col>
        <v-col>
          <v-autocomplete
            class="ml-n16"
            rounded="lg"
            variant="outlined"
            multiple
            v-model="timeslot.affected"
            :items="affected"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Allowed Overlaps</v-container>
        </v-col>
        <v-col>
          <v-text-field class="ml-n16" rounded="lg" variant="outlined" v-model="timeslot.allowed_overlaps" type="number"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Soundeffect</v-container>
        </v-col>
        <v-col>
          <v-autocomplete
            class="ml-n16"
            rounded="lg"
            variant="outlined"
            v-model="timeslot.soundeffect"
            :items="soundeffects"
          ></v-autocomplete>
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
        soundeffect: '',
        allowed_overlaps: 0
      },
      types: [],
      resources: [],
      affected: [],
      soundeffects: []
    };
  },
  methods: {
    async createTimeslot() {
      try {
        const response = await axios.post('http://localhost:5000/setTimeslot', {
            name: this.timeslot.name,
            description: this.timeslot.description,
            type: this.timeslot.type,
            day: this.timeslot.day,
            time_from: this.timeslot.time_from,
            time_to: this.timeslot.time_to,
            soundeffect: this.timeslot.soundeffect,
            allowed_overlaps: this.allowed_overlaps,
            resources: this.timeslot.resources,
            affected: this.timeslot.affected
        });
        //console.log('Erfolgreich hinzugefügt:', response.data);
        //alert('Timeslot wurde erfolgreich erstellt!');
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
        resources: '',
        affected: [],
        soundeffect: '',
        allowed_overlaps: 0
      };
    },
    async getValues() {
      try {
        const response_resource = await axios.get('http://localhost:5000/getTable?tablename=resource');
        const response_type = await axios.get('http://localhost:5000/getTable?tablename=timeslottype');
        const response_affected = await axios.get('http://localhost:5000/getTable?tablename=team');
        const response_sound = await axios.get('http://localhost:5000/getTable?tablename=soundeffect');
        

        if (response_resource.data) {
          this.resources = response_resource.data.map(item => item.name) || [];
        }
        if(response_type.data){
          this.types = response_type.data.map(item => item.name) || [];
        }
        if(response_affected.data){
          this.affected = response_affected.data.map(item => item.name) || [];
        }
        if(response_sound.data){
          this.soundeffects = response_sound.data.map(item => item.name) || [];
        }
      } catch (error) {
        console.error('Fehler beim Laden der Daten:', error.response?.data || error.message);
      }
    }
  },
  mounted() {
    this.getValues();
  }
};
</script>
