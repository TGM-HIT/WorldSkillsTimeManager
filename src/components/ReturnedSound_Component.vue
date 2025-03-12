<template>
    <div>
      <audio :src="audioSrc" controls></audio>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        audioSrc: null,
      };
    },
    mounted() {
      this.fetchSound();
    },
    methods: {
      async fetchSound() {
        try {
          const teamId = 2;
          const response = await fetch(`http://localhost:5000/getSound/${teamId}`);
          const data = await response.json();
  
          console.log("Empfangener Base64-Sound-String:", data.sound);  // Debugging
          this.audioSrc = `data:audio/mpeg;base64,${data.sound.trim()}`;
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
    max-width: 300px;
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  }
  </style>
  