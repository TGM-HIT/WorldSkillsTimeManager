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
        const response = await fetch(`http://localhost:5000/getPictureFromTeam/${this.id}`);
        const data = await response.json();
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
  max-height: 1000px;
  max-width: 1000px;
  height: 100%;
  width: 100%;
}

.team-picture {
  max-width: 2000px;
  width: auto;
  height: auto;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  margin: 0%;
}
</style>