<template>
  <v-container>
    <v-row v-if="!product">a</v-row>
    <v-row v-else style="border: 1px solid #00e0a5" class="rounded pa-4" >
      <v-col cols="12" lg="3"> img</v-col>
      <v-col cols="12" lg="9">
        <h1>{{ product.title }}</h1>
        <p>{{ product.description }}</p>
        <p>Precio: {{ product.price | money }}</p>
        <v-btn
          dark
          color="success"
          @click="$store.dispatch('addToCart', { product: product, qty: 1 })"
        >
          <v-icon dark>mdi-cart-plus</v-icon> Agregar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ProductDetail",
  components: {},
  data() {
    return {};
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  methods: {},
};
</script>