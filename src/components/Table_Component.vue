<template>
  <div>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
import axios from 'axios';
import FullCalendar from "@fullcalendar/vue3";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import Picture_Component from '@/components/Picture_Component';

function getLuminance(hex) {
  hex = hex.replace(/^#/, '');
  let r = parseInt(hex.substr(0, 2), 16) / 255;
  let g = parseInt(hex.substr(2, 2), 16) / 255;
  let b = parseInt(hex.substr(4, 2), 16) / 255;
  let luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance;
}

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
      calendarOptions: {
        height: 'auto',
        contentHeight: 'auto',
        nowIndicator: true,
        plugins: [resourceTimelinePlugin],
        headerToolbar: false,
        expandRows: true,
        initialView: "resourceTimelineDay",
        slotMinTime: "06:00",
        slotMaxTime: "18:00",
        resourceGroupField: "group",
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
        resources: [],
        events: [],
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
    };
  },
  methods: {
    async getTimeSlots() {
      try {
        // Implement your logic here
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
    },
    async getResources() {
      try {
        const response = await axios.get('http://localhost:5000/getTable?tablename=resource');
        const newResources = [];
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
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
        console.error("Fehler beim Abrufen der Daten:", error);
      }
    },
  },
  async mounted() {
    await this.getTeamsAndGroups();
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
  display:flex;
  width: 40%; /* Setzen Sie die gewünschte Breite */
  height: 40%; /* Setzen Sie die gewünschte Höhe */
  margin-left: 30px;
}
</style>
