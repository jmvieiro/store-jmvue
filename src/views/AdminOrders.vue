<template>
  <v-container>
    <AdminHeader :title="'Pedidos'" />
    <div v-if="loading" class="text-center">
      <v-progress-circular
        size="60"
        indeterminate
        color="green"
      ></v-progress-circular>
    </div>
    <div v-else>
      <div
        v-if="orders.length === 0"
        class="mt-16 mx-auto text-center"
        style="max-width: 800px"
      >
        <v-alert dense prominent color="yellow lighten-3">
          <h2>¡No tenés órdenes registradas!</h2>
        </v-alert>
      </div>
      <div v-else>
        <v-data-table
          :headers="headers"
          :items="orders"
          style="margin: 0 auto; width: 98%; max-width: 98%; max-width: 1350px"
          class="elevation-2 mt-6 grey darken-4 text-yellow pa-3"
          dark
        >
          <template v-slot:item.state="{ item }">
            <span>
              {{ item.state === "pending" ? "Pendiente" : "Resuelto" }}
            </span>
          </template>
          <template v-slot:item.actions="{ item }">
            <span>
              <v-btn
                icon
                class="ml-1 text-yellow"
                @click="viewOrder(item.id)"
              >
                <v-icon icon dark>mdi-eye</v-icon>
              </v-btn>
            </span>
          </template>
        </v-data-table>
      </div>
    </div>
  </v-container>
</template>

<script>
import AdminHeader from "../components/AdminHeader";

import { mapGetters } from "vuex";

export default {
  name: "AdminOrders",
  components: {
    AdminHeader,
  },
  methods: {
    viewOrder(id) {
      console.log(id);
    },
  },
  data: () => {
    return {
      headers: [
        { text: "ID", align: "start", value: "id" },
        { text: "Comprador", value: "buyer.name" },
        { text: "E-mail", value: "buyer.email" },
        { text: "Dirección", value: "buyer.address" },
        { text: "Estado", value: "state" },
        { text: "Acciones", value: "actions" },
      ],
    };
  },
  computed: {
    ...mapGetters("orders", ["orders"]),
    ...mapGetters("orders", ["loading"]),
  },
  mounted() {
    this.$store.dispatch("orders/getOrders");
  },
};
</script>
