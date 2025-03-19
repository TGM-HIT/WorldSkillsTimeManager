<template>
  <div v-if="showPlay" style="align-items: center; text-align: center; margin-top: 2%;">
    <ReturnedSound_Component :id="playId"/>
  </div>

  <div v-if="showList">
    <List @edit="editRow" @play="playSound" @pause="pauseSound"/>
  </div>

  <div v-if="showEdit">
    <Soundeffect_Component :initialEditing="true" :editId="id" @returnToList="returner"/>
  </div>
</template>

<script>
import List from '@/components/List_Component.vue';
import Soundeffect_Component from '@/components/Soundeffect_Component.vue';
import ReturnedSound_Component from '@/components/ReturnedSound_Component';

export default {
  name: "EditSoundeffectPage",
  components: {
    List,
    Soundeffect_Component,
    ReturnedSound_Component,
  },
  data() {
    return {
      showList: true,
      showEdit: false,
      id: null,
      showPlay: false,
      playId: null
    };
  },
  methods: {
    editRow(id) {
      this.showList = false;
      this.showEdit = true;
      this.id = id;
    },

    returner(){
      this.showList = true;
      this.showEdit = false;
    },

    playSound(id){
      this.showPlay = true;
      this.playId = id;
    },

    pauseSound(){
      this.showPlay = false;
      this.playId = null;
    }
  }
};
</script>