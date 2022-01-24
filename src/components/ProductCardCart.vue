<template>
  <v-container class="border-main">
    <v-row>
      <v-col cols="12" lg="2">
        <img :src="item.product.img" style="width: 100%" />
      </v-col>
      <v-col cols="12" lg="8">
        <v-row>
          <v-col>
            <h3 class="mb-2 text-yellow text-uppercase">
              {{ item.product.title }}
            </h3>
            <h4 class="mb-2 text-yellow">
              Precio: {{ item.product.price | money }}
            </h4>
            <h4 class="mb-2 text-yellow">Cantidad: {{ item.qty }}</h4>
          </v-col>
          <v-col>
            <v-btn
              outlined
              color="red"
              class="ml-2"
              @click="$store.dispatch('cart/removeFromCart', item)"
            >
              <v-icon color="red" dark>mdi-delete</v-icon>
            </v-btn></v-col
          >
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ProductCardCart",
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>