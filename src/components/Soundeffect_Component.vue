<template>
  <v-card class="mx-auto mt-10" max-width="700" rounded="xl" flat color="black" variant="outlined" height="auto"
    width="40%">
    <v-container fluid>
      <v-row class="text-h5 font-weight-bold d-flex justify-center align-center" style="color: #003866;">
        Add Soundeffect
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
      <br>
      <div v-show="errorBoolFile">
        <br />
      </div>
      <v-row>
        <v-col></v-col>
        <v-col></v-col>
        <v-col class="d-flex justify-end pt-0">
          <v-btn class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866" @click="createSound">
            Create
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      errorBoolName: false,
      errorBoolFile: false,
      name: "",
      file: null,
      filetype: ""
    };
  },
  methods: {
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

          console.log("Soundeffect erfolgreich erstellt:", response.data);
          alert("Soundeffect wurde erfolgreich erstellt!");
        } catch (error) {
          console.error("Fehler beim Erstellen der Soundeffect:", error.response?.data || error.message);
        } finally {
          this.resetForm();
        }
      } else {
        this.errorBoolName = true;
        if (this.name !== "") { this.errorBoolName = false; }
        if (this.file !== null) { this.errorBoolFile = false; } else { this.errorBoolFile = true; }
      }
    },


    resetForm() {
      console.log("Resetting form...");
      this.name = "";
      this.file = null;
    }
  },
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