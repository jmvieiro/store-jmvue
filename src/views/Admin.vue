<template>
  <div>
    <v-container>
      <AdminHeader :title="'Productos'" />
      <v-row>
        <v-col cols="12" xs="12" lg="8">
          <div class="pa-4 pb-4" v-for="(product, i) in products" :key="i">
            <ProductCardList :product="product" />
          </div>
        </v-col>
        <v-col xs="12" lg="4">
          <v-card max-width="600" class="mx-auto mt-4 pa-8 grey darken-4">
            <v-container>
              <h2 class="mb-8 mb-lg-8 text-yellow text-uppercase">
                Agregar producto
              </h2>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="newProduct.title"
                  :rules="textRules"
                  label="Título"
                  :counter="40"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="newProduct.description"
                  :rules="textRules"
                  label="Descripción"
                  :counter="40"
                  required
                ></v-text-field>
                <v-text-field
                  v-model.number="newProduct.price"
                  :rules="numberRules"
                  label="Precio"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="newProduct.img"
                  label="Imagen"
                  required
                ></v-text-field>
                <v-btn
                  :disabled="!valid"
                  class="mt-8 border-yellow text-yellow"
                  dark
                  block
                  @click="validate"
                >
                  Confirmar
                </v-btn>
              </v-form>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import ProductCardList from "../components/ProductCardList";
import AdminHeader from "../components/AdminHeader";

export default {
  name: "Admin",
  components: {
    ProductCardList,
    AdminHeader,
  },
  data() {
    return {
      valid: true,
      newProduct: {
        title: "",
        description: "",
        price: 0,
        img: "",
        visible: false,
      },
      textRules: [
        (v) => !!v || "Campo obligatorio.",
        (v) =>
          (v && v.length <= 40) ||
          "El campo no debe contener más de 40 caracteres.",
      ],
      numberRules: [
        (v) => !!v || "El precio es obligatorio.",
        (v) => parseFloat(v) >= 0 || "El precio debe ser mayor a 0.",
      ],
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("products/addProduct", this.newProduct);
        this.$refs.form.reset();
        this.$toast.top("¡Producto agregado al stock!");
      }
    },
  },
  computed: {
    ...mapGetters("products", ["products"]),
    ...mapGetters("products", ["errorProduct"]),
  },
};
</script>
