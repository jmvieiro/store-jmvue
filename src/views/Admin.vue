<template>
  <div>
    <h2 class="mb-0 mb-lg-8">Panel de administración</h2>
    <v-divider class="mt-0 mb-12"></v-divider>
    <v-row>
      <v-col xs="12" lg="4">
        <v-card class="sidebar pa-4">
          <h3>Agregar producto</h3>
          <v-text-field
            v-model="newProduct.title"
            label="Título"
          ></v-text-field>
          <v-text-field
            v-model="newProduct.description"
            label="Descripción"
          ></v-text-field>
          <v-text-field
            v-model.number="newProduct.price"
            label="Precio"
          ></v-text-field>
          <v-btn block @click="addProduct()">Confirmar</v-btn>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" lg="8">
        <Products
          :products="products"
          :admin="true"
          @deleteFromStock="deleteFromStock($event)"
          @addToCart="$emit('addToCart', $event)"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import Products from "../components/Products";

export default {
  name: "Account",
  data() {
    return {
      newProduct: {
        title: "",
        description: "",
        price: 0,
      },
    };
  },
  components: {
    Products,
  },
  props: {
    products: {
      type: [],
      default: () => [],
    },
  },
  methods: {
    addProduct() {
      axios
        .post(
          "https://61ba1ffb48df2f0017e5a919.mockapi.io/api/v1/products",
          this.newProduct
        )
        .then(() => {
          this.$emit("getProducts");
        })
        .catch((res) => {
          console.log(`Ha ocurrido un error al crear el producto: ${res}`);
        });
    },
    deleteFromStock(id) {
      axios
        .delete(
          `https://61ba1ffb48df2f0017e5a919.mockapi.io/api/v1/products/${id}`
        )
        .then(() => {
          this.$emit("getProducts");
        })
        .catch((res) => {
          console.log(`Ha ocurrido un error al eliminar el producto: ${res}`);
        });
    },
  },
};
</script>
