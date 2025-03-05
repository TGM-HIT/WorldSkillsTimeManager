<template>
    <v-snackbar 
      :model-value="show" 
      @update:model-value="updateShow"
      location="bottom right" 
      color="error" 
      timeout="3000"
    >
      <v-icon class="mr-2">$error</v-icon>
      <span>error thrown</span>
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
  