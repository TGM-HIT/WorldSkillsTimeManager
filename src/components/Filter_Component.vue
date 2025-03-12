<template>
  <v-container fluid class="d-flex justify-center align-center">
    <v-card class="overflow-visible" variant="flat" style="width: 35%">
      <v-card-title class="d-flex justify-center align-center" style="color: #003866">
        <h2>Generate Link with Filter</h2>
      </v-card-title>
      <v-container fluid class="d-flex justify-center align-center">
        <v-row no-gutters class="mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866">
              Filtername
            </v-container>
          </v-col>
          <v-col>
            <v-text-field v-model="tablename" :error="errorBoolName"
              :error-messages="errorBoolName ? 'Please enter a name' : ''" class="ml-n16" rounded="lg"
              variant="outlined"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-container fluid class="d-flex justify-center align-center">
        <v-row no-gutters class="mb-n12 mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866">
              Filter By
            </v-container>
          </v-col>
          <v-col>
            <v-autocomplete :error="errorBoolCriteria"
              :error-messages="errorBoolCriteria ? 'Please select one of the criterias' : ''" class="ml-n16"
              rounded="lg" variant="outlined" v-model="selectedCriteria" :items="criteria"></v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
      <v-container fluid class="d-flex justify-center align-center">
        <v-row no-gutters class="mb-n12 mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866">
              Select specific {{ selectedCriteria }}
            </v-container>
          </v-col>
          <v-col>
            <v-autocomplete :error="errorBoolSpecificCriteria"
              :error-messages="errorBoolSpecificCriteria ? 'Please select one of the specific criterias' : ''"
              class="ml-n16" rounded="lg" variant="outlined" multiple v-model="selectedSpecificCriteria"
              :items="specificValueCriteria" item-title="name" item-value="id"></v-autocomplete>
          </v-col>
        </v-row>
        <br />
      </v-container>
      <v-row>
        <v-col class="d-flex justify-start ml-4 mt-15 pt-0">
          <v-btn class="font-weight-bold" size="large" rounded="lg" color="#003866" @click="movePage()">
            Go to page
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-end mt-15 pt-0">
          <v-btn class="font-weight-bold mr-4" size="large" rounded="lg" color="#003866" @click="generateLink()">
            Generate
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field id="textarea" append-inner-icon="mdi-content-copy" @click:append-inner="onClick" readonly
            v-model="generatedLink" class="ml-3 mr-3" rounded="lg" variant="outlined"></v-text-field>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: "Filter",
  data() {
    return {
      tablename: "",
      generatedLink: "",
      selectedCriteria: "",
      errorBoolName: false,
      errorBoolCriteria: false,
      errorBoolSpecificCriteria: false,
      criteria: ["team", "groups", "resource"],
      selectedSpecificCriteria: [],
      specificValueCriteria: [],
      test: [],
    };
  },
  watch: {
    selectedCriteria(newVal) {
      if (newVal) {
        this.getValues();
      }
    }
  },
  methods: {
    generateLink() {
      if (this.tablename !== "" && this.selectedCriteria.length !== "") {
        this.errorBoolName = false;
        this.errorBoolCriteria = false;
        if (this.selectedSpecificCriteria.length !== 0) {
          this.errorBoolSpecificCriteria = false;
          const baseUrl = "http://localhost:3000/filterpage?";
          const params = new URLSearchParams();
          params.append("tablename", this.tablename);
          params.append("filterby", this.selectedCriteria);
          this.selectedSpecificCriteria.forEach((criteria) => params.append("selected", criteria));
          this.generatedLink = baseUrl + params.toString();
        }
      } else {
        this.errorBoolName = true;
        this.errorBoolCriteria = true;

        if (this.tablename !== "") {
          this.errorBoolName = false;
        }
        if (this.selectedCriteria !== "" && this.selectedSpecificCriteria.length == 0) {
          this.errorBoolCriteria = false;
          this.errorBoolSpecificCriteria = true;
        }
        if (this.selectedCriteria !== "" && this.selectedSpecificCriteria.length !== 0) {
          this.errorBoolCriteria = false;
          this.errorBoolSpecificCriteria = false;
        }
      }
    },
    onClick() {
      let textarea = document.getElementById("textarea");
      textarea.select();
      document.execCommand("copy");
    },
    movePage() {
      if (this.tablename !== "" && this.selectedCriteria.length !== "") {
        this.errorBoolName = false;
        this.errorBoolCriteria = false;
        if (this.selectedSpecificCriteria.length !== 0) {
          const baseUrl = "http://localhost:3000/filterpage?";
          const params = new URLSearchParams();
          params.append("tablename", this.tablename);
          params.append("filterby", this.selectedCriteria);
          this.selectedSpecificCriteria.forEach((criteria) => params.append("selected", criteria));
          const link = baseUrl + params.toString();
          window.open(link, '_blank');
        }
      } else {
        this.errorBoolName = true;
        this.errorBoolCriteria = true;

        if (this.tablename !== "") {
          this.errorBoolName = false;
        }
        if (this.selectedCriteria !== "" && this.selectedSpecificCriteria.length == 0) {
          this.errorBoolCriteria = false;
          this.errorBoolSpecificCriteria = true;
        }
        if (this.selectedCriteria !== "" && this.selectedSpecificCriteria.length !== 0) {
          this.errorBoolCriteria = false;
          this.errorBoolSpecificCriteria = false;
        }
      }
    },
    async getValues() {
      if (!this.selectedCriteria) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/getTable?tablename=${this.selectedCriteria}`
        );
        this.specificValueCriteria = response.data.map(item => ({ id: item.id, name: item.name })) || [];
      } catch (error) {
        console.error("Fehler beim Laden der Daten:", error.response?.data || error.message);
      }
    },
  },
};
</script>
<style scoped>
.v-treeview {
  height: 200px;
  /* Adjust as needed */
  width: 100%;
}
</style>
