<template>
  <v-container fluid class="d-flex justify-center align-center">
    <v-card class="overflow-visible" variant="flat" style="width:35%">
      <v-card-title class="d-flex justify-center align-center" style="color: #003866;">
        <h2>Generate Link with Filter</h2>
      </v-card-title>
      <v-container fluid class="d-flex justify-center align-center">
        <v-row no-gutters class="mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
              Filtername
            </v-container>
          </v-col>
          <v-col>
            <v-text-field
              v-model="tablename"
              :error="errorBool" 
              error-messages="Please enter a valid name"
              class="ml-n16"
              rounded="lg"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <br>
      </v-container>
      <v-container fluid class="d-flex justify-center align-center">
        <v-row no-gutters class="mb-n12 mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
              Filter By
            </v-container>
          </v-col>
          <v-col>
            <v-autocomplete
              v-model="selectedCriteria"
              :items="criteria"
              label="Select Criteria"
              multiple
              item-text="name"
              item-value="id"
              rounded="lg"
              variant="outlined"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <br>
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
export default {
  name: 'Filter',
  data() {
    return {
      tablename: '',
      generatedLink: '',
      selectedCriteria: [],
      errorBool: false,
      criteria: [
        "affected", "groups", "groupteams", "login", "participant", "resource",
        "soundeffect", "team", "timeslot", "timeslot_resource", "timeslottype"
      ]
    };
  },
  methods: {
    generateLink() {
      if (this.tablename !== "" && this.selectedCriteria.length !== 0) {
        this.errorBool = false;
        const baseUrl = "http://localhost:3000/filterpage?";
        const params = new URLSearchParams();
        params.append("tablename", this.tablename);
        this.selectedCriteria.forEach(criteria => params.append("filter", criteria));
        this.generatedLink = baseUrl + params.toString();
      } else {
        this.errorBool = true;
      }
    },
    onClick() {
      let textarea = document.getElementById("textarea");
      textarea.select();
      document.execCommand("copy");
    },
    movePage() {
      if (this.tablename !== "" && this.selectedCriteria.length !== 0) {
        this.errorBool = false;
        const baseUrl = "http://localhost:3000/filterpage?";
        const params = new URLSearchParams();
        params.append("tablename", this.tablename);
        this.selectedCriteria.forEach(criteria => params.append("filter", criteria));
        const link = baseUrl + params.toString();
        const url = new URL(link);
        this.$router.push(url.pathname + url.search);
      } else {
        this.errorBool = true;
      }
    }
  }
};
</script>
