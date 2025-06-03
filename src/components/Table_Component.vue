<template>
  <div>
    <div v-if="errorMessage" class="error-popup">
      {{ errorMessage }}
    </div>
    <FullCalendar ref="fullCalendar" :options="calendarOptions" />
    <div class="legend">
      <br>
      <div class="legend-items">
        <v-row>
          <div v-for="type in types" :key="type.id" class="legend-item">
            <div class="type-color" :style="{ backgroundColor: type.color }">
              {{ type.name }}
            </div>
            <span style="margin-bottom:10px" class="type-description">  {{ type.description }}</span>
          </div>
        </v-row>
      </div>
    </div>
    <br />
    <v-btn @click="generatePDF">Download Pdf</v-btn>
  </div>
</template>

<script>
import axios from "axios";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import Picture_Component from "@/components/Picture_Component_copy";
import { createApp } from "vue";
import html2pdf from "html2pdf.js";
import adaptivePlugin from "@fullcalendar/adaptive";

function getLuminance(hex) {
  hex = hex.replace(/^#/, "");
  let r = parseInt(hex.substr(0, 2), 16) / 255;
  let g = parseInt(hex.substr(2, 2), 16) / 255;
  let b = parseInt(hex.substr(4, 2), 16) / 255;
  let luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance;
}

function getTextColor(backgroundColor) {
  const luminance = getLuminance(backgroundColor);
  return luminance < 0.5 ? "#FFFFFF" : "#000000";
}

export default {
  components: {
    FullCalendar,
    Picture_Component,
  },
  props: {
    selectedDay: String,
  },
  data() {
    return {
      calendarOptions: {
        height: "auto",
        contentHeight: "auto",
        nowIndicator: true,
        plugins: [resourceTimelinePlugin, dayGridPlugin, timeGridPlugin, adaptivePlugin],
        headerToolbar: false,
        expandRows: true,
        initialView: "resourceTimelineDay",
        slotMinTime: "08:30",
        slotMaxTime: "18:30",
        resourceGroupField: "group",
        slotLabelInterval: "00:15",
        schedulerLicenseKey: "CC-Attribution-NonCommercial-NoDerivatives",
        slotDuration: "00:15:00",
        resourceAreaWidth: "17%",
        handleWindowResize: false,
        aspectRatio: 2,
        resourceOrder: "group",
        eventDisplay: "background",
        slotLabelFormat: {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        },
        resourceAreaColumns: [
          {
            group: true,
            field: "group",
            headerContent: "Groups",
            width: "45%",
          },
          {
            field: "title",
            headerContent: "Teams",
            width: "55%",
          },
        ],
        resources: [],
        events: [],
        eventContent: function (arg) {
          let arrayOfDomNodes = [];
          let titleElement = document.createElement("div");
          titleElement.classList.add("fc-event-title");
          titleElement.innerHTML = arg.event.title;
          titleElement.style.color = getTextColor(arg.event.backgroundColor);
          arrayOfDomNodes.push(titleElement);
          let descriptionElement = document.createElement("div");
          descriptionElement.classList.add("fc-event-description");
          descriptionElement.innerHTML = arg.event.extendedProps.description;
          descriptionElement.style.color = getTextColor(arg.event.backgroundColor);
          arrayOfDomNodes.push(descriptionElement);

          return { domNodes: arrayOfDomNodes };
        },
        resourceLabelContent: (arg) => {
          let arrayOfDomNodes = [];
          let container = document.createElement("div");
          container.classList.add("resource-label-container");
          arrayOfDomNodes.push(container);
          let titleElement = document.createElement("span");
          titleElement.classList.add("resource-label-text");
          titleElement.innerHTML = arg.resource.title;
          container.appendChild(titleElement);
          let pictureContainer = document.createElement("div");
          createApp(Picture_Component, { id: arg.resource.id }).mount(pictureContainer);
          container.appendChild(pictureContainer);

          return { domNodes: arrayOfDomNodes };
        },
      },
      tournamentDaysMap: {},
      errorMessage: "",
      types: [],
    };
  },
  watch: {
    selectedDay: {
      immediate: true,
      handler(newDay) {
        if (newDay) {
          this.filterEventsByDay(newDay);
        }
      },
    },
  },
  methods: {
    async generatePDF() {
      await this.getResourcesAndTimeslots(this.selectedDay);
      await this.getTeamsAndGroups();
      this.$nextTick(() => {
        setTimeout(() => {
          window.print();
        }, 1000); 
      });
    },
    async getResourcesAndTimeslots(selectedDay) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const dateformatToday = `${year}-${month}-${day}`;

      try {
        const resources = await axios.get(
          "http://localhost:5000/getTable?tablename=timeslot_resources"
        );
        const timeslot_types = await axios.get(
          "http://localhost:5000/getTable?tablename=timeslottype"
        );
        let i = 0;
        const newResources = []; 
        for (; i < resources.data.length; i++) {
          const timeslot = await axios.get(
            "http://localhost:5000/getRow?tablename=timeslot&id=" +
              resources.data[i].timeslot_id
          );
          const timeslot_teams = await axios.get(
            "http://localhost:5000/getCondition?table=timeslot_teams&condition=timeslot_id=" +
              resources.data[i].timeslot_id
          );
          const timeslot_type = await axios.get(
            "http://localhost:5000/getRow?tablename=timeslottype&id=" +
              timeslot.data[0].type
          );
          const day = timeslot.data[0].day;
          if (day !== selectedDay) continue;
          const dateFormat = this.tournamentDaysMap[day];
          for (let l = 0; l < timeslot_teams.data.length; l++) {
            newResources.push({
              id:
                resources.data[i].timeslot_id +
                timeslot_teams.data[l].team_id +
                Math.random(Math.floor),
              resourceId: timeslot_teams.data[l].team_id,
              title: timeslot.data[0].name,
              description: timeslot.data[0].description,
              backgroundColor: timeslot_type.data[0].color,
              start: dateformatToday + `T${timeslot.data[0].time_from}`,
              end: dateformatToday + `T${timeslot.data[0].time_to}`,
            });
            console.log(newResources);
          }
        }
        this.calendarOptions.events = newResources;
      } catch (error) {
        console.error(error);
      }
    },
    async setScrollTime() {
      function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }
      this.$nextTick(() => {
        if (this.$refs.fullCalendar) {
          let calendarApi = this.$refs.fullCalendar.getApi();
          const d = new Date();
          let h = addZero(d.getHours());
          let m = addZero(d.getMinutes());
          let s = addZero(d.getSeconds());
          let time = h - 2 + ":" + m + ":" + s;
          calendarApi.scrollToTime(time);
        } else {
          console.error("FullCalendar component is not mounted yet.");
        }
      });
    },
    async loadConfigCalendar() {
      try {
        const response = await axios.get("configTable/configCalendar.json");
        const config = response.data;
        for (const key in config) {
          if (this.calendarOptions.hasOwnProperty(key)) {
            this.calendarOptions[key] = config[key];
          }
        }
      } catch (error) {
        console.error("Error loading configCalendar.json:", error);
      }
    },
    async loadTypes() {
      try {
        const response = await axios.get(
          "http://localhost:5000/getTable?tablename=timeslottype"
        );
        this.types = response.data;
      } catch (error) {
        console.error("Error loading types:", error);
      }
    },

    async getTeamsAndGroups() {
      try {
        const response = await axios.get(
          "http://localhost:5000/getTable?tablename=groupteams"
        );
        const newResources = [];
        for (let i = 0; i < response.data.length; i++) {
          const team = await axios.get(
            "http://localhost:5000/getRow?tablename=team&id=" + response.data[i].teamid
          );
          const groups = await axios.get(
            "http://localhost:5000/getRow?tablename=groups&id=" + response.data[i].groupid
          );
          newResources.push({
            id: response.data[i].teamid,
            group: groups.data[0].name,
            title: team.data[0].name,
          });
        }
        newResources.sort((a, b) => a.title.localeCompare(b.title));
        this.calendarOptions.resources = newResources;
      } catch (error) {
        console.error(error);
      }
    },
    async setTournamentDays() {
      try {
        const response = await axios.get("configTable/configDates.json");
        const tournamentDays = response.data;
        if (!tournamentDays || tournamentDays.length === 0) {
          this.errorMessage =
            'The configuration file "configCalendar.json" in the Folder "configTable" is empty or has incorrect data. Please update the config file as seen in the README file in the same folder.';
          return;
        }
        this.tournamentDaysMap = tournamentDays.reduce((map, day) => {
          map[day.tournamentDayName] = day.dateFormat;
          return map;
        }, {});
      } catch (error) {
        console.error(error);
      }
    },
    filterEventsByDay(selectedDay) {
      this.getResourcesAndTimeslots(selectedDay);
    },
  },
  async mounted() {
    await this.setTournamentDays();
    await this.getTeamsAndGroups();
    await this.setScrollTime();
    await this.loadTypes();
    await this.loadConfigCalendar(); 
    setInterval(this.setScrollTime, 60000);
  },
};
</script>

<style>
.fc .fc-bg-event {
  opacity: 1;
}

.fc .fc-bg-event .fc-event-title {
  font-style: normal;
  white-space: nowrap;
}

.fc-event-title {
  text-align: center;
  display: block;
  margin-top: -20px;
  white-space: nowrap;
}

.fc-event-description {
  text-align: center;
  margin-top: -15px;
  text-overflow: clip;
  white-space: nowrap;
  overflow: clip;
}

.fc-event {
  display: flex;
  flex-direction: column;
  justify-content: end;
  height: 100%;
}

.resource-label-container {
  display: flex;
  align-items: center;
}

.resource-label-text {
  margin-right: 10px;
}

.type-color {
  display: inline-block;
  padding: 5px;
  text-align: center;
  border-radius: 3px;
  font-weight: bold;
  margin-bottom:10px;
  margin-left:20px;
  outline: 1px solid black;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 7px;
}
.team-picture {
  width: 60%;
  height: 40%;
  max-width: 60px;
  max-height: 60px;
  object-position: center center;
  display: block;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
}

.fc-theme-standard td,
.fc-theme-standard th {
  border: 1px solid black !important;
}


.fc-event {
  position: relative;
  z-index: 1;
}


.fc-timeline-bg-harness {
  border-right: 0.5px solid black !important;
  border-left: 0.5px solid black !important;
}

.error-popup {
  color: red;
  font-weight: bold;
  margin-top: 20px;
}

@media print {
  .fc {
    overflow: visible !important;
    height: auto !important;
    box-sizing: border-box !important;
  }

  .v-btn,
  .button-class {
    display: none !important;
  }

  .col {
    min-width: 51px;
  }

  .fc-scrollgrid,
  .fc-timegrid,
  .fc-timegrid-body {
    height: auto !important;
  }

  .fc .fc-timegrid-slot-label {
    display: table-cell !important;
  }

  .fc-timegrid-slot-label {
    border-right: 1px solid #ccc !important;
    padding-right: 4px !important;
    font-size: 12px !important;
    color: #000 !important;
  }

  .fc-event,
  .fc-event-title,
  .fc-event-description {
    display: block !important;
    visibility: visible !important;
  }

  .team-picture {
    visibility: visible !important;
  }

  .fc .fc-scroller-harness {
    max-height: none !important;
  }

  .fc-datagrid-cell .fc-resource {
    border: 1px solid #ccc !important;
    box-sizing: border-box !important;
  }

  .fc-timegrid-slot {
    display: table-row !important;
    height: auto !important;
    border-bottom: 1px solid #ccc !important;
    box-sizing: border-box !important;
  }

  .fc-datagrid-cell-frame {
    height: 40px !important;
  }

  .fc-theme-standard td,
  .fc-theme-standard th {
    border: 1px solid #ccc !important;
  }

  .fc-timegrid-col {
    border-left: 1px solid #ccc !important;
  }

  .fc-timegrid-body {
    border-top: 1px solid #ccc !important;
  }

  .fc-timeline-now-indicator-container {
    display: none !important;
  }

  html,
  body {
    overflow: visible !important;
  }
}
</style>
