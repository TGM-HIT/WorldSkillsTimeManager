<template>
  <div v-if="showList">
    <List @edit="editRow" @showParticipant="viewParticipant" @hideParticipant="hideParticipant"/>
  </div>
  <div v-if="showEdit">
    <Participant_Component :initialEditing="true" :editId="this.id" @returnToList="returner" @showParticipant="viewParticipant"/>
  </div>
  
  <v-dialog v-model="showImageDialog" max-width="500px" style="align-items: center; text-align: center;">
      <v-card>
        <v-card-title>View Image</v-card-title>
        <v-card-text>
          <ParticipantImage_Component :id="this.pictureId"/>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeImageDialog" color="primary">close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import List from '@/components/List_Component.vue';
import Participant_Component from '@/components/Participant_Component.vue';
import ParticipantImage_Component from '@/components/ParticipantImage_Component';

export default {
  name: "EditParitcipantPage",
  components: {
    List,
    Participant_Component,
    ParticipantImage_Component
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

<style scoped>
.picture {
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}
</style>
