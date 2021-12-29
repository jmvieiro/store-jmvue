<template>
  <v-card class="border-main" style="background-color: inherit">
    <v-container>
      <v-row>
        <v-col cols="12" lg="3"><i>place for img</i> </v-col>
        <v-col cols="12" lg="9">
          <v-card-title style="color: white">
            {{ product.title }}
          </v-card-title>
          <v-card-text style="color: white"
            >Precio: {{ product.price | money }}
          </v-card-text>
          <v-card-actions>
            <v-btn dark color="primary" @click="viewDetail(product)">
              <div v-if="admin"><v-icon dark>mdi-pencil</v-icon> Editar</div>
              <div v-else><v-icon dark>mdi-eye</v-icon> Detalle</div>
            </v-btn>
            <v-btn
              v-if="admin"
              dark
              color="red"
              class="ml-2"
              @click="$store.dispatch('deleteFromStock', product.id)"
            >
              <v-icon dark>mdi-delete</v-icon> Eliminar
            </v-btn>
            <v-btn
              v-else
              dark
              color="success"
              class="ml-2"
              @click="
                $store.dispatch('addToCart', { product: product, qty: 1 })
              "
            >
              <v-icon dark>mdi-cart-plus</v-icon> Agregar
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
    <EditProduct
      :open="dialog"
      :product="product"
      :admin="admin"
      @closeDialog="closeDialog($event)"
    />
  </v-card>
</template>

<script>
import EditProduct from "../components/EditProduct";

export default {
  name: "ProductCard",
  components: {
    EditProduct,
  },
  data() {
    return {
      dialog: false,
    };
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeDialog(state) {
      this.dialog = state;
    },
    viewDetail(product) {
      if (this.$props.admin) console.log("esAdmin");
      else this.$router.push(`store/${product.id}`);
    },
  },
};
</script>