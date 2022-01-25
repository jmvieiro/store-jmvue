<template>
  <v-container style="padding-bottom: 150px">
    <v-row>
      <v-col
        cols="12"
        lg="3"
        md="4"
        xs="12"
        v-for="(product, i) in products"
        :key="i"
      >
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductCard from "../components/ProductCard";
import { mapGetters } from "vuex";

export default {
  name: "Products",
  components: {
    ProductCard,
  },
  computed: {
    ...mapGetters("products", ["products"]),
  },
};
</script>