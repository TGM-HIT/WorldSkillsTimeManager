<template>
  <div>
    <img :src="imageSrc" alt="Team Picture" class="team-picture" />
  </div>
</template>

<script>
export default {
  props: {
    teamId: {
      type: Number,
      required: true, // Die teamId muss immer gesetzt werden
    },
  },
  data() {
    return {
      imageSrc: null,
    };
  },
  mounted() {
    this.fetchImage();
  },
  methods: {
    async fetchImage() {
      try {
        // Verwenden der teamId, die als Prop übergeben wurde
        const response = await fetch(`http://localhost:5000/getPictureFromTeam/${this.teamId}`);
        const data = await response.json();

        console.log("Empfangener Base64-String:", data.image); // Debugging
        this.imageSrc = data.image.trim();
      } catch (error) {
        console.error("Fehler beim Laden des Bildes:", error);
      }
    },
  },
};
</script>

