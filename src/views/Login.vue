<template>
  <div>
    <h2 class="mb-0 mb-lg-8">Login</h2>
    <v-divider class="mt-0 mb-12"></v-divider>
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
import axios from "axios";
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
      console.log("entro");
      if (this.$refs.form.validate()) {
        axios
          .get(
            `https://61ba1ffb48df2f0017e5a919.mockapi.io/api/vi/users/?email=${this.model.email}&?password=${this.model.password}`
          )
          .then((res) => {
            console.log(res.data);
            //this.$router.push("store");
          })
          .catch((res) => {
            console.log(`Ha ocurrido un error al registrar el usuario: ${res}`);
          });
      }
    },
  },
};
</script>
