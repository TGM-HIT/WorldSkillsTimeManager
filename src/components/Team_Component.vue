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
          Create Team
        </v-row>
        <v-row class="mb-n12 mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
              Name
            </v-container>
          </v-col>
          <v-col>
            <v-text-field class="ml-n16" rounded="lg" variant="outlined"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-n12 mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
              Country Code
            </v-container>
          </v-col>
          <v-col>
            <v-text-field class="ml-n16" rounded="lg" variant="outlined"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-n12 mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
              Country Name
            </v-container>
          </v-col>
          <v-col>
            <v-text-field class="ml-n16" rounded="lg" variant="outlined"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-n12 mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
              Flag
            </v-container>
          </v-col>
          <v-col>
            <v-file-input class="ml-n16" rounded="lg" variant="outlined" accept="image/*" lable="Upload Flag Picture" show-size prepend-icon="" append-icon=""></v-file-input>
          </v-col>
        </v-row>
        <v-row class="mb-n8 mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
              Teammates
            </v-container>
          </v-col>
          <v-col>
            <v-autocomplete class="ml-n16" rounded="lg" variant="outlined" lable="Select Teammates" multiple></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col></v-col>
          <v-col class="d-flex justify-end pt-0">
            <v-btn class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866" >
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
        name: '',
        country_code: '',
        country_name: '',
        flag: ''
      };
    },
    methods: {
      async createGroup() {
        try {
          const response = await axios.post('http://localhost:5000/setTable',{
           table: 'team',
           data:{
            name: this.name,
            country_code: this.country_code,
            country_name: this.country_name,
            flag: this.flag
           }
          });



          console.log('Team erfolgreich erstellt:', response.data);
          alert('Team wurde erfolgreich erstellt!');
        } catch (error) {
          console.error('Fehler beim Erstellen der Gruppe:', error.response?.data || error.message);
          alert('Fehler beim Erstellen der Gruppe!');
        }finally{
          this.resetForm();
          this.$forceUpdate();
        }
      },
      resetForm() {
        this.name = '';
        this.country_code = '';
        this.country_name = '';
        this.flag = '';
      }
    }
  };
  </script>
  