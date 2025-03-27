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

          // Create a container for the Vue component
          let container = document.createElement('div');
          arrayOfDomNodes.push(container);

          // Mount the Vue component to the container
          createApp(Picture_Component, { id: arg.resource.id }).mount(container);

          // Create a title element
          let titleElement = document.createElement('span');
          titleElement.innerHTML = arg.resource.title;
          arrayOfDomNodes.push(titleElement);

          return { domNodes: arrayOfDomNodes };
        },
      },

    };

  },
  methods: {
    /**
     * Die Methode getTimeslots holt
     */
    async getTimeSlots() {
      try {
        
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);

      }
    },
    async getResources() {
      try {

      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);

      }
    },
    /**
     * Die Methode holt sich die Gruppen und Teams, um die Ressourcen Leiste
     */
     async getTeamsAndGroups() {
      try {
        const response = await axios.get('http://localhost:5000/getTable?tablename=groupteams'); 
        const newResources = [];
        for(let i = 0; i < response.data.length; i++){
          const response2 = await axios.get('http://localhost:5000/getRow?tablename=team&id=' + response.data[i].teamid);
          const response3 = await axios.get('http://localhost:5000/getRow?tablename=groups&id=' + response.data[i].groupid);
          newResources.push({id: response.data[i].teamid, group: response3.data[0].name,title: response2.data[0].name});

        }
        this.calendarOptions.resources = newResources;
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);

      }
    },
  },
  async mounted() {
    await this.getTeamsAndGroups();
    console.log(this.calendarOptions.resources)
  }
};
</script>

<style>
.fc .fc-bg-event {
  opacity: 1
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
}.team-picture {
  width: 30%; /* Setzen Sie die gewünschte Breite */
  height: 30%; /* Setzen Sie die gewünschte Höhe */
}

</style>
