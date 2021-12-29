<template>
  <v-app>
    <v-main class="blue-grey darken-4">
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
import Firebase from "firebase";

let config = {
  apiKey: "AIzaSyDstNqfY0ONuhZTux27lTPwdSt0lOGCdNo",
  authDomain: "store-jmv.firebaseapp.com",
  projectId: "store-jmv",
  storageBucket: "store-jmv.appspot.com",
  messagingSenderId: "907971436997",
  appId: "1:907971436997:web:53c5fa1409e0b61277ebac",
};
let app = Firebase.initializeApp(config);
let db = app.database();
let products = db.ref("products");

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
* {
  color: white !important;
}
</style>
