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
            {{ titleType }} Resource
          </div>
        </v-col>
        <v-col cols="auto"></v-col>
      </v-row>

      <v-row class="mb-n9 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866">
            Name
          </v-container>
        </v-col>
        <v-col>
          <v-text-field 
            :error="errorBoolName" 
            :error-messages="errorBoolName ? 'Please enter a name' : ''"
            class="ml-n16" 
            rounded="lg" 
            variant="outlined" 
            v-model="resource.name">
          </v-text-field>
        </v-col>
      </v-row>
      <div v-show="errorBoolName"><br /></div>
      
      <v-row class="mb-n8 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866">
            Description
          </v-container>
        </v-col>
        <v-col>
          <v-text-field 
            :error="errorBoolDescription"
            :error-messages="errorBoolDescription ? 'Please enter a description' : ''" 
            class="ml-n16" 
            rounded="lg"
            variant="outlined" 
            v-model="resource.description">
          </v-text-field>
        </v-col>
      </v-row>
      <div v-show="errorBoolDescription"><br /></div>
      
      <v-row>
        <v-col></v-col>
        <v-col class="d-flex justify-end pt-2">
          <v-btn v-if="!this.editing" class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866" @click="createResource">
            Create
          </v-btn>
          <v-btn v-if="this.editing" class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866" @click="editResource">
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
import axios from "axios";
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
      errorBoolDescription: false,
      showSuccess: false,
      showError: false,
      loading: false,
      loadingVisible: false,
      resource: {
        name: "",
        description: "",
      },
    };
  },
  methods: {

    async setUpEdit(editId) {
      this.loading = true;
      try {
        const response = await axios.get(`http://localhost:5000/getRow?tablename=resource&id=${editId}`);
          if (response.data && response.data.length > 0) {
          const resourceData = response.data[0];
          this.resource = {
            name: resourceData.name,
            description: resourceData.description
          };
        }
        this.loading = false;
        this.loadingVisible = false;
      } catch (error) {
        this.showError = true;
        setTimeout(() => (this.showError = false), 3000);
      }
    },

    async createResource() {
      if (this.resource.name !== "" && this.resource.description !== "") {
        this.errorBoolName = false;
        this.errorBoolDescription = false;
        try {
          const response = await axios.post("http://localhost:5000/setTable", {
            table: "resource",
            data: {
              name: this.resource.name,
              description: this.resource.description,
            },
          });
          this.showSuccess = true;
          setTimeout(() => (this.showSuccess = false), 3000);

        } catch (error) {
          this.showError = true;
          setTimeout(() => (this.showError = false), 3000);
        } finally {
          this.resource = { name: "", description: "" };
        }
      } else {
        this.errorBoolName = this.resource.name === "";
        this.errorBoolDescription = this.resource.description === "";
      }
    },

    returnToList(){
      this.$emit('returnToList')
    },

    async editResource(){
      if (this.resource.name !== '' && this.resource.country_code !== '' && this.resource.flagBase64 !== null) {
        this.errorBoolName = false;
        this.errorBoolCode = false;
        this.errorBoolFlag = false;
        try {
          const response = await axios.post('http://localhost:5000/updateTable', {
            table: 'resource',
            data: {
              id: this.editId,
              name: this.resource.name,
              description: this.resource.description
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

    resetForm(){
      this.name = '',
      this.description = ''
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