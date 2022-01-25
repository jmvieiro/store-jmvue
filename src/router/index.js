import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Store",
    component: () => import("../views/Store.vue"),
  },
  {
    path: "/store",
    name: "Store",
    component: () => import("../views/Store.vue"),
  },
  {
    path: "/store/:id",
    name: "ProductDetail",
    component: () => import("../views/ProductDetail.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    meta: { requiresAuth: true },
    component: () => import("../views/Admin.vue"),
  },
  {
    path: "/admin/products",
    name: "Admin",
    meta: { requiresAuth: true },
    component: () => import("../views/Admin.vue"),
  },
  {
    path: "/admin/products/:id",
    name: "Admin",
    meta: { requiresAuth: true },
    component: () => import("../views/Admin.vue"),
  },
  {
    path: "/admin/orders",
    name: "AdminOrders",
    meta: { requiresAuth: true },
    component: () => import("../views/AdminOrders.vue"),
  },  
  {
    path: "/admin/orders/:id",
    name: "OrderDetail",
    meta: { requiresAuth: true },
    component: () => import("../views/OrderDetail.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let user = store.getters["auth/user"][0];
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (user && user.admin) {
      next();
      return;
    }
    next("/login");
  } else next();
});

export default router;
