<template>
  <div>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue3";
import { Calendar } from "@fullcalendar/core";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        height: '700px',
        nowIndicator: true,
        plugins: [resourceTimelinePlugin],
        headerToolbar: false,
        expandRows: true,
        aspectRatio: 1.6,
        initialView: "resourceTimelineDay",
        slotMinTime: "06:00",
        slotMaxTime: "18:00",
        resourceGroupField: "group",
        schedulerLicenseKey: "CC-Attribution-NonCommercial-NoDerivatives",
        slotDuration: "00:15:00",
        resourceAreaWidth: "20%",
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
      },
    };
  },
};
</script>
