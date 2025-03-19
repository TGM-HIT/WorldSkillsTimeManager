<template>
  <v-card class="mx-auto mt-10" max-width="700" rounded="xl" flat color="black" variant="outlined" height="auto"
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
            {{ titleType }} Soundeffect
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
          <v-text-field v-model="name" :error="errorBoolName"
          :error-messages="errorBoolName ? 'Please enter a name' : ''" class="ml-n16" rounded="lg" variant="outlined"></v-text-field>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolName">
        <br />
      </div>
      <v-row class="mb-n8 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            File
          </v-container>
        </v-col>
        <v-col>
          <v-file-input v-model="file" class="ml-n16" :error="errorBoolFile"
          :error-messages="errorBoolFile ? 'Please upload a file' : ''" rounded="lg" variant="outlined" accept="audio/mpeg" label="Drag & Drop or Click"
            color="#003866" show-size prepend-icon="" append-inner-icon="mdi-music" @change="handleFileUpload">
          </v-file-input>
        </v-col>
      </v-row>
      <div v-show="errorBoolFile">
        <br />
      </div>
      <v-row class="mb-n12 mr-4" v-if="this.editing">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Play current Sound
          </v-container>
        </v-col>
        <v-col>
          <v-btn @click="playSound" rounded="lg" color="green" icon="mdi-play" size="medium" style="width: 50%;"></v-btn>
        </v-col>
      </v-row>
      <br>
      <v-row>
        <v-col></v-col>
        <v-col></v-col>
        <v-col class="d-flex justify-end pt-0">
          <v-btn class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866" @click="createSound">
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
  <ReturnedSound_Component v-if="showPlay" :id="playId"/>
</template>

<script>
import axios from 'axios';
import SuccessSnackbar from "@/components/SuccessSnackbar.vue";
import ErrorSnackbar from "@/components/ErrorSnackbar.vue";
import ReturnedSound_Component from "@/components/ReturnedSound_Component.vue";

export default {
  components: {
    SuccessSnackbar,
    ErrorSnackbar,
    ReturnedSound_Component,
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
      errorBoolFile: false,
      filetype: "",
      soundeffect: {
        name: "",
        file: null,
      },
      showPlay: false,
      playId: null,
    };
  },
  methods: {
    async setUpEdit(editId) {
      try {
        const response = await axios.get(`http://localhost:5000/getRow?tablename=soundeffect&id=${editId}`);
          if (response.data && response.data.length > 0) {
          const soundeffectData = response.data[0];
          this.soundeffect = {
            name: soundeffectData.name,
            file: soundeffectData.file
          };
          this.playId = editId; // Set the playId for the current sound
    }
      } catch (error) {
        this.showError = true;
        setTimeout(() => (this.showError = false), 3000);
      }
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        if (file.type !== "audio/mpeg") {
          alert("Bitte nur MP3-Dateien hochladen!");
          return;
        }

        this.filetype = file.type; // Speichere den MIME-Typ

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.file = reader.result.split(',')[1]; // Speichere den Base64-String
        };
      }
    },
    async createSound() {
      if (this.name !== "" && this.file !== null ) {
        this.errorBoolName = false;
        this.errorBoolFile = false;
        try {
          if (this.filetype !== "audio/mpeg") {
            alert("Bitte lade eine gültige MP3-Datei hoch!");
            return;
          }

          const response = await axios.post("http://localhost:5000/setTable", {
            table: "soundeffect",
            data: {
              name: this.name,
              file: this.file, // Base64-String
            },
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
        this.errorBoolName = true;
        if (this.name !== "") { this.errorBoolName = false; }
        if (this.file !== null) { this.errorBoolFile = false; } else { this.errorBoolFile = true; }
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
    },

    playSound() {
      this.showPlay = !this.showPlay;
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