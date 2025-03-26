<template>
<v-container>
  <div>Teams using selected Resource </div>
  <v-col v-for="(item,index) in filterIDs" :key="index">
    IDTeam : {{item}}
    
</v-col>

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
      timeslotIDfromTeamID :[]
    }
  },
  methods: {
    async getTeamtoTimeslotIDs() {
      try {
        this.timeslotIDfromTeamID = [];
        for (let i = 0; i < this.filterIDs.length; i++) {
          const response = await axios.get("http://localhost:5000/getCondition?table=timeslot_teams&condition=team_id="+ this.filterIDs[i]);
          console.log("Hello:" + response.data);
          response.data.forEach(element => {
            this.timeslotIDfromTeamID[i].push(element.timeslot_id);
          });
        }
      }catch (error) {
        console.log(error);
      }
    },
  }
};
</script>
