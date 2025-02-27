<template>
  <v-card class="mx-auto mt-10" max-width="700" rounded="xl" flat color="black" variant="outlined" height="auto"
    width="39%">
    <v-container fluid>
      <v-row class="text-h5 font-weight-bold d-flex justify-center align-center" style="color: #003866;">
        Create Participant
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
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Assigned
            Team</v-container>
        </v-col>
        <v-col>
          <v-autocomplete class="ml-n16" rounded="lg" variant="outlined" v-model="team" :items="teams" item-title="name"
            item-value="id"></v-autocomplete>
        </v-col>
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Picture
          </v-container>
        </v-col>
        <v-col>
          <v-file-input v-model="image" class="ml-n16" rounded="lg" variant="outlined" accept="image/*"
            label="Upload Picture" show-size prepend-icon="" append-inner-icon="mdi-file"
            @change="handleFileUpload"></v-file-input>
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
        <v-col class="d-flex justify-end pt-2">
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
    handleFileUpload(event) {
      const file = image.target.files[0];
      if (file) {
        this.image = file;

        const reader = new FileReader();
        reader.onloadend = () => {
          this.flagBase64 = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
    async createParticipant() {
      try {
        const response = await axios.post('http://localhost:5000/setTable', {
          table: 'participant',
          data: {
            team_id: this.team,
            first_name: this.first_name,
            last_name: this.last_name,
            image: this.flagBase64,
            role: this.role
          }
        });
        
        alert('Team wurde erfolgreich erstellt!');
        
      } catch (error) {
        console.error('Fehler beim Erstellen der Gruppe:', error.response?.data || error.message);
        alert('Fehler beim Erstellen der Gruppe!');
      } finally {
        this.resetForm();
        this.$forceUpdate();
      }
    },
    resetForm() {
      this.team = "";
      this.first_name = "";
      this.last_name = "";
      this.image = null;
      this.role = "";
    },

    async getValues() {
      try {
        const response = await axios.get('http://localhost:5000/getTable?tablename=team');
        console.log('Daten von der Datenbank:', response.data);

        if (response.data) {
          this.teams = response.data.map(item => ({ id: item.id, name: item.name })) || [];
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