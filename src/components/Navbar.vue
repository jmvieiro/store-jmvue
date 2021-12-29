<template>
  <v-app-bar app color="teal darken-1 accent-4 px-16" dense dark>
    <v-toolbar-title>
      <router-link to="/" style="color: rgb(204 219 235) !important"
        >Store jmVUE</router-link
      >
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <router-link to="/login" style="color: white !important">
      <v-chip style="cursor: pointer" color="green"> Login </v-chip>
    </router-link>
    <router-link to="/cart" class="ml-8" style="color: white !important">
      <v-icon size="30">mdi-cart</v-icon>({{ totalItems }})
    </router-link>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["totalItems"]),
  },
};
</script>