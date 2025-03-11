<template>
    <v-snackbar 
      :model-value="show" 
      @update:model-value="updateShow"
      location="bottom right" 
      color="success" 
      timeout="3000"
    >
      <v-icon class="mr-2">$success</v-icon>
      <span>created successfully</span>
    </v-snackbar>
  </template>
  
  <script>
  export default {
    props: {
      show: Boolean,
    },
    emits: ["update:show"],
    methods: {
      updateShow(value) {
        this.$emit("update:show", value);
      },
    },
  };
  </script>
  