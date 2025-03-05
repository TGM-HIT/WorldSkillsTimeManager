<script lang="ts">
import { defineComponent } from 'vue';
import { TimeTable, type TimeTableItem, type TimeTableLocation } from 'vue3-timetable';

export default defineComponent({
    name: 'App',
    components: {TimeTable},
    setup() {
      const items: TimeTableItem[] = [
        {
          id: "e3",
          locationId: 2,
          startDate: `2025-03-04T14:00:00`,
          endDate: `2025-03-04T16:00:00`,
          name: "Surprise Event",
        }
      ];

      const locations: TimeTableLocation[] = [
        {
            id: 1,
            name: "Mainstage",
            items: [
              {
                id: "e1",
                startDate: `2025-03-04T08:00:00`,
                endDate: `2025-03-04T11:00:00`,
                name: "Main Event",
                info: "Don't miss it!",
                style: {
                  backgroundColor: "#999",
                  color: "#000",
                },
              },
            ],
          },
          {
            id: 2,
            name: "Playground",
            items: [
              {
                id: "e2",
                startDate: `2025-03-04T12:00:00`,
                endDate: `2025-03-04T17:00:00`,
                name: "Fun Time",
                cancelled: true,
              },
            ],
          }
      ];

      return {
        items,
        locations,
      };
    },
  });
</script>

<template>
  <div class="timetable">
    <TimeTable variant="horizontal" :items="items" :locations="locations" />
  </div>
</template>