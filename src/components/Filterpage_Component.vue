<template>
  <header>
    <v-container class="d-flex align-center" fluid>
      <v-row class="d-flex align-center">
        <router-link to="/" style="text-decoration: none;">
          <img src="../assets/worldskillsblue.svg" alt="logo" style="max-height: 10%; max-width: 100%;" />
        </router-link>
        <v-spacer></v-spacer>
        <v-card-title style="color: #003866;" class="text-h4 text-center">{{ name }}</v-card-title>
        <v-spacer></v-spacer>
        <v-card rounded="lg" variant="none" class="text-center text-h3" style="color: #003866;width: 15%; height: 100%;">
          {{ currentTime }}
        </v-card>
      </v-row>
    </v-container>
  </header>

  <v-container v-show="boolResource">
    <FilterResourcePageComponent :filterIDs="filterIDs"/>
  </v-container>

  <v-container v-show="boolTeam">
    <FilterTeamPageComponent :filterIDs="filterIDs"/>
  </v-container>

  <v-container v-show="boolGroup">
    <FilterGroupPageComponent :filterIDs="filterIDs"/>
  </v-container>

</template>

<script>
import FilterResourcePageComponent from './filter/FilterResourcePageComponent.vue';
import FilterTeamPageComponent from './filter/FilterTeamPageComponent.vue';
import FilterGroupPageComponent from './filter/FilterGroupPageComponent.vue';

export default {
  components: {
    FilterResourcePageComponent,
    FilterTeamPageComponent,
    FilterGroupPageComponent
  },
  data() {
    return {
      currentTime: "",
      name: "",
      filterby: "",
      filterIDs: [],
      boolTeam: false,
      boolGroup: false,
      boolResource: false
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
      function addZero(i) {
        if (i < 10) { i = "0" + i }
        return i;
      }

      const d = new Date();
      let h = addZero(d.getHours());
      let m = addZero(d.getMinutes());
      let s = addZero(d.getSeconds());
      this.currentTime = h + ":" + m + ":" + s;
    },
    updateParams() {
      this.name = this.$route.query.tablename || "";
      this.filterby = this.$route.query.filterby || "";
      const selected = this.$route.query.selected;

      this.filterIDs = Array.isArray(selected) ? selected : selected ? [selected] : [];

      this.boolTeam = this.filterby === 'team';
      this.boolGroup = this.filterby === 'group';
      this.boolResource = this.filterby === 'resource';
    },
  },
};
</script>
