<template>
  <div class="py-4">
    <h3>Listado de productos</h3>
    <v-row v-if="products.length === 0">
      <v-col>
        <div class="mx-auto my-3 text-center d-block">
          <v-alert color="primary lighten-2" dark
            >¡No hay productos en el store!</v-alert
          >
        </div>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-data-table
        :headers="headers"
        :items="products"
        style="margin: 0 auto; width: 98%; max-width: 98%"
        class="elevation-2 mt-6"
      >
        <template v-slot:item.price="{ item }">
          {{ item.price | money }}
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn fab dark x-small color="primary" @click="viewDetail(item)">
            <v-icon dark>mdi-eye</v-icon>
          </v-btn>
          <v-btn
            v-if="admin"
            fab
            dark
            x-small
            color="red"
            class="ml-2"
            @click="deleteFromStock(item)"
          >
            <v-icon dark>mdi-delete</v-icon>
          </v-btn>
          <v-btn
            v-else
            fab
            dark
            x-small
            color="success"
            class="ml-2"
            @click="addToCart(item)"
          >
            <v-icon dark>mdi-cart-plus</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-row>
    <CardProduct
      :open="dialog"
      :product="selectedProduct"
      :admin="admin"
      @addToCart="addToCartFromDialog($event)"
      @closeDialog="closeDialog($event)"
    />
  </div>
</template>

<script>
import CardProduct from "../components/CardProduct";

export default {
  name: "Products",
  components: {
    CardProduct,
  },
  props: {
    products: {
      type: [],
      default: () => {},
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  data: () => {
    return {
      headers: [
        { text: "ID", align: "start", value: "id" },
        { text: "Título", value: "title" },
        { text: "Descripción", value: "description" },
        { text: "Precio", value: "price" },
        { text: "Acciones", value: "action" },
      ],
      dialog: false,
      selectedProduct: {},
    };
  },
  methods: {
    deleteFromStock(item) {
      this.$emit("deleteFromStock", item.id);
    },
    addToCart(item) {
      this.$emit("addToCart", { product: item, qty: 1 });
    },
    addToCartFromDialog(item) {
      this.$emit("addToCart", { product: item.product, qty: item.qty });
    },
    closeDialog(state) {
      this.dialog = state;
    },
    viewDetail(product) {
      this.selectedProduct = product;
      this.dialog = true;
    },
  },
};
</script>