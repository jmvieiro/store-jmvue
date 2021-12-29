<template>
  <v-container
    style="border-top: 1px solid #00e0a5 !important; border-left: 1px solid #00e0a5 !important"
  >
    <v-row>
      <v-col cols="12" lg="3"><i>place for img</i></v-col>
      <v-col cols="12" lg="9">
        <v-row>
          <v-col>
            <h3 class="mb-2">{{ item.product.title }}</h3>
            <h4 class="mb-2">Precio: {{ item.product.price | money }}</h4>
            <h4 class="mb-2">Cantidad: {{ item.qty }}</h4>
          </v-col>
          <v-col>
            <v-btn
              outlined
              color="red"
              class="ml-2"
              @click="$store.dispatch('removeFromCart', item)"
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