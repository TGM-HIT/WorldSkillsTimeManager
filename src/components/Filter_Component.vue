<template>
  <v-container fluid class="d-flex justify-center align-center">
    <v-card class="overflow-visible" variant="flat" style="width: 35%">
      <v-card-title class="d-flex justify-center align-center" style="color: #003866">
        <h2>Generate Link with Filter</h2>
      </v-card-title>
      <v-container fluid class="d-flex justify-center align-center">
        <v-row no-gutters class="mr-4">
          <v-col>
            <v-container
              fluid
              class="font-weight-medium text-h5 mt-n2"
              style="color: #003866"
            >
              Filtername
            </v-container>
          </v-col>
          <v-col>
            <v-text-field
              v-model="tablename"
              :error="errorBoolName"
              :error-messages="errorBoolName ? 'Please enter a name' : ''"
              class="ml-n16"
              rounded="lg"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-container fluid class="d-flex justify-center align-center">
        <v-row no-gutters class="mb-n12 mr-4">
          <v-col>
            <v-container
              fluid
              class="font-weight-medium text-h5 mt-n2"
              style="color: #003866"
            >
              Filter By
            </v-container>
          </v-col>
          <v-col>
            <v-autocomplete
              class="ml-n16"
              rounded="lg"
              variant="outlined"
              multiple
              v-model="selectedCriteria"
              :items="criteria"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <br />
      </v-container>
      <v-row>
        <v-col class="d-flex justify-start ml-4 mt-15 pt-0">
          <v-btn
            class="font-weight-bold"
            size="large"
            rounded="lg"
            color="#003866"
            @click="movePage()"
          >
            Go to page
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-end mt-15 pt-0">
          <v-btn
            class="font-weight-bold mr-4"
            size="large"
            rounded="lg"
            color="#003866"
            @click="generateLink()"
          >
            Generate
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            id="textarea"
            append-inner-icon="mdi-content-copy"
            @click:append-inner="onClick"
            readonly
            v-model="generatedLink"
            class="ml-3 mr-3"
            rounded="lg"
            variant="outlined"
          ></v-text-field>
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
      selectedCriteria: [],
      errorBoolName: false,
      errorBoolFilter: false,
      criteria: [],
    };
  },
  methods: {
    generateLink() {
      if (this.tablename !== "" && this.selectedCriteria.length !== 0) {
        this.errorBoolName = false;
        this.errorBoolFilter = false;
        const baseUrl = "http://localhost:3000/filterpage?";
        const params = new URLSearchParams();
        params.append("tablename", this.tablename);
        this.selectedCriteria.forEach((criteria) => params.append("filter", criteria));
        this.generatedLink = baseUrl + params.toString();
      } else {
        if (this.tablename == "") {
          this.errorBoolName = true;
        }
        if (this.selectedCriteria.length == 0) {
          this.errorBoolFilter = true;
        }
        if (this.tablename !== "") {
          this.errorBoolName = false;
        }
        if (this.selectedCriteria.length !== 0) {
          this.errorBoolFilter = false;
        }
      }
    },
    onClick() {
      let textarea = document.getElementById("textarea");
      textarea.select();
      document.execCommand("copy");
    },
    movePage() {
      if (this.tablename !== "" && this.selectedCriteria.length !== 0) {
        this.errorBoolName = false;
        this.errorBoolFilter = false;
        const baseUrl = "http://localhost:3000/filterpage?";
        const params = new URLSearchParams();
        params.append("tablename", this.tablename);
        this.selectedCriteria.forEach((criteria) => params.append("filter", criteria));
        const link = baseUrl + params.toString();
        const url = new URL(link);
        this.$router.push(url.pathname + url.search);
      } else {
        if (this.tablename == "") {
          this.errorBoolName = true;
        }
        if (this.selectedCriteria.length == 0) {
          this.errorBoolFilter = true;
        }
        if (this.tablename !== "") {
          this.errorBoolName = false;
        }
        if (this.selectedCriteria.length !== 0) {
          this.errorBoolFilter = false;
        }
      }
    },
    async getValues() {
      try {
        const criteria_teams = await axios.get(
          "http://localhost:5000/getTable?tablename=team"
        );
        const criteria_groups = await axios.get(
          "http://localhost:5000/getTable?tablename=groups"
        );
        const criteria_rooms = await axios.get(
          "http://localhost:5000/getTable?tablename=resource"
        );
        if (criteria_teams.data) {
          this.criteria.push(criteria_teams.data.map((item) => item.name) || []);
        }
        if (criteria_groups.data) {
          this.criteria.push(criteria_groups.data.map((item) => item.name) || []);
        }
        if (criteria_rooms.data) {
          this.criteria.push(criteria_rooms.data.map((item) => item.name) || []);
        }
      } catch (error) {
        console.error(
          "Fehler beim Laden der Daten:",
          error.response?.data || error.message
        );
      }
    },
  },
  mounted() {
    this.getValues();
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
