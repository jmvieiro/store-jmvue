<template>
  <v-card dark class="mx-auto pa-2 border-main">
    <v-card-title>
      <h2 class="text-uppercase">Checkout</h2>
    </v-card-title>
    <v-card-text class="py-0">
      <h3 class="text-uppercase">Productos: {{ totalItems }}</h3>
      <h3 class="text-uppercase">Total: {{ total | money }}</h3>
    </v-card-text>
    <v-card-title class="py-0">
      <h5 class="text-uppercase mb-3 mt-8">Datos de contacto</h5>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="buyer.name"
          :rules="textRules"
          label="Nombre"
          :counter="30"
          required
        ></v-text-field>
        <v-text-field
          v-model="buyer.address"
          :rules="addressRules"
          label="Dirección de entrega"
          :counter="50"
          required
        ></v-text-field>
        <v-text-field
          v-model="buyer.email"
          :rules="emailRules"
          label="E-mail"
          :counter="40"
          required
        ></v-text-field>
        <span v-if="[user][0]" class="text-lowercase mb-3">
          * mostramos los datos de tu cuenta para registrar la orden
        </span>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :disabled="!valid" color="success" dark @click="validate()">
        Confirmar orden
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Checkout",
  data() {
    return {
      buyer: {
        name: "",
        email: "",
      },
      valid: true,
      textRules: [
        (v) => !!v || "Campo obligatorio.",
        (v) =>
          (v && v.length <= 30) ||
          "El campo no debe contener más de 40 caracteres.",
      ],
      addressRules: [
        (v) => !!v || "Campo obligatorio.",
        (v) =>
          (v && v.length <= 50) ||
          "El campo no debe contener más de 50 caracteres.",
      ],
      emailRules: [
        (v) => !!v || "E-mail es obligatorio.",
        (v) => /.+@.+\..+/.test(v) || "Ingresa un e-mail válido.",
      ],
    };
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("orders/createOrder", {
          buyer: this.buyer,
        });
        this.$refs.form.reset();
      }
    },
  },
  mounted() {
    if (this.$store.getters["auth/user"][0]) {
      this.buyer.name = this.$store.getters["auth/user"][0].name;
      this.buyer.address = this.$store.getters["auth/user"][0].address;
      this.buyer.email = this.$store.getters["auth/user"][0].email;
    }
  },
  computed: {
    ...mapGetters("cart", ["total"]),
    ...mapGetters("cart", ["totalItems"]),
    ...mapGetters("cart", ["cart"]),
    ...mapGetters("auth", ["user"]),
    ...mapGetters("orders", ["orders"]),
  },
  watch: {
    orders() {
      let aux = this.orders[this.orders.length - 1];
      this.$toast.top(`¡Se generó la orden ${aux.id} con éxito!`);
    },
  },
};
</script>