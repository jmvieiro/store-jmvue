<template>
  <div>
    <div v-if="loading" class="text-center">
      <v-progress-circular
        size="60"
        indeterminate
        color="green"
      ></v-progress-circular>
    </div>
    <div v-else>
      <Products :productId="this.$route.params.id" :admin="false" />
      <BottomNavigationCart />
    </div>
  </div>
</template>

<script>
import Products from "../components/Products";
import BottomNavigationCart from "../components/BottomNavigationCart";
import { mapGetters } from "vuex";

export default {
  name: "Store",
  components: {
    Products,
    BottomNavigationCart,
  },
  data() {
    return {
      product: {},
      totalIte: this.totalItems,
    };
  },
  computed: {
    ...mapGetters("products", ["loading"]),
  },
};
</script>
