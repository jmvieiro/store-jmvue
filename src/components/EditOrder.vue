<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="800px"
    dark
    @click:outside="$emit('closeDialog', false)"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5 mb-3">Ver orden #{{ selectedOrder.id }}</span>
      </v-card-title>
      <v-card-text>
        <p class="text-yellow">Productos:</p>
        <v-data-table
          :headers="headers"
          :items="selectedOrder.detail"
          style="margin: 0 auto; width: 98%; max-width: 98%; max-width: 1350px"
          class="elevation-2 mt-6 grey darken-4 text-yellow pa-3 mb-4"
          dark
        >
        </v-data-table>
        <p class="text-yellow">
          Cantidad productos: {{ selectedOrder.totalItems }}
        </p>
        <p class="text-yellow">Total: {{ selectedOrder.total | money }}</p>
        <p class="text-yellow">Estado: {{ selectedOrder.state }}</p>
        <v-form ref="form" v-model="valid" lazy-validation> </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('closeDialog', false)">
          Cancelar
        </v-btn>
        <v-btn
          :disabled="!valid"
          text
          color="blue darken-1"
          dark
          @click="validate(order.id)"
        >
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EditOrder",
  data() {
    return {
      selectedOrder: {
        state: "",
      },
      valid: true,
      headers: [
        { text: "ID", align: "start", value: "idProduct" },
        { text: "Producto", value: "title" },
        { text: "Cantidad", value: "qty" },
      ],
    };
  },
  props: {
    order: {
      type: Object,
      default: () => {},
    },
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    validate(id) {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("orders/editOrder", {
          id: id,
          state: this.selectedOrder.state,
        });
        this.$emit("closeDialog", false);
      }
    },
  },
  watch: {
    order() {
      this.selectedOrder = { ...this.$props.order };
      console.log(this.selectedOrder);
    },
  },
};
</script>