<template>
  <div>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
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
        eventDisplay: "background", // Ändern Sie dies auf "block", um das Event-Layout anzupassen
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
            start: "2025-03-20T09:00:00",
            end: "2025-03-20T10:00:00",
          },
          {
            id: "2",
            resourceId: "b",
            title: "Event 2",
            description: " for Event 2",
            start: "2025-03-20T11:00:00",
            end: "2025-03-20T12:00:00",
          },
          {
            id: "3",
            resourceId: "c",
            title: "Work Bench + Open Court Access",
            description: "Module H - Performance Review",
            start: "2025-03-20T13:00:00",
            end: "2025-03-20T18:00:00",
          },
        ],
        eventContent: function(arg) {
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
};
</script>

<style>
.fc .fc-bg-event {
  opacity: 1
}
.fc .fc-bg-event .fc-event-title {
  font-style: normal;
}
.fc-event-title {
  font-size: small;
  text-align: center;
  display: block;
  margin-top: -20px;
  white-space: nowrap;
}

.fc-event-description {
  font-size:17px; 
  text-align: center;
  display:flex;
  margin-top: -15px;
  text-overflow:ellipsis;
  white-space: nowrap;
}

.fc-event {
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  height: 100%;
}
.fc-event-time, .fc-event-title {
padding: 0 1px;
white-space: normal;
}
</style>
