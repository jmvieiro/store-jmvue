<template>
  <v-container>
    <BackTo />
    <v-card
      v-if="!user[0]"
      max-width="600"
      class="mx-auto mt-4 pa-8 grey darken-4"
    >
      <v-container>
        <h2 class="text-yellow text-uppercase">Acceso usuarios</h2>
        <h6 class="text-yellow text-uppercase">
          <i style="font-size: 13px !important" class="text-lowercase">
            (admin: admin@gmail.com | 1234)
          </i>
        </h6>
        <h6 class="mb-8 mb-lg-8 text-yellow text-uppercase">
          <i style="font-size: 13px !important" class="text-lowercase">
            (no-admin: user@gmail.com | 1234)
          </i>
        </h6>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="model.email"
            :rules="emailRules"
            label="E-mail"
            required
            class="text-yellow"
          ></v-text-field>
          <v-text-field
            v-model="model.password"
            type="password"
            :counter="15"
            :rules="passwordRules"
            label="Contraseña"
            required
          ></v-text-field>
          <v-btn
            :disabled="!valid"
            class="mt-8 border-yellow text-yellow"
            dark
            block
            @click="validate"
          >
            Ingresar
          </v-btn>
          <div class="text-center mt-8">
            <h4 class="text-yellow">¿No estás registrado?</h4>
            <router-link to="/register">
              <h4 class="text-uppercase mt-2">Registrate</h4>
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
      <h2 class="text-yellow mb-6">Bienvenido {{ user[0].email }}</h2>

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
  name: "Login",
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
      password: "",
      email: "",
    },
    userRules: [
      (v) => !!v || "Usuario es obligatorio.",
      (v) =>
        (v && v.length <= 8) ||
        "El usuario no debe contener más de 8 caracteres.",
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
        this.$store.dispatch("auth/login", {
          email: this.model.email,
          password: this.model.password,
        });
        this.timerCount--;
      }
    },
  },
  computed: {
    ...mapGetters("auth", ["user"]),
    ...mapGetters("auth", ["errorLogin"]),
  },
  watch: {
    errorLogin() {
      if (this.errorLogin) {
        this.error = this.errorLogin;
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
