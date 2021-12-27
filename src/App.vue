<template>
  <v-app>
    <v-main>
      <Navbar />
      <v-container class="mt-4">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";
import Navbar from "./components/Navbar";

Vue.filter("capitalize", (value) => {
  if (!value) return "";
  return value.toUpperCase();
});
Vue.filter("money", (value) => {
  if (!value) return 0;
  return `$${value.toFixed(2)}`;
});

export default {
  name: "App",
  components: {
    Navbar,
  },
  mounted() {
    this.$store.dispatch("getProducts");
  },
};
</script>

<style lang="scss">
a {
  font-weight: bold;
  color: #a9b9c9;
  text-decoration: none;
}
</style>
