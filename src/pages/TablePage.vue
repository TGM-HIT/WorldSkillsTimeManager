<template>
  <div>
    <div id="scheduler" style="height: 600px; width: 100%;"></div>
  </div>
</template>

<script>

export default {
  name: 'SchedulerComponent',
  mounted() {
    const ms = MindFusion.Scheduling;
    const calendar = new ms.Calendar(document.getElementById('scheduler'));
    calendar.render();
    var schedule = calendar.schedule;
    var item = new ms.Item();
    item.subject = "Birthday Celebration";
    item.startTime = ms.DateTime.today();
    item.endTime = ms.DateTime.addDays(item.startTime, 1);
    schedule.items.add(item);
  }
}
</script>

<style scoped></style>