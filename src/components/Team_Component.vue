<template>

  <!-- Loading Bar -->
  <div v-if="loading" class="loading-overlay">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>

  <v-card v-if="!loadingVisible" class="mx-auto mt-10" max-width="700" rounded="xl" flat color="black" variant="outlined" height="auto" width="600px">
    <v-container fluid>
      <v-row style="text-align: center;">
        <v-col cols="auto" v-if="editing">
          <v-btn icon @click="returnToList">
            <v-icon color="#003866">mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
        <v-col class="text-center">
          <div class="text-h5 font-weight-bold" style="color: #003866;">
            {{ titleType }} Team
          </div>
        </v-col>
        <v-col cols="auto"></v-col>
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Name
          </v-container>
        </v-col>
        <v-col>
          <v-text-field v-model="team.name" :error="errorBoolName"
            :error-messages="errorBoolName ? 'Please enter a name' : ''" class="ml-n16" rounded="lg"
            variant="outlined"></v-text-field>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolName">
        <br />
      </div>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Country Code
          </v-container>
        </v-col>
        <v-col>
          <v-select v-model="team.country_code" :error="errorBoolCode"
            :error-messages="errorBoolCode ? 'Please enter a country code' : ''" :items="Object.keys(countryList)"
            class="ml-n16" rounded="lg" variant="outlined" @update:modelValue="updateCountryName"></v-select>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolCode">
        <br />
      </div>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Country Name
          </v-container>
        </v-col>
        <v-col>
          <v-text-field v-model="team.country_name" class="ml-n16" rounded="lg" variant="outlined"
            readonly></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Flag
          </v-container>
        </v-col>
        <v-col>
          <v-file-input v-model="team.flagFile" :error="errorBoolFlag"
            :error-messages="errorBoolFlag ? 'Please upload a png' : ''" class="ml-n16" rounded="lg" variant="outlined"
            accept="image/*" label="Upload Flag Picture" show-size prepend-icon="" append-inner-icon="mdi-file"
            @change="handleFileUpload"></v-file-input>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolFlag">
        <br />
      </div>
      <v-row>
        <v-col v-if="this.editing" class="d-flex ml-4 pt-2">
          <v-btn style="width:30%" @click="viewParticipant(editId)" rounded="lg" color="blue" icon="mdi-image" size="small">
          </v-btn>
        </v-col>
        <v-col></v-col>
        <v-col class="d-flex justify-end pt-3">
          <v-btn v-if="!this.editing" class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866" @click="createTeam">
            Create
          </v-btn>
          <v-btn v-if="this.editing" class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866" @click="editTeam">
            Update
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <SuccessSnackbar v-model:show="showSuccess" />
  <ErrorSnackbar v-model:show="showError" />
</template>

<script>
import axios from 'axios';
import SuccessSnackbar from "@/components/SuccessSnackbar.vue";
import ErrorSnackbar from "@/components/ErrorSnackbar.vue";
import { countryList } from '@/assets/countryList'; 

export default {
  components: {
    SuccessSnackbar,
    ErrorSnackbar,
  },
  props: {
    initialEditing: {
      type: Boolean,
      default: false
    },
    editId: null
  },

  data() {
    return {
      editing: this.initialEditing,
      titleType: "",
      showSuccess: false,
      showError: false,
      errorBoolName: false,
      errorBoolCode: false,
      errorBoolFlag: false,
      loading: false,
      loadingVisible: false,
      team: {
        name: '',
        country_code: '',
        country_name: '',
        flagFile: null,
        flagBase64: '',
      },
      countryList: countryList,
    };
  },

  methods: {
    async setUpEdit(editId) {
      this.loading = true;
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/getRow?tablename=team&id=${editId}`);
          if (response.data && response.data.length > 0) {
          const teamData = response.data[0];
          this.team = {
            name: teamData.name,
            country_code: teamData.country_code,
            country_name: teamData.country_name,
            flagBase64: teamData.flag || ''
          };
        }
        this.loading = false;
        this.loadingVisible = false;
      } catch (error) {
        console.error("Fehler beim Abrufen der Teamdaten:", error);
        this.showError = true;
        setTimeout(() => (this.showError = false), 3000);
      }
    },

    returnToList(){
      this.$emit('returnToList')
    },

    updateCountryName() {
      this.team.country_name = this.countryList[this.team.country_code] || '';
    },

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

    async createTeam() {
      if (this.team.name !== '' && this.team.country_code !== '' && this.team.flagFile !== null) {
        this.errorBoolName = false;
        this.errorBoolCode = false;
        this.errorBoolFlag = false;
        try {
          console.log("Daten, die gesendet werden:", JSON.stringify(this.team, null, 2));

          const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/setTable`, {
            table: 'team',
            data: {
              name: this.team.name,
              country_code: this.team.country_code,
              country_name: this.team.country_name,
              flag: this.team.flagBase64,
            }
          });
          this.showSuccess = true;
          setTimeout(() => (this.showSuccess = false), 3000);
        } catch (error) {
          this.showError = true;
          setTimeout(() => (this.showError = false), 3000);
        } finally {
          this.resetForm();
        }
      } else {
        this.errorBoolName = this.team.name === '';
        this.errorBoolCode = this.team.country_code === '';
        this.errorBoolFlag = this.team.flagFile === null;
      }
    },

    async editTeam(){
      if (this.team.name !== '' && this.team.country_code !== '' && this.team.flagBase64 !== null) {
        this.errorBoolName = false;
        this.errorBoolCode = false;
        this.errorBoolFlag = false;
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/updateTable`, {
            table: 'team',
            data: {
              id: this.editId,
              name: this.team.name,
              country_code: this.team.country_code,
              country_name: this.team.country_name,
              flag: this.team.flagBase64,
            }
          });
          this.showSuccess = true;
          setTimeout(() => (this.showSuccess = false), 3000);
          this.returnToList();
        } catch (error) {
          this.showError = true;
          setTimeout(() => (this.showError = false), 3000);
        } finally {
          this.returnToList();
        }
      } else {
        this.errorBoolName = this.team.name === '';
        this.errorBoolCode = this.team.country_code === '';
        this.errorBoolFlag = this.team.flagFile === null;
      }
    },

    viewParticipant(id) {
      this.$emit('showParticipant', id)
    },

    // Reset form fields
    resetForm() {
      this.team.name = '';
      this.team.country_code = '';
      this.team.country_name = '';
      this.team.flagFile = null;
      this.team.flagBase64 = '';
    }
  },
  mounted() {
    const currentPath = this.$route.path;
    const pathParts = currentPath.split('/').filter(part => part.length > 0);

    if (pathParts.length >= 2) {
      if (pathParts[pathParts.length - 2].toLowerCase() == "create") {
        this.editing = false;
        this.titleType = "Create"
        this.resetForm();
        this.$forceUpdate();
      } else if(pathParts[pathParts.length - 2].toLowerCase() == "edit"){
        this.titleType = "Edit";
        this.loadingVisible = true;
        this.setUpEdit(this.editId);
        this.$forceUpdate();
      }
    }
  }
};
</script>

<style scoped>
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 10;
}
</style>