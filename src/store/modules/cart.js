export const namespaced = true;

export const state = {
  cart: [],
};
export const mutations = {
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
      return obj.product.id !== payload.product.id;
    });
    state.cart = aux;
  },
  CLEAR_CART(state) {
    state.cart = [];
  },
};
export const actions = {
  addToCart(context, payload) {
    context.commit("ADD_TO_CART", payload);
  },
  removeFromCart(context, payload) {
    context.commit("REMOVE_FROM_CART", payload);
  },
  clearCart(context) {
    context.commit("CLEAR_CART");
  },
};
export const getters = {
  total: (state) =>
    state.cart.reduce((acc, el) => (acc += el.product.price * el.qty), 0),
  totalItems: (state) => state.cart.reduce((acc, el) => (acc += el.qty), 0),
  cart: (state) => state.cart,
};
