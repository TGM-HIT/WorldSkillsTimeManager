<template>
  <h1 class="text-h3 font-weight-bold justify-center" style="color: #003866; margin-top: 1%; text-align: center;">
      Options
  </h1>
  <v-container class="d-flex justify-center align-center" style="margin-top: 1%;">
    
    <!-- Delete All Card -->
    <v-card class="mx-auto" min-width="50%" max-width="70%" rounded="xl" flat color="black" variant="outlined">
      <v-card-title style="text-align: center;">
        <h3 class="text-h5 font-weight-bold justify-center" style="color: #003866; margin-top: 2%; text-align: center;">
          Clear Database
        </h3>
      </v-card-title>
      <v-card-text class="d-flex flex-column align-center" style="padding: 2rem;">
        <v-btn @click="showDialog = true" color="red" size="large" class="mb-4">
          Delete All
        </v-btn>
        <p class="text-center" style="color: black;">
          <u>Warning:</u> This will delete all data except login credentials in the database.
        </p>
      </v-card-text>
    </v-card>

    <!-- Confirmation Dialog -->
    <v-dialog v-model="showDialog" max-width="600">
      <v-card>
        <v-card-title style="text-align: center;">
          <h3 class="text-h5 font-weight-bold justify-center" style="color: #003866; margin-top: 2%; text-align: center;">
            Clear Database
          </h3>
          <p class="text-center" style="color: black; font-size: small;">
            <u>Warning:</u> This will delete all data except login credentials in the database.
          </p>
        </v-card-title>
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
  
  <v-container class="d-flex justify-center align-center" style="margin-top: 1%;">
    <!-- Change loading apperanrence card -->
    <v-card class="mx-auto" min-width="50%" max-width="70%" rounded="xl" flat color="black" variant="outlined">
      
      <v-card-title style="text-align: center;">
        <h3 class="text-h5 font-weight-bold justify-center" style="color: #003866; margin-top: 2%; text-align: center;">
          Change loading appaerence
        </h3>
      </v-card-title>

      <v-card-text class="d-flex flex-column align-center" style="padding: 2rem;">
        <div class="wrapper">
          <div class="option">
            <input v-model="selectedOption" value="default" name="btn" type="radio" class="input" />
            <div class="btn">
              <span class="span">default</span>
            </div>
          </div>
          <div class="option">
            <input v-model="selectedOption" value="hamster" name="btn" type="radio" class="input" />
            <div class="btn">
              <span class="span">hamster</span>
            </div>
          </div>
          <div class="option">
            <input v-model="selectedOption" value="truck" name="btn" type="radio" class="input" />
            <div class="btn">
              <span class="span">truck</span>
            </div>
          </div>
        </div>
        <br>
        <p class="text-center" style="color: black;">
          <u>Tipp:</u> This will change the appearence of the loading wheel in the edit section.
        </p>
      </v-card-text>
    </v-card>
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
      selectedOption: 'option1',
    };
  },
  watch: {
    selectedOption(newVal) {
      localStorage.setItem('loadingOption', newVal);
    }
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
        const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/login`, {
          username: this.userName,
          password: hashedPassword,
          token: this.recaptchaToken,
        });

        if (response.data.success) {
          await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/deleteAll`);
          this.showDialog = false;
          alert("All data has been deleted.");
        } else {
          this.checkLogin = "Username or password is incorrect.";
        }
      } catch (err) {
        this.checkLogin = "Login failed.";
      }
    },
  },
  mounted() {
    this.selectedOption = localStorage.getItem('loadingOption');
  }
};
</script>

<style scoped>
  .wrapper {
    --font-color-dark: #000000;
    --font-color-light: #fff;
    --bg-color: #fff;
    --main-color: #003866;
    --secondary-color: #505050;
    position: relative;
    width: 250px;
    height: 36px;
    background-color: var(--bg-color);
    border: 2px solid var(--main-color);
    border-radius: 34px;
    display: flex;
    flex-direction: row;
    box-shadow: 4px 4px var(--main-color);
  }

  .option {
    margin-right: 5px;
    width: 80.5px;
    height: 28px;
    position: relative;
    top: 2px;
    left: 2px;
    border-radius: 34px;
    transition: 0.25s cubic-bezier(0, 0, 0, 1);
  }

  .option:last-child {
    margin-right: 4px;
  }

  .option:hover {
    background-color: var(--secondary-color);
  }

  .option:hover .span {
    color: var(--font-color-light);
  }

  .input {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    appearance: none;
    cursor: pointer;
  }

  .btn {
    width: 100%;
    height: 100%;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .span {
    color: var(--font-color-dark);
  }

  .input:checked + .btn {
    background-color: var(--main-color);
    transition: 0.2s cubic-bezier(0, 0, 0, 1);
  }

  .input:checked + .btn .span {
    color: var(--font-color-light);
    transition: 0.25s cubic-bezier(0, 0, 0, 1);
  }
</style>