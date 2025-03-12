<template>
    <div>
      <div>
        Filter Team Page {{ filterIDs.join(', ') }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      filterIDs: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  