<template>
  <div>
    <h2 class="mb-0 mb-lg-8">Login</h2>
    <v-row>
      <v-col cols="6">
        <v-card>
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
                Validar
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Login",
  data: () => ({
    valid: true,
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
        this.$store.dispatch("login", {
          email: this.model.email,
          password: this.model.password,
        });
      }
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>
