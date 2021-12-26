<template>
  <v-app>
    <v-main>
      <Navbar />
      <h1>Dev</h1>
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
    email: "vale@gmail.com",
  }),
  methods: {
    addToCart(data) {
      axios
        .get(
          `https://61ba1ffb48df2f0017e5a919.mockapi.io/api/v1/users?email=${this.email}`
        )
        .then((user) => {
          if (user.data.length > 0) {
            let cart = user.data[0].cart;
            let userId = user.data[0].id;
            let inCart = cart.find((p) => p.productId === data.product.id);
            if (!inCart) {
              axios
                .post(
                  `https://61ba1ffb48df2f0017e5a919.mockapi.io/api/v1/users/${userId}/cart`,
                  {
                    productId: data.product.id,
                    title: data.product.title,
                    price: data.product.price,
                    qty: data.qty,
                  }
                )
                .then(() => {
                  this.getCart(this.email);
                })
                .catch((res) => {
                  console.log(
                    `Ha ocurrido un error al agregar el producto al carrito: ${res}`
                  );
                });
            } else {
              axios
                .put(
                  `https://61ba1ffb48df2f0017e5a919.mockapi.io/api/v1/users/${userId}/cart/${inCart.id}`,
                  {
                    qty: inCart.qty + 1,
                  }
                )
                .then(() => {
                  this.getCart(this.email);
                })
                .catch((res) => {
                  console.log(
                    `Ha ocurrido un error al actualizar el producto en el carrito: ${res}`
                  );
                });
            }
            this.textAlert = "¡Producto agregado al carrito!";
            this.dialog = true;
            setTimeout(() => {
              this.dialog = false;
            }, 2000);
          }
        })
        .catch((res) => {
          console.log(
            `Ha ocurrido un error al agregar el producto al carrito: ${res}`
          );
        });
    },
    removeFromCart(id) {
      axios
        .get(
          `https://61ba1ffb48df2f0017e5a919.mockapi.io/api/v1/users?email=${this.email}`
        )
        .then((user) => {
          if (user.data.length > 0) {
            let cart = user.data[0].cart;
            let userId = user.data[0].id;
            let inCart = cart.find((p) => p.productId === id);
            if (inCart) {
              axios
                .delete(
                  `https://61ba1ffb48df2f0017e5a919.mockapi.io/api/v1/users/${userId}/cart/${inCart.id}`
                )
                .then(() => {
                  this.getCart(this.email);
                })
                .catch((res) => {
                  console.log(
                    `Ha ocurrido un error al eliminar el producto del carrito: ${res}`
                  );
                });
            }
            this.textAlert = "¡Producto eliminado del carrito!";
            this.dialog = true;
            setTimeout(() => {
              this.dialog = false;
            }, 2000);
          }
        })
        .catch((res) => {
          console.log(
            `Ha ocurrido un error al agregar el producto al carrito: ${res}`
          );
        });

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
    getCart(email) {
      axios
        .get(
          `https://61ba1ffb48df2f0017e5a919.mockapi.io/api/v1/users?email=${email}`
        )
        .then((user) => {
          if (user.data.length > 0) this.cart = user.data[0].cart;
        })
        .catch((res) => {
          console.log(`Ha ocurrido un error al obtener el carrito: ${res}`);
        });
    },
  },
  mounted() {
    this.getProducts();
    this.getCart(this.email);
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
