<template>

</template>

<script>
export default {
  name: "Logoutpage",
  methods: {
  logout() {
    localStorage.removeItem("auth");
    this.$router.push("/login");
  }
}

};

</script>
