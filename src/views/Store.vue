<template>
  <v-container>
    <div v-if="loading" class="text-center">
      <v-progress-circular
        size="60"
        indeterminate
        color="blue"
      ></v-progress-circular>
    </div>
    <div v-else>
      <h2 v-if="!$route.params.id" class="mb-0 mb-lg-8">Productos</h2>
      <h2 v-else class="mb-0 mb-lg-8">Detalle producto</h2>
      <v-row>
        <v-col cols="12">
          <Products v-if="!$route.params.id" :admin="false" />
          <ProductDetail v-else :product="product" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import Products from "../components/Products";
import ProductDetail from "../components/ProductDetail";
import { mapGetters } from "vuex";

export default {
  name: "Store",
  components: {
    Products,
    ProductDetail,
  },
  data() {
    return {
      product: {},
    };
  },
  computed: {
    ...mapGetters(["loading"]),
  },
  updated() {
    if (this.$route.params.id)
      this.product = this.$store.getters.products.find(
        (p) => p.id === this.$route.params.id
      );
  },
};
</script>
