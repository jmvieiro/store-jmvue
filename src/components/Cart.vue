<template>
  <div class="py-4">
    <h3>Carrito de compras</h3>
    <v-row v-if="cart.length === 0">
      <v-col>
        <div class="mx-auto my-3 text-center d-block">
          <v-alert color="primary lighten-2" dark
            >¡No hay productos en el carrito!</v-alert
          >
        </div>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-data-table
        :headers="headers"
        :items="cart"
        style="margin: 0 auto; width: 98%; max-width: 98%"
        class="elevation-2 mt-6"
      >
        <template v-slot:item.price="{ item }">
          {{ item.price | money }}
        </template>
        <template v-slot:item.total="{ item }">
          {{ (item.price * item.qty) | money }}
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn
            fab
            dark
            x-small
            color="warning"
            @click="removeFromCart(item.productId)"
          >
            <v-icon dark>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-row>
    <h3 class="mt-8">Ítems: {{ totalItems }} | Total: {{ total | money }}</h3>
  </div>
</template>

<script>
export default {
  name: "Cart",
  props: {
    cart: {
      type: [],
      default: () => {},
    },
  },
  data: () => {
    return {
      headers: [
        { text: "ID", align: "start", value: "productId" },
        { text: "Título", value: "title" },
        { text: "Precio", value: "price" },
        { text: "Cantidad", value: "qty" },
        { text: "Total", value: "total" },
        { text: "Acción", value: "action" },
      ],
    };
  },
  methods: {
    removeFromCart(id) {
      this.$emit("removeFromCart", id);
    },
  },
  computed: {
    total() {
      let total = 0;
      this.cart.forEach((element) => {
        total += element.qty * element.price;
      });
      return total;
    },
    totalItems() {
      let total = 0;
      this.cart.forEach((element) => {
        total += element.qty;
      });
      return total;
    },
  },
};
</script>