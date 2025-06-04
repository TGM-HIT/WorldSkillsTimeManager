<template>

  <!-- Loading Bar -->
  <div v-if="loading" class="loading-overlay">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>

  <v-card v-if="!loadingVisible" class="mx-auto mt-10" max-width="700" rounded="xl" flat color="black" variant="outlined" height="auto"
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
          <v-text-field v-model="soundeffect.name" :error="errorBoolName"
            :error-messages="errorBoolName ? 'Please enter a name' : ''" class="ml-n16" rounded="lg"
            variant="outlined"></v-text-field>
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
            :error-messages="errorBoolFile ? 'Please upload a file' : ''" rounded="lg" variant="outlined"
            accept="audio/mpeg" :label="soundeffect.filename" color="#003866" show-size prepend-icon=""
            append-inner-icon="mdi-music" @change="handleFileUpload">
          </v-file-input>
        </v-col>
      </v-row>
      <div v-show="errorBoolFile">
        <br />
      </div>

      <br>
      <v-row>
        <v-col class="d-flex ml-4 pt-0" v-if="this.editing">
          <v-btn style="width:30%" @click="playSound" rounded="lg" color="green" size="medium">
            <v-icon left>mdi-play</v-icon>

          </v-btn></v-col>
        <v-col></v-col>
        <v-col class="d-flex justify-end pt-0">
          <v-btn v-if="!this.editing" class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866"
            @click="createSound">
            Create
          </v-btn>
          <v-btn v-if="this.editing" class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866"
            @click="editSound">
            Update
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <SuccessSnackbar v-model:show="showSuccess" />
  <ErrorSnackbar v-model:show="showError" />
  <ReturnedSound_Component v-if="showPlay" :id="playId" style="text-align: center; margin-top: 3%;" />
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
    editId: null,
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
      uploaded: false,
      loading: false,
      loadingVisible: false,
      soundeffect: {
        name: "",
        file: null,
        filename: "Drag & Drop or Click"
      },
      showPlay: false,
      playId: null,
    };
  },
  methods: {
    async setUpEdit(editId) {
      this.loading = true;
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/getRow?tablename=soundeffect&id=${editId}`);
        if (response.data && response.data.length > 0) {
          const soundeffectData = response.data[0];
          this.soundeffect = {
            name: soundeffectData.name,
            file: soundeffectData.file,
            filename: soundeffectData.filename
          };
          this.playId = editId;
        }
        this.loading = false;
        this.loadingVisible = false;
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

        this.filetype = file.type;
        this.soundeffect.filename = file.name;
        this.uploaded = true;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.soundeffect.file = reader.result.split(',')[1];
        };
      }
    },

    async createSound() {
      if (this.soundeffect.name !== "" && this.soundeffect.file !== null) {
        this.errorBoolName = false;
        this.errorBoolFile = false;
        try {
          if (this.filetype !== "audio/mpeg") {
            alert("Bitte lade eine gültige MP3-Datei hoch!");
            return;
          }

          const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/setTable`, {
            table: "soundeffect",
            data: {
              name: this.soundeffect.name,
              file: this.soundeffect.file,
              filename: this.soundeffect.filename,
            },
          });
          console.log(this.soundeffect.filename);
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
        if (this.soundeffect.name !== "") { this.errorBoolName = false; }
        if (this.soundeffect.file !== null) { this.errorBoolFile = false; } else { this.errorBoolFile = true; }
      }
    },

    returnToList() {
      this.$emit('returnToList')
    },

    async editSound() {
      if (this.soundeffect.name !== '' && this.soundeffect.file !== null) {
        this.errorBoolName = false;
        this.errorBoolFile = false;
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/updateTable`, {
            table: 'soundeffect',
            data: {
              id: this.editId,
              name: this.soundeffect.name,
              file: this.soundeffect.file,
              filename: this.filename,
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
          this.resetForm();
        }
      } else {
        this.errorBoolName = this.soundeffect.name === '';
        this.errorBoolFile = this.soundeffect.file === null;
      }
    },

    resetForm() {
      this.soundeffect.name = '';
      this.soundeffect.file = null;
      this.filetype = '';
      this.soundeffect.filename = 'Drag & Drop or Click';
    },

    playSound() {
      if (this.soundeffect.file) {
        this.showPlay = !this.showPlay;
      } else {
        alert("No sound file to play.");
      }
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