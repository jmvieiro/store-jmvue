import axios from "axios";

export const namespaced = true;

export const state = {
  products: [],
  loading: false,
};

export const mutations = {
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
  GET_PRODUCTS(state, payload) {
    state.products = payload;
  },
  LOADING(state, payload) {
    state.loading = payload;
  },
};

export const actions = {
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
          img: payload.img,
        }
      )
      .then((res) => {
        context.commit("EDIT_PRODUCT", res.data);
      })
      .catch((res) => {
        console.log(`Ha ocurrido un error al agregar el producto ${res}`);
      });
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
};

export const getters = {
  products: (state) => state.products,
  loading: (state) => state.loading,
};
