<template>
  <div>
    <h2 class="mb-0 mb-lg-8">Store</h2>
    <v-divider class="mt-0 mb-12"></v-divider>
    <v-row>
      <v-col cols="12" xs="12" lg="8">
        <div v-if="loading" class="text-center">
          <v-progress-circular
            size="60"
            indeterminate
            color="blue"
          ></v-progress-circular>
        </div>
        <Products v-else :admin="false" />
      </v-col>
      <v-col xs="12" lg="4">
        <Cart />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Products from "../components/Products";
import Cart from "../components/Cart";
import { mapGetters } from "vuex";

export default {
  name: "Store",
  components: {
    Products,
    Cart,
  },
  computed: {
    ...mapGetters(["loading"]),
  },
};
</script>
