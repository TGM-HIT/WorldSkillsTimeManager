<template>
    <v-card
      class="mx-auto mt-10"
      max-width="700"
      rounded="xl"
      flat
      color="black"
      variant="outlined"
      height="auto"
      width="600px"
    >
      <v-container fluid>
        <v-row
          class="text-h5 font-weight-bold d-flex justify-center align-center"
          style="color: #003866;"
        >
          Create Timeslot
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
        <v-row class="mb-n12 mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
              Description
            </v-container>
          </v-col>
          <v-col>
            <v-text-field class="ml-n16" rounded="lg" variant="outlined"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-n12 mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
              Type
            </v-container>
          </v-col>
          <v-col>
            <v-text-field class="ml-n16" rounded="lg" variant="outlined"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-n12 mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
              Day
            </v-container>
          </v-col>
          <v-col>
            <v-text-field class="ml-n16" rounded="lg" variant="outlined"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-n8 mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
              From
            </v-container>
          </v-col>
          <v-col>
            <v-text-field rounded="lg" variant="outlined" type="time"></v-text-field>
          </v-col>
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
              To
            </v-container>
          </v-col>
          <v-col>
            <v-text-field rounded="lg" variant="outlined" type="time"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-n12 mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
              Resource
            </v-container>
          </v-col>
          <v-col>
             <v-autocomplete class="ml-n16" rounded="lg" variant="outlined" multiple></v-autocomplete>
          </v-col>
        </v-row>
        <v-row class="mb-n12 mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
              Affected
            </v-container>
          </v-col>
          <v-col>
            <v-autocomplete class="ml-n16" rounded="lg" variant="outlined" multiple></v-autocomplete>
          </v-col>
        </v-row>
        <v-row class="mb-n12 mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
              Soundeffect
            </v-container>
          </v-col>
          <v-col>
            <v-autocomplete class="ml-n16" rounded="lg" variant="outlined" multiple></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col></v-col>
          <v-col class="d-flex justify-end mt-4 pt-0">
            <v-btn class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866">
              Create
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </template> 