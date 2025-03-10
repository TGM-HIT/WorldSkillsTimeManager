<template>
  <div v-if="showList">
    <List @edit="editRow"/>
  </div>
  <div v-if="showEdit">
    <Team_Component :initialEditing="true" :editId="this.id"/>
  </div>
</template>

<script>
import List from '@/components/List_Component.vue';
import Team_Component from '@/components/Team_Component.vue';

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
    }
  }
};
</script>