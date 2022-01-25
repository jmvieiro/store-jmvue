<template>
  <v-card class="mx-auto black align-center justify-center" max-width="350">
    <router-link :to="{ path: '/store/' + product.id }">
      <img :src="product.img" style="width: 100%" />
    </router-link>
    <v-card-title class="justify-center pb-0 pt-0">
      {{ product.title }}
    </v-card-title>
    <v-card-title class="justify-center">
      {{ product.price | money }}
    </v-card-title>
    <v-card-actions class="justify-center">
      <v-btn
        dark
        outlined
        class="ml-2 text-yellow"
        @click="
          () => {
            $store.dispatch('cart/addToCart', {
              product: product,
              qty: 1,
            });
            this.$toast.top('¡Producto agregado al carrito!');
          }
        "
      >
        <v-icon dark>mdi-cart-plus</v-icon> Agregar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    viewDetail(id) {
      this.$router.push({ path: `/store/${id}` }).catch(() => {});
    },
  },
};
</script>