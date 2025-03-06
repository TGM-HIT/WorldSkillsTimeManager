<template>
  <v-card class="mx-auto mt-10" rounded="xl" flat color="black" variant="outlined" height="30%" width="40%">
    <v-container fluid>
      <v-row class="text-h5 font-weight-bold d-flex justify-center align-center" style="color: #003866;">
        Create Timeslot
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Name</v-container>
        </v-col>
        <v-col>
          <v-text-field :error="errorBoolName" :error-messages="errorBoolName ? 'Please enter a name' : ''"
            class="ml-n16" rounded="lg" variant="outlined" v-model="timeslot.name"></v-text-field>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolName">
        <br />
      </div>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Description</v-container>
        </v-col>
        <v-col>
          <v-text-field :error="errorBoolDescription"
            :error-messages="errorBoolDescription ? 'Please enter a description' : ''" class="ml-n16" rounded="lg"
            variant="outlined" v-model="timeslot.description"></v-text-field>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolDescription">
        <br />
      </div>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Type</v-container>
        </v-col>
        <v-col>
          <v-autocomplete :error="errorBoolType" :error-messages="errorBoolType ? 'Please enter a type' : ''"
            class="ml-n16" rounded="lg" variant="outlined" v-model="timeslot.type" :items="types"></v-autocomplete>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolType">
        <br />
      </div>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5" style="color: #003866;">Day</v-container>
        </v-col>
        <v-col>
          <v-text-field :error="errorBoolDay" :error-messages="errorBoolDay ? 'Please enter a day' : ''" class="ml-n16"
            rounded="lg" variant="outlined" v-model="timeslot.day" type="number"></v-text-field>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolDay">
        <br />
      </div>
      <v-row class="mb-n8 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">From</v-container>
        </v-col>
        <v-col>
          <v-text-field :error="errorBoolFrom" :error-messages="errorBoolFrom ? 'Please enter a starting time' : ''"
            rounded="lg" variant="outlined" type="time" v-model="timeslot.time_from"></v-text-field>
        </v-col>
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">To</v-container>
        </v-col>
        <v-col>
          <v-text-field :error="errorBoolTo" :error-messages="errorBoolTo ? 'Please enter a ending time' : ''"
            rounded="lg" variant="outlined" type="time" v-model="timeslot.time_to"></v-text-field>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolDay && errorBoolTo">
        <br />
      </div>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Resource</v-container>
        </v-col>
        <v-col>
          <v-autocomplete :error="errorBoolResource"
            :error-messages="errorBoolResource ? 'Please enter at least 1 resource' : ''" class="ml-n16" rounded="lg"
            v-model="timeslot.resources" :items="resources" item-title="name" item-value="id" multiple variant="outlined"></v-autocomplete>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolResource">
        <br />
      </div>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Affected
            Teams</v-container>
        </v-col>
        <v-col>
          <v-autocomplete :error="errorBoolAffected"
            :error-messages="errorBoolAffected ? 'Please enter at least 1 team' : ''" class="ml-n16" rounded="lg"
            v-model="timeslot.affected" :items="affected" item-title="name" item-value="id" multiple variant="outlined"></v-autocomplete>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolAffected">
        <br />
      </div>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Allowed
            Overlaps</v-container>
        </v-col>
        <v-col>
          <v-text-field :error="errorBoolAllowed" :error-messages="errorBoolAllowed ? 'Please enter a day' : ''"
            class="ml-n16" rounded="lg" variant="outlined" v-model="timeslot.allowed_overlaps"
            type="number"></v-text-field>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolAllowed">
        <br />
      </div>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Soundeffect</v-container>
        </v-col>
        <v-col>
          <v-autocomplete :error="errorBoolSoundeffect" :error-messages="errorBoolSoundeffect ? 'Please enter a soundeffecf' : ''"class="ml-n16" rounded="lg" variant="outlined" v-model="timeslot.soundeffect"
            :items="soundeffects"></v-autocomplete>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolSoundeffect">
        <br />
      </div>
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
      errorBoolName: false,
      errorBoolDescription: false,
      errorBoolType: false,
      errorBoolDay: false,
      errorBoolFrom: false,
      errorBoolTo: false,
      errorBoolAffected: false,
      errorBoolResource: false,
      errorBoolAllowed: false,
      errorBoolSoundeffect: false,
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
        allowed_overlaps: ''
      },
      types: [],
      resources: [],
      affected: [],
      soundeffects: []
    };
  },
  methods: {
    async createTimeslot() {
      if (this.timeslot.name !== "" && 
          this.timeslot.description !== "" && 
          this.timeslot.type && 
          this.timeslot.day > 0 && 
          this.timeslot.time_from !== "" && 
          this.timeslot.time_to !== "" && 
          this.timeslot.resources.length !== 0 && 
          this.timeslot.affected.length !== 0 &&
          this.timeslot.allowed_overlaps > 0 && 
          this.timeslot.soundeffect
        ) {
        this.errorBoolName = false;
        this.errorBoolDescription = false;
        this.errorBoolType = false;
        this.errorBoolDay = false;
        this.errorBoolFrom = false;
        this.errorBoolTo = false;
        this.errorBoolAffected = false;
        this.errorBoolResource = false;
        this.errorBoolAllowed = false;
        this.errorBoolSoundeffect = false;
        try {
          const response = await axios.post('http://localhost:5000/setTimeslot', {
            name: this.timeslot.name,
            description: this.timeslot.description,
            type: this.timeslot.type,
            day: this.timeslot.day,
            time_from: this.timeslot.time_from,
            time_to: this.timeslot.time_to,
            soundeffect: this.timeslot.soundeffect,
            allowed_overlaps: this.timeslot.allowed_overlaps,
            resources: this.timeslot.resources.map(r => r.id),
            affected: this.timeslot.affected.map(a => ({ id: a.id, type: 'team' }))
          });
          alert('Timeslot wurde erfolgreich erstellt!');
          this.resetForm();
        } catch (error) {
          console.error('Fehler beim Hinzufügen des Timeslots:', error.response?.data || error.message);
          alert('Fehler beim Erstellen des Timeslots!');
        }
      } else {
        this.errorBoolName = true;
        if (this.timeslot.name !== "") {
          this.errorBoolName = false;
        }
        this.errorBoolDescription = true;
        if (this.timeslot.description !== "") {
          this.errorBoolDescription = false;
        }
        this.errorBoolType = !this.timeslot.type;
        this.errorBoolDay = true;
        if (this.timeslot.day > 0) {
          this.errorBoolDay = false;
        }
        this.errorBoolFrom = true;
        if (this.timeslot.time_from !== "") {
          this.errorBoolFrom = false;
        }
        this.errorBoolTo = true;
        if (this.timeslot.time_to !== "") {
          this.errorBoolTo = false;
        }
        this.errorBoolAffected = true;
        if (this.timeslot.affected.length !== 0) {
          this.errorBoolAffected = false;
        }
        this.errorBoolResource = true;
        if (this.timeslot.resources.length !== 0) {
          this.errorBoolResource = false;
        }
        this.errorBoolAllowed = true;
        if (this.timeslot.allowed_overlaps > 0) {
          this.errorBoolAllowed = false;
        }
        this.errorBoolSoundeffect = !this.timeslot.soundeffect;
      }
    },
    giveDayInfoTest() {
      alert(this.timeslot.time_from);
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
        affected: '',
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

    console.log('Resources:', response_resource.data);
    console.log('Types:', response_type.data);
    console.log('Affected Teams:', response_affected.data);
    console.log('Sound Effects:', response_sound.data);

    if (response_resource.data) {
      this.resources = response_resource.data.map(item => ({ id: item.id, name: item.name })) || [];
    }
    if (response_type.data) {
      this.types = response_type.data.map(item => item.name) || [];
    }
    if (response_affected.data) {
      this.affected = response_affected.data.map(item => ({ id: item.id, name: item.name })) || [];
    }
    if (response_sound.data) {
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
