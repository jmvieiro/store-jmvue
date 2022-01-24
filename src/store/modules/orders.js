import axios from "axios";

export const namespaced = true;

export const state = {
  orders: [],
  loading: false,
};
export const mutations = {
  CREATE_ORDER(state, payload) {
    state.orders.push(payload);
  },
  GET_ORDERS(state, payload) {
    state.orders = payload;
  },
  LOADING(state, payload) {
    state.loading = payload;
  },
};
export const actions = {
  createOrder(context, payload) {
    let order = {
      ...payload,
      state: "pending",
      detail: context.rootState.cart.cart.map((element) => ({
        idProduct: element.product.id,
        title: element.product.title,
        qty: element.qty,
      })),
      totalItems: context.rootState.cart.cart.reduce(
        (acc, el) => (acc += el.qty),
        0
      ),
      total: context.rootState.cart.cart.reduce(
        (acc, el) => (acc += el.product.price * el.qty),
        0
      ),
    };
    axios
      .post("https://61ba1ffb48df2f0017e5a919.mockapi.io/api/v1/orders", order)
      .then((res) => {
        context.commit("CREATE_ORDER", res.data);
      })
      .catch((res) => {
        console.log(`Ha ocurrido un error al registrar la orden ${res}`);
      });
  },
  getOrders(context) {
    context.commit("LOADING", true);
    axios
      .get("https://61ba1ffb48df2f0017e5a919.mockapi.io/api/v1/orders")
      .then((res) => {
        context.commit("GET_ORDERS", res.data);
        context.commit("LOADING", false);
      })
      .catch((res) => {
        console.log(`Ha ocurrido un error al obtener las órdenes ${res}`);
      });
  },
};
export const getters = {
  orders: (state) => state.orders,
  loading: (state) => state.loading,
};
