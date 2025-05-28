<template>
    <div>
      <h1>Options</h1>
      <button @click="deleteAllData">Delete All</button>
      <p>Warning: This will delete all data except login data in the database.</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'Options',
    methods: {
      deleteAllData() {
        
        console.log('Deleting all data except login data...');
        
        axios.delete("http://localhost:5000/deleteAll");
      }
    }
  }
  </script>