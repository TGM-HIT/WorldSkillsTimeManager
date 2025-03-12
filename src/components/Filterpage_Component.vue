<template>
  <v-container class="d-flex align-center" fluid>
    <v-row class="d-flex align-center">
      <router-link to="/" style="text-decoration: none;">
        <img src="../assets/worldskillsblue.svg" alt="logo" style="max-height: 10%; max-width: 100%;" />
      </router-link>
      <v-spacer></v-spacer>
      <v-card-title style="color: #003866;" class="text-h4 text-center">{{ name }}</v-card-title>
      <v-spacer></v-spacer>
      <v-card rounded="lg" variant="none" class="text-center text-h3" style="width: 15%; height: 100%;">
        {{ currentTime }}
      </v-card>
    </v-row>
  </v-container>

  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-card class="pa-3" outlined>
          <div>
            <strong>Filter by:</strong> {{ filterby }}
          </div>
          <div>
            <strong>Filter IDs:</strong> {{ filterIDs.join(", ") }}
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      currentTime: "",
      name: "",
      filterby: "",
      filterIDs: [],
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
      this.name = this.$route.query.tablename || "";
      this.filterby = this.$route.query.filterby || "";
      const selected = this.$route.query.selected;
      
      this.filterIDs = Array.isArray(selected) ? selected : selected ? [selected] : [];
    },
  },
};
</script>