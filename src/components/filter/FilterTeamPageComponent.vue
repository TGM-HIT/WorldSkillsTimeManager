<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, index) in filterIDs" :key="index" cols="12" sm="6" md="4" lg="3">
        <v-card v-if="teamData[index]" variant="outlined">
          <v-card-title>
            Team {{ this.teamData[index].id }}
          </v-card-title>
          <v-card-subtitle>
            name: {{ teamData[index].name }}
          </v-card-subtitle>
          <v-card-text>
            country: {{ teamData[index].country_name }} ({{ teamData[index].country_code }})
            <div v-if="this.participants[index]">
              participants: {{ participants[index].toString() }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <div>Next events for the team/teams</div>
    <v-row>
      <!-- <v-container v-for="(item, index) in timeslots" :key="index" style="padding-bottom: 0px;"> -->
        <!-- <v-container v-for="(item, index) in timeslots.slice(0, 4)" :key="index" style="padding-bottom: 0px;">
        <v-card variant="outlined" v-if="this.timeslots[index].team_IDs">
          <v-card-title>
            {{ this.timeslots[index].time_from }} - {{ this.timeslots[index].time_to }} {{ this.timeslots[index].type }}
            affected team: {{ this.timeslots[index].team_IDs.toString() }} upcoming: {{ this.timeslots[index].upcoming }}
          </v-card-title> -->
          <v-container v-for="(item, index) in Alltimeslots.slice(0, 4)" :key="index" style="padding-bottom: 0px;">
        <v-card variant="outlined" v-if="this.Alltimeslots[index].team_IDs">
          <v-card-title>
            {{ this.Alltimeslots[index].time_from }} - {{ this.Alltimeslots[index].time_to }} {{ this.Alltimeslots[index].type }}
            affected team: {{ this.Alltimeslots[index].team_IDs.toString() }} upcoming: {{ this.Alltimeslots[index].upcoming }}
          </v-card-title>
        </v-card>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import TeamPicture from '../Picture_Component.vue';

export default {
  components: {
    TeamPicture
  },
  data() {
    return {
      Alltimeslots: [
        {
          id: "1",
          name: "testTimeslot",
          description: "testTimeslotDescription",
          type: "training",
          day: "1",
          team_IDs: [1],
          time_from: "12:30",
          time_to: "12:35",
          allowed_overlaps: "2"          
        },
        {
          id: "2",
          name: "morningPractice",
          description: "Morning Training Session",
          type: "training",
          day: "2",
          team_IDs: [2, 3],
          time_from: "12:35",
          time_to: "12:40",
          allowed_overlaps: "1"          
        },
        {
          id: "3",
          name: "eveningMatch",
          description: "Friendly Match",
          type: "match",
          day: "3",
          team_IDs: [4, 5],
          time_from: "12:40",
          time_to: "12:45",
          allowed_overlaps: "0"          
        },
        {
          id: "4",
          name: "strategyMeeting",
          description: "Tactical Discussion",
          type: "meeting",
          day: "4",
          team_IDs: [1, 2, 3],
          time_from: "12:45",
          time_to: "12:50",
          allowed_overlaps: "3"          
        },
        {
          id: "5",
          name: "afternoonDrills",
          description: "Skill Development Drills",
          type: "training",
          day: "5",
          team_IDs: [3],
          time_from: "12:50",
          time_to: "12:55",
          allowed_overlaps: "2"          
        },
        {
          id: "6",
          name: "weekendGame",
          description: "Competitive Game",
          type: "match",
          day: "6",
          team_IDs: [2, 4],
          time_from: "12:55",
          time_to: "13:00",
          allowed_overlaps: "0"          
        },
        {
          id: "7",
          name: "recoverySession",
          description: "Recovery and Stretching",
          type: "recovery",
          day: "7",
          team_IDs: [1, 5],
          time_from: "13:00",
          time_to: "13:05",
          allowed_overlaps: "1"          
        },
        {
          id: "8",
          name: "nightTraining",
          description: "Late Night Intensive Training",
          type: "training",
          day: "1",
          team_IDs: [2],
          time_from: "13:05",
          time_to: "13:10",
          allowed_overlaps: "2"          
        }
      ],
      timeslots: [],
      teamData: [],
      participants: [],
      timeTableIDAndTeamID: [],
      newArrayLength: [],
      currentTime: "",
    };
  },
  props: {
    filterIDs: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async getTeams() {
      try {
        for (let i = 0; i < this.filterIDs.length; i++) {
          const response = await axios.get('http://localhost:5000/getRow?tablename=team&id=' + this.filterIDs[i]);
          response.data.forEach((elem) => this.teamData.push(elem))
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
    },


    async getParticipants() {
      try {
        for (let i = 0; i < this.filterIDs.length; i++) {
          const response = await axios.get('http://localhost:5000/getCondition?table=participant&condition=team_id=' + this.filterIDs[i]);
          response.data.forEach((elem) => this.participants.push(elem))
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Teilnehmerdaten:", error);
      }
      this.restructureParticipants();
    },


    async getTimeTableIDs() {
      try {
        for (let i = 0; i < this.filterIDs.length; i++) {
          const response = await axios.get('http://localhost:5000/getCondition?table=timeslot_teams&condition=team_id=' + this.filterIDs[i]);
          response.data.forEach((elem) => this.timeTableIDAndTeamID.push(elem))
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
      await this.restructureTimeTableIDAndTeamID();
      this.orderTimeSlotsBasedOnTime();
    },


    async restructureTimeTableIDAndTeamID() {
      for (let i = 0; i < this.timeTableIDAndTeamID.length; i++) {
        if (!this.newArrayLength.includes(this.timeTableIDAndTeamID[i].timeslot_id)) {
          this.newArrayLength.push(this.timeTableIDAndTeamID[i].timeslot_id);
        }
      }
      await this.getTimeSlotsFromIDs();
      for (let i = 0; i < this.timeTableIDAndTeamID.length; i++) {
        let timeslotID = this.timeTableIDAndTeamID[i].timeslot_id;
        let teamID = this.timeTableIDAndTeamID[i].team_id;
        for (let x = 0; x < this.timeslots.length; x++) {
          if (this.timeslots[x].id === timeslotID) {
            if (this.timeslots[x].team_IDs) {
              this.timeslots[x].team_IDs.push(teamID)
            } else {
              this.timeslots[x].team_IDs = [teamID]
            }
          }
        }
      }
    },

    async getTimeSlotsFromIDs() {
      try {
        for (let i = 0; i < this.newArrayLength.length; i++) {
          const response = await axios.get('http://localhost:5000/getRow?tablename=timeslot&id=' + this.newArrayLength[i]);
          response.data.forEach((elem) => this.timeslots.push(elem))
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
    },


    checkTimeTableActive() {
      for(let i = 0; i < this.Alltimeslots.length; i++) {
      // for(let i = 0; i < this.timeslots.length; i++) {
        if(this.convertTimeToMinutes(this.Alltimeslots[i].time_to) < this.convertTimeToMinutes(this.currentTime)) {
          this.Alltimeslots[i].upcoming = false;
          // this.timeslots[i].upcoming = false;
        }else {
          this.Alltimeslots[i].upcoming = true;
        }
      }
      console.log(this.Alltimeslots)
    },


    scheduleNextCheckTimeTableActive() {
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    const millisUntilNext5 = ((5 - (minutes % 5)) * 60 - seconds) * 1000 - milliseconds;
    const millisUntilNext0 = ((10 - (minutes % 10)) * 60 - seconds) * 1000 - milliseconds;
    
    const millisUntilNextCheck = Math.min(millisUntilNext5, millisUntilNext0);

    setTimeout(() => {
        this.updateTime();
        setInterval(() => this.checkTimeTableActive(), 300000);
    }, millisUntilNextCheck);
},



    restructureParticipants() {
      let participantsOrdered = new Array;
      for (let i = 0; i < this.teamData.length; i++) {
        participantsOrdered.push(new Array);
        for (let x = 0; x < this.participants.length; x++) {
          if (this.participants[x].team_id == this.filterIDs[i]) {
            let name = this.participants[x].first_name + " " + this.participants[x].last_name
            participantsOrdered[i].push(name)
          }
        }
      }
      this.participants = participantsOrdered;
    },


    convertTimeToMinutes(time) {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    },

    orderTimeSlotsBasedOnTime() {
      this.timeslots.sort((a, b) => this.convertTimeToMinutes(a.time_from) - this.convertTimeToMinutes(b.time_from));
      this.Alltimeslots.sort((a, b) => this.convertTimeToMinutes(a.time_from) - this.convertTimeToMinutes(b.time_from));
    },


    updateTime() {
      function addZero(i) {
        if (i < 10) { i = "0" + i }
        return i;
      }

      const d = new Date();
      let h = addZero(d.getHours());
      let m = addZero(d.getMinutes());
      this.currentTime = h + ":" + m;
      console.log(this.currentTime)
    },


    scheduleNextUpdate() {
      const now = new Date();
      const millisUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

      setTimeout(() => { this.updateTime(); setInterval(this.updateTime, 60000); }, millisUntilNextMinute);
    },
  },
  async mounted() {
    await this.getTeams();
    await this.getParticipants();
    // await this.getTimeTableIDs();
    this.orderTimeSlotsBasedOnTime();
    this.updateTime();
    this.scheduleNextUpdate();
    this.checkTimeTableActive();
    this.scheduleNextCheckTimeTableActive();

  }
};
</script>