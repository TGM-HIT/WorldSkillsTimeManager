<template>
  <v-container>
  <v-row v-for="group in groups"></v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      timeSlots: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
      groups: [{ id: 1, name: "Group 1" }, { id: 2, name: "Group 2" }, { id: 3, name: "Group 3" }],
      timeslots: [],
      slotColors: {
        WB: "blue",
        OCA: "orange",
        "G.R1": "yellow",
        "G.R2": "yellow",
      },
    };
  },
  methods: {
    async fetchTimeslots() {
      try {
        //const response = await axios.get("http://localhost:5000/getTimeslots");
        this.timeslots = response.data;
      } catch (error) {
        console.error("Fehler beim Laden der Timeslots:", error);
      }
    },
    getSlotsAtTime(groupId, time) {
      return this.timeslots.filter(
        (slot) => slot.groupId === groupId && slot.time_from === time
      );
    },
  },
  mounted() {
    this.fetchTimeslots();
  },
};
</script>

