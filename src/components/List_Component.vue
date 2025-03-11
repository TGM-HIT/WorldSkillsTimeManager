<template>
  <v-container>
    <v-list >
      <v-card
        v-for="(item, index) in paginatedListdata"
        :key="index"
        class="mx-auto mt-4"
        max-width="1000px"
        min-height="25px"
        rounded="lg"
        flat
        color="black"
        variant="outlined"
        height="auto"
        width="auto"
      >
        <v-list-item>
          <v-row style="padding-top: 2%; padding-bottom: 2%; padding-left: 5%; padding-right: 5%;">
            <v-list-item-content>
              <v-row>
                <v-col v-for="(value, key) in filteredKeys(item)" :key="key" cols="auto">
                  <strong>{{ key }}:</strong> {{ value }}
                </v-col>
              </v-row>
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-list-item-action style="gap: 10%;" class="d-flex justify-end align-center">
              <v-btn v-on:click="$emit('edit', item.id)" rounded="lg" color="primary" icon="mdi-cog" size="x-small"></v-btn>
              <v-btn rounded="lg" @click="deleteItem(item)" color="error" icon="mdi-delete" size="x-small"></v-btn>
            </v-list-item-action>
          </v-row>
        </v-list-item>
      </v-card>
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
      itemsPerPage: 10,
      tablename: ''
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
        const link = 'http://localhost:5000/getTable?tablename=' + this.tablename;
        const response = await axios.get(link);
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
    async deleteItem(item) {
      try {
         // Setzen Sie den Tabellennamen entsprechend Ihrer Anforderungen
        const id = item.id; // Nehmen wir an, dass 'id' die zu löschende ID ist

        await axios.delete('http://localhost:5000/deleteRow', {
          data: {
            tablename: this.tablename,
            id: id
          }
        });

        console.log('Item deleted:', item);
        // Aktualisieren Sie die lokale Datenliste, um das gelöschte Element zu entfernen
        this.listdata = this.listdata.filter(i => i.id !== id);
      } catch (error) {
        console.error('Fehler beim Löschen des Elements:', error.response?.data || error.message);
      }
    },
    updatePage(newPage) {
      this.page = newPage;
    },
    filteredKeys(item) {
      const excludedKeys = ['flag', 'image', 'file', 'imageSrc'];
      return Object.keys(item)
        .filter(key => !excludedKeys.includes(key))
        .reduce((obj, key) => {
          obj[key] = item[key];
          return obj;
        }, {});
    },
    checkCurrentLink() {
      const currentPath = this.$route.path;
      this.tablename = currentPath.substring(currentPath.lastIndexOf('/') + 1).toLowerCase();
      this.getValues();
    }
  },
  mounted() {
    this.checkCurrentLink();
  }
};
</script>