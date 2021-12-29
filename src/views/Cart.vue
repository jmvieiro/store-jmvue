<template>
  <v-container>
    <h2 class="mb-8 mb-lg-8">Carrito de compras</h2>
    <div v-if="cart.length === 0">
      <v-row>
        <v-col cols="12" lg="6">
          <v-alert dense prominent color="red lighten-2">
            ¡No tenés productos en el carrito!</v-alert
          >
        </v-col>
        <v-col cols="12" lg="6">
          <router-link to="/store" style="color: white !important">
            <v-btn outlined>
              <v-icon size="30">mdi-currency-usd</v-icon> Ir a comprar
            </v-btn>
          </router-link>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="12" lg="8">
          <div
            class="grey darken-4 border-main pa-5"
            style="border: 1px solid #00e0a5 !important"
          >
            <div class="pa-4" v-for="(item, i) in cart" :key="i">
              <ProductCardCart :item="item" />
            </div>
            <div class="text-right mt-4">
              <v-btn color="red" @click="$store.dispatch('clearCart')">
                Vaciar carrito
              </v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="12" lg="4">
          <div
            class="grey darken-4 border-main pa-5"
            style="border: 1px solid #00e0a5 !important"
          >
            <h2>Ítems: {{ totalItems }}</h2>
            <h3>Total: {{ total | money }}</h3>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import ProductCardCart from "../components/ProductCardCart";
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    ProductCardCart,
  },
  computed: {
    ...mapGetters(["cart", "totalItems", "total"]),
  },
};
</script>
