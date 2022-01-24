<template>
  <v-card color="black" dark style="border: 1px solid #d4e069 !important">
    <div class="d-flex flex-no-wrap">
      <v-avatar class="ma-3" size="125" tile>
        <v-img :src="product.img"></v-img>
      </v-avatar>
      <v-container fluid>
        <v-row>
          <v-col lg="8">
            <v-card-title class="text-h6">{{ product.title }}</v-card-title>
            <v-card-subtitle>{{ product.description }}</v-card-subtitle>
            <v-card-subtitle style="margin-top: -16px; padding-top: 0px">{{
              product.price | money
            }}</v-card-subtitle>
          </v-col>
          <v-col lg="4" class="pt-4">
            <v-card-actions>
              <v-btn
                dark
                outlined
                class="ml-2 text-yellow"
                @click="editProduct(product)"
              >
                <v-icon dark>mdi-pencil</v-icon> Editar
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
      selectedProduct: {
        // title: "",
        // price: 0,
        // description: "",
        // img: "",
      },
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