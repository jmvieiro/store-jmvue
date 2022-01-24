<template>
  <v-row>
    <v-col cols="4">
      <h2 class="mt-8 mb-8 mb-lg-8 text-yellow text-uppercase">
        Dashboard > {{ title }}
      </h2>
    </v-col>
    <v-col cols="8" class="text-right">
      <v-card color="black" max-width="600" class="ml-auto pa-8">
        <router-link
          to="/admin/products"
          class="border-yellow text-yellow pa-2"
        >
          Productos
        </router-link>
        <router-link
          to="/admin/orders"
          class="border-yellow text-yellow pa-2 ml-5"
        >
          Pedidos
        </router-link>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "AdminHeader",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>