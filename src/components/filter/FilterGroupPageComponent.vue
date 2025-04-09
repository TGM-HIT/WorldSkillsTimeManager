<template>
    <container>
      <div v-if="loading" class="loading-overlay">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <v-alert v-if="error" type="error">
      An error occured while loading the Data
    </v-alert>
      </container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        
      };
    },
    props: {
      filterIDs: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  