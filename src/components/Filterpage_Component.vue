<template>
    <v-container class="d-flex align-center" fluid>
      <v-row class="d-flex align-center">
        <!-- <v-col cols="auto" class="d-flex align-center"> -->
          <router-link to="/" style="text-decoration: none;"> 
            <img src="../assets/worldskillsblue.svg" alt="logo" style="max-height: 10%; max-width: 100%;" />
          </router-link>
          <v-spacer></v-spacer>
        <!-- </v-col>         -->
        <!-- <v-col cols="auto" class="d-flex align-center justify-center ml-14 mr-n4"> -->
          <v-card-title style="color: #003866;" class="text-h4 text-center ">{{ pageName }}</v-card-title>
        <!-- </v-col> -->
        <v-spacer></v-spacer>
        <!-- <v-col cols="auto" class="d-flex align-center"> -->
          <v-card rounded="lg" variant="none"class="text-center text-h3" style="width: 15%; height: 100%;">
            <!-- <v-card-title style="color: #003866;" class="text-h4">{{ currentTime }}</v-card-title> -->
             {{ currentTime }}
          </v-card>
        <!-- </v-col> -->
      </v-row>
    </v-container>
  <!-- <v-card>
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </template>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card> -->
</template>

<script>
export default {
  data() {
    return {
      currentTime: "",
      pageName: "",
      filterArray: [],
    };
  },
  created() {
    this.updateParams();
  },
  watch: {
    "$route.query": {
      handler() {
        this.updateParams();
      },
      deep: true,
    },
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
    },
    updateParams() {
      this.pageName = this.$route.query.tablename || "";
      const filterParam = this.$route.query.filter;
      this.filterArray = Array.isArray(filterParam) ? filterParam : filterParam ? [filterParam] : [];
    },
  }
};
</script>