<template>
  <v-card class="mx-auto mt-10" max-width="700" rounded="xl" flat color="black" variant="outlined" height="auto"
    width="600px">
    <v-container fluid>
      <v-row class="text-h5 font-weight-bold d-flex justify-center align-center" style="color: #003866;">
        Create Team
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Name
          </v-container>
        </v-col>
        <v-col>
          <v-text-field v-model="team.name" :error="errorBoolName"
          :error-messages="errorBoolName ? 'Please enter a name' : ''" class="ml-n16" rounded="lg" variant="outlined"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Country Code
          </v-container>
        </v-col>
        <v-col>
          <v-select v-model="team.country_code" :items="Object.keys(countryList)" class="ml-n16" rounded="lg" variant="outlined"
            @update:modelValue="updateCountryName"></v-select>
        </v-col>
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Country Name
          </v-container>
        </v-col>
        <v-col>
          <v-text-field v-model="team.country_name" class="ml-n16" rounded="lg" variant="outlined" readonly></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Flag
          </v-container>
        </v-col>
        <v-col>
          <v-file-input v-model="team.flag" class="ml-n16" rounded="lg" variant="outlined" accept="image/*"
            label="Upload Flag Picture" show-size prepend-icon="" append-inner-icon="mdi-file"
            @change="handleFileUpload"></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col></v-col>
        <v-col class="d-flex justify-end pt-3">
          <v-btn class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866" @click="createGroup">
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
      errorBoolName: true,
      errorBoolCode: true,
      errorBoolFlag: true,
      team: {
        name: '',
        country_code: '',
        country_name: '',
        flagFile: null,
        flagBase64: '',
      },
      countryList: {
        "AT": "Austria",
        "DE": "Germany",
        "FR": "France",
        "US": "United States",
        "GB": "United Kingdom",
      },
    };
  },

  methods: {
    // Aktualisiert den Country Name basierend auf dem ausgewählten Country Code
    updateCountryName() {
      this.team.country_name = this.countryList[this.team.country_code] || '';
    },

    // Convert file to Base64
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.team.flagFile = file;

        const reader = new FileReader();
        reader.onloadend = () => {
          this.team.flagBase64 = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },

    // Create the group and send to the backend
    async createGroup() {
      try {
        console.log("Daten, die gesendet werden:", JSON.stringify(this.team, null, 2));

        const response = await axios.post('http://localhost:5000/setTable', {
          table: 'team',
          data: {
            name: this.team.name,
            country_code: this.team.country_code,
            country_name: this.team.country_name,
            flag: this.team.flagBase64,
          }
        });

        console.log('Team erfolgreich erstellt:', response.data);
        alert('Team wurde erfolgreich erstellt!');
      } catch (error) {
        console.error('Fehler beim Erstellen der Gruppe:', error.response?.data || error.message);
        alert('Fehler beim Erstellen der Gruppe!');
      } finally {
        this.resetForm();
      }
    },

    // Reset form fields
    resetForm() {
      this.team.name = '';
      this.team.country_code = '';
      this.team.country_name = '';
      this.team.flagFile = null;
      this.team.flagBase64 = '';
    }
  }
};
</script>