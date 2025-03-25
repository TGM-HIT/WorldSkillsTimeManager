<template>
  <div v-if="showList">
    <List @edit="editRow" @showParticipant="viewParticipant" @hideParticipant="hideParticipant"/>
  </div>
  <div v-if="showEdit">
    <Team_Component :initialEditing="true" :editId="this.id" @returnToList="returner"/>
  </div>

  <v-dialog v-model="showImageDialog" max-width="500px" style="align-items: center; text-align: center;">
      <v-card>
        <v-card-title>View Image</v-card-title>
        <v-card-text>
          <Picture_Component :id="this.pictureId"/>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeImageDialog" color="primary">close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import List from '@/components/List_Component.vue';
import Team_Component from '@/components/Team_Component.vue';
import Picture_Component from '@/components/Picture_Component';

export default {
  name: "EditTeamPage",
  components: {
    List,
    Team_Component,
    Picture_Component,
  },
  data() {
    return {
      showList: true,
      showEdit: false,
      id: null,
      showImageDialog: false,
      pictureId: null
    };
  },
  methods: {
    editRow(id) {
      this.showList = false;
      this.showEdit = true;
      this.id = id;
    },

    viewParticipant(id) {
      this.showImageDialog = true;
      this.pictureId = id;
    },
    hideParticipant() {
      this.showImageDialog = false;
    },
    closeImageDialog() {
      this.showImageDialog = false;
    },
    returner(){
      this.showList = true;
      this.showEdit = false;
    }
  }
};
</script>