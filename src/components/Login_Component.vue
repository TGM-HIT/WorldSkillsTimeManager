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
              <p style="color:red">{{checkLogin}} </p>
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
            <!--
            <v-col>
              <div>
                <button @click="executeCaptcha">Verifizieren</button>
                <p v-if="token">Token: {{ token }}</p>
              </div>
            </v-col>
            -->
            <v-col cols="12" class="d-flex justify-center">
              <v-btn class="d-flex justify-center align-center" variant="flat" color="#003866" size="x-large" @click="login()">
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
import { ref } from "vue";
import { useReCaptcha } from "vue-recaptcha-v3";

export default {
  setup() {
    const { executeRecaptcha } = useReCaptcha();
    const token = ref("");

    const executeCaptcha = async () => {
      token.value = await executeRecaptcha("login");
      console.log("reCAPTCHA Token:", token.value);
    };

    return { executeCaptcha, token };
  },
  name: "Login",
  data() {
    return {
      userName: "",
      password: "",
      showPassword: false,
      checkLogin: "",
    };
  },
  methods: {
    async verifyCaptcha(token) {
      const secretKey = process.env.VUE_APP_RECAPTCHA_SECRET_KEY; // Vom Backend-Environment
      const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify`,
        null,
        {
          params: {
            secret: secretKey,
            response: token,
          },
        }
      );
      return response.data.success;
    },
    async hashPassword(password) {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
    },

    async login() {
      try {
        const hashedPassword = await this.hashPassword(this.password);
        const response = await axios.post("http://localhost:5000/login", {
          username: this.userName,
          password: hashedPassword
        });

        if (response.data.success) {
          localStorage.setItem("auth", "true");
          this.$router.push("/");
        }
      } catch (err) {
        //alert(err.response?.data?.message);
        this.checkLogin = "Name oder Passwort ist falsch"
      }
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
