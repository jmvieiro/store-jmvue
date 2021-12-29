<template>
  <v-container>
    <h2 class="mb-0 mb-lg-8">Carrito de compras</h2>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Cart",

  computed: {
    ...mapGetters(["cart"]),
  },
};
</script>
