<template>
    <div>
      <div>
        Filter Group Page {{ filterIDs.join(', ') }}
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
  