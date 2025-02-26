<template>
  <v-card class="mx-auto mt-10" max-width="700" rounded="xl" flat color="black" variant="outlined" height="auto"
    width="600px">
    <v-container fluid>
      <v-row class="text-h5 font-weight-bold d-flex justify-center align-center" style="color: #003866;">
        Create Type
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Name
          </v-container>
        </v-col>
        <v-col>
          <v-text-field 
            v-model="type.name"
            :error="errorBool" 
            :error-messages="errorBool ? 'Please enter a name' : ''" 
            class="ml-n16" 
            rounded="lg" 
            variant="outlined">
          </v-text-field>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBool">
        <br>
      </div>

      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Description
          </v-container>
        </v-col>
        <v-col>
          <v-text-field class="ml-n16" rounded="lg" variant="outlined" v-model="type.description"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-n8 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Color
          </v-container>
        </v-col>
        <v-col>
          <input style="width:125%; height:80%;   border-radius: 15px;" type="color" class="ml-n16" rounded="lg"
            v-model="type.color"></input>
        </v-col>
      </v-row>
      <v-row>
        <v-col></v-col>
        <v-col class="d-flex justify-end pt-0">
          <v-btn class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866" @click="createType">
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
      errorBool: false,
      type: {
        name: '',
        description: '',
        color: '',
        erfolgreich: '',
      }
    };
  },
  methods: {
    async createType() {
      if (this.type.name !== "") {
        this.errorBool = false;
        try {
          // Sende die Daten an das Backend
          const response = await axios.post('http://localhost:5000/setTable', {
            table: 'timeslottype',
            data: {
              name: this.type.name,
              description: this.type.description,
              color: this.type.color
            }
          });

          console.log('Erfolgreich hinzugefügt:', response.data);
          //alert('Resource wurde erfolgreich erstellt!');
          this.erfolgreich = 'Resource wurde erfolgreich erstellt!';

        } catch (error) {
          console.error('Fehler beim Hinzufügen der Resource:', error.response?.data || error.message);
          alert('Fehler beim Erstellen der Resource!');
        } finally {
          this.type.name = '';
          this.type.description = '';
          this.type.color = '';
          this.$forceUpdate();
        }
      } else {
        this.errorBool = true;
      }
    },
  }
};
</script>