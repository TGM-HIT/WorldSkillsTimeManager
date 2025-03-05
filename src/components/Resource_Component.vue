<template>
  <v-card class="mx-auto mt-10" max-width="700" rounded="xl" flat color="black" variant="outlined" height="30%" width="40%">
    <v-container fluid>
      <v-row class="text-h5 font-weight-bold d-flex justify-center align-center" style="color: #003866">
        Create Resource
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
          <v-btn class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866" @click="createResource">
            Create
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>

  <!-- Erfolgs- & Fehler-Snackbar -->
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
  data() {
    return {
      errorBoolName: false,
      errorBoolDescription: false,
      showSuccess: false,
      showError: false,
      resource: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
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
    }
  }
};
</script>
