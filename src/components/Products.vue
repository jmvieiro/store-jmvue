<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="4" md="6" xs="12" class="pa-4 pb-4" v-for="(product, i) in products" :key="i">
        <CardProduct :product="product" :admin="admin" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardProduct from "../components/CardProduct";
import { mapGetters } from "vuex";

export default {
  name: "Products",
  components: {
    CardProduct,
  },
  props: {
    admin: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(["products"]),
  },
};
</script>