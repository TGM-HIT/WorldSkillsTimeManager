<template>
  <v-card class="mx-auto mt-10" max-width="700" rounded="xl" flat color="black" variant="outlined" height="30%"
    width="40%">
    <v-container fluid>
      <v-row style="text-align: center;">
        <v-col cols="auto" v-if="editing">
          <v-btn icon @click="returnToList">
            <v-icon color="#003866">mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
        <v-col class="text-center">
          <div class="text-h5 font-weight-bold" style="color: #003866;">
            {{ titleType }} Type
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
          <v-text-field v-model="type.name" :error="errorBoolName" :error-messages="errorBoolName ? 'Please enter a name' : ''"
            class="ml-n16" rounded="lg" variant="outlined">
          </v-text-field>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolName">
        <br>
      </div>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Description
          </v-container>
        </v-col>
        <v-col>
          <v-text-field :error="errorBoolDescription"
            :error-messages="errorBoolDescription ? 'Please enter a description' : ''" class="ml-n16" rounded="lg"
            variant="outlined" v-model="type.description"></v-text-field>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolDescription">
        <br />
      </div>
      <v-row class="mb-n8 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Color
          </v-container>
        </v-col>
        <v-col>
          <input style="width:125%; height:80%;   border-radius: 15px;" type="color" class="ml-n16" rounded="lg"
            v-model="type.color"></input>
        </v-col>
      </v-row>
      <v-row>
        <v-col></v-col>
        <v-col class="d-flex justify-end pt-2">
          <v-btn v-if="!this.editing" class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866" @click="createType">
            Create
          </v-btn>
          <v-btn v-if="this.editing" class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866" @click="editType">
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
      errorBoolDescription: false,
      type: {
        name: '',
        description: '',
        color: '',
        erfolgreich: '',
      }
    };
  },
  methods: {

    async setUpEdit(editId) {
      try {
        const response = await axios.get(`http://localhost:5000/getRow?tablename=timeslottype&id=${editId}`);
          if (response.data && response.data.length > 0) {
          const typeData = response.data[0];
          this.type = {
            name: typeData.name,
            description: typeData.description,
            color: typeData.color
          };
    }
      } catch (error) {
        this.showError = true;
        setTimeout(() => (this.showError = false), 3000);
      }
    },

    async createType() {
      if (this.type.name !== "" && this.type.description !== "") {
        this.errorBoolName = false;
        this.errorBoolDescription = false;
        try {
          // Sende die Daten an das Backend
          const response = await axios.post('http://localhost:5000/setTable', {
            table: 'timeslottype',
            data: {
              name: this.type.name,
              description: this.type.description,
              color: this.type.color
            }
          });
          this.showSuccess = true;
          setTimeout(() => (this.showSuccess = false), 3000);
        } catch (error) {
          this.showError = true;
          setTimeout(() => (this.showError = false), 3000);
        } finally {
          this.type.name = '';
          this.type.description = '';
          this.type.color = '';
          this.$forceUpdate();
        }
      } else {
        if (this.type.name == "") {
          this.errorBoolName = true;
        }
        if (this.type.description == "") {
          this.errorBoolDescription = true;
        }
        if (this.type.name !== "") {
          this.errorBoolName = false;
        }
        if (this.type.description !== "") {
          this.errorBoolDescription = false;
        }
      }
    },

    returnToList(){
      this.$emit('returnToList')
    },

    async editType(){
      if (this.type.name !== '' && this.type.description !== '' && this.type.color !== '') {
        this.errorBoolName = false;
        this.errorBoolCode = false;
        this.errorBoolFlag = false;
        try {
          const response = await axios.post('http://localhost:5000/updateTable', {
            table: 'timeslottype',
            data: {
              id: this.editId,
              name: this.type.name,
              description: this.type.description,
              color: this.type.color
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
        this.setUpEdit(this.editId);
        this.$forceUpdate();
      }
    }
  }
};
</script>