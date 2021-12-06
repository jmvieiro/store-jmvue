<template>
  <v-dialog
    v-model="open"
    max-width="500"
    @click:outside="$emit('closeDialog', false)"
  >
    <v-card class="mx-auto my-3">
      <v-card-title>{{ product.title | capitalize }}</v-card-title>
      <v-divider class="mx-4"></v-divider>

      <v-card-text>
        <h3>{{ product.description }}</h3>
        <h4>Precio: {{ product.price | money }}</h4>
      </v-card-text>

      <v-divider class="mx-4 my-4"></v-divider>

      <v-card-actions class="mx-2">
        <v-btn dark color="success lighten-1 mb-2" @click="addToCart()">
          Agregar
          <v-icon class="ml-2">mdi-cart-plus</v-icon>
        </v-btn>
        <v-btn
          dark
          color="red lighten-1 mb-2"
          @click="$emit('closeDialog', false)"
        >
          Cerrar
          <v-icon class="ml-2">mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CardProduct",
  props: {
    product: {
      type: Object,
      default: () => {},
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    addToCart() {
      this.$emit("addToCart", { product: this.$props.product, qty: 1 });
    },
  },
};
</script>