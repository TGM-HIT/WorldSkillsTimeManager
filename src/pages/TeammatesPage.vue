<template>
    <v-card
      class="mx-auto mt-10"
      max-width="700"
      rounded="xl"
      flat
      color="black"
      variant="outlined"
      height="auto"
      width="600px"
    >
      <v-container fluid>
        <v-row
          class="text-h5 font-weight-bold d-flex justify-center align-center"
          style="color: #003866;"
        >
          Create Participant
        </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
        <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Assigned Team</v-container>
        </v-col>
            <v-col>
            <v-autocomplete
                class="ml-n16"
                rounded="lg"
                variant="outlined"
                multiple
                v-model="team"
                :items="teams"
            ></v-autocomplete>
            </v-col>
        </v-row>
        <v-row class="mb-n12 mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
              First Name
            </v-container>
          </v-col>
          <v-col>
            <v-text-field v-model="first_name" class="ml-n16" rounded="lg" variant="outlined"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-n12 mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
              Last Name
            </v-container>
          </v-col>
          <v-col>
            <v-text-field v-model="last_name" class="ml-n16" rounded="lg" variant="outlined"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-n12 mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
              Flag
            </v-container>
          </v-col>
          <v-col>
            <v-file-input v-model="image" class="ml-n16" rounded="lg" variant="outlined" accept="image/*" label="Upload Flag Picture" show-size prepend-icon="" append-inner-icon="mdi-file" @change="handleFileUpload"></v-file-input>
          </v-col>
        </v-row>
        <v-row class="mb-n12 mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
              Role
            </v-container>
          </v-col>
          <v-col>
            <v-text-field v-model="role" class="ml-n16" rounded="lg" variant="outlined"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col></v-col>
          <v-col class="d-flex justify-end pt-0">
            <v-btn class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866" @click="createParticipant">
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
        
        team: '',
        first_name: '',
        last_name: '',
        image: null,
        role: '',
        teams: [],
      };
    },
    methods: {
      // Convert file to Base64
      handleFileUpload(file) {
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.image = reader.result.split(',')[1]; // Speichert das Base64-Format
          };
          reader.readAsDataURL(file);
        }
      },

  
      // Create the group and send to the backend
      async createParticipant() {
        try {
          const response = await axios.post('http://localhost:5000/setTable', {
            table: 'participant',
            data: {
                team: this.team,
                first_name: this.first_name,
                last_name: this.last_name,
                image: this.image,
                role: this.role
            }
          });
  
          console.log('Team erfolgreich erstellt:', response.data);
          alert('Team wurde erfolgreich erstellt!');
        } catch (error) {
          console.error('Fehler beim Erstellen der Gruppe:', error.response?.data || error.message);
          alert('Fehler beim Erstellen der Gruppe!');
        } finally {
          this.resetForm();
          this.$forceUpdate();
        }
      },
  
      // Reset form fields
      resetForm() {
        this.team = "",
        this.first_name = "",
        this.last_name = "",
        this.image = null,
        this.role = ""
      }
    },
    async getValues() {
      try {
        const response = await axios.get('http://localhost:5000/getTable?tablename=team');
        
        if (response.data) {
          this.teams = response.data.map(item => item.name) || [];
        }
      } catch (error) {
        console.error('Fehler beim Laden der Daten:', error.response?.data || error.message);
      }
    },
    mounted() {
    this.getValues();
    }
  };
  </script>
  
  <style scoped>
  .custom-file-input {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 2px dashed #003866;
    background-color: #f5f5f5;
    transition: background-color 0.3s ease;
  }
  
  .custom-file-input:hover {
    background-color: #e0e0e0;
  }
  </style>