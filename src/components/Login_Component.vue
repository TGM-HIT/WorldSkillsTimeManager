<template>
  <v-app>
    <v-app-bar app color="#003866" height="80" flat>
      <v-container class="d-flex align-center" fluid>
        <v-row class="d-flex align-center flex-nowrap">
          <v-col cols="auto" class="d-flex align-center">
            <v-toolbar-title>
              <router-link to="/" style="text-decoration: none;">
                <img src="/svgexport-1.svg" alt="logo" style="max-height: 70px; max-width: 150px;" />
              </router-link>
            </v-toolbar-title>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="d-flex align-center justify-start flex-wrap" cols="auto" style="gap: 10px;">
            <router-link to="/table">
              <v-btn class="text-h4 font-weight-bold" size="large" color="white">Table</v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container class="d-flex justify-center align-center" style="margin-top: 5%;">
        <v-card class="mx-auto" max-width="70%" rounded="xl" flat color="black" variant="outlined" width="30%">
          <v-form @submit.prevent="login">
            <v-row class="text-h4 font-weight-bold justify-center align-center" style="color: #003866; margin-top: 4%; margin-bottom: 4%;">
              Login
            </v-row>
            <v-col class="d-flex justify-center">
              <p style="color:red">{{ checkLogin }}</p>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-text-field class="justify-center" width="60%" v-model="userName" label="User Name" variant="outlined" rounded="lg"></v-text-field>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-text-field
                v-model="password"
                label="Passwort"
                variant="outlined"
                rounded="lg"
                hint="Hint: Ein häufiges Passwort ist 'password'"
                :type="showPassword ? 'text' : 'password'"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="togglePasswordVisibility"
              ></v-text-field>
            </v-col>

             <v-col cols="12" class="d-flex justify-center">
              <div class="g-recaptcha" data-sitekey="6LciXfkqAAAAAEfHuO0X5D12tX0P9ckHM4nGIGgr"></div>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-btn type="submit" class="d-flex justify-center align-center" variant="flat" color="#003866" size="x-large">
                Login
              </v-btn>
            </v-col>
          </v-form>
        </v-card>
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; 2025 Worldskills</span>
    </v-footer>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      userName: "",
      password: "",
      showPassword: false,
      checkLogin: "",
      siteKey: "6LciXfkqAAAAAEfHuO0X5D12tX0P9ckHM4nGIGgr",
      recaptchaToken: "",
    };
  },
  mounted() {
    const script = document.createElement("script");
    //script.src = "https://www.google.com/recaptcha/api.js";
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

    async login() {
      //  const recaptchaResponse = grecaptcha.getResponse();
      // this.recaptchaToken = recaptchaResponse;
      // if (!recaptchaResponse) {
      // this.checkLogin = "Bitte reCAPTCHA bestätigen!";
      //  return;
      // }
      try {
        const hashedPassword = await this.hashPassword(this.password);
        const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/login`, {
          method: "POST",
          username: this.userName,
          password: hashedPassword,
          token: this.recaptchaToken,
        });

        if (response.data.success) {
          localStorage.setItem("auth", "true");
          this.$router.push("/");
        }
      } catch (error) {
        console.error('An error occured while loading the data: ', error.response?.data || error.message);
        this.checkLogin = "Name oder Passwort ist falsch";
      }
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>