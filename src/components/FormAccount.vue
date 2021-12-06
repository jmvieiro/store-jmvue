<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6" class="pa-8">
        <h1>Formulario Registro</h1>
        <v-form ref="formRegister" v-model="validRegister" lazy-validation>
          <v-text-field
            v-model="modelRegister.user"
            :counter="8"
            :rules="userRules"
            label="Usuario"
            required
          ></v-text-field>
          <v-text-field
            v-model="modelRegister.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="modelRegister.password"
            type="password"
            :counter="15"
            :rules="passwordRules"
            label="Contraseña"
            required
          ></v-text-field>
          <v-text-field
            v-model="modelRegister.password2"
            type="password"
            :counter="15"
            :rules="passwordRules"
            label="Reingresar contraseña"
            required
          ></v-text-field>
          <v-btn
            :disabled="!validRegister"
            color="success"
            class="mt-4"
            @click="validateRegister"
          >
            Validar
          </v-btn>
        </v-form>
      </v-col>
      <v-col lg="6" class="pa-8">
        <h1>Formulario Login</h1>
        <v-form ref="formLogin" v-model="validLogin" lazy-validation>
          <v-text-field
            v-model="modelLogin.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="modelLogin.password"
            type="password"
            :counter="15"
            :rules="passwordRules"
            label="Contraseña"
            required
          ></v-text-field>
          <v-btn
            :disabled="!validLogin"
            color="success"
            class="mt-4"
            @click="validateLogin"
          >
            Validar
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "FormAccount",
  data: () => ({
    validLogin: true,
    validRegister: true,
    modelLogin: {
      password: "",
      email: "",
    },
    modelRegister: {
      user: "",
      password: "",
      password2: "",
      email: "",
    },
    userRules: [
      (v) => !!v || "Usuario es obligatorio.",
      (v) =>
        (v && v.length <= 8) || "El usuario no debe contener más de 8 caracteres.",
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
    validateRegister() {
      this.$refs.formRegister.validate();
    },
    validateLogin() {
      this.$refs.formLogin.validate();
    },
  },
};
</script>
