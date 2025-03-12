<template>
  <div>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3';
import { Calendar } from '@fullcalendar/core';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        nowIndicator: true,
        plugins: [resourceTimelinePlugin],
        headerToolbar: false,
        aspectRatio: 1.6,
        initialView: 'resourceTimelineDay',
        resourceGroupField: 'group',
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        slotDuration: '00:15:00',
        slotLabelFormat: {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        },
        resourceAreaColumns: [
          {
            group: true,
            field: 'group',
            headerContent: 'Groups'
          },
          {
            field: 'title',
            headerContent: 'Teams'
          },
        ],
        resources: [
          { id: 'a', group: 'Group 1', title: 'Team  A' },
          { id: 'b', group: 'Group 1', title: 'Team  B' },
          { id: 'c', group: 'Group 1', title: 'Team  C' },
          { id: 'd', group: 'Group 1', title: 'Team  D' },
          { id: 'e', group: 'Group 1', title: 'Team  E' },
          { id: 'f', group: 'Group 1', title: 'Team  F' },
          { id: 'g', group: 'Group 2', title: 'Team  G' },
          { id: 'h', group: 'Group 2', title: 'Team  H' },
          { id: 'i', group: 'Group 2', title: 'Team  I' },
          { id: 'j', group: 'Group 2', title: 'Team  J' },
          { id: 'k', group: 'Group 2', title: 'Team  K' },
          { id: 'l', group: 'Group 2', title: 'Team  L' },
          { id: 'm', group: 'Group 2', title: 'Team  M' },
          { id: 'n', group: 'Group 2', title: 'Team  N' },
          { id: 'o', group: 'Group 3', title: 'Team  O' },
          { id: 'p', group: 'Group 3', title: 'Team  P' },
          { id: 'q', group: 'Group 3', title: 'Team  Q' },
          { id: 'r', group: 'Group 3', title: 'Team  R' },
          { id: 's', group: 'Group 3', title: 'Team  S' },
          { id: 't', group: 'Group 3', title: 'Team  T' },
          { id: 'u', group: 'Group 3', title: 'Team  U' },
          { id: 'v', group: 'Group 3', title: 'Team  V' },
          { id: 'w', group: 'Group 3', title: 'Team  W' },
          { id: 'x', group: 'Group 3', title: 'Team  X' },
          { id: 'y', group: 'Group 3', title: 'Team  Y' },
          { id: 'z', group: 'Group 3', title: 'Team  Z' }
        ],
        events: [
          { id: '1', resourceId: 'a', title: 'Meeting with Team A', start: '2024-03-12T09:00:00', end: '2024-03-12T10:00:00' },
          { id: '2', resourceId: 'b', title: 'Team B Training', start: '2024-03-12T10:30:00', end: '2024-03-12T12:00:00' },
          { id: '3', resourceId: 'c', title: 'Team C Review', start: '2024-03-12T13:00:00', end: '2024-03-12T14:00:00' },
          { id: '4', resourceId: 'd', title: 'Team D Planning', start: '2024-03-12T14:30:00', end: '2024-03-12T16:00:00' },
          { id: '5', resourceId: 'e', title: 'Team E Workshop', start: '2024-03-12T16:30:00', end: '2024-03-12T18:00:00' }
        ],
      },
    };
  },
};
</script>
