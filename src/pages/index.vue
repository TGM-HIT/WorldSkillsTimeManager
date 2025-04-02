<template>
  <div style="text-align: center; background-color: #003866; width: 100vw; height: 100vh; display: flex; justify-content: center; align-items: center;">
    <img src="../assets/Worldskills_Shanghaiiyyii.png" width="70%" style="margin-top: 3%; margin-bottom: 2%"/>
    <!--
    <br>
    <br>
    <br>
    <h1 style="text-align: center;">Startseite</h1>
    <h1 style="text-align: center;">(Platzhalter)</h1>

    <Home />

    <Babler_Component />
    -->
  </div>
</template>

<script>
import Babler from '@/components/Babler_Component.vue';
import Home from '@/components/Table_Component.vue';

export default {
  name: "HomePage",
  components: {
    Babler,
    Home,
  },
};
</script>
