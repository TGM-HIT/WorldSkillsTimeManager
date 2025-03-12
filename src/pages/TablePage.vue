<template>
  <v-container class="d-flex align-center" fluid>
    <v-row class="d-flex align-center">
      <router-link to="/" style="text-decoration: none;">
        <img src="../assets/worldskillsblue.svg" alt="logo" style="max-height: 10%; max-width: 100%;" />
      </router-link>
      <v-spacer></v-spacer>
      <v-card-title style="color: #003866;" class="text-h4 text-center"></v-card-title>
      <v-spacer></v-spacer>
      <v-card rounded="lg" variant="none" class="text-center text-h3" style="width: 15%; height: 100%;">
        {{ currentTime }}
      </v-card>
    </v-row>
  </v-container>
  <div>
    <Table_Component />
  </div>
</template>

<script>
import Table_Component from "@/components/Table_Component.vue";

export default {
  name: "TablePage",
  components: {
    Table_Component,
  },
};
</script>
