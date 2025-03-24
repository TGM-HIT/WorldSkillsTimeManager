<template>
  <v-container>
  <v-row>
    
  </v-row>
</v-container>
<v-container>
  <div>Teams using this Resource </div>
  <v-row>
    
  </v-row>
</v-container>
</template>

<script>
export default {
  props: {
    filterIDs: {
      type: Array,
      required: true,
    },
  },
  data(){
    return {
      
    }
  },
  methods: {
    async getTeamtoTimeslotIDs() {
      try {
        for (let i = 0; i < this.filterIDs.length; i++) {
          const response = await axios.get("http://localhost:5000/getCondition?table=timeslot_teams&condition=team_id="+ this.filterIDs[i]);
          console.log(response.data);
        }
      }catch (error) {
        console.log(error);
      }
    },
  }
};
</script>
