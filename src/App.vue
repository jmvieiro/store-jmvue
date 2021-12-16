<template>
  <v-app>
    <v-main>
      <Navbar @showItem="showItem($event)" />
      <v-container class="mt-4">
        <router-view
          :products="products"
          :cart="cart"
          @addToCart="addToCart($event)"
          @removeFromCart="removeFromCart($event)"
          @getProducts="getProducts($event)"
        />
        <v-dialog v-model="dialog" max-width="500">
          <v-card class="success" dark>
            <v-card-title class="text-h6">{{ textAlert }}</v-card-title>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Navbar from "./components/Navbar";

Vue.filter("capitalize", (value) => {
  if (!value) return "";
  return value.toUpperCase();
});
Vue.filter("money", (value) => {
  if (!value) return 0;
  return `$${value.toFixed(2)}`;
});

export default {
  name: "App",
  components: {
    Navbar,
  },
  data: () => ({
    products: [],
    cart: [],
    dialog: false,
    textAlert: "",
  }),
  methods: {
    addToCart(data) {
      let inCart = this.cart.find((p) => p.product.id === data.product.id);
      if (inCart) {
        let aux = [...this.cart];
        for (var i in aux) {
          aux[i].qty =
            aux[i].product.id === data.product.id ? aux[i].qty + 1 : aux[i].qty;
        }
        this.cart = aux;
      } else {
        this.cart = [
          ...this.cart,
          {
            product: data.product,
            qty: data.qty,
          },
        ];
      }
      this.textAlert = "¡Producto agregado al carrito!";
      this.dialog = true;
      setTimeout(() => {
        this.dialog = false;
      }, 2000);
    },
    removeFromCart(id) {
      let aux = this.cart.filter(function (obj) {
        return obj.product.id !== id;
      });
      this.cart = aux;
      this.textAlert = "¡Producto eliminado del carrito!";
      this.dialog = true;
      setTimeout(() => {
        this.dialog = false;
      }, 2000);
    },
    getProducts() {
      axios
        .get("https://61ba1ffb48df2f0017e5a919.mockapi.io/api/v1/products")
        .then((res) => {
          this.products = res.data;
        })
        .catch((res) => {
          console.log(`Ha ocurrido un error al obtener los productos ${res}`);
        });
    },
  },
  watch: {
    cart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
  },
  mounted() {
    const itemsLocalStorage = localStorage.getItem("cart");
    if (itemsLocalStorage) this.cart = JSON.parse(itemsLocalStorage);
    this.getProducts();
  },
};
</script>

<style lang="scss">
a {
  font-weight: bold;
  color: #a9b9c9;
  text-decoration: none;
}
</style>
