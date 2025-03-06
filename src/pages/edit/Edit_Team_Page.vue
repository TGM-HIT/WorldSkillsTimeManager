<template>
    <div>
      <List @edit="editRow"/>
    </div>
  </template>
  
  <script>
  import List from '@/components/List_Component.vue';
  
  export default {
    name: "Edit Team Page",
    components: {
      List,
    },
    methods: {
      editRow(id){
        alert(id)
      }
    }
  };
  </script>