<template>
  <div>
    <h2 class="mb-0 mb-lg-8">Store</h2>
    <v-divider class="mt-0 mb-12"></v-divider>
    <v-row>
      <v-col cols="12" xs="12" lg="8">
        <Products
          :products="products"
          :admin="false"
          @addToCart="$emit('addToCart', $event)"
          @deleteFromStock="deleteFromStock($event)"
        />
      </v-col>
      <v-col xs="12" lg="4">
        <Cart :cart="cart" @removeFromCart="$emit('removeFromCart', $event)" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Products from "../components/Products";
import Cart from "../components/Cart";

export default {
  name: "Store",
  components: {
    Products,
    Cart,
  },
  props: {
    products: {
      type: [],
      default: () => [],
    },
    cart: {
      type: [],
      default: () => [],
    },
  },
};
</script>
