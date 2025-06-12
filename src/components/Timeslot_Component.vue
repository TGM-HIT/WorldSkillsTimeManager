<template>
  <!-- Loading Bar -->
  <div v-if="loading" class="loading-overlay">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>

  <v-card v-if="!loadingVisible" class="mx-auto mt-10" rounded="xl" flat color="black" variant="outlined" height="30%" width="40%">
    <v-container fluid>
      <v-row style="text-align: center;">
        <v-col cols="auto" v-if="editing">
          <v-btn icon @click="returnToList">
            <v-icon color="#003866">mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
        <v-col class="text-center">
          <div class="text-h5 font-weight-bold" style="color: #003866;">
            {{ titleType }} Timeslot
          </div>
        </v-col>
        <v-col cols="auto"></v-col>
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Name</v-container>
        </v-col>
        <v-col>
          <v-text-field :error="errorBoolName" :error-messages="errorBoolName ? 'Please enter a name' : ''"
            class="ml-n16" rounded="lg" variant="outlined" v-model="timeslot.name"></v-text-field>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolName">
        <br />
      </div>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Description</v-container>
        </v-col>
        <v-col>
          <v-text-field class="ml-n16" rounded="lg"
            variant="outlined" v-model="timeslot.description"></v-text-field>
        </v-col>
      </v-row>
      <br>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Type</v-container>
        </v-col>
        <v-col>
          <v-autocomplete :error="errorBoolType" :error-messages="errorBoolType ? 'Please enter a type' : ''"
            class="ml-n16" rounded="lg" variant="outlined" v-model="timeslot.type" :items="types" item-title="name"
            item-value="id"></v-autocomplete>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolType">
        <br />
      </div>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5" style="color: #003866;">Day</v-container>
        </v-col>
        <v-col>
          <v-text-field :error="errorBoolDay" :error-messages="errorBoolDay ? 'Please enter a day' : ''" class="ml-n16"
            rounded="lg" variant="outlined" v-model="timeslot.day" ></v-text-field>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolDay">
        <br />
      </div>
      <v-row class="mb-n8 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">From</v-container>
        </v-col>
        <v-col>
          <v-text-field :error="errorBoolFrom" :error-messages="errorBoolFrom ? 'Please enter a starting time' : ''"
            rounded="lg" variant="outlined" type="time" v-model="timeslot.time_from"></v-text-field>
        </v-col>
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">To</v-container>
        </v-col>
        <v-col>
          <v-text-field :error="errorBoolTo" :error-messages="errorBoolTo ? 'Please enter an ending time' : ''"
            rounded="lg" variant="outlined" type="time" v-model="timeslot.time_to"></v-text-field>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolDay && errorBoolTo">
        <br />
      </div>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Resource</v-container>
        </v-col>
        <v-col>
          <v-autocomplete class="ml-n16" rounded="lg"
            v-model="timeslot.resources" :items="resources" item-title="name" item-value="id" multiple
            variant="outlined"></v-autocomplete>
        </v-col>
      </v-row>
      <br>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Affected
            Teams</v-container>
        </v-col>
        <v-col>
          <v-autocomplete :error="errorBoolAffected"
            :error-messages="errorBoolAffected ? 'Please enter at least 1 team' : ''" class="ml-n16" rounded="lg"
            v-model="timeslot.teams" :items="teams" item-title="name" item-value="id" multiple
            variant="outlined"></v-autocomplete>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolAffected">
        <br />
      </div>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Affected
            Groups</v-container>
        </v-col>
        <v-col>
          <v-autocomplete :error="errorBoolGroups"
            :error-messages="errorBoolGroups ? 'Please enter at least 1 group' : ''" class="ml-n16" rounded="lg"
            v-model="timeslot.groups" :items="groups" item-title="name" item-value="id" multiple
            variant="outlined"></v-autocomplete>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolGroups">
        <br />
      </div>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Allowed
            Overlaps</v-container>
        </v-col>
        <v-col>
          <v-text-field :error="errorBoolAllowed" :error-messages="errorBoolAllowed ? 'Please enter a positive number' : ''"
            class="ml-n16" rounded="lg" variant="outlined" v-model="timeslot.allowed_overlaps"
            type="number"></v-text-field>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolAllowed">
        <br />
      </div>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">Soundeffect</v-container>
        </v-col>
        <v-col>
          <v-autocomplete class="ml-n16" rounded="lg"
            variant="outlined" v-model="timeslot.soundeffect_id" :items="soundeffects" item-title="name"
            item-value="id"></v-autocomplete>
        </v-col>
      </v-row>
      <br>
      <v-row>
        <v-col></v-col>
        <v-col class="d-flex justify-end mt-4 pt-0">
          <v-btn v-if="!this.editing" class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866"
            @click="createTimeslot">
            Create
          </v-btn>
          <v-btn v-if="this.editing" class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866"
            @click="editTimeslot">
            Update
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>

  <SuccessSnackbar v-model:show="showSuccess" />
  <ErrorSnackbar :show="showError" :message="errorMessage" @update:show="showError = $event" />

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
      errorBoolName: false,
      errorBoolType: false,
      errorBoolDay: false,
      errorBoolFrom: false,
      errorBoolTo: false,
      errorBoolAffected: false,
      errorBoolGroups: false,
      errorBoolAllowed: false,
      showSuccess: false,
      showError: false,
      loading: false,
      loadingVisible: false,
      timeslot: {
        id: null,
        name: '',
        description: '',
        type: '',
        day: '',
        time_from: '',
        time_to: '',
        resources: [],
        teams: [],
        groups: [],
        soundeffect_id: '',
        allowed_overlaps: ''
      },
      types: [],
      resources: [],
      teams: [],
      groups: [],
      soundeffects: []
    };
  },

  watch: {
    'timeslot.groups': {
      handler: 'updateTeamsBasedOnGroups',
      deep: true
    }
  },

  methods: {
    async setUpEdit(editId) {
      this.loading = true;
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/getTimeslot?id=${editId}`);
        if (response.data && response.data.length > 0) {
          const timeslotData = response.data[0];
          this.timeslot = {
            id: timeslotData.id,
            name: timeslotData.name,
            description: timeslotData.description,
            type: timeslotData.type,
            day: timeslotData.day,
            time_from: timeslotData.time_from,
            time_to: timeslotData.time_to,
            resources: timeslotData.resources || [],
            teams: timeslotData.teams || [],
            groups: timeslotData.groups || [],
            soundeffect_id: timeslotData.soundeffect_id,
            allowed_overlaps: timeslotData.allowed_overlaps,
          };
          this.$forceUpdate();
        } else {
          console.error("Timeslot data not found");
          this.showError = true;
          setTimeout(() => (this.showError = false), 3000);
        }
        this.loading = false;
        this.loadingVisible = false;
      } catch (error) {
        console.error("Error fetching timeslot data:", error);
        this.showError = true;
        setTimeout(() => (this.showError = false), 3000);
      }
    },

    async createTimeslot() {
      if (
        this.timeslot.name !== "" &&
        this.timeslot.type &&
        this.timeslot.day !== "" &&
        this.timeslot.time_from !== "" &&
        this.timeslot.time_to !== "" &&
        this.timeslot.teams.length !== 0 ||
        this.timeslot.groups.length !== 0 &&
        this.timeslot.allowed_overlaps >= 0
      ) {
        this.errorBoolName = false;
        this.errorBoolType = false;
        this.errorBoolDay = false;
        this.errorBoolFrom = false;
        this.errorBoolTo = false;
        this.errorBoolAffected = false;
        this.errorBoolGroups = false;
        this.errorBoolAllowed = false;
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/setTimeslot`, {
            name: this.timeslot.name,
            description: this.timeslot.description,
            type: this.timeslot.type,
            day: this.timeslot.day,
            time_from: this.timeslot.time_from,
            time_to: this.timeslot.time_to,
            soundeffect_id: this.timeslot.soundeffect_id,
            allowed_overlaps: this.timeslot.allowed_overlaps,
            teams: this.timeslot.teams,
            groups: this.timeslot.groups,
            resources: this.timeslot.resources
          });
          this.showSuccess = true;
          setTimeout(() => (this.showSuccess = false), 5000);
        } catch (error) {
           this.errorMessage = error.response?.data?.message || 'Fehler beim Erstellen des Timeslots';
          this.showError = true;
          console.log(error);
          setTimeout(() => (this.showError = false), 5000);
        } finally {
          this.resetForm();
        }
      } else {
        this.errorBoolName = this.timeslot.name === "";
        this.errorBoolType = !this.timeslot.type;
        this.errorBoolDay = this.timeslot.day === "";
        this.errorBoolFrom = this.timeslot.time_from === "";
        this.errorBoolTo = this.timeslot.time_to === "";
        this.errorBoolAffected = this.timeslot.teams.length === 0;
        this.errorBoolGroups = this.timeslot.groups.length === 0;
        this.errorBoolAllowed = this.timeslot.allowed_overlaps < 0;
      }
    },

    resetForm() {
      this.timeslot = {
        id: null,
        name: '',
        description: '',
        type: '',
        day: '',
        time_from: '',
        time_to: '',
        resources: [],
        teams: [],
        groups: [],
        soundeffect_id: '',
        allowed_overlaps: 0
      };
    },

    async getValues() {
      try {
        const response_teams = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/getTable?tablename=team `);
        const response_groups = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/getTable?tablename=groups`);
        const response_types = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/getTable?tablename=timeslottype`);
        const response_sound = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/getTable?tablename=soundeffect`);
        const response_resources = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/getTable?tablename=resource`);

        if (response_teams.data) {
          this.teams = response_teams.data.map(item => ({ id: item.id, name: item.name })) || [];
        }
        if (response_groups.data) {
          this.groups = response_groups.data.map(item => ({ id: item.id, name: item.name })) || [];
        }
        if (response_types.data) {
          this.types = response_types.data.map(item => ({ id: item.id, name: item.name })) || [];
        }
        if (response_sound.data) {
          this.soundeffects = response_sound.data.map(item => ({ id: item.id, name: item.name })) || [];
        }
        if (response_resources.data) {
          this.resources = response_resources.data.map(item => ({ id: item.id, name: item.name })) || [];
        }
      } catch (error) {
        console.error('Error loading data:', error.response?.data || error.message);
      }
    },

    returnToList() {
      this.$emit('returnToList')
    },

    async editTimeslot() {
      if (
        this.timeslot.name !== "" &&
        this.timeslot.description !== "" &&
        this.timeslot.type &&
        this.timeslot.day !== "" &&
        this.timeslot.time_from !== "" &&
        this.timeslot.time_to !== "" &&
        this.timeslot.teams.length !== 0 ||
        this.timeslot.groups.length !== 0 &&
        this.timeslot.allowed_overlaps >= 0
      ) {
        this.errorBoolName = false;
        this.errorBoolType = false;
        this.errorBoolDay = false;
        this.errorBoolFrom = false;
        this.errorBoolTo = false;
        this.errorBoolAffected = false;
        this.errorBoolGroups = false;
        this.errorBoolAllowed = false;
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/editTimeslot`, {
            id: this.timeslot.id,
            name: this.timeslot.name,
            description: this.timeslot.description,
            type: this.timeslot.type,
            day: this.timeslot.day,
            time_from: this.timeslot.time_from,
            time_to: this.timeslot.time_to,
            soundeffect_id: this.timeslot.soundeffect_id,
            allowed_overlaps: this.timeslot.allowed_overlaps,
            teams: this.timeslot.teams,
            groups: this.timeslot.groups,
            resources: this.timeslot.resources
          });
          this.showSuccess = true;
          setTimeout(() => (this.showSuccess = false), 5000);
          this.returnToList();
        } catch (error) {
          this.errorMessage = error.response?.data?.message || 'Fehler beim Bearbeiten des Timeslots';
          this.showError = true;
          setTimeout(() => (this.showError = false), 5000);
        } finally {
          this.returnToList();
        }
      } else {
        this.errorBoolName = this.timeslot.name === "";
        this.errorBoolType = !this.timeslot.type;
        this.errorBoolDay = this.timeslot.day === "";
        this.errorBoolFrom = this.timeslot.time_from === "";
        this.errorBoolTo = this.timeslot.time_to === "";
        this.errorBoolAffected = this.timeslot.teams.length === 0;
        this.errorBoolGroups = this.timeslot.groups.length === 0;
        this.errorBoolAllowed = this.timeslot.allowed_overlaps < 0;
      }
    },

    async fetchTeamsByGroupIds(groupIds) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/getAllTeamIDSByGroupID?ids=${groupIds.join(',')}`);
        if (response.data && response.data.length > 0) {
          const teamIds = response.data.flatMap(group => group[1]);
          return teamIds;
        }
      } catch (error) {
        console.error('Error fetching teams by group IDs:', error);
      }
      return [];
    },

    async updateTeamsBasedOnGroups() {
      const teamIds = await this.fetchTeamsByGroupIds(this.timeslot.groups);
      this.timeslot.teams = teamIds;
    }
  },

  mounted() {
    this.getValues();
    const currentPath = this.$route.path;
    const pathParts = currentPath.split('/').filter(part => part.length > 0);

    if (pathParts.length >= 2) {
      if (pathParts[pathParts.length - 2].toLowerCase() == "create") {
        this.editing = false;
        this.titleType = "Create"
        this.resetForm();
        this.$forceUpdate();
      } else if (pathParts[pathParts.length - 2].toLowerCase() == "edit") {
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
