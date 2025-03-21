<template>
    <div>
      <img :src=this.imageSrc alt="Team Picture" class="team-picture" />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        imageSrc: null,
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
                const response = await fetch(`http://localhost:5000/getPictureFromParticipant/${this.id}`);
                const data = await response.json();

                console.log("Empfangener Base64-String:", data.image); // Debugging
                this.imageSrc = data.image.trim();
            } catch (error) {
                console.error("Fehler beim Laden des Bildes:", error);
            }
        }
    }
  };
  </script>
  
  <style scoped>
  .team-picture {
    max-width: 300px;
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  }
  </style>
  