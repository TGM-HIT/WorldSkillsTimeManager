<template>
  <v-app d-flex>
    <v-app-bar app color="#003866" height="80" flat>
      <v-container class="d-flex align-center" fluid>
        <v-row class="d-flex align-center flex-nowrap">
          <!-- Logo -->
          <v-col cols="auto" class="d-flex align-center">
            <v-toolbar-title>
              <router-link to="/" style="text-decoration: none;">
                <img src="/svgexport-1.svg" alt="logo" style="max-height: 70px; max-width: 150px;" />
              </router-link>
            </v-toolbar-title>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </v-app>

  <v-card class="mx-auto mt-10" max-width="70%" rounded="xl" flat color="black" variant="outlined" width="25%" style="margin-top: 2%;">
    <v-form>
      <v-row class="text-h4 font-weight-bold  justify-center align-center"
        style="color: #003866; margin-top: 4%; margin-bottom: 4%;">
        Login
      </v-row>
      <v-col cols="12" class="d-flex justify-center">
        <v-text-field class="justify-center" width="60%" v-model="userName" clearable label="User Name"
          variant="outlined" rounded="lg"></v-text-field>
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <v-text-field v-model="password" clearable label="Passwort" variant="outlined" rounded="lg"></v-text-field>
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <v-btn class="d-flex justify-center align-center" variant="flat" color="#003866" size="x-large">
          Login
        </v-btn>
      </v-col>
    </v-form>
  </v-card>

</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      userName: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:5000/login", {
          username: this.userName,
          password: this.password,
        });

        if (response.data.success) {
          localStorage.setItem("auth", "true"); // Save login status
          this.$router.push("/all"); // Redirect to the main page
        } else {
          this.error = "Invalid username or password";
        }
      } catch (err) {
        console.error("Login failed:", err);
        this.error = "Login failed, please try again.";
      }
    },
  },
};
</script>
