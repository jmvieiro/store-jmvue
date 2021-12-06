<template>
  <v-app>
    <v-main>
      <Navbar @showItem="showItem($event)" />
      <v-container v-if="this.show === 1" class="mt-4">
        <Header
          :title="'Registro & Login'"
          :toTitle="'Ir al Store'"
          :icon="'mdi-store'"
          :item="2"
          @showItem="showItem($event)"
        />
        <v-row>
          <v-col xs="12">
            <FormAccount />
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="this.show === 2" class="mt-4">
        <Header
          :title="'Store'"
          :toTitle="'Ir al Registro & Login'"
          :icon="'mdi-account'"
          :item="1"
          @showItem="showItem($event)"
        />
        <v-row>
          <v-col cols="12" xs="12" lg="8">
            <Products :products="products" @addToCart="addToCart($event)" />
          </v-col>
          <v-col xs="12" lg="4">
            <Cart :cart="cart" @removeFromCart="removeFromCart($event)" />
          </v-col>
        </v-row>
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
import products from "./assets/data/products.json";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import FormAccount from "./components/FormAccount";
import Products from "./components/Products";
import Cart from "./components/Cart";

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
    Header,
    FormAccount,
    Products,
    Cart,
  },
  data: () => ({
    products: products,
    cart: [],
    show: 1,
    dialog: false,
    textAlert: "",
  }),
  methods: {
    showItem(item) {
      this.show = item;
    },
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
  },
  watch: {
    cart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
  },
  mounted() {
    const itemsLocalStorage = localStorage.getItem("cart");
    if (itemsLocalStorage) this.cart = JSON.parse(itemsLocalStorage);
  },
};
</script>
