<template>
  <v-snackbar 
    :model-value="show" 
    @update:model-value="updateShow"
    location="bottom right" 
    color="error" 
    timeout="3000"
  >
    <v-icon class="mr-2">mdi-alert-circle</v-icon>
    <span>{{ message }}</span>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    show: Boolean,
    message: {
      type: String,
      default: 'Ein unbekannter Fehler ist aufgetreten.'
    }
  },
  emits: ["update:show"],
  methods: {
    updateShow(value) {
      this.$emit("update:show", value);
    },
  },
};
</script>
