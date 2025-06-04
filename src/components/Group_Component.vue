<template>

  <!-- Loading Bar -->
  <div v-if="loading" class="loading-overlay">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>

  <v-card v-if="!loadingVisible" class="mx-auto mt-10" max-width="700" rounded="xl" flat color="black" variant="outlined" height="30%" width="40%">
    <v-container fluid>
      <v-row style="text-align: center;">
        <v-col cols="auto" v-if="editing">
          <v-btn icon @click="returnToList">
            <v-icon color="#003866">mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
        <v-col class="text-center">
          <div class="text-h5 font-weight-bold" style="color: #003866;">
            {{ titleType }} Group
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
          <v-text-field :error="errorBoolName" :error-messages="errorBoolName ? 'Please enter a name' : ''" v-model="group.name" class="ml-n16" rounded="lg" variant="outlined"></v-text-field>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolName">
        <br>
      </div>
      <v-row class="mb-n8 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Teams
          </v-container>
        </v-col>
        <v-col>
          <!-- Autocomplete for teams showing both ID and Name, pre-selecting current teams -->
          <v-autocomplete 
            :error="errorBoolTeams" 
            :error-messages="errorBoolTeams ? 'Please enter at least 1 team' : ''" 
            v-model="group.teams" 
            :items="teams" 
            class="ml-n16" 
            rounded="lg" 
            variant="outlined"
            label="Select Teams" 
            multiple 
            item-value="id" 
            item-title="name">
          </v-autocomplete>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolTeams">
        <br>
      </div>
      <v-row>
        <v-col></v-col>
        <v-col class="d-flex justify-end pt-0">
          <v-btn v-if="!this.editing" class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866" @click="createGroup">
            Create
          </v-btn>
          <v-btn v-if="this.editing" class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866" @click="editGroup">
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
      titleType: this.initialEditing ? 'Edit' : 'Create',
      showSuccess: false,
      showError: false,
      errorBoolName: false,
      errorBoolTeams: false,
      loading: false,
      loadingVisible: false,
      group: {
        id: null,
        name: '',
        teams: []  // Array of team IDs (for edit, initially filled with selected team IDs)
      },
      teams: []  // List of available teams (with IDs and names)
    };
  },

  async created() {
    if (this.editing && this.editId) {
      await this.setUpEdit(this.editId);  // Load group data for editing
    }
  },

  methods: {
    async setUpEdit(editId) {
      this.loading = true;
  try {
    const groupResponse = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/getTable?tablename=groups`);
    
    if (groupResponse.data && groupResponse.data.length > 0) {
      const groupData = groupResponse.data.find(group => group.id === editId);
      if (groupData) {
        this.group.name = groupData.name;
        const groupTeamsResponse = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/getTable?tablename=groupteams`);
        
        if (groupTeamsResponse.data && groupTeamsResponse.data.length > 0) {
          const assignedTeams = groupTeamsResponse.data.filter(groupTeam => groupTeam.groupid === editId);
          
          this.group.teams = assignedTeams.map(item => item.teamid);
        }
      }
    }
    this.loading = false;
    this.loadingVisible = false;
  } catch (error) {
    this.showError = true;
    setTimeout(() => (this.showError = false), 3000);
  }
},
    async createGroup() {
      if (this.group.name !== "" && this.group.teams.length !== 0) {
        this.errorBoolName = false;
        this.errorBoolTeams = false;
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/setTable`, {
            table: 'groups',
            data: {
              name: this.group.name
            }
          });

          const groupId = response.data.id;

          if (groupId && this.group.teams.length > 0) {
            for (const teamId of this.group.teams) {
              await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/setTable`, {
                table: 'groupteams',
                data: {
                  groupid: groupId,
                  teamid: teamId
                }
              });
            }
          }
          this.showSuccess = true;
          setTimeout(() => (this.showSuccess = false), 3000);
        } catch (error) {
          this.showError = true;
          setTimeout(() => (this.showError = false), 3000);
        } finally {
          this.resetForm();
        }
      } else {
        this.errorBoolName = this.group.name === "";
        this.errorBoolTeams = this.group.teams.length === 0;
      }
    },
    async editGroup() {
  if (this.group.name !== "" && this.group.teams.length !== 0) {
    this.errorBoolName = false;
    this.errorBoolTeams = false;
    try {
      // Update der Gruppen-Daten
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/updateTable`, {
        table: 'groups',
        data: {
          id: this.editId,
          name: this.group.name
        }
      });

      // Löschen der vorhandenen Gruppen-Team-Zuordnungen
      await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/deleteRows`, {
        data: {
          table: 'groupteams',
          where: { groupid: this.editId }
        }
      });

      // Hinzufügen der neuen Gruppen-Team-Zuordnungen
      for (const teamId of this.group.teams) {
        await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/setTable`, {
          table: 'groupteams',
          data: {
            groupid: this.editId,
            teamid: teamId
          }
        });
      }

      this.showSuccess = true;
      setTimeout(() => (this.showSuccess = false), 3000);
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Gruppe:', error.response?.data || error.message);
      this.showError = true;
      setTimeout(() => (this.showError = false), 3000);
    } finally {
      this.resetForm();
      this.returnToList();
    }
  } else {
    this.errorBoolName = this.group.name === "";
    this.errorBoolTeams = this.group.teams.length === 0;
  }
},
    resetForm() {
      this.group = { name: '', teams: [] };
    },

    async GetValues() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/getUnasignedTeams`);
        if (response.data) {
          this.teams = response.data.map(team => ({ id: team.id, name: team.name, country_code: team.country_code })) || [];
        }
      } catch (error) {
        console.error('Fehler beim bekommen der Teams:', error.response?.data || error.message);
        alert('Fehler beim bekommen von den Teams!');
      }
    },

    returnToList() {
      this.$emit('returnToList')
    },
  },

  mounted() {
    this.GetValues();

    const currentPath = this.$route.path;
    const pathParts = currentPath.split('/').filter(part => part.length > 0);

    if (pathParts.length >= 2) {
      if(pathParts[pathParts.length - 2].toLowerCase() == "edit"){
        this.loadingVisible = true;
      }
    }
  }
};
</script>
