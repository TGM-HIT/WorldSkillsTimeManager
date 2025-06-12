<template>

   <!-- Loading Bar -->
   <div v-if="loading" class="loading-overlay">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>

  <v-card v-if="!loadingVisible" class="mx-auto mt-10" max-width="700" rounded="xl" flat color="black" variant="outlined" height="auto" width="39%">
    <v-container fluid>
      <v-row style="text-align: center;">
        <v-col cols="auto" v-if="editing">
          <v-btn icon @click="returnToList">
            <v-icon color="#003866">mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
        <v-col class="text-center">
          <div class="text-h5 font-weight-bold" style="color: #003866;">
            {{ titleType }} Participant
          </div>
        </v-col>
        <v-col cols="auto"></v-col>
      </v-row>
      <br>
      <div v-show="errorBoolFName">
        <br />
      </div>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            First Name
          </v-container>
        </v-col>
        <v-col>
          <v-text-field v-model="participant.first_name" :error="errorBoolFName"
            :error-messages="errorBoolFName ? 'Please enter a first name' : ''" class="ml-n16" rounded="lg" variant="outlined"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Last Name
          </v-container>
        </v-col>
        <v-col>
          <v-text-field v-model="participant.last_name" :error="errorBoolLName"
            :error-messages="errorBoolLName ? 'Please enter a last name' : ''" class="ml-n16" rounded="lg" variant="outlined"></v-text-field>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolLName">
        <br />
      </div>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Assigned Team</v-container>
        </v-col>
        <v-col>
          <v-autocomplete :error="errorBoolTeam" :error-messages="errorBoolTeam ? 'Please enter a team' : ''" class="ml-n16" rounded="lg" variant="outlined" v-model="participant.team" :items="teams" item-title="name" item-value="id"></v-autocomplete>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolTeam">
        <br />
      </div>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Picture
          </v-container>
        </v-col>
        <v-col>
          <v-file-input v-model="participant.image" :error="errorBoolIMG" :error-messages="errorBoolIMG ? 'Please upload a png' : ''" class="ml-n16" rounded="lg" variant="outlined" accept="image/*" label="Upload Picture" show-size prepend-icon="" append-inner-icon="mdi-file" @change="handleFileUpload"></v-file-input>
        </v-col>
      </v-row>
      <br>

      <div v-show="errorBoolIMG">
        <br />
      </div>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Role
          </v-container>
        </v-col>
        <v-col>
          <v-text-field v-model="participant.role" :error="errorBoolRole" :error-messages="errorBoolRole ? 'Please enter a role' : ''" class="ml-n16" rounded="lg" variant="outlined"></v-text-field>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolRole">
        <br />
      </div>
      <v-row>
        <v-col v-if="this.editing" class="d-flex ml-4 pt-2">
          <v-btn style="width:30%" @click="viewParticipant(editId)" rounded="lg" color="blue" icon="mdi-image" size="small">
          </v-btn></v-col>
        <v-col></v-col>
        <v-col class="d-flex justify-end pt-2">
          <v-btn v-if="!editing" class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866" @click="createParticipant">
            Create
          </v-btn>
          <v-btn v-if="editing" class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866" @click="editParticipant">
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
      errorBoolFName: false,
      errorBoolLName: false,
      errorBoolTeam: false,
      errorBoolIMG: false,
      errorBoolRole: false,
      loading: false,
      loadingVisible: false,
      participant: {
        team: '',
        first_name: '',
        last_name: '',
        image: null,
        role: '',
        flagBase64: ''
      },
      teams: [],
    };
  },
  methods: {
    async setUpEdit(editId) {
      this.loading = true;
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/getRow?tablename=participant&id=${editId}`);
        if (response.data && response.data.length > 0) {
          const participantData = response.data[0];
          this.participant = {
            team: participantData.team_id,
            first_name: participantData.first_name,
            last_name: participantData.last_name,
            flagBase64: participantData.image,
            role: participantData.role
          };
        }
        this.loading = false;
        this.loadingVisible = false;
      } catch (error) {
        this.showError = true;
        setTimeout(() => (this.showError = false), 3000);
      }
    },

    viewParticipant(id) {
      this.$emit('showParticipant', id)
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.participant.image = file;

        const reader = new FileReader();
        reader.onloadend = () => {
          this.participant.flagBase64 = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },

    async createParticipant() {
      if (this.participant.first_name && this.participant.last_name && this.participant.team && this.participant.image && this.participant.role) {
        this.errorBoolFName = this.errorBoolLName = this.errorBoolTeam = this.errorBoolIMG = this.errorBoolRole = false;
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/setTable`, {
            table: 'participant',
            data: {
              team_id: this.participant.team,
              first_name: this.participant.first_name,
              last_name: this.participant.last_name,
              image: this.participant.flagBase64,
              role: this.participant.role
            }
          });
          this.showSuccess = true;
          setTimeout(() => (this.showSuccess = false), 3000);
        } catch (error) {
          this.showError = true;
          setTimeout(() => (this.showError = false), 3000);
        } finally {
          this.resetForm();
          this.$forceUpdate();
        }
      } else {
        this.errorBoolFName = !this.participant.first_name;
        this.errorBoolLName = !this.participant.last_name;
        this.errorBoolTeam = !this.participant.team;
        this.errorBoolIMG = !this.participant.image;
        this.errorBoolRole = !this.participant.role;
      }
    },

    resetForm() {
      this.participant = {
        team: '',
        first_name: '',
        last_name: '',
        image: null,
        role: '',
        flagBase64: '',
        country_code: '',
      };
    },

    async getValues() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/getTable?tablename=team`);
        if (response.data) {
          this.teams = response.data.map(item => ({ id: item.id, name: item.name,  country_code: item.country_code })) || [];
        }
      } catch (error) {
        console.error('Error loading data:', error.response?.data || error.message);
      }
      for(let i = 0; i < this.teams.length;i++){
        this.teams[i].name += ` (${this.teams[i].country_code})`;
      }
    },

    returnToList() {
      this.$emit('returnToList');
    },

    async editParticipant() {
      if (this.participant.team && this.participant.first_name && this.participant.last_name && this.participant.role) {
        this.errorBoolFName = this.errorBoolLName = this.errorBoolTeam = this.errorBoolRole = false;
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/updateTable`, {
            table: 'participant',
            data: {
              id: this.editId,
              team_id: this.participant.team,
              first_name: this.participant.first_name,
              last_name: this.participant.last_name,
              image: this.participant.flagBase64, // Use existing image if no new image is uploaded
              role: this.participant.role
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
        this.errorBoolFName = !this.participant.first_name;
        this.errorBoolLName = !this.participant.last_name;
        this.errorBoolTeam = !this.participant.team;
        this.errorBoolRole = !this.participant.role;
      }
    }
  },

  mounted() {
    this.getValues();
    const currentPath = this.$route.path;
    const pathParts = currentPath.split('/').filter(part => part.length > 0);

    if (pathParts.length >= 2) {
      if (pathParts[pathParts.length - 2].toLowerCase() === "create") {
        this.editing = false;
        this.titleType = "Create";
        this.resetForm();
        this.$forceUpdate();
      } else if (pathParts[pathParts.length - 2].toLowerCase() === "edit") {
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