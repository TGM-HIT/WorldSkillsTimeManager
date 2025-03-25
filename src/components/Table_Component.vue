<template>
  <div>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
import axios from 'axios';
import FullCalendar from "@fullcalendar/vue3";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

export default {
  components: {
    FullCalendar,
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
        resources: [
          { id: "a", group: "Group 1", title: "Team  A" },
          { id: "b", group: "Group 1", title: "Team  B" },
          { id: "c", group: "Group 1", title: "Team  C" },
          { id: "d", group: "Group 1", title: "Team  D" },
          { id: "e", group: "Group 1", title: "Team  E" },
          { id: "f", group: "Group 1", title: "Team  F" },
          { id: "g", group: "Group 2", title: "Team  G" },
          { id: "i", group: "Group 2", title: "Team  I" },
          { id: "j", group: "Group 2", title: "Team  J" },
          { id: "k", group: "Group 2", title: "Team  K" },
          { id: "l", group: "Group 2", title: "Team  L" },
          { id: "m", group: "Group 2", title: "Team  M" },
          { id: "n", group: "Group 2", title: "Team  N" },
          { id: "o", group: "Group 3", title: "Team  O" },
          { id: "p", group: "Group 3", title: "Team  P" },
        ],
        events: [
          {
            id: "1",
            resourceId: "a",
            title: "Briefing Area",
            description: "Briefing G+H3",
            start: "2025-03-25T08:00:00",
            end: "2025-03-25T09:00:00",
          },
          {
            id: "2",
            resourceId: "b",
            title: "Briefing Area",
            description: "Briefing G+H3",
            start: "2025-03-25T08:00:00",
            end: "2025-03-25T09:00:00",
          },
          {
            id: "3",
            resourceId: "c",
            title: "Briefing Area",
            description: "Briefing G+H3",
            start: "2025-03-25T08:00:00",
            end: "2025-03-25T09:00:00",
          },
          {
            id: "4",
            resourceId: "d",
            title: "Briefing Area",
            description: "Briefing G+H3",
            start: "2025-03-25T08:00:00",
            end: "2025-03-25T09:00:00",
          },
          {
            id: "5",
            resourceId: "e",
            title: "Briefing Area",
            description: "Briefing G+H3",
            start: "2025-03-25T08:00:00",
            end: "2025-03-25T09:00:00",
          },
          {
            id: "6",
            resourceId: "f",
            title: "Briefing Area",
            description: "Briefing G+H3",
            start: "2025-03-25T08:00:00",
            end: "2025-03-25T09:00:00",
          },
          {
            id: "7",
            resourceId: "g",
            title: "Briefing Area",
            description: "Briefing G+H3",
            start: "2025-03-25T08:00:00",
            end: "2025-03-25T09:00:00",
          },
          {
            id: "8",
            resourceId: "i",
            title: "Briefing Area",
            description: "Briefing G+H3",
            start: "2025-03-25T08:00:00",
            end: "2025-03-25T09:00:00",
          },
          {
            id: "9",
            resourceId: "j",
            title: "Briefing Area",
            description: "Briefing G+H3",
            start: "2025-03-25T08:00:00",
            end: "2025-03-25T09:00:00",
          },
          {
            id: "10",
            resourceId: "k",
            title: "Briefing Area",
            description: "Briefing G+H3",
            start: "2025-03-25T08:00:00",
            end: "2025-03-25T09:00:00",
          },
          {
            id: "11",
            resourceId: "l",
            title: "Briefing Area",
            description: "Briefing G+H3",
            start: "2025-03-25T08:00:00",
            end: "2025-03-25T09:00:00",
          },
          {
            id: "12",
            resourceId: "m",
            title: "Briefing Area",
            description: "Briefing G+H3",
            start: "2025-03-25T08:00:00",
            end: "2025-03-25T09:00:00",
          },
          {
            id: "13",
            resourceId: "n",
            title: "Work Bench + Open Court Access",
            description: "Module H - Performance Review",
            start: "2025-03-25T09:00:00",
            end: "2025-03-25T11:00:00",
          },
          {
            id: "14",
            resourceId: "o",
            title: "Work Bench + Open Court Access",
            description: "Module H - Performance Review",
            start: "2025-03-25T09:00:00",
            end: "2025-03-25T11:00:00",
          },
          {
            id: "15",
            resourceId: "p",
            title: "Work Bench + Open Court Access",
            description: "Module H - Performance Review",
            start: "2025-03-25T09:00:00",
            end: "2025-03-25T11:00:00",
          },
          {
            id: "16",
            resourceId: "a",
            title: "Work Bench + Open Court Access",
            description: "Module H - Performance Review",
            start: "2025-03-25T09:00:00",
            end: "2025-03-25T11:00:00",
          },
          {
            id: "17",
            resourceId: "b",
            title: "Work Bench + Open Court Access",
            description: "Module H - Performance Review",
            start: "2025-03-25T09:00:00",
            end: "2025-03-25T11:00:00",
          },
          {
            id: "18",
            resourceId: "c",
            title: "Work Bench + Open Court Access",
            description: "Module H - Performance Review",
            start: "2025-03-25T09:00:00",
            end: "2025-03-25T11:00:00",
          },
          {
            id: "19",
            resourceId: "d",
            title: "Work Bench + Open Court Access",
            description: "Module H - Performance Review",
            start: "2025-03-25T09:00:00",
            end: "2025-03-25T11:00:00",
          },
          {
            id: "20",
            resourceId: "e",
            title: "Work Bench + Open Court Access",
            description: "Module H - Performance Review",
            start: "2025-03-25T09:00:00",
            end: "2025-03-25T11:00:00",
          },
          {
            id: "21",
            resourceId: "f",
            title: "Work Bench + Open Court Access",
            description: "Module H - Performance Review",
            start: "2025-03-25T09:00:00",
            end: "2025-03-25T11:00:00",
          },
          {
            id: "22",
            resourceId: "g",
            title: "Work Bench + Open Court Access",
            description: "Module H - Performance Review",
            start: "2025-03-25T09:00:00",
            end: "2025-03-25T11:00:00",
          },
          {
            id: "23",
            resourceId: "i",
            title: "Work Bench + Open Court Access",
            description: "Module H - Performance Review",
            start: "2025-03-25T09:00:00",
            end: "2025-03-25T11:00:00",
          },
          {
            id: "24",
            resourceId: "j",
            title: "Work Bench + Open Court Access",
            description: "Module H - Performance Review",
            start: "2025-03-25T09:00:00",
            end: "2025-03-25T11:00:00",
          },
        ],
        eventContent: function (arg) {
          let arrayOfDomNodes = [];

          // Create title element
          let titleElement = document.createElement('div');
          titleElement.classList.add('fc-event-title');
          titleElement.innerHTML = arg.event.title;
          arrayOfDomNodes.push(titleElement);

          // Create description element
          let descriptionElement = document.createElement('div');
          descriptionElement.classList.add('fc-event-description');
          descriptionElement.innerHTML = arg.event.extendedProps.description;
          arrayOfDomNodes.push(descriptionElement);

          return { domNodes: arrayOfDomNodes };
        }
      },

    };

  },
  methods: {
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
     async getTeamsAndGroups() {
      try {
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);

      }
    },
  },
  async mounted() {

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
  font-size: small;
  text-align: center;
  display: block;
  margin-top: -20px;
  white-space: nowrap;

}

.fc-event-description {
  font-size: 17px;
  text-align: center;
  display: flex;
  margin-top: -15px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.fc-event {
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  height: 100%;
}

.fc-event-time,
.fc-event-title {
  padding: 0 1px;
  white-space: normal;
}

.fc-timeline-event {
  overflow: hidden;
}
</style>
