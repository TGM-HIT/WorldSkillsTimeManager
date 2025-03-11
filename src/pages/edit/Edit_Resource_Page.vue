<template>
  <div v-if="showList">
    <List @edit="editRow"/>
  </div>
</template>
<script>
import List from '@/components/List_Component.vue';

export default {
  name: "Edit Resource Page",
  components: {
    List,
  },data() {
    return {
      showList: true,
      showEdit: false
    };
  },
  methods: {
    editRow(id) {
      alert(id);
      this.showList = false;
      this.showEdit = true;
    }
  }
};
</script>