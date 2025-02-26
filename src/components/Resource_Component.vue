<template>
    <v-card
      class="mx-auto mt-10"
      max-width="700"
      rounded="xl"
      flat
      color="black"
      variant="outlined"
      height="250px"
      width="600px"
    >
      <v-container fluid>
        <v-row
          class="text-h5 font-weight-bold d-flex justify-center align-center"
          style="color: #003866;"
        > Create Resource
        </v-row>
        <v-row class="mb-n12 mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
              Name
            </v-container>
          </v-col>
          <v-col>
            <v-text-field :error="errorBoolName"
            :error-messages="errorBoolName ? 'Please enter a valid name' : ''" class="ml-n16" rounded="lg" variant="outlined" v-model="resource.name"></v-text-field>
          </v-col>
        </v-row>
        <div v-show="errorBoolName">
        <br>
      </div>
        <v-row class="mb-n8 mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
              Description
            </v-container>
          </v-col>
          <v-col>
            <v-text-field :error="errorBoolDescription"
            :error-messages="errorBoolDescription ? 'Please enter a description' : ''" class="ml-n16" rounded="lg" variant="outlined" v-model="resource.description"></v-text-field>
          </v-col>
        </v-row>
        <div v-show="errorBoolDescription">
        <br>
      </div>
        <v-row>
          <v-col></v-col>
          <v-col class="d-flex justify-end pt-0">
            <v-btn class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866" @click="createResource">
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
      resource: {
        name: '',
        description: ''
      }
    };
  },
  methods: {
  async createResource() {
    if (this.resource.name !== "" && this.resource.description !== 0) {
      this.errorBoolName = false;
        this.errorBoolDescription = false;
    try {
      // Sende die Daten an das Backend
      const response = await axios.post('http://localhost:5000/setTable', {
        table: 'resource', // replace this with the actual table name
        data: {
          name: this.resource.name,
          description: this.resource.description
        }
      });

      console.log('Erfolgreich hinzugefügt:', response.data);
      alert('Resource wurde erfolgreich erstellt!');
    } catch (error) {
      console.error('Fehler beim Hinzufügen der Resource:', error.response?.data || error.message);
      alert('Fehler beim Erstellen der Resource!');
    } finally {
      this.resource = {
        name: '',
        description: ''
      };
      this.$forceUpdate();
    }
  }else {
    if (this.resource.name == "") { this.errorBoolName = true; }
        if (this.resource.description == 0) { this.errorBoolDescription = true; }
        if (this.resource.name !== "") { this.errorBoolName = false; }
        if (this.resource.description !== 0) { this.errorBoolDescription = false; }
  }
  },
  handleResize() {
      const width = window.innerWidth;
      if (width < 600) {
        this.cardStyle = { width: "90%", height: "auto" };
      } else if (width < 960) {
        this.cardStyle = { width: "80%", height: "auto" };
      } else {
        this.cardStyle = { width: "700px", height: "250px" };
      }
    }
  
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>
