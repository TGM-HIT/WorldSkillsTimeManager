<template>
<v-container>
  <div>Teams using this Resource </div>
  <v-col v-for="(item,index) in filterIDs" :key="index">
  IDTeam : {{}}
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
      timeslotIDfromTeamID :[[]]
    }
  },
  methods: {
    async getTeamtoTimeslotIDs() {
      try {
        for (let i = 0; i < this.filterIDs.length; i++) {
          const response = await axios.get("http://localhost:5000/getCondition?table=timeslot_teams&condition=team_id="+ this.filterIDs[i]);
          response.data.array.forEach(element => {
            this.timeslotIDfromTeamID[i].push(element.timeslot_id);
          });
          console.log(response.data.array);
        }
      }catch (error) {
        console.log(error);
      }
    },
  }
};
</script>
