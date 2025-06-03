<template>
  <h1 class="text-h4 font-weight-bold justify-center" style="color: #003866; margin-top: 2%; text-align: center;">
      Options
  </h1>
  <v-container class="d-flex justify-center align-center" style="margin-top: 5%;">
    
    <v-card class="mx-auto" max-width="70%" rounded="xl" flat color="black" variant="outlined">
      
      <v-card-text class="d-flex flex-column align-center" style="padding: 2rem;">
        <v-btn @click="showDialog = true" color="red" size="large" class="mb-4">
          Delete All
        </v-btn>
        <p class="text-center" style="color: black;">
          Warning: This will delete all data except login credentials in the database.
        </p>
      </v-card-text>
    </v-card>

    <!-- Confirmation Dialog -->
    <v-dialog v-model="showDialog" max-width="600">
      <v-card>
        <v-card-title class="text-h5">Please confirm deletion</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="confirmDeletion">
            <v-col class="d-flex justify-center">
              <p style="color:red">{{ checkLogin }}</p>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-text-field
                v-model="userName"
                label="Username"
                variant="outlined"
                rounded="lg"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-text-field
                v-model="password"
                label="Password"
                variant="outlined"
                rounded="lg"
                :type="showPassword ? 'text' : 'password'"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="togglePasswordVisibility"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <div class="g-recaptcha" :data-sitekey="siteKey"></div>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-btn type="submit" color="red" variant="flat" class="mr-2">Confirm & Delete</v-btn>
              <v-btn @click="showDialog = false" variant="text">Cancel</v-btn>
            </v-col>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Options',
  data() {
    return {
      userName: "",
      password: "",
      showPassword: false,
      checkLogin: "",
      //siteKey: "6LciXfkqAAAAAEfHuO0X5D12tX0P9ckHM4nGIGgr",
      //recaptchaToken: "",
      showDialog: false,
    };
  },
  mounted() {
    const script = document.createElement("script");
    //script.setAttribute("src", "https://www.google.com/recaptcha/api.js");
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  },
  methods: {
    async hashPassword(password) {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

    async confirmDeletion() {
      try {
        const hashedPassword = await this.hashPassword(this.password);
        const response = await axios.post("http://localhost:5000/login", {
          username: this.userName,
          password: hashedPassword,
          token: this.recaptchaToken,
        });

        if (response.data.success) {
          await axios.delete("http://localhost:5000/deleteAll");
          this.showDialog = false;
          alert("All data has been deleted.");
        } else {
          this.checkLogin = "Username or password is incorrect.";
        }
      } catch (err) {
        this.checkLogin = "Login failed.";
      }
    }
  }
};
</script>