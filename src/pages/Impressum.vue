<template>
  <v-container>
    <div>
      <h1>Credits</h1>
      <br>
      <p><h2>Planning and time management software for the WorldSkills Mobile Robotics competition</h2></p>
      <p><strong></strong>Created by Students of TGM (Technologisches Gewerbe Museum)</p>
      <br>
      <br>
  <p><h3>Made by: </h3>Maximilian Bauer, Viktor Bublinskyyy, Matei Dragne, Julian Ganner, Dominik Sandler, Wiktor Nosek</p>
      <p v-if="visible">Biggest supporting Members: Chat GPT, Le Chat and Deepseek AI</p>
      <br>
      <br>
      <br>
      <p>
        <strong>Useful Links: </strong>
        <br>
        <br>
        <div style="margin-left: 2%;">
          <v-row>
            <a href="https://worldskills.org/" style="color: inherit;">Official WorldSkills Website</a>
          </v-row>
        </div>
      </p>
      <br>
      <p>
        <strong>Minigames: </strong>
        <br>
        <br>
        <div style="margin-left: 2%;">
          <v-row style="gap: 2%;"> 
            <router-link to="/blackjack">
              <v-btn class="text-h4 font-weight-bold" size="x-small" color="white" icon="mdi-cards-playing-diamond-multiple"></v-btn>
            </router-link>
            <router-link to="/poker">
              <v-btn class="text-h4 font-weight-bold" size="x-small" color="white" icon="mdi-poker-chip"></v-btn>
            </router-link>
            <router-link to="/minesweeper">
              <v-btn class="text-h4 font-weight-bold" size="x-small" color="white" icon="mdi-mine"></v-btn>
            </router-link>
          </v-row>
        </div>
      </p>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Impressum',
  data() {
    return {
      visible: false,
    };
  },
};
</script>