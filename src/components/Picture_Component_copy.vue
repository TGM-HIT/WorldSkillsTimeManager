<template>
  <div class="image-container" v-if="!loading">
    <img :src="imageSrc" alt="Team Picture" class="team-picture" />
  </div>
  <div v-if="error" style="color: red;">
    Error
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageSrc: null,
      loading: true,
      error: false,
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
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/getPictureFromTeam/${this.id}`);
        const data = await response.json();
        this.imageSrc = data.image.trim();
      } catch (error) {
        console.error("Fehler beim Laden des Bildes:", error);
        error = true
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
  border-radius: 3px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  margin: 0%;
}
</style>