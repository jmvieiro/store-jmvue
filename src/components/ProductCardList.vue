<template>
  <v-card color="black" dark style="border: 1px solid #d4e069 !important">
    <div class="d-flex flex-no-wrap">
      <v-avatar class="ma-3" size="125" tile>
        <v-img :src="product.img"></v-img>
      </v-avatar>
      <v-container>
        <v-row>
          <v-col cols="12" lg="8" md="12">
            <v-card-title class="text-h6">{{ product.title }}</v-card-title>
            <v-card-subtitle>{{ product.description }}</v-card-subtitle>
            <v-card-subtitle style="margin-top: -16px; padding-top: 0px">{{
              product.price | money
            }}</v-card-subtitle>
          </v-col>
          <v-col cols="12" lg="4" md="12" class="pt-4">
            <v-card-actions>
              <v-btn
                class="ml-2 text-yellow blue darken-4"
                @click="editProduct(product)"
              >
                <v-icon dark>mdi-pencil</v-icon> Editar
              </v-btn>
              <v-btn
                v-if="product.visible"
                class="ml-2 text-yellow red darken-4"
                @click="
                  () => {
                    $store.dispatch('products/changeVisibilityProduct', {
                      id: product.id,
                      visible: false,
                    });
                    this.$toast.top('¡Producto retirado del stock!');
                  }
                "
              >
                <v-icon dark>mdi-delete</v-icon> Ocultar
              </v-btn>
              <v-btn
                v-else
                class="ml-2 text-yellow green darken-4"
                @click="
                  () => {
                    $store.dispatch('products/changeVisibilityProduct', {
                      id: product.id,
                      visible: true,
                    });
                    this.$toast.top('¡Producto incorporado al stock!');
                  }
                "
              >
                <v-icon dark>mdi-playlist-check</v-icon> Mostrar
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
      <EditProduct
        :product="selectedProduct"
        :dialog="dialog"
        @closeDialog="closeDialog($event)"
      />
    </div>
  </v-card>
</template>

<script>
import EditProduct from "../components/EditProduct";

export default {
  name: "ProductCardList",
  components: { EditProduct },
  data() {
    return {
      dialog: false,
      selectedProduct: {},
    };
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    editProduct(product) {
      this.dialog = true;
      this.selectedProduct = { ...product };
    },
    closeDialog(state) {
      this.dialog = state;
    },
  },
};
</script>