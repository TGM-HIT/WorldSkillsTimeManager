<template>
  <v-container>
    <v-list>
      <v-list-item v-for="(item, index) in paginatedListdata" :key="index">
        <v-list-item-content>
          <v-row>
            <v-col v-for="(value, key) in filteredKeys(item)" :key="key" cols="auto">
              <strong>{{ key }}:</strong> {{ value }}
            </v-col>
          </v-row>
          <v-row v-if="item.imageSrc">
            <v-col>
              <v-img :src="item.imageSrc" alt="Team Image" max-height="100" max-width="100"></v-img>
            </v-col>
          </v-row>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn @click="editItem(item)" color="primary">Edit</v-btn>
          <v-btn @click="deleteItem(item)" color="error">Delete</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-pagination v-model="page" :length="totalPages" @input="updatePage"></v-pagination>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      listdata: [],
      page: 1,
      itemsPerPage: 10
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.listdata.length / this.itemsPerPage);
    },
    paginatedListdata() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.listdata.slice(start, end);
    }
  },
  methods: {
    async getValues() {
      try {
        const response = await axios.get('http://localhost:5000/getTable?tablename=team');
        console.log('Daten von der Datenbank:', response.data);

        if (response.data) {
          this.listdata = response.data.map(item => {
            if (item.image) {
              const mimeType = item.image.charAt(0) === '/' ? 'image/jpeg' : 'image/png';
              item.imageSrc = `data:${mimeType};base64,${item.image}`;
            }
            return item;
          });
        }
      } catch (error) {
        console.error('Fehler beim Laden der Daten:', error.response?.data || error.message);
      }
    },
    editItem(item) {
      console.log('Edit item:', item);
      // Hier können Sie die Logik zum Bearbeiten des Elements hinzufügen
    },
    deleteItem(item) {
      console.log('Delete item:', item);
      // Hier können Sie die Logik zum Löschen des Elements hinzufügen
    },
    updatePage(newPage) {
      this.page = newPage;
    },
    filteredKeys(item) {
      const excludedKeys = ['flag', 'image', 'file'];
      return Object.keys(item)
        .filter(key => !excludedKeys.includes(key))
        .reduce((obj, key) => {
          obj[key] = item[key];
          return obj;
        }, {});
    }
  },
  mounted() {
    this.getValues();
  }
};
</script>
