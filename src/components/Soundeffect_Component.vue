<template>
    <v-card
      class="mx-auto mt-10"
      max-width="700"
      rounded="xl"
      flat
      color="black"
      variant="outlined"
      height="50%"
      width="30%"
    >
      <v-container fluid>
        <v-row
          class="text-h5 font-weight-bold d-flex justify-center align-center"
          style="color: #003866;"
        >
          Add Soundeffect
        </v-row>
        <v-row class="mb-n12 mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
              Name
            </v-container>
          </v-col>
          <v-col>
            <v-text-field class="ml-n16" rounded="lg" variant="outlined"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-n8 mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
              File
            </v-container>
          </v-col>
          <v-col>
            <v-file-input
              class="ml-n16"
              rounded="lg"
              variant="outlined"
              accept=".mp3"
              label="Drag & Drop or Click"
              show-size
              prepend-icon=""
              append-inner-icon="mdi-music"
            ></v-file-input>          
          </v-col>
        </v-row>
        <v-row>
          <v-col></v-col>
          <v-col></v-col>
          <v-col class="d-flex justify-end pt-0">
            <v-btn class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866">
              Create
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </template>
  

  <style scoped>
    .custom-file-input {
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      border: 2px dashed #003866;
      background-color: #f5f5f5;
      transition: background-color 0.3s ease;
    }

    .custom-file-input:hover {
      background-color: #e0e0e0;
    }
 
  </style>