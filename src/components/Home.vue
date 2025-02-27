<template>

</template>

<script>
 export default {
  mounted(){
    var calendar = new MindFusion.Scheduling.Calendar(
    document.getElementById("calendar"));
calendar.render();
  }
 }
</script>