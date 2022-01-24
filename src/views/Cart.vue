<template>
  <v-container>
    <BackToStore />
    <h2 class="mb-8 mb-lg-8 text-yellow text-uppercase">Carrito de compras</h2>
    <div
      v-if="cart.length === 0"
      class="mt-16 mx-auto text-center"
      style="max-width: 800px"
    >
      <v-alert dense prominent color="yellow lighten-3">
        <h2>¡No tenés productos en el carrito!</h2>
      </v-alert>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="12" lg="8">
          <div class="px-8" v-for="(item, i) in cart" :key="i">
            <ProductCardCart :item="item" />
          </div>
          <div class="px-8 text-right mt-6">
            <v-btn outlined color="red" @click="$store.dispatch('cart/clearCart')">
              Vaciar carrito
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" lg="4">
          <Checkout />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import ProductCardCart from "../components/ProductCardCart";
import Checkout from "../components/Checkout";
import BackToStore from "../components/BackToStore";
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    ProductCardCart,
    Checkout,
    BackToStore,
  },
  computed: {
    ...mapGetters("cart", ["cart"]),
  },
};
</script>
