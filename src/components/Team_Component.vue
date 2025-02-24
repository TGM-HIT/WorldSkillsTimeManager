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
          <v-text-field v-model="name" class="ml-n16" rounded="lg" variant="outlined"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Country Code
          </v-container>
        </v-col>
        <v-col>
          <v-text-field v-model="country_code" class="ml-n16" rounded="lg" variant="outlined"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Country Name
          </v-container>
        </v-col>
        <v-col>
          <v-text-field v-model="country_name" class="ml-n16" rounded="lg" variant="outlined"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Flag
          </v-container>
        </v-col>
        <v-col>
          <v-file-input v-model="flag" class="ml-n16" rounded="lg" variant="outlined" accept="image/*" label="Upload Flag Picture" show-size prepend-icon="" append-inner-icon="mdi-file" @change="handleFileUpload"></v-file-input>
        </v-col>
      </v-row>
      <v-row class="mb-n8 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Teammates
          </v-container>
        </v-col>
        <v-col>
          <v-autocomplete class="ml-n16" rounded="lg" variant="outlined" label="Select Teammates" multiple></v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col></v-col>
        <v-col class="d-flex justify-end pt-0">
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
      name: '',
      country_code: '',
      country_name: '',
      flag: null
    };
  },
  methods: {
    // Convert file to Base64
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.flag = reader.result.split(',')[1]; // Save only the base64 part (remove the data URL prefix)
        };
        reader.readAsDataURL(file); // Convert the file to Base64
      }
    },

    // Create the group and send to the backend
    async createGroup() {
      try {
        const response = await axios.post('http://localhost:5000/setTable', {
          table: 'team',
          data: {
            name: this.name,
            country_code: this.country_code,
            country_name: this.country_name,
            flag: this.flagString // Send base64 string here
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
      this.name = '';
      this.country_code = '';
      this.country_name = '';
      this.flag = null;
    }
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
