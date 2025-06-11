<template>
  <div class="image-container">
    <v-progress-circular v-if="loading" indeterminate color="primary" style="position: absolute;"></v-progress-circular>
    <img v-else :src="imageSrc" alt="Team Picture" class="team-picture" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageSrc: null,
      loading: true,
    };
  },
  props: {
    id: null
  },
  mounted() {
    this.fetchImage();
  },
  methods: {
    async fetchImage() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/getPictureFromParticipant/${this.id}`);
        const data = await response.json();

        console.log("Empfangener Base64-String:", data.image); // Debugging
        this.imageSrc = data.image.trim();
      } catch (error) {
        console.error("Fehler beim Laden des Bildes:", error);
      } finally {
        this.loading = false; 
      }
    }
  }
};
</script>

<style scoped>
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.team-picture {
  max-width: 300px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  margin: 0%;
}
</style>