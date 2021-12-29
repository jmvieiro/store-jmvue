<template>
  <div>
    <h2 class="mb-0 mb-lg-8">Panel de administración</h2>
    <v-row>
      <v-col xs="12" lg="4">
        <v-card class="sidebar pa-4">
          <h3>Agregar producto</h3>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="newProduct.title"
              :rules="textRules"
              label="Título"
              :counter="15"
              required
            ></v-text-field>
            <v-text-field
              v-model="newProduct.description"
              :rules="textRules"
              label="Descripción"
              :counter="15"
              required
            ></v-text-field>
            <v-text-field
              v-model.number="newProduct.price"
              :rules="numberRules"
              label="Precio"
              required
            ></v-text-field>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mt-4"
              @click="validate"
            >
              Confirmar
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" lg="8">
        <Products :admin="true" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Products from "../components/Products";

export default {
  name: "Account",
  data() {
    return {
      valid: true,
      newProduct: {
        title: "",
        description: "",
        price: 0,
      },
      textRules: [
        (v) => !!v || "Campo obligatorio.",
        (v) =>
          (v && v.length <= 15) ||
          "El campo no debe contener más de 15 caracteres.",
      ],
      numberRules: [
        (v) => !!v || "El precio es obligatorio.",
        (v) => parseFloat(v) >= 0 || "El precio debe ser mayor a 0.",
      ],
    };
  },
  components: {
    Products,
  },
  methods: {
    validate() {
      this.$store.dispatch("addProduct", this.newProduct);
    },
  },
};
</script>
