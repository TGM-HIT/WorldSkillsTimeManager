<template>
  <v-card class="mx-auto mt-10" max-width="700" rounded="xl" flat color="black" variant="outlined" height="30%"
    width="40%">
    <v-container fluid>
      <v-row style="text-align: center;">
        <v-col cols="auto" v-if="editing">
          <v-btn style="background-color: #0e779f !important;" @click="returnToList">
            <v-icon color="white">mdi-arrow-left</v-icon>
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
          <v-text-field :error="errorBoolName" :error-messages="errorBoolName ? 'Please enter a name' : ''"
            v-model="group.name" class="ml-n16" rounded="lg" variant="outlined"></v-text-field>
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
          <v-autocomplete :error="errorBoolTeams" :error-messages="errorBoolTeams ? 'Please enter at least 1 team' : ''" v-model="group.teams" :items="teams" class="ml-n16" rounded="lg" variant="outlined"
            lable="Select Teammates" multiple></v-autocomplete>
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
      titleType: "",
      showSuccess: false,
      showError: false,
      errorBoolName: false,
      errorBoolTeams: false,
      group: {
        name: '',
        teams: []
      },
      teams: []
    };
  },
  methods: {

    async setUpEdit(editId) {
      try {
        const response = await axios.get(`http://localhost:5000/getRow?tablename=groups&id=${editId}`);
          if (response.data && response.data.length > 0) {
          const groupData = response.data[0];
          this.group = {
            name: groupData.name,
            teams: groupData.teams
          };
    }
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
          const response = await axios.post('http://localhost:5000/setTable', {
            table: 'groups',
            data: {
              name: this.group.name
            }
          });

          const groupId = response.data.id;

          if (groupId && this.group.teams.length > 0) {
            for (const teamName of this.group.teams) {
              const teamResponse = await axios.get(`http://localhost:5000/getTable?tablename=team&name=${teamName}`);
              const teamId = teamResponse.data?.[0]?.id;

              if (teamId) {
                await axios.post('http://localhost:5000/setTable', {
                  table: 'groupteams',
                  data: {
                    groupid: groupId,
                    teamid: teamId
                  }
                });
              }
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
        if (this.group.name == "") {
          this.errorBoolName = true;
        }
        if (this.group.teams.length == 0) {
          this.errorBoolTeams = true;
        }
        if (this.group.name !== "") {
          this.errorBoolName = false;
        }
        if (this.group.teams.length !== 0) {
          this.errorBoolTeams = false;
        }
      }
    },
    resetForm() {
      this.group = { name: '', teams: [] };
    },
    async GetValues() {
      try {
        const response_teams = await axios.get('http://localhost:5000/getTable?tablename=team')

        if (response_teams.data) {
          this.teams = response_teams.data.map(team => team.name) || [];
        }

      } catch (error) {
        console.error('Fehler beim bekommen der Teams:', error.response?.data || error.message);
        alert('Fehler beim bekommen von den Teams!');
      }
    },

    returnToList(){
      this.$emit('returnToList')
    },

    async editGroup(){
      if (this.group.name !== '' && this.group.teams !== null) {
        this.errorBoolName = false;
        this.errorBoolCode = false;
        this.errorBoolFlag = false;
        try {
          const response = await axios.post('http://localhost:5000/updateTable', {
            table: 'groups',
            data: {
              id: this.editId,
              name: this.resource.name,
            }
          });

          const groupId = this.editId;

          if (groupId && this.group.teams.length > 0) {
            for (const teamName of this.group.teams) {
              const teamResponse = await axios.get(`http://localhost:5000/getTable?tablename=team&name=${teamName}`);
              const teamId = teamResponse.data?.[0]?.id;

              if (teamId) {
                await axios.post('http://localhost:5000/updateTable', {
                  table: 'groupteams',
                  data: {
                    groupid: groupId,
                    teamid: teamId
                  }
                });
              }
            }
          }
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
  }, mounted() {
    this.GetValues();
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
        this.setUpEdit(this.editId);
        this.$forceUpdate();
      }
    }
  }
};
</script>