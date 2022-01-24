<template>
  <router-link to="/cart">
    <v-bottom-navigation
      fixed
      dark
      :input-value="totalItems > 0"
      style="height: 80px !important; z-index: 9999 !important"
    >
      <v-btn block style="font-size: 16px !important">
        <span class="text-yellow" v-if="totalItems > 0">
          {{ totalItems }} productos por {{ total | money }}
        </span>
        <span v-else class="text-yellow"> Está vacío </span>
        <span class="text-yellow"> Carrito de compras </span>
        <v-icon class="text-yellow">mdi-cart </v-icon>
      </v-btn>
    </v-bottom-navigation>
  </router-link>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "BottomNavigationCart",
  computed: {
    ...mapGetters("cart", ["totalItems"]),
    ...mapGetters("cart", ["total"]),
  },
};
</script>