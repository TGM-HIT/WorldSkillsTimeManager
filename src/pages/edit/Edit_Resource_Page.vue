<template>
  <div v-if="showList">
    <List @edit="editRow"/>
  </div>
  <div v-if="showEdit">
    <Resource_Component :initialEditing="true" :editId="this.id" @returnToList="returner"/>
  </div>
</template>

<script>
import List from '@/components/List_Component.vue';
import Resource_Component from '@/components/Resource_Component.vue';

export default {
  name: "EditTeamPage",
  components: {
    List,
    Team_Component
  },
  data() {
    return {
      showList: true,
      showEdit: false,
      id: null
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
    }
  }
};
</script>