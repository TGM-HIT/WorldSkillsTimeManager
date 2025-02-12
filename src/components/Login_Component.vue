<template>
  <v-card class="mx-auto mt-10" max-width="70%" rounded="xl" flat color="black" variant="outlined" height="45%"
    width="25%">
    <v-form>
      <v-row
          class="text-h4 font-weight-bold  justify-center align-center"
          style="color: #003866;"
        >
          Login
        </v-row>
        <v-col cols="12" class="d-flex justify-center">

      <v-text-field class="justify-center" width="60%" v-model="userName" clearable label="User Name" variant="outlined" rounded="lg"></v-text-field>
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
      <v-text-field  v-model="password" clearable label="Passwort" variant="outlined" rounded="lg"></v-text-field>
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
      <v-btn
      class="d-flex justify-center align-center"  
      variant="flat"
      color="#003866"
      >
        Login
      </v-btn>
    </v-col>
    </v-form>
  </v-card>

</template>

<script>
import axios from 'axios';
import cors from 'cors';

export default {
  name: 'Login',
  data() {
    return {
      userName: '',
      password: ''
    };
  },
  methods: {
    login() {
      alert('Login mit:', this.email, this.password);
    }
    // async login() {
    //   const response = await axios.post('http://localhost:5000/login', {
    //     name: this.login.email,
    //     description: this.login.password
    //   });
    // }
  }
};
</script>