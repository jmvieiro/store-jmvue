<template>
  <v-container>
    <BackToStore />
    <div v-if="product">
      <v-card color="black" max-width="1300" class="mx-auto mt-4">
        <v-container>
          <v-row>
            <v-col cols="12" lg="6" md="6">
              <v-img :src="product.img" style="width: 100%"></v-img>
            </v-col>
            <v-col cols="12" lg="6" md="6">
              <v-card-title class="text-h4 mb-4 mt-8">
                {{ product.title }}
              </v-card-title>
              <v-card-subtitle class="text-h5">
                {{ product.description }}
              </v-card-subtitle>
              <v-card-subtitle class="text-h5">
                {{ product.price | money }}
              </v-card-subtitle>
              <v-card-actions>
                <v-btn
                  class="ml-2 mt-2 border-yellow text-yellow"
                  dark
                  @click="
                    $store.dispatch('cart/addToCart', {
                      product: product,
                      qty: 1,
                    })
                  "
                >
                  Agregar al carrito
                  <v-icon class="ml-1">mdi-cart-plus</v-icon>
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
    <div v-else class="mt-16 mx-auto text-center" style="max-width: 800px">
      <v-alert dense prominent color="yellow lighten-3">
        <h2>¡Lo sentimos!</h2>
        <h3>Producto no encontrado</h3>
      </v-alert>
    </div>
  </v-container>
</template>

<script>
import BackToStore from "../components/BackToStore";

export default {
  name: "ProductDetail",
  components: {
    BackToStore,
  },
  props: {
    product: {
      type: Object,
      default: null,
    },
  },
};
</script>