<template>
  <v-container fluid>
    <br>
    <h2 class="text-center text-h4">Timetable</h2>
    <br>
    <v-row>
      <!-- Gruppen-Spalte -->
      <v-col cols="2">
        <div class="font-weight-bold text-center">Groups</div>
        <div v-for="group in groups" :key="group.id" class="group-label">
          <span class="vertical-text">{{ group.name }}</span>
        </div>
      </v-col>

      <!-- Zeitplan-Spalte -->
      <v-col cols="9">
        <v-row class="time-header-row">
          <v-col v-for="time in timeSlots" :key="time" class="time-header">
            {{ time }}
          </v-col>
        </v-row>
        <v-row v-for="group in groups" :key="group.id" class="time-row">
          <v-col
            v-for="time in timeSlots"
            :key="time"
            class="time-cell"
          >
            <v-card
              v-for="slot in getSlotsAtTime(group.id, time)"
              :key="slot.id"
              :color="slotColors[slot.type] || 'grey'"
              class="pa-1 text-white"
            >
              {{ slot.name }}
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
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

<style scoped>
.time-header-row {
  margin-bottom: 8px;
  display: flex;
  gap: 8px; /* Abstand zwischen den Zeitspalten */
}

.time-header {
  font-weight: bold;
  text-align: center;
  border-bottom: 2px solid black;
  padding: 4px;
}

.time-row {
  display: flex;
  gap: 8px; /* Abstand zwischen den Time-Cells */
}

.time-cell {
  min-height: 60px; /* Kleinere Höhe */
  border: 1px solid #ccc;
}

.group-label {
  font-weight: bold;
  padding: 10px;
  text-align: center;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Vertikaler Text für Gruppen */
.vertical-text {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  text-align: center;
  white-space: nowrap;
}
</style>
