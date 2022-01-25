<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="800px"
    dark
    @click:outside="$emit('closeDialog', false)"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">Editar producto</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="selectedProduct.title"
            :rules="textRules"
            label="Título"
            :counter="40"
            required
          ></v-text-field>
          <v-text-field
            v-model="selectedProduct.description"
            :rules="textRules"
            label="Descripción"
            :counter="40"
            required
          ></v-text-field>
          <v-text-field
            v-model.number="selectedProduct.price"
            :rules="numberRules"
            label="Precio"
            required
          ></v-text-field>
          <v-text-field
            v-model="selectedProduct.img"
            label="Imagen"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('closeDialog', false)">
          Cancelar
        </v-btn>
        <v-btn
          :disabled="!valid"
          text
          color="blue darken-1"
          dark
          @click="validate(product.id)"
        >
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EditProduct",
  data() {
    return {
      selectedProduct: {
        title: "",
        price: 0,
        description: "",
        img: "",
      },
      valid: true,
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
  props: {
    product: {
      type: Object,
      default: () => {},
    },
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    validate(id) {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("products/editProduct", {
          id: id,
          title: this.selectedProduct.title,
          description: this.selectedProduct.description,
          price: this.selectedProduct.price,
          img: this.selectedProduct.img,
        });
        this.$toast.top("¡Producto actualizado en el stock!");
        this.$emit("closeDialog", false);
      }
    },
  },
  watch: {
    product() {
      this.selectedProduct = { ...this.$props.product };
    },
  },
};
</script>