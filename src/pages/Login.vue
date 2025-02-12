<template>
    <div>
      <Login_Component/>
    </div>
  </template>

<script>
import Login from '@/components/Login_Component.vue';
  
  export default {
    name: "LoginPage",
    components: {
      Login,
    },
  };
  </script>