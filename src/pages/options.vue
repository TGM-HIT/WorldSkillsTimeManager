<template>
  <div>
    <h1>Options</h1>
    <button @click="showDialog = true" style="background-color:red">Delete All</button>
    <p>Warning: This will delete all data except login data in the database.</p>

    <!-- Bestätigungsdialog -->
    <v-dialog v-model="showDialog" max-width="600">
      <v-card>
        <v-card-title class="text-h5">Bitte bestätigen Sie den Löschvorgang</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="confirmDeletion">
            <v-col class="d-flex justify-center">
              <p style="color:red">{{ checkLogin }}</p>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-text-field
                v-model="userName"
                label="User Name"
                variant="outlined"
                rounded="lg"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-text-field
                v-model="password"
                label="Passwort"
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
              <v-btn type="submit" color="red" variant="flat">Bestätigen & Löschen</v-btn>
              <v-btn @click="showDialog = false" variant="text">Abbrechen</v-btn>
            </v-col>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
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
      siteKey: "6LciXfkqAAAAAEfHuO0X5D12tX0P9ckHM4nGIGgr",
      recaptchaToken: "",
      showDialog: false,
    };
  },
  mounted() {
    const script = document.createElement("script");
    script.setAttribute("src", "https://www.google.com/recaptcha/api.js");
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
          alert("Alle Daten wurden gelöscht.");
        } else {
          this.checkLogin = "Name oder Passwort ist falsch.";
        }
      } catch (err) {
        this.checkLogin = "Login fehlgeschlagen.";
      }
    }
  }
};
</script>