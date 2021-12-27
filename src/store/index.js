import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    loading: false,
    user: {},
  },
  mutations: {
    ADD_PRODUCT(state, payload) {
      state.products = [...state.products, payload];
    },
    DELETE_FROM_STOCK(state, payload) {
      console.log(payload);
      let aux = state.products.filter(function (obj) {
        return obj.id !== payload.id;
      });
      state.products = aux;
    },
    EDIT_PRODUCT(state, payload) {
      let p = state.products.find((p) => p.id === payload.id);
      p.title = payload.title;
      p.description = payload.description;
      p.price = payload.price;
    },
    ADD_TO_CART(state, payload) {
      let inCart = state.cart.find((p) => p.product.id === payload.product.id);
      if (inCart) inCart.qty++;
      else {
        state.cart = [
          ...state.cart,
          {
            product: payload.product,
            qty: payload.qty,
          },
        ];
      }
    },
    REMOVE_FROM_CART(state, payload) {
      let aux = state.cart.filter(function (obj) {
        return obj.product.id !== payload;
      });
      state.cart = aux;
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
    GET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    LOADING(state, payload) {
      state.loading = payload;
    },
    REGISTER(state, payload) {
      state.user = payload;
    },
    LOGIN(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    addProduct(context, payload) {
      axios
        .post(
          "https://61ba1ffb48df2f0017e5a919.mockapi.io/api/v1/products",
          payload
        )
        .then((res) => {
          context.commit("ADD_PRODUCT", res.data);
        })
        .catch((res) => {
          console.log(`Ha ocurrido un error al agregar el producto ${res}`);
        });
    },
    deleteFromStock(context, payload) {
      axios
        .delete(
          `https://61ba1ffb48df2f0017e5a919.mockapi.io/api/v1/products/${payload}`
        )
        .then((res) => {
          context.commit("DELETE_FROM_STOCK", res.data);
        })
        .catch((res) => {
          console.log(`Ha ocurrido un error al agregar el producto ${res}`);
        });
    },
    editProduct(context, payload) {
      axios
        .put(
          `https://61ba1ffb48df2f0017e5a919.mockapi.io/api/v1/products/${payload.id}`,
          {
            title: payload.title,
            description: payload.description,
            price: payload.price,
          }
        )
        .then((res) => {
          context.commit("EDIT_PRODUCT", res.data);
        })
        .catch((res) => {
          console.log(`Ha ocurrido un error al agregar el producto ${res}`);
        });
    },
    addToCart(context, payload) {
      context.commit("ADD_TO_CART", payload);
    },
    removeFromCart(context, payload) {
      context.commit("REMOVE_FROM_CART", payload);
    },
    clearCart(context) {
      context.commit("CLEAR_CART");
    },
    getProducts(context) {
      context.commit("LOADING", true);
      axios
        .get("https://61ba1ffb48df2f0017e5a919.mockapi.io/api/v1/products")
        .then((res) => {
          context.commit("GET_PRODUCTS", res.data);
          context.commit("LOADING", false);
        })
        .catch((res) => {
          console.log(`Ha ocurrido un error al obtener los productos ${res}`);
        });
    },
    register(context, payload) {
      axios
        .post(
          "https://61ba1ffb48df2f0017e5a919.mockapi.io/api/v1/users",
          payload
        )
        .then((res) => {
          context.commit("REGISTER", res.data);
        })
        .catch((res) => {
          console.log(`Ha ocurrido un error al registrar al usuario ${res}`);
        });
    },
    login(context, payload) {
      axios
        .get(
          `https://61ba1ffb48df2f0017e5a919.mockapi.io/api/v1/users?email=${payload.email}&password=${payload.password}`
        )
        .then((res) => {
          if (
            res.data.length === 1 &&
            res.data[0].password === payload.password
          ) {
            context.commit("LOGIN", res.data);
          } else console.log("Usuario o contraseña incorrecta.");
        })
        .catch((res) => {
          console.log(`Ha ocurrido un error al loguar al usuario: ${res}`);
        });
    },
  },
  getters: {
    total: (state) =>
      state.cart.reduce((acc, el) => (acc += el.product.price * el.qty), 0),
    totalItems: (state) => state.cart.reduce((acc, el) => (acc += el.qty), 0),
    cart: (state) => state.cart,
    products: (state) => state.products,
    loading: (state) => state.loading,
    user: (state) => state.user,
  },
});
