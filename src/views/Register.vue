<template>
  <div>
    <h2 class="mb-0 mb-lg-8">Registro</h2>
    <v-divider class="mt-0 mb-12"></v-divider>
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="model.user"
                :counter="8"
                :rules="userRules"
                label="Usuario"
                required
              ></v-text-field>
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
  name: "Register",
  data: () => ({
    valid: true,
    model: {
      user: "",
      password: "",
      password2: "",
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
      this.$refs.form.validate();
      if (this.model.password !== this.model.password2)
        console.log("¡Las contraseñas no coinciden!");
      else {
        axios
          .post("https://61ba1ffb48df2f0017e5a919.mockapi.io/api/v1/users", {
            email: this.model.email,
            password: this.model.password,
            admin: false,
          })
          .then(() => {
            this.$router.push("store");
          })
          .catch((res) => {
            console.log(`Ha ocurrido un error al registrar el usuario: ${res}`);
          });
      }
    },
  },
};
</script>
