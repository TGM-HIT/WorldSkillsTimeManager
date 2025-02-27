<template>
</template>

<script>
export default {
  mounted() {
    const p = require('@mindfusion/scheduling');
    const { Calendar } = require('@mindfusion/scheduling');
    p = MindFusion.Scheduling;

    // create a new instance of the calendar
    var calendar = new p.Calendar(
      document.getElementById("calendar"));
    calendar.render();

    // get the model
    var schedule = calendar.schedule;
  }
}
</script>