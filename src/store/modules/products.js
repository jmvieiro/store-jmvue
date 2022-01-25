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
  CHANGE_VISIBILITY_PRODUCT(state, payload) {
    let aux = [...state.products];
    let product = aux.find((o) => o.id === payload.id);
    product.visible = payload.visible;
    state.products = aux;
  },
  EDIT_PRODUCT(state, payload) {
    let aux = [...state.products];
    let product = aux.find((o) => o.id === payload.id);
    product.title = payload.title;
    product.description = payload.description;
    product.price = payload.price;
    state.products = aux;
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
  changeVisibilityProduct(context, payload) {
    axios
      .put(
        `https://61ba1ffb48df2f0017e5a919.mockapi.io/api/v1/products/${payload.id}`,
        {
          visible: payload.visible,
        }
      )
      .then((res) => {
        context.commit("CHANGE_VISIBILITY_PRODUCT", res.data);
      })
      .catch((res) => {
        console.log(`Ha ocurrido un error al actualizar el producto ${res}`);
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
