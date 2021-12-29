<template>
  <v-container>
    <h2 class="mb-8 mb-lg-8">
      Acceso usuarios
      <i style="font-size: 17px !important"> => Test: jmvieiro@gmail.com | 1234 </i>
    </h2>
    <v-row>
      <v-col cols="6">
        <v-card class="grey darken-3">
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="model.email"
                :rules="emailRules"
                label="E-mail"
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
              <v-btn
                :disabled="!valid"
                color="success"
                class="mt-4"
                @click="validate"
              >
                Ingresar
              </v-btn>
              <v-alert
                v-if="visible"
                dense
                prominent
                color="red lighten-2 mt-8"
              >
                {{ error }}</v-alert
              >
            </v-form>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Login",
  data: () => ({
    valid: true,
    error: "",
    visible: false,
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
        this.$store.dispatch("login", {
          email: this.model.email,
          password: this.model.password,
        });
      }
    },
  },
  computed: {
    ...mapGetters(["user", "errorLogin"]),
  },
  watch: {
    user() {
      if (this.user) this.$router.push("store");
    },
    errorLogin() {
      if (this.errorLogin) {
        this.error = this.errorLogin;
        this.visible = true;
      }
    },
  },
};
</script>
