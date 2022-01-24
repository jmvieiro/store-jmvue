<template>
  <div v-if="productId">
    <ProductDetail :product="products.find((p) => p.id === productId)" />
  </div>
  <div v-else>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          lg="4"
          md="6"
          xs="12"
          class="pa-4 pb-4"
          v-for="(product, i) in products"
          :key="i"
        >
          <ProductCard :product="product" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ProductCard from "../components/ProductCard";
import ProductDetail from "../components/ProductDetail";
import { mapGetters } from "vuex";

export default {
  name: "Products",
  components: {
    ProductCard,
    ProductDetail,
  },
  props: {
    productId: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapGetters("products", ["products"]),
  },
};
</script>