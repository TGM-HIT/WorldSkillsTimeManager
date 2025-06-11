<template>
  <v-container v-if="!error" style="margin-left: auto; margin-right: 0%; max-width: 100%; margin-bottom: 0%; padding-bottom: 0%;">
    <v-row style="justify-content: flex-end;">
      <v-col cols="auto" md="6" style="text-align: right;">
        <div style="display: flex; justify-content: flex-end; align-items: center;">
          <v-text-field
            v-model="searchquery"
            density="compact"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="solo-filled"
            flat
            hide-details
            @input="filterList"
            single-line
            clearable
            style="max-width: 40%;"
            rounded="lg"
          />

        <!--Add Button-->
          <v-btn @click="redirectToCreate" rounded="lg" color="#003866" icon="mdi-plus"  size="small" style="margin-left: 1%;"/>
        </div>

      </v-col>
      <!--
      <v-col cols="12" md="6">
        <v-select
          v-model="selectedFilter"
          :items="filterkeys"
          label="Filter by"
          @change="filterList"
          clearable
        ></v-select>
      </v-col>
      -->
    </v-row>
  </v-container>
  
  <v-container style="margin-top: 0%;">
    <!-- Loading Bar -->
    <div v-if="loading" class="loading-overlay">
      <hamster v-if="loadingOption === 'hamster'"/>
      <Truck_Component v-if="loadingOption === 'truck'"/>
      <v-progress-circular v-if="loadingOption === 'default'" indeterminate color="primary"></v-progress-circular>
    </div>
    
    <!-- Failed Loading Error Message -->
    <v-alert v-if="error" type="error">
      An error occured while loading the Data: {{ errorMessage }}
    </v-alert>

    <!-- Empty Alert -->
    <v-alert v-if="empty" type="warning">
      It seems like there are no {{ tablename }}s created yet
    </v-alert>

    <!-- List -->
    <v-list v-if="!loading && !error && !empty">
      <v-card
        v-for="(item, index) in paginatedListdata"
        :key="index"
        class="mx-auto mt-4"
        max-width="1000px"
        min-height="25px"
        rounded="lg"
        flat
        color="#C9D4E0"
        variant="outlined"
        height="auto"
        width="auto"
      >
        <v-list-item>
          <v-row style="padding-top: 2.5%; padding-bottom: 2.5%; padding-left: 5%; padding-right: 5%;">
            <v-list-item-content>
              <v-row v-for="(value, key) in filteredKeys(item)" :key="key">
                <v-col cols="auto" style="color: #0E779F; font-size: large; padding: 0%;">
                  <strong style="color: #003866; font-size: large;">{{ key }}:</strong> {{ value }}
                </v-col>
              </v-row>
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-list-item-action style="gap: 10%;" class="d-flex justify-end align-center">
              <v-btn v-if="tablename === 'soundeffect' && !item.playing" @click="playSound(item)" rounded="lg" color="green" icon="mdi-play" size="x-small"/>
              <v-btn v-if="tablename === 'soundeffect' && item.playing" @click="pauseSound(item)" rounded="lg" color="green" icon="mdi-pause" size="x-small"/>
              <v-btn v-if="tablename === 'participant' || tablename === 'team'" @click="viewParticipant(item)" rounded="lg" color="blue" icon="mdi-image" size="x-small"/>
              <v-btn @click="$emit('edit', item.ID)" rounded="lg" color="primary" icon="mdi-cog" size="x-small"/>
              <v-btn @click="duplicate(item)" rounded="lg" color="secondary" icon="mdi-content-copy" size="x-small"/>
              <v-btn rounded="lg" @click="confirmDelete(item)" color="error" icon="mdi-delete" size="x-small"></v-btn>
            </v-list-item-action>
          </v-row>
        </v-list-item>
      </v-card>
    </v-list>
    <v-pagination v-model="page" :length="totalPages" @input="updatePage" v-if="!loading && !error && !empty"></v-pagination>

    <v-dialog v-model="showConfirmDialog" max-width="400" style="text-align: center;">
      <v-card>
        <v-card-title class="headline">Delete Item</v-card-title>
        <v-card-text>
          Do you really want to delete this item
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="showConfirmDialog = false">Cancel</v-btn>
          <v-btn color="red darken-1" text @click="deleteItemConfirmed">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';
import Hamster from '@/components/Hamster_Component.vue';
import Truck_Component from './Truck_Component.vue';

export default {
  components: {
    Hamster,
    Truck_Component,
  },
  data() {
    return {
      listdata: [],
      page: 1,
      itemsPerPage: 5,
      tablename: '',
      currentPlayingId: null,
      showConfirmDialog: false,
      itemToDelete: null,
      loading: true,
      error: false, 
      errorMessage: '',
      filterkeys: [],
      searchquery: '',
      selectedFilter: null,
      empty: false,
      loadingOption: 'default',
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredListdata.length / this.itemsPerPage);
    },
    paginatedListdata() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredListdata.slice(start, end); 
    },
    filteredListdata() {
      let filteredData = this.listdata;

      if (this.searchquery) {
        filteredData = filteredData.filter(item =>
          Object.values(item).some(value =>
            String(value).toLowerCase().includes(this.searchquery.toLowerCase())
          )
        );
      }

      if (this.selectedFilter) {
        filteredData = filteredData.filter(item => item[this.selectedFilter]);
      }

      return filteredData;
    }
  },

  methods: {
    redirectToCreate(){
      this.$router.push("/create/" + this.tablename);
    },

    async getValues() {
      this.loading = true;
      this.error = false; 
      this.errorMessage = '';
      try {
        const link = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/getTable?tablename=` + this.tablename;
        const response = await axios.get(link);
        if(response.data.length === 0) {
          this.empty = true;
          this.listdata = [];
          console.log('Received empty data from the server.');
        } else if (response.data) {
          this.listdata = response.data.map(item => {
            if (item.image) {
              const mimeType = item.image.charAt(0) === '/' ? 'image/jpeg' : 'image/png';
              item.imageSrc = `data:${mimeType};base64,${item.image}`;
            }
            item.playing = false;
            item.viewing = false;
            return item;
          });
        }

        switch (this.tablename) {
          case 'resource':
            this.listdata = this.replaceKey(this.listdata, 'id', 'ID');
            this.listdata = this.replaceKey(this.listdata, 'name', 'Name');
            this.listdata = this.replaceKey(this.listdata, 'description', 'Description');
            this.filterkeys = ['ID', 'Name', 'Description'];
            break;
          case 'timeslot':
            this.listdata = this.replaceKey(this.listdata, 'id', 'ID');
            this.listdata = this.replaceKey(this.listdata, 'name', 'Name');
            this.listdata = this.replaceKey(this.listdata, 'description', 'Description');
            this.listdata = this.replaceKey(this.listdata, 'type', 'Type');
            this.listdata = this.replaceKey(this.listdata, 'day', 'Day');
            this.listdata = this.replaceKey(this.listdata, 'time_from', 'Starting Time');
            this.listdata = this.replaceKey(this.listdata, 'time_to', 'Ending Time');
            this.listdata = this.replaceKey(this.listdata, 'soundeffect_id', 'Soundeffect ID');
            this.listdata = this.replaceKey(this.listdata, 'allowed_overlaps', 'Allowed Overlaps');
            this.filterkeys = ['ID', 'Name', 'Description', 'Type', 'Day', 'Starting Time', 'Ending Time', 'Soundeffect ID', 'Allowed Overlaps'];
            break;
          case 'timeslottype':
            this.listdata = this.replaceKey(this.listdata, 'id', 'ID');
            this.listdata = this.replaceKey(this.listdata, 'name', 'Name');
            this.listdata = this.replaceKey(this.listdata, 'description', 'Description');
            this.listdata = this.replaceKey(this.listdata, 'color', 'Color');
            this.filterkeys = ['ID', 'Name', 'Description', 'Color'];
            break;
          case 'team':
            this.listdata = this.replaceKey(this.listdata, 'id', 'ID');
            this.listdata = this.replaceKey(this.listdata, 'name', 'Name');
            this.listdata = this.replaceKey(this.listdata, 'country_code', 'Country Code');
            this.listdata = this.replaceKey(this.listdata, 'country_name', 'Country Name');
            this.filterkeys = ['ID', 'Name', 'Description', 'Country Code', 'Country Name'];
            break;
          case 'participant':
            this.listdata = this.replaceKey(this.listdata, 'id', 'ID');
            this.listdata = this.replaceKey(this.listdata, 'team_id', 'Team ID');
            this.listdata = this.replaceKey(this.listdata, 'first_name', 'First Name');
            this.listdata = this.replaceKey(this.listdata, 'last_name', 'Last Name');
            this.listdata = this.replaceKey(this.listdata, 'role', 'Role');
            this.filterkeys = ['ID', 'Team ID', 'First Name', 'Last Name', 'Role'];
            break;
          case 'groups':
            this.listdata = this.replaceKey(this.listdata, 'id', 'ID');
            this.listdata = this.replaceKey(this.listdata, 'name', 'Name');
            this.filterkeys = ['ID', 'Name'];
            break;
          case 'soundeffect':
            this.listdata = this.replaceKey(this.listdata, 'id', 'ID');
            this.listdata = this.replaceKey(this.listdata, 'name', 'Name');
            this.listdata = this.replaceKey(this.listdata, 'filename', 'Filename');
            this.filterkeys = ['ID', 'Name', 'Filename'];
            break;
          default:
            alert('Sorry, we are all out of ' + this.tablename + '.');
        }

      } catch (error) {
        console.error('An error occured while loading the data: ', error.response?.data || error.message);
        this.error = true;
        this.errorMessage = error.response?.data || error.message;
      } finally {
        this.loading = false;
      }
    },

    replaceKey(array, oldKey, newKey) {
      return array.map(item => {
        if (item.hasOwnProperty(oldKey)) {
          const { [oldKey]: value, ...rest } = item;
          return { ...rest, [newKey]: value };
        }
        return item;
      });
    },

    confirmDelete(item) {
      this.itemToDelete = item;
      this.showConfirmDialog = true;
    },
    async deleteItemConfirmed() {
      try {
        const id = this.itemToDelete.ID;

        await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/deleteRow`, {
          data: {
            tablename: this.tablename,
            id: id
          }
        });

        console.log('Item deleted:', this.itemToDelete);
        this.listdata = this.listdata.filter(i => i.ID !== id);
        this.showConfirmDialog = false;
      } catch (error) {
        console.error('Deletion of the element failed:', error.response?.data || error.message);
      }
    },
    updatePage(newPage) {
      this.page = newPage;
    },
    filteredKeys(item) {
      const excludedKeys = ['flag', 'image', 'file', 'imageSrc', 'playing', 'viewing'];
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
    },
    playSound(item) {
      this.listdata.forEach(i => {
        if (i.ID !== item.ID) {
          i.playing = false;
        }
      });

      item.playing = true;
      this.currentPlayingId = item.ID;
      this.$emit('play', item.ID);
    },
    pauseSound(item) {
      item.playing = false;
      this.currentPlayingId = null;
      this.$emit('pause', item.ID);
    },
    viewParticipant(item) {
      this.$emit('showParticipant', item.ID)
    },
    hideParticipant(item) {
      this.showImageDialog = false;
    },
    closeImageDialog() {
      this.$emit('hideParticipant');
    },
    filterList() {
      this.page = 1;
    },

    async duplicate(item){
      const id = item.ID;
      try{

        await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/duplicateRow`, {
            tablename: this.tablename,
          id: id
          }
        );
        //alert('Item duplicated: ' + id);
        this.getValues();
      } catch (error) {
        console.error('Duplication of the element failed:', error.response?.data || error.message);
      }
    },

  },
  mounted() {
    this.checkCurrentLink();
    this.loadingOption = localStorage.getItem('loadingOption');
  }
};
</script>

<style scoped>
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 10;
}
</style>