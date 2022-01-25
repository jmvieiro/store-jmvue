<template>
  <v-container>
    <BackTo />
    <v-card
      v-if="!user[0]"
      color="black"
      max-width="600"
      class="mx-auto mt-4 pa-8 grey darken-4"
    >
      <v-container>
        <h2 class="mb-8 mb-lg-8 text-yellow text-uppercase">
          Registro nuevo usuario
        </h2>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="model.name"
            :rules="textRules"
            label="Nombre"
            :counter="30"
            required
          ></v-text-field>
          <v-text-field
            v-model="model.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="model.address"
            :rules="addressRules"
            label="Dirección de entrega"
            :counter="50"
            required
          ></v-text-field>
          <v-text-field
            v-model="model.password"
            type="password"
            :counter="15"
            :rules="passwordRules"
            label="Contraseña"
            required
          ></v-text-field>
          <v-text-field
            ref="password2"
            v-model="model.password2"
            type="password"
            :counter="15"
            :rules="passwordRules"
            label="Reingresar contraseña"
            required
          ></v-text-field>
          <v-btn
            :disabled="!valid"
            class="mt-8 border-yellow text-yellow"
            dark
            block
            @click="validate"
          >
            Registrar usuario
          </v-btn>
          <div class="text-center mt-8">
            <h4 class="text-yellow">¿Ya estás registrado?</h4>
            <router-link to="/login">
              <h4 class="text-uppercase mt-2">Iniciá sesión</h4>
            </router-link>
          </div>
          <v-alert v-if="visible" dense prominent color="red lighten-2 mt-8">
            {{ error }}</v-alert
          >
        </v-form>
      </v-container>
    </v-card>
    <v-card
      v-else
      color="black"
      max-width="600"
      class="mx-auto mt-4 pa-8 text-center grey darken-4"
    >
      <h2 class="text-yellow mb-2">Bienvenido {{ user[0].email }}</h2>
      <h3 class="text-yellow mb-6">¡Gracias por registrarte con nosotros!</h3>

      <div v-if="user[0].admin">
        <router-link to="/">
          <h2 class="border-main pa-2 mt-4">Ir al store</h2>
        </router-link>
        <router-link to="/admin/products">
          <h2 class="border-main pa-2 mt-4">Administrar los productos</h2>
        </router-link>
        <router-link to="/admin/orders">
          <h2 class="border-main pa-2 mt-4">Gestionar las órdenes</h2>
        </router-link>
      </div>
      <div v-else>
        <h3 class="text-yellow mb-4">Te estamos redirigiendo al store</h3>
        <h1 class="text-yellow">{{ timerCount }}</h1>
      </div>
    </v-card>
    <BottomNavigationCart />
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import BackTo from "../components/BackTo";
import BottomNavigationCart from "../components/BottomNavigationCart";
export default {
  name: "Register",
  components: {
    BackTo,
    BottomNavigationCart,
  },
  data: () => ({
    valid: true,
    error: "",
    visible: false,
    timerCount: 6,
    model: {
      name: "",
      email: "",
      address: "",
      password: "",
      password2: "",
    },
    textRules: [
      (v) => !!v || "Campo obligatorio.",
      (v) =>
        (v && v.length <= 30) ||
        "El campo no debe contener más de 30 caracteres.",
    ],
    addressRules: [
      (v) => !!v || "Campo obligatorio.",
      (v) =>
        (v && v.length <= 50) ||
        "El campo no debe contener más de 50 caracteres.",
    ],
    passwordRules: [
      (v) => !!v || "Contraseña es obligatoria.",
      (v) =>
        (v && v.length <= 15) ||
        "La contraseña no debe contener más de 15 caracteres.",
    ],
    emailRules: [
      (v) => !!v || "E-mail es obligatorio.",
      (v) => /.+@.+\..+/.test(v) || "Ingresa un e-mail válido.",
    ],
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.visible = false;
        this.$store.dispatch("auth/register", {
          name: this.model.name,
          email: this.model.email,
          address: this.model.address,
          password: this.model.password,
          password2: this.model.password2,
          admin: false,
        });
        this.timerCount--;
      }
    },
  },
  computed: {
    ...mapGetters("auth", ["user"]),
    ...mapGetters("auth", ["errorRegister"]),
  },
  watch: {
    errorRegister() {
      if (this.errorRegister) {
        this.error = this.errorRegister;
        this.visible = true;
      }
    },
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        }
      },
      immediate: false,
    },
  },
};
</script>
