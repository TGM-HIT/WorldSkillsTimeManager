<template>
  <div>
    <div v-if="errorMessage" class="error-popup">
      {{ errorMessage }}
    </div>
    <FullCalendar ref="fullCalendar" :options="calendarOptions" />
  </div>
</template>

<script>
import axios from 'axios';
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import Picture_Component from '@/components/Picture_Component_copy';
import { createApp } from 'vue'; 

/**
 * Die Funktion holt die Leuchtdichte des angegebenen hex umgewandelt in rgb, damit die Textfarbe entsprechend angepasst werden kann
 */
function getLuminance(hex) {
  hex = hex.replace(/^#/, '');
  let r = parseInt(hex.substr(0, 2), 16) / 255;
  let g = parseInt(hex.substr(2, 2), 16) / 255;
  let b = parseInt(hex.substr(4, 2), 16) / 255;
  let luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance;
}

 

/**
 * Die Funktion holt sich die Leuchtdichte der übergebenen Hintergrundfarbe. Wenn die Leuchtdichte kleiner als
 * 0.5 ist, ist der Text weiß. Wenn nicht, ist der Text schwarz.
 */
function getTextColor(backgroundColor) {
  const luminance = getLuminance(backgroundColor);
  return luminance < 0.5 ? '#FFFFFF' : '#000000';
}

export default {
  components: {
    FullCalendar,
    Picture_Component,
  },
  data() {
    return {
      // Die Optionen um den Kalendar zu konfigurieren
      calendarOptions: {
        height: 'auto',
        contentHeight: 'auto',
        nowIndicator: true,
        plugins: [
          resourceTimelinePlugin,
          dayGridPlugin,
          timeGridPlugin
        ],
        headerToolbar: false,
        expandRows: true,
        initialView: "resourceTimelineDay",
        slotMinTime: "06:00",
        slotMaxTime: "18:00",
        resourceGroupField: "group",
        slotLabelInterval: "00:15",
        schedulerLicenseKey: "CC-Attribution-NonCommercial-NoDerivatives",
        slotDuration: "00:15:00",
        resourceAreaWidth: "20%",
        handleWindowResize: false,
        aspectRatio: 2,
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
            width: "40%",
          },
          {
            field: "title",
            headerContent: "Teams",
            width: "60%",
          },
        ],
        // Die verschiedenen Resourcen, Gruppen (group) und Teams (title)
        resources: [
          // { id: "a", group: "Group 1", title: "Team  A" },
        ],
        // Die verschiedenen Events 
        events: [
          // {
          //   id: "1",
          //   resourceId: "a",
          //   title: "Briefing Area",
          //   description: "Briefing G+H3",
          //   backgroundColor: "#003866",
          //   start: "2025-03-26T08:00:00",
          //   end: "2025-03-26T09:00:00",
          // },
        ],
        eventContent: function (arg) {
          let arrayOfDomNodes = [];
          let titleElement = document.createElement('div');
          titleElement.classList.add('fc-event-title');
          titleElement.innerHTML = arg.event.title;
          titleElement.style.color = getTextColor(arg.event.backgroundColor);
          arrayOfDomNodes.push(titleElement);
          let descriptionElement = document.createElement('div');
          descriptionElement.classList.add('fc-event-description');
          descriptionElement.innerHTML = arg.event.extendedProps.description;
          descriptionElement.style.color = getTextColor(arg.event.backgroundColor);
          arrayOfDomNodes.push(descriptionElement);

          return { domNodes: arrayOfDomNodes };
        },
        resourceLabelContent: (arg) => {
          let arrayOfDomNodes = [];
          let container = document.createElement('div');
          container.classList.add('resource-label-container');
          arrayOfDomNodes.push(container);
          let titleElement = document.createElement('span');
          titleElement.classList.add('resource-label-text');
          titleElement.innerHTML = arg.resource.title;
          container.appendChild(titleElement);
          let pictureContainer = document.createElement('div');
          createApp(Picture_Component, { id: arg.resource.id }).mount(pictureContainer);
          container.appendChild(pictureContainer);

          return { domNodes: arrayOfDomNodes };
        },
      },
      tournamentDaysMap: {}, 
      errorMessage: '',
    };
  },
  methods: {
    async getResourcesAndTimeslots() {
      try {
        const resources = await axios.get('http://localhost:5000/getTable?tablename=timeslot_resources');
        const timeslot_types = await axios.get('http://localhost:5000/getTable?tablename=timeslottype');
        let i = 0;
        const newResources = [];
        for (; i < resources.data.length; i++){
          const response2 = await axios.get('http://localhost:5000/getRow?tablename=timeslot&id=' + resources.data[i].timeslot_id);
          const response3 = await axios.get('http://localhost:5000/getRow?tablename=resource&id=' + resources.data[i].resource_id);
          const response4 = await axios.get('http://localhost:5000/getCondition?table=timeslot_teams&condition=timeslot_id=' + resources.data[i].timeslot_id);
          const response5 = await axios.get('http://localhost:5000/getRow?tablename=timeslottype&id='+ response2.data[0].type)
          const day = response2.data[0].day;
          const dateFormat = this.tournamentDaysMap[day];
          for(let l = 0; l < response4.data.length; l++){
            newResources.push({
              id: resources.data[i].timeslot_id + l,
              resourceId: response4.data[l].team_id,
              title: response5.data[0].name,
              description: response2.data[0].description,
              backgroundColor: response5.data[0].color,
              start: `${dateFormat}T${response2.data[0].time_from}`,
              end: `${dateFormat}T${response2.data[0].time_to}`
            });
          }
        }
        this.calendarOptions.events = newResources;

      } catch (error) {
        console.error("Error while reading the data::", error);
      }
    },
    async setScrollTime(){
      function addZero(i) {
        if (i < 10) { i = "0" + i }
        return i;
      }
      let calendarApi = this.$refs.fullCalendar.getApi();
      const d = new Date();
      let h = addZero(d.getHours());
      let m = addZero(d.getMinutes());
      let s = addZero(d.getSeconds());
      let time = h-2   + ":" + m + ":" + s; 
      calendarApi.scrollToTime(time);
    },
    async getTeamsAndGroups() {
      try {
        const response = await axios.get('http://localhost:5000/getTable?tablename=groupteams');
        const newResources = [];
        for (let i = 0; i < response.data.length; i++) {
          const response2 = await axios.get('http://localhost:5000/getRow?tablename=team&id=' + response.data[i].teamid);
          const response3 = await axios.get('http://localhost:5000/getRow?tablename=groups&id=' + response.data[i].groupid);
          newResources.push({ id: response.data[i].teamid, group: response3.data[0].name, title: response2.data[0].name });
        }
        this.calendarOptions.resources = newResources;
      } catch (error) {
        console.error("Error while reading the data::", error);
      }
    },
    async setTournamentDays(){
      try {
        const response = await axios.get('configTable/configDates.json');
        const tournamentDays = response.data;
        if (!tournamentDays || tournamentDays.length === 0) {
          this.errorMessage = 'The configuration file "configCalendar.json" in the Folder "configTable" is empty or has incorrect data. Please update the config file as seen in the README file in the same folder.';
          return;
        }
        this.tournamentDaysMap = tournamentDays.reduce((map, day) => {
          map[day.tournamentDayName] = day.dateFormat;
          return map;
        }, {});
      } catch (error) {
        console.error("Error while reading the JSON-File:", error);
      }
    }
  },
  async mounted() {
    await this.setTournamentDays();
    await this.getTeamsAndGroups();
    await this.getResourcesAndTimeslots();
    await this.setScrollTime();
    setInterval(this.setScrollTime, 60000);
  }
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
  margin-right: 10px; /* Adjust the spacing between the text and the image */
}

.team-picture {
  width: 50%; /* Setzen Sie die gewünschte Breite */
  height: 50%; /* Setzen Sie die gewünschte Höhe */
  max-height:50px;
  max-width:50px;
  min-width:30px;
}

.error-popup {
  color: red;
  font-weight: bold;
  margin-top: 20px;
}
</style>
