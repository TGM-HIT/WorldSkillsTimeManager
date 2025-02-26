<template>
    <v-card
      class="mx-auto mt-10"
      max-width="700"
      rounded="xl"
      flat
      color="black"
      variant="outlined"
      height="30%"
      width="600px"
    >
      <v-container fluid>
        <v-row
          class="text-h5 font-weight-bold d-flex justify-center align-center"
          style="color: #003866;"
        >
          Create Group
        </v-row>
        <v-row class="mb-n12 mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
              Name
            </v-container>
          </v-col>
          <v-col>
            <v-text-field v-model="group.name" class="ml-n16" rounded="lg" variant="outlined"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mb-n8 mr-4">
          <v-col>
            <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
              Teams
            </v-container>
          </v-col>
          <v-col>
            <v-autocomplete v-model="group.teams" :items="teams" class="ml-n16" rounded="lg" variant="outlined" lable="Select Teammates" multiple></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col></v-col>
          <v-col class="d-flex justify-end pt-0">
            <v-btn class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866" @click="createGroup">
              Create
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </template>
  <script>
import axios from 'axios';
  
  export default {
    data() {
      return {
        group: {
          name: '',
          teams: []
        },
        teams:[]
      };
    },
    methods: {
      async createGroup() {
    try {
        // 1. Gruppe erstellen
        const response = await axios.post('http://localhost:5000/setTable', {
            table: 'groups',
            data: {
                name: this.group.name
            }
        });

        const groupId = response.data.id; // ID der neu erstellten Gruppe abrufen

        // 2. Teams der Gruppe zuweisen
        if (groupId && this.group.teams.length > 0) {
            for (const teamName of this.group.teams) {
                // Team-ID anhand des Namens abrufen
                const teamResponse = await axios.get(`http://localhost:5000/getTable?tablename=team&name=${teamName}`);
                const teamId = teamResponse.data?.[0]?.id;

                if (teamId) {
                    await axios.post('http://localhost:5000/setTable', {
                        table: 'groupteams',
                        data: {
                            groupid: groupId,
                            teamid: teamId
                        }
                    });
                }
            }
        }

        alert('Gruppe wurde erfolgreich erstellt!');
        this.resetForm();
    } catch (error) {
        console.error('Fehler beim Erstellen der Gruppe:', error.response?.data || error.message);
        alert('Fehler beim Erstellen der Gruppe!');
        this.resetForm();
    }
},
      resetForm() {
        this.group = { name: '', teams: [] };
      },
      async GetValues(){
        try {
          const response_teams = await axios.get('http://localhost:5000/getTable?tablename=team')
          
          if(response_teams.data){
            this.teams = response_teams.data.map(team => team.name) || [];
          }

      }catch(error){
        console.error('Fehler beim bekommen der Teams:', error.response?.data || error.message);
          alert('Fehler beim bekommen von den Teams!');
      }
    }
  },mounted() {
    this.GetValues();
  }
};
  </script>