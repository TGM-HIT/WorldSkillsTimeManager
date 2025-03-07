<template>
  <v-card class="mx-auto mt-10" max-width="700" rounded="xl" flat color="black" variant="outlined" height="auto" width="600px">
    <v-container fluid>
      <v-row class="text-h5 font-weight-bold d-flex justify-center align-center" style="color: #003866;">
        {{titleType}} Team
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Name
          </v-container>
        </v-col>
        <v-col>
          <v-text-field v-model="team.name" :error="errorBoolName"
            :error-messages="errorBoolName ? 'Please enter a name' : ''" class="ml-n16" rounded="lg"
            variant="outlined"></v-text-field>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolName">
        <br />
      </div>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Country Code
          </v-container>
        </v-col>
        <v-col>
          <v-select v-model="team.country_code" :error="errorBoolCode"
            :error-messages="errorBoolCode ? 'Please enter a country code' : ''" :items="Object.keys(countryList)"
            class="ml-n16" rounded="lg" variant="outlined" @update:modelValue="updateCountryName"></v-select>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolCode">
        <br />
      </div>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Country Name
          </v-container>
        </v-col>
        <v-col>
          <v-text-field v-model="team.country_name" class="ml-n16" rounded="lg" variant="outlined"
            readonly></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mb-n12 mr-4">
        <v-col>
          <v-container fluid class="font-weight-medium text-h5 mt-n2" style="color: #003866;">
            Flag
          </v-container>
        </v-col>
        <v-col>
          <v-file-input v-model="team.flagFile" :error="errorBoolFlag"
            :error-messages="errorBoolFlag ? 'Please upload a png' : ''" class="ml-n16" rounded="lg" variant="outlined"
            accept="image/*" label="Upload Flag Picture" show-size prepend-icon="" append-inner-icon="mdi-file"
            @change="handleFileUpload"></v-file-input>
        </v-col>
      </v-row>
      <br>
      <div v-show="errorBoolFlag">
        <br />
      </div>
      <v-row>
        <v-col></v-col>
        <v-col class="d-flex justify-end pt-3">
          <v-btn v-if="!this.editing" class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866" @click="createGroup">
            Create
          </v-btn>
          <v-btn v-if="this.editing" class="font-weight-bold mr-7" size="large" rounded="lg" color="#003866" @click="editGroup">
            Update
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <SuccessSnackbar v-model:show="showSuccess" />
  <ErrorSnackbar v-model:show="showError" />
</template>

<script>
import axios from 'axios';
import SuccessSnackbar from "@/components/SuccessSnackbar.vue";
import ErrorSnackbar from "@/components/ErrorSnackbar.vue";

export default {
  components: {
    SuccessSnackbar,
    ErrorSnackbar,
  },
  props: {
    initialEditing: {
      type: Boolean,
      default: false
    },
    editId: null
  },

  data() {
    return {
      editing: this.initialEditing,
      titleType: "",
      showSuccess: false,
      showError: false,
      errorBoolName: false,
      errorBoolCode: false,
      errorBoolFlag: false,
      team: {
        name: '',
        country_code: '',
        country_name: '',
        flagFile: null,
        flagBase64: '',
      },
      countryList: {
        "AFG": "Afghanistan",
        "ALB": "Albania",
        "DZA": "Algeria",
        "AND": "Andorra",
        "AGO": "Angola",
        "ATG": "Antigua and Barbuda",
        "ARG": "Argentina",
        "ARM": "Armenia",
        "AUS": "Australia",
        "AUT": "Austria",
        "AZE": "Azerbaijan",
        "BHS": "Bahamas",
        "BHR": "Bahrain",
        "BGD": "Bangladesh",
        "BRB": "Barbados",
        "BLR": "Belarus",
        "BEL": "Belgium",
        "BLZ": "Belize",
        "BEN": "Benin",
        "BHU": "Bhutan",
        "BOL": "Bolivia",
        "BIH": "Bosnia and Herzegovina",
        "BWA": "Botswana",
        "BRA": "Brazil",
        "BRN": "Brunei Darussalam",
        "BGR": "Bulgaria",
        "BFA": "Burkina Faso",
        "BDI": "Burundi",
        "CPV": "Cabo Verde",
        "KHM": "Cambodia",
        "CMR": "Cameroon",
        "CAN": "Canada",
        "CAF": "Central African Republic",
        "TCD": "Chad",
        "CHL": "Chile",
        "CHN": "China",
        "COL": "Colombia",
        "COM": "Comoros",
        "COG": "Congo (Congo-Brazzaville)",
        "COD": "Congo (Congo-Kinshasa)",
        "CRI": "Costa Rica",
        "HRV": "Croatia",
        "CUB": "Cuba",
        "CYP": "Cyprus",
        "CZE": "Czech Republic",
        "DNK": "Denmark",
        "DJI": "Djibouti",
        "DMA": "Dominica",
        "DOM": "Dominican Republic",
        "ECU": "Ecuador",
        "EGY": "Egypt",
        "SLV": "El Salvador",
        "GNQ": "Equatorial Guinea",
        "ERI": "Eritrea",
        "EST": "Estonia",
        "SWZ": "Eswatini",
        "ETH": "Ethiopia",
        "FJI": "Fiji",
        "FIN": "Finland",
        "FRA": "France",
        "GAB": "Gabon",
        "GMB": "Gambia",
        "GEO": "Georgia",
        "DEU": "Germany",
        "GHA": "Ghana",
        "GRC": "Greece",
        "GRD": "Grenada",
        "GTM": "Guatemala",
        "GIN": "Guinea",
        "GNB": "Guinea-Bissau",
        "GUY": "Guyana",
        "HTI": "Haiti",
        "HND": "Honduras",
        "HUN": "Hungary",
        "ISL": "Iceland",
        "IND": "India",
        "IDN": "Indonesia",
        "IRN": "Iran",
        "IRQ": "Iraq",
        "IRL": "Ireland",
        "ISR": "Israel",
        "ITA": "Italy",
        "JAM": "Jamaica",
        "JPN": "Japan",
        "JOR": "Jordan",
        "KAZ": "Kazakhstan",
        "KEN": "Kenya",
        "KIR": "Kiribati",
        "KOR": "Korea (South)",
        "KWT": "Kuwait",
        "KGZ": "Kyrgyzstan",
        "LAO": "Lao People's Democratic Republic",
        "LVA": "Latvia",
        "LBN": "Lebanon",
        "LSO": "Lesotho",
        "LBR": "Liberia",
        "LBY": "Libya",
        "LIE": "Liechtenstein",
        "LTU": "Lithuania",
        "LUX": "Luxembourg",
        "MDG": "Madagascar",
        "MWI": "Malawi",
        "MYS": "Malaysia",
        "MDV": "Maldives",
        "MLI": "Mali",
        "MLT": "Malta",
        "MHL": "Marshall Islands",
        "MRT": "Mauritania",
        "MUS": "Mauritius",
        "MYT": "Mayotte",
        "MEX": "Mexico",
        "FSM": "Micronesia (Federated States of)",
        "MDA": "Moldova",
        "MCO": "Monaco",
        "MNG": "Mongolia",
        "MNE": "Montenegro",
        "MOZ": "Mozambique",
        "MMR": "Myanmar (Burma)",
        "NAM": "Namibia",
        "NRU": "Nauru",
        "NPL": "Nepal",
        "NLD": "Netherlands",
        "NZL": "New Zealand",
        "NIC": "Nicaragua",
        "NER": "Niger",
        "NGA": "Nigeria",
        "MKD": "North Macedonia",
        "NOR": "Norway",
        "OMN": "Oman",
        "PAK": "Pakistan",
        "PLW": "Palau",
        "PAN": "Panama",
        "PNG": "Papua New Guinea",
        "PRY": "Paraguay",
        "PER": "Peru",
        "PHL": "Philippines",
        "POL": "Poland",
        "PRT": "Portugal",
        "QAT": "Qatar",
        "ROU": "Romania",
        "RUS": "Russia",
        "RWA": "Rwanda",
        "KNA": "Saint Kitts and Nevis",
        "LCA": "Saint Lucia",
        "VCT": "Saint Vincent and the Grenadines",
        "WSM": "Samoa",
        "SMR": "San Marino",
        "STP": "Sao Tome and Principe",
        "SAU": "Saudi Arabia",
        "SEN": "Senegal",
        "SRB": "Serbia",
        "SYC": "Seychelles",
        "SLE": "Sierra Leone",
        "SGP": "Singapore",
        "SVK": "Slovakia",
        "SVN": "Slovenia",
        "SLB": "Solomon Islands",
        "SOM": "Somalia",
        "ZAF": "South Africa",
        "SGS": "South Georgia and the South Sandwich Islands",
        "SSD": "South Sudan",
        "ESP": "Spain",
        "LKA": "Sri Lanka",
        "SDN": "Sudan",
        "SUR": "Suriname",
        "SJM": "Svalbard and Jan Mayen",
        "SWZ": "Swaziland",
        "SWE": "Sweden",
        "CHE": "Switzerland",
        "SYR": "Syria",
        "TWN": "Taiwan",
        "TJK": "Tajikistan",
        "TZA": "Tanzania",
        "THA": "Thailand",
        "TGO": "Togo",
        "TKM": "Turkmenistan",
        "TON": "Tonga",
        "TTO": "Trinidad and Tobago",
        "TUN": "Tunisia",
        "TUR": "Turkey",
        "TKL": "Tokelau",
        "TUV": "Tuvalu",
        "UGA": "Uganda",
        "UKR": "Ukraine",
        "ARE": "United Arab Emirates",
        "GBR": "United Kingdom",
        "USA": "United States",
        "URY": "Uruguay",
        "UZB": "Uzbekistan",
        "VUT": "Vanuatu",
        "VEN": "Venezuela",
        "VNM": "Vietnam",
        "VGB": "Virgin Islands",
        "WLF": "Wallis and Futuna",
        "WSM": "Western Sahara",
        "YEM": "Yemen",
        "ZMB": "Zambia",
        "ZWE": "Zimbabwe"
      },
    };
  },

  methods: {
    updateCountryName() {
      this.team.country_name = this.countryList[this.team.country_code] || '';
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.team.flagFile = file;

        const reader = new FileReader();
        reader.onloadend = () => {
          this.team.flagBase64 = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },

    async createGroup() {
      if (this.team.name !== '' && this.team.country_code !== '' && this.team.flagFile !== null) {
        this.errorBoolName = false;
        this.errorBoolCode = false;
        this.errorBoolFlag = false;
        try {
          console.log("Daten, die gesendet werden:", JSON.stringify(this.team, null, 2));

          const response = await axios.post('http://localhost:5000/setTable', {
            table: 'team',
            data: {
              name: this.team.name,
              country_code: this.team.country_code,
              country_name: this.team.country_name,
              flag: this.team.flagBase64,
            }
          });
          this.showSuccess = true;
          setTimeout(() => (this.showSuccess = false), 3000);
        } catch (error) {
          this.showError = true;
          setTimeout(() => (this.showError = false), 3000);
        } finally {
          this.resetForm();
        }
      } else {
        this.errorBoolName = this.team.name === '';
        this.errorBoolCode = this.team.country_code === '';
        this.errorBoolFlag = this.team.flagFile === null;
      }
    },

    // Reset form fields
    resetForm() {
      this.team.name = '';
      this.team.country_code = '';
      this.team.country_name = '';
      this.team.flagFile = null;
      this.team.flagBase64 = '';
    }
  },
  mounted() {
    const currentPath = this.$route.path;
    const pathParts = currentPath.split('/').filter(part => part.length > 0);

    if (pathParts.length >= 2) {
      if (pathParts[pathParts.length - 2].toLowerCase() == "create") {
        this.editing = false;
        this.titleType = "Create"
        this.resetForm();
        this.$forceUpdate();
      } else {
        this.titleType = "Edit";
      }
    }
  }
};
</script>