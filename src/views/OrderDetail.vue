<template>
  <v-container>
    <AdminHeader :title="'Pedidos'" />
    <BackTo :dest="'/admin/orders'" :text="'Listado de pedidos'" />
    <div v-if="order">
      <v-container class="border-main grey darken-4 pa-8">
        <v-row>
          <v-col>
            <v-row>
              <v-col>
                <p class="text-yellow text-center text-uppercase">
                  <b>Productos: </b>
                  <span class="pa-2">{{ order.totalItems }}</span>
                </p>
              </v-col>
              <v-col>
                <p class="text-yellow text-center text-uppercase">
                  <b>Total: </b>
                  <span class="pa-2">{{ order.total | money }}</span>
                </p>
              </v-col>
              <v-col>
                <p class="text-yellow text-center text-uppercase">
                  <b>Estado: </b>
                  <span
                    class="pa-2 rounded"
                    :class="{ 'red darken-3': order.state === 'pending' }"
                    >{{
                      order.state === "pending" ? "Pendiente" : "Resuelto"
                    }}</span
                  >
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-data-table
                  :headers="headers"
                  :items="order.detail"
                  style="width: 100%"
                  class="elevation-2 text-yellow pa-3 mb-4 grey darken-4"
                  dark
                >
                </v-data-table>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="text-right">
                <v-btn
                  color="blue darken-1"
                  text
                  @click="
                    () => {
                      this.$router.replace('/admin/orders');
                    }
                  "
                >
                  Cancelar
                </v-btn>
                <v-btn
                  v-if="order.state === 'pending'"
                  text
                  color="blue darken-1"
                  dark
                  @click="completeOrder(order.id)"
                >
                  Marcar como resuelto
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else class="mt-16 mx-auto text-center" style="max-width: 800px">
      <v-alert dense prominent color="yellow lighten-3">
        <h2>¡Lo sentimos!</h2>
        <h3>Pedido no encontrado</h3>
      </v-alert>
    </div>
  </v-container>
</template>

<script>
import AdminHeader from "../components/AdminHeader";
import BackTo from "../components/BackTo";

export default {
  name: "OrderDetail",
  components: {
    AdminHeader,
    BackTo,
  },
  data() {
    return {
      order: {},
      headers: [
        { text: "ID", align: "start", value: "idProduct" },
        { text: "Producto", value: "title" },
        { text: "Cantidad", value: "qty" },
      ],
    };
  },
  methods: {
    completeOrder(id) {
      console.log(id);
      this.$store.dispatch("orders/completeOrder", id);
      this.$toast.top("¡Pedido actualizado!");
    },
  },
  mounted() {
    this.order = this.$store.getters["orders/orders"].find(
      (o) => o.id === this.$route.params.id
    );
    console.log(this.order.id);
  },
};
</script>