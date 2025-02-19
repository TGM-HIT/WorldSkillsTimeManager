<template>
  <v-container class="d-flex justify-center align-center">
    <v-card style="width: 40%;">
      <v-card-title class="d-flex justify-center align-center" style="color: #003866;">
        <h2>Generate Filter with Links</h2>
      </v-card-title>
      <v-card-text class="d-flex justify-center align-center">
        <v-row no-gutters class="d-flex align-center">
          <v-col cols="12">
            <h2 class="ml-9"style="color: #003866;">Filtername</h2>
              <v-text-field class="ml-9 mr-9 mt-2"style="height:10%" rounded="lg" variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-row>
            <v-col cols="5">
              <h2 class="ml-9"style="color: #003866;">Filtername</h2>
            </v-col>
            <v-col cols="2"/>
            <v-text-field class="ml-9 mr-9 mt-2"style="height:10%" rounded="lg" variant="outlined"></v-text-field>
            </v-row>
          </v-col>
        </v-row>
        <br>

      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Filter',
};
</script>