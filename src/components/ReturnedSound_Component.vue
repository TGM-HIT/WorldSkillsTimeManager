<template>
  <div>
    <audio ref="audioPlayer" :src="audioSrc" controls autoplay></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      audioSrc: null,
    };
  },
  props: {
    id: null
  },
  watch: {
    id: {
      immediate: true,
      handler(newId) {
        if (newId) {
          this.fetchSound();
        }
      }
    }
  },
  methods: {
    async fetchSound() {
      try {
        const response = await fetch(`http://localhost:5000/getSound/${this.id}`);
        const data = await response.json();

        console.log("Empfangener Base64-Sound-String:", data.sound);  // Debugging
        this.audioSrc = `data:audio/mpeg;base64,${data.sound.trim()}`;

        // Start playing the audio once the source is set
        this.$refs.audioPlayer.play().catch(error => {
          console.error("Fehler beim automatischen Abspielen des Sounds:", error);
        });
      } catch (error) {
        console.error("Fehler beim Laden des Sounds:", error);
      }
    }
  }
};
</script>

<style scoped>
audio {
  width: 100%;
  max-width: 20%;
}
</style>
