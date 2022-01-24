import * as auth from "@/store/modules/auth.js";
import * as cart from "@/store/modules/cart.js";
import * as orders from "@/store/modules/orders.js";
import * as products from "@/store/modules/products.js";

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: auth,
    products: products,
    cart: cart,
    orders: orders,
  },
});
