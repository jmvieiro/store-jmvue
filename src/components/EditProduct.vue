<template>
  <v-dialog
    v-model="open"
    max-width="500"
    @click:outside="$emit('closeDialog', false)"
  >
    <v-card class="mx-auto my-3">
      <div v-if="!admin">
        <v-card-title>{{ product.title | capitalize }}</v-card-title>
        <v-divider class="mx-4"></v-divider>
        <v-card-text>
          <h3>{{ product.description }}</h3>
          <h4>Precio: {{ product.price | money }}</h4>
        </v-card-text>
      </div>
      <div v-else>
        <v-container>
          <h3>Editar producto</h3>
          <v-text-field
            v-model="product.title"
            label="Título"
            value="this.$props.product.title"
          ></v-text-field>
          <v-text-field
            v-model="product.description"
            label="Descripción"
          ></v-text-field>
          <v-text-field
            v-model.number="product.price"
            label="Precio"
          ></v-text-field>
          <v-btn block @click="editProduct(product.id)">Confirmar</v-btn>
        </v-container>
      </div>

      <v-divider class="mx-4 my-4"></v-divider>

      <v-card-actions class="mx-2">
        <v-btn
          v-if="!admin"
          dark
          color="success lighten-1 mb-2"
          @click="$store.dispatch('addToCart', { product: product, qty: 1 })"
        >
          Agregar
          <v-icon class="ml-2">mdi-cart-plus</v-icon>
        </v-btn>
        <v-btn
          dark
          color="red lighten-1 mb-2"
          @click="$emit('closeDialog', false)"
        >
          Cerrar
          <v-icon class="ml-2">mdi-close</v-icon>
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
      title: "",
      description: "",
      price: 0,
    };
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
    open: {
      type: Boolean,
      default: false,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  beforeUpdate() {
    this.title = this.$props.product.title;
    this.description = this.$props.product.description;
    this.price = this.$props.product.price;
  },
  methods: {
    editProduct(id) {
      this.$store.dispatch("editProduct", {
        id: id,
        title: this.title,
        description: this.description,
        price: this.price,
      });
      this.$emit("closeDialog", false);
    },
  },
};
</script>