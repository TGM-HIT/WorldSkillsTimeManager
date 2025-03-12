<template>
    <div>
      <div>
        Filter Resource Page {{ filterIDs.join(', ') }}
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
  